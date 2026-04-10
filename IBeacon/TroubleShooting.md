# iBeacon 비콘 인식 트러블슈팅

## 환경
- 디바이스: Samsung Galaxy S23 Ultra (SM-S918N), Android 14+
- 비콘: IBeacon E7 (MBeacon), MAC `C3:00:00:3F:49:48`
- 라이브러리: `@hkpuits/react-native-beacons-manager` (AltBeacon 2.20.6 기반)
- 보조: `react-native-ble-plx` (BLE 진단용)

---

## 이슈 1: AltBeacon 하드웨어 ScanFilter가 non-Apple 비콘을 차단

### 증상
- `[Beacon] Ranging 콜백 수신 - 비콘 0개`만 반복
- AltBeacon 네이티브 로그에서 Microsoft(0600), Apple(4c00) 장치는 보이지만 MBeacon은 없음

### 원인
AltBeacon이 등록된 BeaconParser에서 ScanFilter를 자동 생성:
- `mManufacturerId=280` (AltBeacon, data=`beac`)
- `mManufacturerId=76` (Apple, data=`0215`)

MBeacon 같은 non-Apple iBeacon 클론은 Apple company ID(0x004C)를 사용하지 않아 하드웨어 레벨에서 필터링됨.

`BeaconManager.setAndroidLScanningDisabled(true)`를 설정해도 AltBeacon 2.20.6에서는 ScanFilter 생성을 차단하지 않음.

### 해결
`ScanFilterUtils.java`를 앱 소스에서 오버라이드하여 와일드카드 필터 반환:

```
android/app/src/main/java/org/altbeacon/beacon/service/scanner/ScanFilterUtils.java
```

```java
private static List<ScanFilter> wildcardFilter() {
    List<ScanFilter> filters = new ArrayList<>();
    filters.add(new ScanFilter.Builder().build()); // 모든 장치 매칭
    return filters;
}
```

> **주의**: 빈 리스트(`new ArrayList<>()`)를 반환하면 삼성 칩셋에서 패시브 스캔으로 전환되어 scan response를 받지 못함. 반드시 와일드카드 `ScanFilter.Builder().build()`를 사용해야 함.

---

## 이슈 2: `react-native-ble-plx`의 `neverForLocation` 플래그

### 증상
- ScanFilter 해제 후에도 비콘 인식 안 됨
- logcat에 `ScanController: Skipping client 1 for location deny list` 반복
- nRF Connect 같은 다른 앱에서는 비콘이 정상 감지됨

### 원인
`react-native-ble-plx` 라이브러리의 AndroidManifest.xml이 `BLUETOOTH_SCAN` 퍼미션에 `neverForLocation` 플래그를 강제 주입:

```xml
<!-- node_modules/react-native-ble-plx/android/src/main/AndroidManifest.xml -->
<uses-permission
    android:name="android.permission.BLUETOOTH_SCAN"
    android:usesPermissionFlags="neverForLocation" />
```

이 플래그가 있으면 삼성 BLE 스택이 위치 관련 스캔 결과(비콘 포함)를 앱에 전달하지 않음.

### 해결
Expo config plugin에서 `tools:remove`로 플래그 제거:

```javascript
// plugins/wakeup-config.js
const btScanIndex = manifest["uses-permission"].findIndex(
  (p) => p.$?.["android:name"] === "android.permission.BLUETOOTH_SCAN"
);
if (btScanIndex >= 0) {
  manifest["uses-permission"][btScanIndex] = {
    $: {
      "xmlns:tools": "http://schemas.android.com/tools",
      "android:name": "android.permission.BLUETOOTH_SCAN",
      "tools:remove": "android:usesPermissionFlags",
    },
  };
}
```

최종 merged manifest에서 확인:
```xml
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
<!-- neverForLocation 없음 -->
```

---

## 이슈 3: `ACCESS_BACKGROUND_LOCATION` 미부여

### 증상
- 이슈 2와 동일한 `location deny list` 차단

### 원인
Android 10+에서 포그라운드 서비스를 통한 BLE 스캔은 `ACCESS_BACKGROUND_LOCATION` 런타임 권한이 필요. 매니페스트에 선언되어 있어도 사용자가 직접 "항상 허용"으로 설정해야 함.

### 해결
설정 → 앱 → WNP 자동출근 → 권한 → 위치 → **"항상 허용"**

또는 코드에서 `requestBatteryOptimizationExemption()`처럼 위치 권한 안내 UI 제공.

---

## 이슈 4: GATT 연결 중 비콘 광고 중단

### 증상
- 비폰매니저(관리 앱)에서 Config 화면을 열면 비콘이 BLE 광고를 중단
- 관리 앱을 닫아도 즉시 광고가 재개되지 않을 수 있음

### 원인
많은 저가 BLE 비콘은 GATT 연결 상태에서 iBeacon 광고를 중단함. 연결 해제 후에도 재시작까지 시간이 걸릴 수 있음.

### 해결
관리 앱을 완전히 종료하고 비콘을 물리적으로 재시작(전원 off/on).

---

## 진단 체크리스트

1. **비콘이 실제로 광고 중인가?** → nRF Connect로 확인
2. **ScanFilter가 비콘을 차단하는가?** → logcat에서 `ScanFilterUtils` 로그 확인
3. **neverForLocation 플래그가 있는가?** → merged manifest에서 `BLUETOOTH_SCAN` 확인
4. **위치 권한이 "항상 허용"인가?** → `adb shell dumpsys package <pkg> | grep BACKGROUND_LOCATION`
5. **location deny list에 걸리는가?** → logcat에서 `Skipping client` 검색
6. **관리 앱이 비콘에 연결 중인가?** → 관리 앱 완전 종료 후 테스트
