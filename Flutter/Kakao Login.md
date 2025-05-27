## 카카오 로그인 구현
`pubspec.yaml`에 다음 내용 추가
```yaml
dependencies:
  kakao_flutter_sdk: ^1.9.5 # 전체 추가
  kakao_flutter_sdk_user: ^1.9.5 # 카카오 로그인 API 패키지
  kakao_flutter_sdk_share: ^1.9.5 # 카카오톡 공유 API 패키지
  kakao_flutter_sdk_talk: ^1.9.5 # 카카오톡 채널, 카카오톡 소셜, 카카오톡 메시지 API 패키지
  kakao_flutter_sdk_friend: ^1.9.5 # 피커 API 패키지
  kakao_flutter_sdk_navi: ^1.9.5 # 카카오내비 API 패키지
```

이번 경우 로그인만 시험할 것이므로 `kakao_flutter_sdk_user: ^1.9.5`만 추가함.

`flutter pub get`로 의존성 설치

```dart
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:kakao_flutter_sdk_user/kakao_flutter_sdk_user.dart';

void main() async{
    await dotenv.load();
    WidgetsFlutterBinding.ensureInitialized();

    // runApp() 호출 전 Flutter SDK 초기화
    KakaoSdk.init(
        nativeAppKey: dotenv.get("KAKAO_NATIVE_APP_KEY"),
    );
    
  print(await KakaoSdk.origin);
  runApp(const MyApp());
}
```

위 코드에서 `flutter_dotenv`라는 패키지를 임포트하고 있는데, 이는 환경 변수를 사용하기 위한 패키지다. `.env` 파일에 작성된 환경 변수를 사용할 수 있다.

Hash Key를 Kakao Developers에 등록해야하는데 방법이 두 가지가 있다.

* 디버그 키(Windows)
`keytool -exportcert -alias androiddebugkey -keystore %USERPROFILE%\.android\debug.keystore -storepass android -keypass android | openssl sha1 -binary | openssl base64`

* 디버그 키(Mac)
`keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore -storepass android -keypass android | openssl sha1 -binary | openssl base64`

* 릴리즈 키(Windows)
`keytool -exportcert -alias <RELEASE_KEY_ALIAS> -keystore <RELEASE_KEY_PATH> | openssl sha1 -binary | PATH_TO_OPENSSL_LIBRARY\bin\openssl base64`
* 릴리즈 키(Mac)
`keytool -exportcert -alias <RELEASE_KEY_ALIAS> -keystore <RELEASE_KEY_PATH> | openssl sha1 -binary | openssl base64`

OpenSSL을 설치한 뒤, 쉘에서 위와 같이 명령어를 입력하는 것. 그러나 나는 내 핸드폰을 USB로 연결해 디버그모드로 실행했기 때문에 위의 디버그 키는 invalid key로 에러 메세지를 표시했다.

그래서 위에 보이는 `print(await KakaoSdk.origin)`을 통해 해시키를 얻어온 뒤 Kakao Developers에 해당 해시키를 입력하니 정상 동작했다.

![Kakao Developers Screenshot](https://i.imgur.com/UqcUNFL.png)

해당 화면이다. 패키지명, 마켓 URL,  키 해시를 입력해야하는데 키 해시에 콘솔에 출력된 `KakaoSdk.origin`의 값을 입력하면 되고, 패키지는 `AndroidManifest.xml` 파일안에 있는 `package=` 속성을 참고하면 된다고 문서에 나와있지만, 나는 해당 속성이 없어서 `build.gradle`에 있는 `applicationId` 속성을 참고했다. 이 조차도 없으면 namespace에 있는 내용도 `applicationId`와 같아 사용해도 될 지는 의문이지만 혹여나 하는 마음에 함께 기록해둔다.

파이어베이스에서 OIDC를 구현하려면 인증자에 `https://kauth.kakao.com`를 추가해야한다.

![](https://i.imgur.com/BL5tbSz.png)

클라이언트 ID에는 카카오 개발자 홈페이지에서 네이티브 앱키를 입력한다.

![](https://i.imgur.com/OJDvGWs.png)

클라이언트 보안 비밀번호는 위 스크린샷과 같이 생성 가능하다.