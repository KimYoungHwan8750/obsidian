# Step 2: 필드 배치 + 유닛 배치 (UI, 입력, Prefab)

## 학습 목표

- Unity UI 시스템 (Canvas, RectTransform, Anchor)
- UI 애니메이션 (FAB — DOTween)
- 터치 입력 → 월드 좌표 변환
- Prefab 인스턴스화
- UI ↔ 게임 로직 이벤트 연결

## 작업 흐름

### 1. 패키지 의존성 설정

```
com.yhlib.ui
  ├── asmdef: DOTween.dll, R3.dll (precompiledReferences)
  │          DOTween.Modules, R3.Unity (asmdef references)
  └── package.json: DOTween은 Asset Store 별도 Import 필요 (UPM 미지원)

com.yhlib.input
  └── 변경 없음 (YHLib.Core만 참조)
```

DOTween은 OpenUPM에 없다. Asset Store에서 Import한 뒤 DOTween Setup > Create ASMDEF 실행 필요.
`overrideReferences: true` + `precompiledReferences`로 precompiled DLL을 asmdef에서 참조.

### 2. FabMenu 컴포넌트 (com.yhlib.ui)

```csharp
// 핵심 구조
public class FabMenu : MonoBehaviour
{
    [SerializeField] Button fabButton;           // 메인 토글 버튼
    [SerializeField] RectTransform fabIcon;      // + 아이콘 (회전 애니메이션)
    [SerializeField] RectTransform[] optionButtons; // 옵션 버튼들

    readonly ReactiveProperty<bool> _isOpen = new(false);
    readonly Subject<int> _onOptionSelected = new();

    // 외부 노출
    public ReadOnlyReactiveProperty<bool> IsOpen => _isOpen;
    public Observable<int> OnOptionSelected => _onOptionSelected;
}
```

**흐름:**
```
FAB 버튼 클릭
  → _isOpen.Value = !_isOpen.Value
  → Subscribe에서 Open/Close 애니메이션 실행
  → 옵션 버튼 클릭 시 _onOptionSelected.OnNext(index)
  → 외부(UnitPlacer)가 OnOptionSelected를 구독
```

**DOTween 애니메이션:**
```csharp
// 펼침: + 아이콘 45도 회전 + 옵션 순차 팝업
fabIcon.DORotate(new Vector3(0, 0, 45), 0.2f);
option.DOScale(1f, 0.2f).SetEase(Ease.OutBack).SetDelay(i * 0.05f);

// 접힘: 역방향
fabIcon.DORotate(Vector3.zero, 0.2f);
option.DOScale(0f, 0.15f).SetEase(Ease.InBack);
```

### 3. TouchInputHelper (com.yhlib.input)

```csharp
// Screen → World 변환 (2D)
public static Vector2 ScreenToWorldPosition(Vector2 screenPos, Camera camera = null)
{
    var cam = camera ?? Camera.main;
    var worldPos = cam.ScreenToWorldPoint(
        new Vector3(screenPos.x, screenPos.y, -cam.transform.position.z)
    );
    return new Vector2(worldPos.x, worldPos.y);
}

// 그리드 스냅
public static Vector2 SnapToGrid(Vector2 worldPos, float cellSize, Vector2 gridOrigin)
```

**z값 주의:** 카메라가 z=-10에 있고 게임 오브젝트가 z=0에 있으면, `ScreenToWorldPoint`에 z=10을 넘겨야 올바른 월드 좌표가 나온다.

### 4. FieldGrid (테스트 게임 코드)

```csharp
// 런타임에 그리드 셀을 코드로 생성
void GenerateGrid()
{
    for (int y = 0; y < rows; y++)
        for (int x = 0; x < columns; x++)
        {
            var cell = new GameObject($"Cell_{x}_{y}");
            var sr = cell.AddComponent<SpriteRenderer>();
            sr.sprite = CreateSquareSprite();  // 4x4 흰색 텍스처를 Sprite로
            sr.color = (x + y) % 2 == 0 ? colorA : colorB;
        }
}
```

이 방식은 **학습/프로토타입용**이다. 아래 "실무 필드 구성" 참고.

### 5. UnitPlacer (테스트 게임 코드)

```csharp
public class UnitPlacer : ITickable, IDisposable  // VContainer 엔트리포인트
{
    public UnitPlacer(FieldGrid fieldGrid, FabMenu fabMenu, UnitPrefabSet prefabSet)
    {
        // DI로 의존성 주입 — new 하지 않는다
        _fabMenu.OnOptionSelected.Subscribe(index => _selectedUnitIndex = index);
    }

    public void Tick()  // 매 프레임 호출 (ITickable)
    {
        if (_selectedUnitIndex < 0) return;
        if (!_mouse.leftButton.wasPressedThisFrame) return;

        Vector2 worldPos = TouchInputHelper.ScreenToWorldPosition(_mouse.position.ReadValue());
        Vector2Int cell = _fieldGrid.WorldToCell(worldPos);
        Object.Instantiate(_unitPrefabs[_selectedUnitIndex], _fieldGrid.CellToWorld(cell), Quaternion.identity);
    }
}
```

**new Input System 주의:** 프로젝트가 new Input System으로 설정된 경우 `Input.GetMouseButtonDown()` (legacy)는 사용 불가. `Mouse.current.leftButton.wasPressedThisFrame` 사용.

### 6. DI 연결 (TDGameLifetimeScope)

