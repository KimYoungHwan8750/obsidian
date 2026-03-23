# VContainer

## 개요

VContainer는 Unity를 위한 초고속 DI(Dependency Injection, 의존성 주입) 프레임워크이다. hadashiA가 개발했으며, Zenject 대비 5~10배 빠른 성능과 resolve 시 제로 GC 할당을 특징으로 한다.

**핵심 철학:** MonoBehaviour는 뷰(View) 역할에만 집중하고, 도메인 로직과 제어 흐름은 순수 C# 클래스로 분리한다. DI 컨테이너가 의존성을 자동으로 연결(Auto-wiring)해 주므로, 클래스 간 결합도를 낮추고 테스트 가능한 구조를 만들 수 있다.

**주요 특징:**
- 생성자/메서드/프로퍼티 주입 지원
- Unity PlayerLoop에 통합된 EntryPoint 시스템
- 유연한 부모-자식 스코프 구조
- Roslyn Source Generator로 추가 성능 최적화
- UniTask, MessagePipe 등 Cysharp 라이브러리와 통합
- IL2CPP(AOT) 빌드 호환

**참고:** 공식 문서: https://vcontainer.hadashikick.jp/ | GitHub: https://github.com/hadashiA/VContainer

## 설치

### OpenUPM (권장)

`Packages/manifest.json`에 추가:

```json
{
  "scopedRegistries": [
    {
      "name": "package.openupm.com",
      "url": "https://package.openupm.com",
      "scopes": ["jp.hadashikick.vcontainer"]
    }
  ],
  "dependencies": {
    "jp.hadashikick.vcontainer": "1.17.0"
  }
}
```

### Git URL

```json
"jp.hadashikick.vcontainer": "https://github.com/hadashiA/VContainer.git?path=VContainer/Assets/VContainer#1.17.0"
```

## 기본 사용법

### LifetimeScope

`LifetimeScope`는 VContainer의 **Composition Root**(구성 루트)이다. 의존성 등록과 컨테이너 빌드가 이루어지는 진입점.

```csharp
using VContainer;
using VContainer.Unity;

public class GameLifetimeScope : LifetimeScope
{
    protected override void Configure(IContainerBuilder builder)
    {
        builder.Register<HelloWorldService>(Lifetime.Singleton);
    }
}
```

**사용 방법:**
1. 빈 GameObject를 생성한다.
2. `GameLifetimeScope` 컴포넌트를 부착한다.
3. 씬이 로드되면 VContainer가 자동으로 컨테이너를 빌드하고 의존성을 주입한다.

### 서비스 등록

#### Lifetime 종류

| Lifetime | 설명 |
|----------|------|
| `Singleton` | 컨테이너당 단일 인스턴스. 모든 곳에서 같은 객체를 공유 |
| `Transient` | 해석할 때마다 새 인스턴스를 생성 |
| `Scoped` | LifetimeScope당 단일 인스턴스. 자식 스코프에서는 별도 인스턴스 생성 |

#### 등록 방법

```csharp
// 구체 타입 등록
builder.Register<ServiceA>(Lifetime.Singleton);

// 인터페이스 -> 구현체 매핑
builder.Register<IServiceA, ServiceA>(Lifetime.Singleton);

// 여러 인터페이스로 등록
builder.Register<ServiceA>(Lifetime.Singleton)
    .AsImplementedInterfaces();

// 인터페이스 + 구체 타입 모두
builder.Register<ServiceA>(Lifetime.Singleton)
    .AsImplementedInterfaces()
    .AsSelf();

// 인스턴스 직접 등록 (컨테이너가 수명 관리 안 함)
builder.RegisterInstance(config);

// 파라미터 전달
builder.Register<SomeService>(Lifetime.Singleton)
    .WithParameter<string>("http://example.com");
```

#### MonoBehaviour 등록

MonoBehaviour는 생성자를 쓸 수 없으므로 별도 방법 사용:

