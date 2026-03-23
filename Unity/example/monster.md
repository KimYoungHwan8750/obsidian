# 몬스터 시스템 — DI + ReactiveProperty + MessagePipe 실무 패턴

## 핵심 구조

```
DI 컨테이너 (싱글턴으로 등록)          개별 인스턴스 (DI 밖)
┌─────────────────────┐           ┌──────────────────┐
│ MonsterSpawner       │──생성──→ │ Monster A (HP 100)│
│ MonsterHpBarSystem   │──생성──→ │ Monster B (HP 80) │
│ GoldManager          │──생성──→ │ Monster C (HP 45) │
│ WaveManager          │           └──────────────────┘
└─────────────────────┘           각자 ReactiveProperty<int> 보유
```

| DI에 등록 (싱글턴) | DI에 등록 안 함 (N개) |
|---|---|
| **시스템**: Spawner, UI System, AudioManager | **엔티티**: Monster, Unit, Bullet |
| 게임에 1개 | Instantiate로 여러 개 생성 |
| 생성자 주입 | `Initialize()` 메서드로 필요한 것 전달 |

## 코드

### 1) 몬스터 데이터 (ScriptableObject)

코드와 데이터를 분리. Inspector에서 밸런싱 조정 가능.

```csharp
[CreateAssetMenu(fileName = "MonsterData", menuName = "TD/MonsterData")]
public class MonsterData : ScriptableObject
{
    public string monsterName;
    public int maxHp;
    public float moveSpeed;
    public int goldReward;
}
```

### 2) 몬스터 개체 (MonoBehaviour — 씬에 N개 존재)

DI에 등록하지 않음. 팩토리(Spawner)가 생성하고, `Initialize()`로 초기화.

```csharp
public class Monster : MonoBehaviour
{
    // 개별 체력 — 몬스터마다 각자의 ReactiveProperty를 가짐
    public ReadOnlyReactiveProperty<int> Hp => _hp;
    public int MaxHp => _data.maxHp;
    readonly ReactiveProperty<int> _hp = new(0);

    MonsterData _data;
    IPublisher<MonsterDeadEvent> _deadPublisher;

    // MonoBehaviour는 생성자 주입 불가 → 메서드로 초기화
    public void Initialize(MonsterData data, IPublisher<MonsterDeadEvent> deadPublisher)
    {
        _data = data;
        _deadPublisher = deadPublisher;
        _hp.Value = data.maxHp;
    }

    public void TakeDamage(int damage)
    {
        _hp.Value = Mathf.Max(0, _hp.Value - damage);

        if (_hp.Value <= 0)
        {
            // 시스템에게 "나 죽었다" 알림 (MessagePipe)
            _deadPublisher.Publish(new MonsterDeadEvent(this, _data.goldReward));
            gameObject.SetActive(false);  // 오브젝트 풀링: Destroy 대신 비활성화
        }
    }
}
```

**포인트:**
- `ReactiveProperty<int>`를 클래스 필드로 보유 → 외부에는 `ReadOnlyReactiveProperty`로 노출
- Monster는 DI를 모름. Spawner가 `Initialize()`로 Publisher를 넘겨줌
- 사망 시 `Destroy()` 대신 `SetActive(false)` → 오브젝트 풀링 (모바일 필수 최적화)

### 3) 이벤트 타입 (MessagePipe용)

```csharp
public readonly struct MonsterDeadEvent
{
    public readonly Monster Monster;
    public readonly int GoldReward;

    public MonsterDeadEvent(Monster monster, int goldReward)
    {
        Monster = monster;
        GoldReward = goldReward;
    }
}
```

**포인트:** `readonly struct`로 정의 → 메모리 할당 제로. 타입 자체가 토픽 역할.

### 4) 몬스터 스포너 (DI 싱글턴)

개별 몬스터를 생성/관리하는 역할. 오브젝트 풀링 포함.

