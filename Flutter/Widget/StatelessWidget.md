## 일반적인 Widget
상태값 변경이 일어나지 않는 위젯을 정의한다. `StatelessWidget`을 상속받는 클래스를 정의하고 `build` 함수를 오버라이딩하면 된다.

```dart
class Home extends StatelessWidget {
	const Home({super.key});
	@override
	Widget build(BuildContext context) {
		return const MaterialApp(
			home: Scaffold(
				body: Center(
					child: Text("HelloWorld"),
				)
			)
		)
	};
}
```