```csharp
// Inspector에서 참조한 컴포넌트 등록
[SerializeField] YourBehaviour yourBehaviour;
builder.RegisterComponent(yourBehaviour);

// 씬 Hierarchy에서 자동 탐색 (항상 Scoped)
builder.RegisterComponentInHierarchy<YourBehaviour>();

// 프리팹에서 인스턴스화
[SerializeField] YourBehaviour prefab;
builder.RegisterComponentInNewPrefab(prefab, Lifetime.Scoped);
```

### 생성자 주입

생성자 주입은 VContainer의 **권장 주입 방식**이다.

```csharp
public class GamePresenter
{
    readonly ICharacterService characterService;
    readonly IRouteSearch routeSearch;

    public GamePresenter(
        ICharacterService characterService,
        IRouteSearch routeSearch)
    {
        this.characterService = characterService;
        this.routeSearch = routeSearch;
    }
}
```

**규칙:**
- 생성자가 하나뿐이면 `[Inject]` 어트리뷰트 불필요
- 생성자가 여러 개면 하나에 `[Inject]` 필수
- 선택적(optional) 의존성 미지원 — 누락 시 예외 발생
- 의존성은 `readonly` 필드에 저장 권장

#### 메서드 주입 (MonoBehaviour용)

```csharp
public class SomeBehaviour : MonoBehaviour
{
    float speed;

    [Inject]
    public void Construct(GameSettings settings)
    {
        speed = settings.speed;
    }
}
```

### EntryPoint (IStartable, ITickable)

순수 C# 클래스를 Unity 생명주기에 연결. MonoBehaviour 없이도 Start, Update 등의 타이밍에 코드 실행 가능.

```csharp
public class GamePresenter : IStartable, ITickable, IDisposable
{
    readonly HelloWorldService helloWorldService;

    public GamePresenter(HelloWorldService helloWorldService)
    {
        this.helloWorldService = helloWorldService;
    }

    void IStartable.Start()
    {
        // MonoBehaviour.Start()와 거의 같은 타이밍
        helloWorldService.Hello();
    }

    void ITickable.Tick()
    {
        // MonoBehaviour.Update()와 거의 같은 타이밍
    }

    void IDisposable.Dispose()
    {
        // 컨테이너 파괴 시 호출
    }
}
```

**등록:**

```csharp
builder.RegisterEntryPoint<GamePresenter>();
```

#### 생명주기 인터페이스

| 인터페이스 | 타이밍 |
|------------|--------|
| `IInitializable` | 컨테이너 빌드 직후 |
| `IStartable` | MonoBehaviour.Start()와 유사 |
| `IAsyncStartable` | IStartable의 비동기 버전 |
| `IFixedTickable` | FixedUpdate()와 유사 |
| `ITickable` | Update()와 유사 |
| `ILateTickable` | LateUpdate()와 유사 |
| `IDisposable` | 컨테이너 Dispose 시 |

### 부모-자식 스코프

LifetimeScope는 계층 구조를 지원한다. 자식 스코프에서 못 찾은 의존성은 **부모 스코프로 올라가며 탐색**한다.

#### 코드로 자식 스코프 생성

```csharp
// 기본 자식 스코프
var childScope = parentScope.CreateChild();

// 추가 등록과 함께
var childScope = parentScope.CreateChild(builder =>
{
    builder.Register<AdditionalService>(Lifetime.Scoped);
    builder.RegisterEntryPoint<LevelController>();
});
```

> 코드로 생성한 자식 스코프는 반드시 `Dispose()`로 정리해야 한다.

#### 씬 로드 시 부모 지정

```csharp
using (LifetimeScope.EnqueueParent(currentScope))
{
    await SceneManager.LoadSceneAsync("GameScene", LoadSceneMode.Additive);
}
```

LifetimeScope가 파괴되면 해당 스코프에 등록된 `IDisposable` 구현체의 `Dispose()`가 자동 호출된다.
