# MessagePipe

## 개요

MessagePipe는 Cysharp에서 개발한 **.NET 및 Unity용 고성능 인메모리 메시징 파이프라인** 라이브러리다.

**핵심 특징:**
- **DI 우선 설계** — VContainer 등과 자연스럽게 통합
- **Pub/Sub** 패턴 지원
- **동기/비동기** 모두 지원 (Unity에서는 UniTask 기반)
- **키 기반(Keyed) / 키 없는(Keyless)** 메시징
- **버퍼드(Buffered)** 옵션 — 새 구독자에게 최신 값 즉시 전달
- Publish 시 **메모리 할당 제로**

**참고:** GitHub: https://github.com/Cysharp/MessagePipe

## 설치

Unity에서 **2개의 패키지**가 필요하다:

```json
// manifest.json의 scopedRegistries에 com.cysharp 스코프 추가 후
{
  "dependencies": {
    "com.cysharp.messagepipe": "1.8.1",
    "com.cysharp.messagepipe.vcontainer": "1.8.1"
  }
}
```

**전제 조건:** UniTask, VContainer 설치 필요.

## 기본 사용법

### VContainer 연동

LifetimeScope에서 `RegisterMessagePipe()`로 초기화하고, `RegisterMessageBroker<T>()`로 사용할 메시지 타입을 등록한다.

```csharp
using MessagePipe;
using VContainer;
using VContainer.Unity;

public class GameLifetimeScope : LifetimeScope
{
    protected override void Configure(IContainerBuilder builder)
    {
        // MessagePipe 핵심 서비스 등록
        var options = builder.RegisterMessagePipe();

        // 사용할 메시지 타입 등록
        builder.RegisterMessageBroker<int>(options);
        builder.RegisterMessageBroker<DamageEvent>(options);

        // 키 기반 브로커 등록
        builder.RegisterMessageBroker<string, ChatMessage>(options);
    }
}
```

> **IL2CPP 주의:** Unity + IL2CPP 환경에서는 Open Generics가 지원되지 않으므로, 사용할 모든 메시지 타입을 **수동으로 `RegisterMessageBroker<T>()`** 호출하여 등록해야 한다.

### 메시지 발행/구독 (Publish/Subscribe)

생성자 주입으로 `IPublisher<T>`와 `ISubscriber<T>`를 받아 사용한다.

```csharp
// 발행자
public class ScoreManager
{
    readonly IPublisher<int> scorePublisher;

    public ScoreManager(IPublisher<int> scorePublisher)
    {
        this.scorePublisher = scorePublisher;
    }

    public void AddScore(int amount)
    {
        scorePublisher.Publish(amount);  // 모든 구독자에게 브로드캐스트
    }
}

// 구독자
public class ScoreUI : IStartable, System.IDisposable
{
    readonly ISubscriber<int> scoreSubscriber;
    IDisposable disposable;

    public ScoreUI(ISubscriber<int> scoreSubscriber)
    {
        this.scoreSubscriber = scoreSubscriber;
    }

    public void Start()
    {
        var bag = DisposableBag.CreateBuilder();

        scoreSubscriber.Subscribe(score =>
        {
            Debug.Log("점수 획득: " + score);
        }).AddTo(bag);

        disposable = bag.Build();
    }

    public void Dispose()
    {
        disposable?.Dispose();
    }
}
```

**동작 방식:** 같은 타입 `T`에 대해 Publish하면, 해당 `ISubscriber<T>`를 구독한 **모든** 곳에 브로드캐스트된다. 타입 자체가 토픽 역할.

### 비동기 발행/구독

```csharp
// IAsyncPublisher<T> / IAsyncSubscriber<T>
await asyncPublisher.PublishAsync(message);  // 모든 구독자 완료까지 await
asyncPublisher.Publish(message);             // fire-and-forget
```

- `AsyncPublishStrategy.Parallel` (기본): 모든 구독자를 `WhenAll`로 동시 실행
- `AsyncPublishStrategy.Sequential`: 순차적으로 하나씩 await

### 버퍼드 메시징

마지막 발행 값을 저장하여, 새 구독자가 즉시 최신 값을 받는다.

```csharp
var publisher = resolver.Resolve<IBufferedPublisher<int>>();
var subscriber = resolver.Resolve<IBufferedSubscriber<int>>();

publisher.Publish(999);
subscriber.Subscribe(x => Debug.Log(x));  // 즉시 999 수신
```

### 메시지 타입 설계

메시지 타입은 **`readonly struct`로 정의**하는 것이 권장 (메모리 할당 최소화):

```csharp
// 단순 이벤트 (데이터 없음)
public readonly struct GameStartEvent { }

// 데이터를 포함하는 이벤트
public readonly struct DamageEvent
{
    public readonly int Damage;
    public readonly string Source;

    public DamageEvent(int damage, string source)
    {
        Damage = damage;
        Source = source;
    }
}
```

등록:
```csharp
builder.RegisterMessageBroker<GameStartEvent>(options);
builder.RegisterMessageBroker<DamageEvent>(options);
```

### 키 기반 필터링

`IPublisher<TKey, TMessage>` / `ISubscriber<TKey, TMessage>`로 특정 키에 해당하는 메시지만 수신:

```csharp
// 등록
builder.RegisterMessageBroker<string, ChatMessage>(options);

// 발행: 특정 채널에 메시지 발행
chatPublisher.Publish("general", new ChatMessage("유저A", "안녕!"));

// 구독: 특정 채널만 구독
chatSubscriber.Subscribe("general", msg =>
{
    Debug.Log($"[general] {msg.Sender}: {msg.Text}");
});
```

### 구독 해제 (Dispose)

**모든 구독은 반드시 Dispose로 해제해야 한다.** 안 하면 메모리 누수.

**방법 1: DisposableBag.Create (구독 수가 정해져 있을 때)**

```csharp
var d1 = subscriber.Subscribe(_ => { });
var d2 = subscriber.Subscribe(_ => { });
disposable = DisposableBag.Create(d1, d2);
```

**방법 2: DisposableBag.CreateBuilder (동적 추가)**

```csharp
var bag = DisposableBag.CreateBuilder();
subscriber.Subscribe(_ => { }).AddTo(bag);
subscriber.Subscribe(_ => { }).AddTo(bag);
disposable = bag.Build();
```

**누수 디버깅:**

```csharp
var options = builder.RegisterMessagePipe(options =>
{
#if UNITY_EDITOR
    options.EnableCaptureStackTrace = true;
#endif
});
// Unity 메뉴 Window > MessagePipe Diagnostics 창에서 활성 구독 확인
```
