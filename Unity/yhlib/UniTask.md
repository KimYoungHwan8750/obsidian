# UniTask

## 개요

UniTask는 Cysharp에서 개발한 Unity 전용 **제로 할당(zero-allocation) async/await 라이브러리**다. 구조체(struct) 기반의 `UniTask<T>`와 커스텀 AsyncMethodBuilder를 사용하여 힙 할당 없이 비동기 처리를 수행한다.

### 왜 표준 Task를 Unity에서 쓰면 안 되는가?

| 문제 | 설명 |
|------|------|
| **힙 할당** | `Task`는 클래스 기반이라 매 호출마다 GC 압력 발생 |
| **스레드 의존** | `Task`는 ThreadPool을 사용하지만, Unity는 싱글 스레드 기반 |
| **WebGL 비호환** | 스레드를 사용하는 `Task`는 WebGL/WASM에서 동작하지 않음 |
| **Unity 통합 부재** | AsyncOperation 등 Unity 고유 비동기 객체와의 통합이 없음 |

UniTask는 이 모든 문제를 해결한다:
- **구조체 기반** = 제로 할당(GC 프리)
- **PlayerLoop 기반** = 스레드 없이 Unity 엔진 루프에서 실행
- **Unity AsyncOperation** 자동 await 가능
- **WebGL, IL2CPP 완벽 호환**

**참고:** GitHub: https://github.com/Cysharp/UniTask

## 설치

```json
// manifest.json
{
  "dependencies": {
    "com.cysharp.unitask": "2.5.10"
  }
}
```

네임스페이스: `using Cysharp.Threading.Tasks;`

## 기본 사용법

### async/await 패턴

| 타입 | 용도 |
|------|------|
| `UniTask<T>` | 값을 반환하는 비동기 메서드 |
| `UniTask` | 값 없이 완료만 알리는 비동기 메서드 |
| `UniTaskVoid` | Fire-and-forget (결과를 기다리지 않는 호출) |

```csharp
using Cysharp.Threading.Tasks;
using UnityEngine;

// 값을 반환하는 비동기 메서드
async UniTask<string> FetchDataAsync()
{
    var txt = (await UnityWebRequest.Get("https://example.com")
        .SendWebRequest()).downloadHandler.text;
    return txt;
}

// 값 없이 완료만 알리는 비동기 메서드
async UniTask DoSomethingAsync()
{
    await UniTask.Delay(TimeSpan.FromSeconds(1));
    Debug.Log("Done");
}

// Fire-and-forget
async UniTaskVoid FireAndForgetAsync()
{
    await UniTask.Yield();
    Debug.Log("Fire and forget");
}

void Start()
{
    FireAndForgetAsync().Forget(); // .Forget()으로 경고 방지
}
```

MonoBehaviour.Start를 async로 사용 가능:
```csharp
async UniTaskVoid Start()
{
    await DoInitAsync();
    Debug.Log("초기화 완료");
}
```

### UniTask vs Task

| 항목 | UniTask | Task |
|------|---------|------|
| **메모리 할당** | 제로 할당 (struct) | 힙 할당 (class) |
| **스레딩** | PlayerLoop 기반 | ThreadPool 사용 |
| **Unity 통합** | 네이티브 | 수동 통합 필요 |
| **다중 await** | 불가 | 가능 |
| **WebGL 호환** | 호환 | 비호환 |

**주의: UniTask는 두 번 await 할 수 없다** (ValueTask와 동일 제약):
```csharp
var task = UniTask.DelayFrame(10);
await task;
await task; // 예외 발생!

// 해결: .Preserve() 사용
var task = UniTask.DelayFrame(10).Preserve();
await task;
await task; // OK
```

### 주요 유틸리티 (Delay, WaitUntil, WhenAll)

#### 시간/프레임 대기

```csharp
await UniTask.Delay(TimeSpan.FromSeconds(3));                    // 3초 대기
await UniTask.Delay(TimeSpan.FromSeconds(3), ignoreTimeScale: true); // TimeScale 무시
await UniTask.DelayFrame(100);                                    // 100프레임 대기
await UniTask.NextFrame();                                        // 다음 프레임 (yield return null)
await UniTask.Yield();                                            // 현재 프레임 내 양보
```

#### 코루틴 대응표

