```dart
          return GridView.count(
            // Create a grid with 2 columns in portrait mode, or 3 columns in
            // landscape mode.
            crossAxisCount: orientation == Orientation.portrait ? 2 : 3,
            // Generate 100 widgets that display their index in the List.
            children: List.generate(100, (index) {
              return Center(
                child: Text(
                  'Item $index',
                  style: Theme.of(context).textTheme.displayLarge,
                ),
              );
            }),
          );
```

### 스크롤 제어

```dart
child: GridView.count(
  controller: ctr,
  crossAxisCount: 3,
  children: List.generate(400, (index){
	return Text('$index');
  }),
),
```

그리드 뷰 `controller` 파라미터에 컨트롤러를 빌드해서 전달한다.

```dart
class ScrollControlState extends StatefulWidget{
  const ScrollControlState({super.key});

  @override
  FirstPage createState() => FirstPage();
}

class FirstPage extends State<ScrollControlState>{
  final ScrollController ctr = ScrollController();

    void _scrollToTop() {
    ctr.animateTo(
      0.0,
      duration: Duration(seconds: 2),
      curve: Curves.easeInOut,
    );
  }

  void _scrollToBottom() {
    ctr.animateTo(
      ctr.position.maxScrollExtent,
      duration: Duration(seconds: 2),
      curve: Curves.easeInOut,
    );
  }
```