```csharp
public class MonsterSpawner : IStartable, IDisposable
{
    readonly MonsterData[] _monsterDataList;
    readonly IPublisher<MonsterDeadEvent> _deadPublisher;
    readonly Queue<Monster> _pool = new();
    IDisposable _subscription;

    public MonsterSpawner(
        MonsterData[] monsterDataList,
        IPublisher<MonsterDeadEvent> deadPublisher)
    {
        _monsterDataList = monsterDataList;
        _deadPublisher = deadPublisher;
    }

    public void Start()
    {
        SpawnWave(waveIndex: 0);
    }

    public Monster Spawn(MonsterData data, Vector3 position)
    {
        var monster = _pool.Count > 0
            ? _pool.Dequeue()
            : Object.Instantiate(monsterPrefab);

        monster.transform.position = position;
        monster.gameObject.SetActive(true);
        monster.Initialize(data, _deadPublisher);  // ← DI에서 받은 Publisher를 전달
        return monster;
    }

    public void ReturnToPool(Monster monster)
    {
        _pool.Enqueue(monster);
    }

    public void Dispose() => _subscription?.Dispose();
}
```

**포인트:**
- DI 생성자로 `IPublisher<MonsterDeadEvent>`를 주입받음
- 몬스터 생성 시 `Initialize()`로 Publisher를 넘겨줌
- 풀링으로 GC 압력 최소화

### 5) HP UI 시스템 (DI 싱글턴)

```csharp
public class MonsterHpBarSystem : IStartable, IDisposable
{
    readonly ISubscriber<MonsterDeadEvent> _deadSubscriber;
    DisposableBag _disposables;

    public MonsterHpBarSystem(ISubscriber<MonsterDeadEvent> deadSubscriber)
    {
        _deadSubscriber = deadSubscriber;
    }

    public void Start()
    {
        _deadSubscriber.Subscribe(e =>
        {
            Debug.Log($"{e.Monster.name} 사망! +{e.GoldReward} 골드");
        }).AddTo(ref _disposables);
    }

    // 특정 몬스터에 HP바를 붙일 때
    public void AttachHpBar(Monster monster, HpBarUI hpBarUI)
    {
        monster.Hp.Subscribe(hp =>
        {
            hpBarUI.UpdateFill((float)hp / monster.MaxHp);
        }).AddTo(monster.gameObject);  // ← 몬스터 비활성화 시 자동 해제
    }

    public void Dispose() => _disposables.Dispose();
}
```

**포인트:**
- `MonsterDeadEvent`를 구독 → 사망 시 골드 지급 등 처리
- `AttachHpBar()`에서 개별 몬스터의 `Hp`를 구독
- `.AddTo(monster.gameObject)` → 몬스터 비활성화 시 구독 자동 해제

### 6) LifetimeScope — DI 등록

```csharp
public class GameLifetimeScope : LifetimeScope
{
    [SerializeField] MonsterData[] monsterDataList;

    protected override void Configure(IContainerBuilder builder)
    {
        var options = builder.RegisterMessagePipe();

        // 이벤트 타입 등록
        builder.RegisterMessageBroker<MonsterDeadEvent>(options);

        // 시스템(싱글턴) 등록 — 게임에 1개씩만 존재
        builder.Register<MonsterSpawner>(Lifetime.Singleton);
        builder.Register<MonsterHpBarSystem>(Lifetime.Singleton);

        // Monster 클래스 자체는 여기 등록하지 않음!
        // → Spawner가 Instantiate로 개별 생성

        builder.RegisterInstance(monsterDataList);

        builder.RegisterEntryPoint<MonsterSpawner>();
        builder.RegisterEntryPoint<MonsterHpBarSystem>();
    }
}
```

## 데이터 흐름

```
Monster.TakeDamage(30)
  → _hp.Value = 70
    → HpBarUI 구독자: HP바 갱신 (70/100)

Monster.TakeDamage(70)
  → _hp.Value = 0
    → HpBarUI 구독자: HP바 갱신 (0/100)
    → MonsterDeadEvent 발행 (MessagePipe)
      → MonsterHpBarSystem: "슬라임 사망! +10 골드"
      → GoldManager: 골드 += 10
      → MonsterSpawner: 풀에 반환
```

## Dispose 관리 정리

| 상황 | 방법 |
|---|---|
| 순수 C# 시스템 (DI) | `IDisposable` 구현 → VContainer가 LifetimeScope 파괴 시 자동 호출 |
| MonoBehaviour | `.AddTo(this)` 또는 `.AddTo(gameObject)` → 파괴 시 자동 해제 |
| 개별 몬스터 HP바 구독 | `.AddTo(monster.gameObject)` → 몬스터 비활성화 시 자동 해제 |