```csharp
public class TDGameLifetimeScope : GameLifetimeScope
{
    [SerializeField] FieldGrid fieldGrid;
    [SerializeField] FabMenu fabMenu;
    [SerializeField] GameObject[] unitPrefabs;

    protected override void ConfigureGame(IContainerBuilder builder, MessagePipeOptions options)
    {
        builder.RegisterComponent(fieldGrid);   // 씬의 MonoBehaviour를 DI에 등록
        builder.RegisterComponent(fabMenu);
        builder.RegisterInstance(new UnitPrefabSet(unitPrefabs));
        builder.RegisterEntryPoint<UnitPlacer>(); // ITickable → 매 프레임 Tick()
    }
}
```

`RegisterComponent` — 이미 씬에 존재하는 MonoBehaviour를 DI 컨테이너에 등록. Inspector에서 SerializeField로 참조를 연결.

### 7. Prefab 생성

Sprite를 **PNG 에셋으로 저장** → TextureImporter로 Sprite 타입 설정 → Prefab의 SpriteRenderer에 연결.
코드로 만든 Texture2D는 메모리에만 존재하므로, Prefab에 저장하면 참조가 끊어진다. **반드시 에셋으로 저장**해야 한다.

## 전체 데이터 흐름

```
[FAB 버튼 클릭]
  → FabMenu: _isOpen = true → DOTween 애니메이션
  → [옵션 클릭] → OnOptionSelected.OnNext(0)

[UnitPlacer 구독]
  → _selectedUnitIndex = 0 (세모)

[필드 터치]
  → Mouse.current.leftButton.wasPressedThisFrame
  → ScreenToWorldPosition(스크린좌표) → 월드좌표
  → FieldGrid.WorldToCell(월드좌표) → 셀좌표
  → FieldGrid.CellToWorld(셀좌표) → 셀 중앙 월드좌표
  → Instantiate(prefab, 셀중앙, Quaternion.identity)
```

---

## 실무 필드 구성 — Tilemap vs 코드 생성 vs 단일 이미지

이번에 사용한 `CreateSquareSprite()` + 코드 생성 방식은 학습/프로토타입용이다.
실무에서 2D 그리드 필드를 구성하는 방법은 크게 3가지다.

### 1. Unity Tilemap (표준 — 타워 디펜스에 가장 적합)

```
Tilemap = 레고 조합 방식

타일 팔레트:
┌──┬──┬──┐
│풀│돌│물│  ← 작은 타일 스프라이트
└──┴──┴──┘

Tilemap Grid:
┌──┬──┬──┬──┬──┐
│풀│풀│돌│풀│풀│  ← 타일을 그리드에 배치
│풀│물│물│물│풀│
│풀│풀│돌│풀│풀│
└──┴──┴──┴──┴──┘
```

- Unity 내장 기능 (`com.unity.2d.tilemap`)
- **Tile Palette 에디터**에서 마우스로 드래그하며 맵을 그린다 (포토샵처럼)
- 타일 하나 = 작은 스프라이트(16x16, 32x32 등)
- **Rule Tile**: "이 타일 주변에 물이 있으면 자동으로 해안선 타일로 변경" 같은 규칙 설정 가능
- 런타임에 `tilemap.SetTile(position, tile)`로 코드 제어 가능
- **충돌 처리**: TilemapCollider2D로 특정 타일에 자동 충돌 영역 생성
- 타워 디펜스 몬스터 경로, 배치 불가 구역 등을 타일 종류로 구분

```csharp
// 런타임에 특정 셀의 타일 확인
TileBase tile = tilemap.GetTile(new Vector3Int(x, y, 0));
if (tile.name == "Road") { /* 몬스터 경로 */ }
if (tile.name == "Grass") { /* 유닛 배치 가능 */ }
```

### 2. 단일 스프라이트 (심플한 게임)

```
배경 하나를 통으로 깔기

┌─────────────────┐
│                  │  ← 디자이너가 그린 하나의 큰 이미지
│   (게임 필드)    │
│                  │
└─────────────────┘
```

- 배경이 고정이고 상호작용 없으면 이 방식도 충분
- 그리드 판정은 코드로 계산 (좌표 → 셀 변환)
- 맵 변형이 없는 퍼즐 게임 등에 적합
- 단점: 다양한 지형, 동적 맵 변경이 어려움

### 3. 모듈러 조합 (대형 게임)

```
환경 조각들을 조합:

[절벽 위] + [다리] + [절벽 아래]
[숲 가장자리] + [숲 중앙] + [숲 가장자리]
```

- 3D 게임이나 대형 2D 게임에서 사용
- 스프라이트 조각을 Prefab으로 만들어 배치
- 레벨 에디터 도구를 자체 제작하기도 함
- 타워 디펜스 규모에서는 오버엔지니어링

### 결론

| 방식 | 적합한 경우 |
|------|------------|
| **Tilemap** | 2D 그리드 게임 전반 (타워 디펜스, 전략, RPG) |
| 단일 이미지 | 고정 배경, 상호작용 없는 필드 |
| 모듈러 조합 | 3D 또는 대규모 레벨 디자인 |
| 코드 생성 | 프로토타입, 절차적 생성(로그라이크) |

타워 디펜스는 **Tilemap이 정석**이다. 지금은 학습용으로 코드 생성을 썼지만, 실제 게임에서는 Tilemap으로 전환하면 된다.
