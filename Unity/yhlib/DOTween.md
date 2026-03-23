# DOTween

## 개요

DOTween은 Demigiant가 개발한 Unity용 트위닝 라이브러리. 값의 보간(시작→끝)을 코드 한 줄로 처리한다.
Asset Store에서 무료 버전 배포 (OpenUPM 미지원).

**설치 후:** `Tools > Demigiant > DOTween Utility Panel` > "Create ASMDEF" 실행 필수.

**참고:** http://dotween.demigiant.com/documentation.php

## 기본 사용법

### Transform

```csharp
using DG.Tweening;

// 이동
transform.DOMove(new Vector3(2, 3, 4), 1f);    // 1초 동안 이동
transform.DOMoveX(5f, 1f);                      // X축만
transform.DOLocalMove(new Vector3(1, 2, 0), 1f); // 로컬 좌표

// 회전
transform.DORotate(new Vector3(0, 180, 0), 1f);
transform.DOLocalRotate(new Vector3(90, 0, 0), 1f);
transform.DOLookAt(targetPos, 1f);               // 특정 방향 바라보기

// 스케일
transform.DOScale(2f, 1f);                       // uniform 스케일
transform.DOScale(Vector3.one, 0.3f);
transform.DOScaleX(3f, 1f);

// 점프
transform.DOJump(endPos, jumpPower: 2f, numJumps: 1, duration: 1f);

// 흔들림/펀치
transform.DOShakePosition(0.5f, strength: 1f);
transform.DOPunchScale(new Vector3(0.5f, 0.5f, 0.5f), 0.5f);
```

### UI (uGUI)

```csharp
// CanvasGroup 페이드
canvasGroup.DOFade(0f, 1f);

// Image
image.DOColor(Color.red, 1f);
image.DOFade(0f, 1f);
image.DOFillAmount(1f, 1f);

// RectTransform
rectTransform.DOAnchorPos(new Vector2(100, 0), 1f);
rectTransform.DOSizeDelta(new Vector2(300, 200), 1f);

// Text
text.DOText("Hello World", 2f);
```

### Material

```csharp
material.DOColor(Color.green, 1f);
material.DOFade(0f, 1f);
```

### Camera

```csharp
camera.DOOrthoSize(10f, 1f);
camera.DOShakePosition(0.5f, 1f);    // 카메라 흔들림
```

### Generic (어떤 값이든 트윈)

```csharp
float myFloat = 0f;
DOTween.To(() => myFloat, x => myFloat = x, 100f, 1f);
```

### From (역방향)

```csharp
// 지정 위치 → 현재 위치로 이동
transform.DOMove(new Vector3(2, 3, 4), 1f).From();
```

## Ease

기본값: `Ease.OutQuad`

| 자주 쓰는 Ease | 설명 |
|------|------|
| `Linear` | 일정 속도 |
| `OutQuad` | 감속 도착 (기본값) |
| `InOutQuad` | 가속 후 감속 |
| `OutBack` | 살짝 넘어갔다 돌아옴 (팝업에 적합) |
| `InBack` | 뒤로 당겼다 출발 |
| `OutElastic` | 탄성 효과 |
| `OutBounce` | 바운스 효과 |

```csharp
transform.DOScale(1f, 0.3f).SetEase(Ease.OutBack);

// AnimationCurve로 커스텀
transform.DOMoveX(4f, 1f).SetEase(myAnimationCurve);
```

## Sequence

여러 트윈을 타임라인처럼 조합한다.

```csharp
Sequence seq = DOTween.Sequence();

// Append: 순차 추가
seq.Append(transform.DOMoveX(5f, 1f));        // 0~1초
seq.Append(transform.DORotate(v, 1f));         // 1~2초

// AppendInterval: 대기
seq.AppendInterval(0.5f);

// Join: 직전 Append와 동시 실행
seq.Append(transform.DOMoveX(5f, 1f));
seq.Join(transform.DORotate(v, 1f));           // DOMoveX와 동시

// Insert: 특정 시간에 삽입
seq.Insert(0f, transform.DOScale(3f, 2f));     // 0초부터 시작

// AppendCallback: 콜백
seq.AppendCallback(() => Debug.Log("중간!"));
```

주의: 하나의 트윈은 하나의 Sequence에만 포함 가능.

## 콜백

```csharp
transform.DOMoveX(5f, 1f)
    .OnStart(() => Debug.Log("시작"))
    .OnUpdate(() => Debug.Log("매 프레임"))
    .OnStepComplete(() => Debug.Log("루프 1회 완료"))
    .OnComplete(() => Debug.Log("전체 완료"))
    .OnKill(() => Debug.Log("제거됨"));
```

| 콜백 | 시점 |
|------|------|
| `OnStart` | 처음 시작 (1회) |
| `OnPlay` | 재생될 때마다 (시작 + 일시정지 해제) |
| `OnComplete` | 모든 루프 포함 최종 완료 |
| `OnStepComplete` | 루프 1회 완료마다 |
| `OnKill` | 트윈 Kill 시 |

## 주요 설정 체이닝

```csharp
transform.DOMoveX(5f, 1f)
    .SetDelay(0.5f)                      // 지연
    .SetEase(Ease.OutBack)               // 가감속
    .SetLoops(3, LoopType.Yoyo)          // 루프 (Restart, Yoyo, Incremental)
    .SetRelative(true)                   // 상대값 (현재값 + 5)
    .SetUpdate(true)                     // TimeScale 무시
    .SetLink(gameObject)                 // GameObject 파괴 시 자동 Kill
    .SetId("myTween");                   // ID (일괄 제어용)
```

## Kill / 메모리 관리

```csharp
// 특정 대상의 모든 트윈 Kill
transform.DOKill();

// Sequence Kill
seq.Kill();

// ID로 일괄 Kill
DOTween.Kill("myTween");

// MonoBehaviour에서 반드시 정리
void OnDestroy()
{
    transform.DOKill();
}
```

**AutoKill** (기본: true): 완료 시 자동 제거.

**SetLink**: GameObject 비활성화/파괴 시 트윈 자동 Kill. OnDestroy에서 수동 Kill 대신 사용 가능.

```csharp
transform.DOMoveX(5f, 1f).SetLink(gameObject);
// → gameObject 파괴 시 트윈도 자동 Kill
```

**Recycling**: Kill된 트윈을 풀에 보관하여 재사용. GC 감소.

```csharp
DOTween.Init(recycleAllByDefault: true);
// 또는 개별: .SetRecyclable(true)
```

**Safe Mode** (기본: true): 대상 파괴 시 자동 처리. 약간의 성능 오버헤드.
