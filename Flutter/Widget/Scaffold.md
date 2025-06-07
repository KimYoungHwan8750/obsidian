레이아웃을 쉽게 구성하기 위해 제공해주는 기본 위젯이다.

- **appBar**: 상단에 표시되는 앱바 위젯. 주로 `AppBar`를 사용하여 제목이나 메뉴를 표시합니다.
- **body**: 화면의 주요 콘텐츠가 표시되는 영역으로, 일반적으로 여러 하위 위젯을 포함합니다.
- **floatingActionButton**: 본문 위에 떠있는 액션 버튼 위젯으로, 주로 화면의 주요 액션을 나타내는 동그란 버튼을 추가할 때 사용합니다.
- **bottomNavigationBar**: 화면 하단에 고정되어 표시되는 내비게이션 바 위젯으로, 하단 메뉴 등을 구현할 때 사용합니다.
- **drawer**: 좌측 (또는 우측) 측면에서 슬라이드되어 나타나는 내비게이션 메뉴 패널 위젯입니다.
- **backgroundColor**: Scaffold 전체 배경 색상을 지정합니다 (기본값은 테마의 배경색).

![](https://i.imgur.com/q89oQfy.png)

## AppBar

```dart
      appBar: AppBar(
        title: Center(
          child: const Text(
            "Choice One",
            style: TextStyle(
              color: Colors.white,
            ),
          ),
        ),
        iconTheme: IconThemeData(
          color: Colors.white, // 뒤로가기 버튼 색상
      ),
        backgroundColor: Color(0xFF191919),
      ),
```

iconTheme를 바꾸면 뒤로가기 버튼의 색상이 바뀐다.