| 코루틴 | UniTask |
|--------|---------|
| `yield return new WaitForSeconds(10)` | `await UniTask.Delay(TimeSpan.FromSeconds(10))` |
| `yield return null` | `await UniTask.NextFrame()` |
| `yield return new WaitForFixedUpdate()` | `await UniTask.WaitForFixedUpdate()` |
| `yield return new WaitUntil(...)` | `await UniTask.WaitUntil(...)` |

#### 조건 대기

```csharp
await UniTask.WaitUntil(() => isReady == true);
await UniTask.WaitUntilValueChanged(this, x => x.isActive);
```

#### 병렬 실행

```csharp
// WhenAll — 모든 작업 완료 대기, 결과 튜플로 반환
var (a, b, c) = await UniTask.WhenAll(
    LoadAsSprite("foo"),
    LoadAsSprite("bar"),
    LoadAsSprite("baz"));

// WhenAny — 가장 먼저 완료되는 것
var result = await UniTask.WhenAny(task1, task2, task3);
```

#### 진행률 보고

```csharp
var progress = Progress.Create<float>(x => Debug.Log(x));
await UnityWebRequest.Get("http://example.com")
    .SendWebRequest()
    .ToUniTask(progress: progress);
```

### 취소 처리 (CancellationToken)

표준 `CancellationToken`/`CancellationTokenSource`를 사용한다.

```csharp
var cts = new CancellationTokenSource();
cancelButton.onClick.AddListener(() => cts.Cancel());

await UniTask.Delay(TimeSpan.FromSeconds(3), cancellationToken: cts.Token);
```

#### GameObject 생명주기에 연동

```csharp
// GameObject 파괴 시 자동 취소
await UniTask.DelayFrame(1000,
    cancellationToken: this.GetCancellationTokenOnDestroy());
```

#### 취소 토큰 전파 패턴 (권장)

```csharp
async UniTask FooAsync(CancellationToken cancellationToken)
{
    await BarAsync(cancellationToken);
}

async UniTask BarAsync(CancellationToken cancellationToken)
{
    await UniTask.Delay(TimeSpan.FromSeconds(3), cancellationToken);
}

// 호출부
await FooAsync(this.GetCancellationTokenOnDestroy());
```

#### 예외 처리

```csharp
try
{
    await FooAsync();
}
catch (OperationCanceledException)
{
    // 취소 처리
}
catch (Exception ex)
{
    // 실제 에러 처리
    Debug.LogException(ex);
}
```

#### 예외 없이 취소 확인

```csharp
var (isCanceled, result) = await UniTask.DelayFrame(10,
    cancellationToken: cts.Token)
    .SuppressCancellationThrow();

if (isCanceled) return;
```

#### 타임아웃

```csharp
var cts = new CancellationTokenSource();
cts.CancelAfterSlim(TimeSpan.FromSeconds(5));

try
{
    await SomeAsync(cts.Token);
}
catch (OperationCanceledException)
{
    Debug.Log("타임아웃!");
}
```

### Unity 생명주기 연동 (PlayerLoopTiming)

```csharp
// 특정 타이밍에서 양보
await UniTask.Yield(PlayerLoopTiming.PreLateUpdate);

// 스레드 전환
await UniTask.SwitchToThreadPool();    // 백그라운드 스레드로
await UniTask.SwitchToMainThread();    // 메인 스레드로 복귀

var result = await UniTask.RunOnThreadPool(() => HeavyComputation());
```

### 코루틴 변환

```csharp
// 코루틴 → UniTask
await FooCoroutineEnumerator();
await myCoroutine.ToUniTask();

// UniTask → 코루틴 (테스트용)
[UnityTest]
public IEnumerator DelayTest() => UniTask.ToCoroutine(async () =>
{
    await UniTask.Delay(TimeSpan.FromSeconds(1));
    Assert.IsTrue(true);
});
```

### DOTween 연동

스크립팅 디파인 `UNITASK_DOTWEEN_SUPPORT` 추가 필요:

```csharp
await transform.DOMoveX(2, 10);
await transform.DOMoveZ(5, 20);

var ct = this.GetCancellationTokenOnDestroy();
await UniTask.WhenAll(
    transform.DOMoveX(10, 3).WithCancellation(ct),
    transform.DOScale(10, 3).WithCancellation(ct));
```

### UniTask Tracker (디버깅)

`Window > UniTask Tracker` 메뉴로 비동기 태스크 추적. 메모리 누수 확인 시 활용.
