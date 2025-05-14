- **child**: 컨테이너에 포함된 자식 위젯입니다. (`Container`는 기본적으로 단 하나의 child를 가질 수 있습니다.)
    
- **width, height**: 컨테이너의 폭과 높이를 지정합니다. 지정하지 않으면 자식 크기에 따라 자동으로 결정됩니다.
    
- **color**: 컨테이너의 배경 색상을 지정합니다. (`decoration`과 동시 지정은 불가하며, 단순 배경색이면 이 속성을 사용)
    
- **padding**: 컨테이너 경계 안쪽의 여백으로, 자식과 경계 사이에 공간을 넣습니다 (`EdgeInsets`로 값 지정).
    
- **margin**: 컨테이너 경계 바깥의 여백으로, 주변 위젯과의 간격을 만듭니다 (`EdgeInsets`로 값 지정).
    
- **alignment**: 컨테이너가 자식보다 클 경우, 자식 위젯을 컨테이너 내부에서 정렬하는 방법을 지정합니다 (예: `Alignment.center`, `Alignment.bottomRight` 등).
    
- **decoration**: 컨테이너의 배경 데코레이션을 그리는 속성으로, `BoxDecoration` 등을 통해 배경 이미지, 테두리(Border)나 모서리 둥글게 처리 등의 꾸미기를 할 수 있습니다. (이 경우 `color` 대신 `decoration.color`로 색상 지정)

```dart
Container(
  width: 100,
  height: 100,
  color: Colors.blue,                       // 배경 색상 파랑
  padding: EdgeInsets.all(8),               // 모든 방향 8px 패딩
  child: Text(
    'Hello', 
    style: TextStyle(color: Colors.white)   // 자식 텍스트 (흰색 글자)
  ),
)

```