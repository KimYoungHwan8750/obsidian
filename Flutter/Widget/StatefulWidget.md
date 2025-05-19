## State가 변하는 위젯은 StatefulWidget으로
리액트 유저라면 당연한 개념 useState와 비슷하다. 위젯에 변경사항이 있을 때마다 이를 리렌더링해야하는데 상태값을 관리하기 위해 StatefulWidget을 상속받아 위젯을 만들어야한다.

```dart
class Home extends StatefulWidget {
	const Home({super.key});
	@override
	State<Home> createState() => HomeState();
}

class HomeState extends State<Home> {
	String text = "여기는 Home입니다.";
	void changeText() {
		setState(() {
			text = "버튼을 누른 뒤의 Home입니다.";
		});
	}
	@override
	Widget build(BuildContext context) {
		return MaterialApp(
			home: Scaffold(
				body: Column(
					children: [
						Text(text),
						ElevatedButton(
							onPressed: changeText,
							child: const Text("Button"),
						),
					]
				)
			),
		);
	}
}
```

Stateless 위젯과는 다르게 Stateful 위젯은 Home과 HomeState라는 두 위젯으로 완성된다. 이는 변경사항이 있을 때마다 렌더링이 일어나는 위젯 특성과 연관있다. 예를 들면 화면에 렌더링할 최종 상태값이 상당한 연산을 필요로한다면, 리렌더링이 발생할 때마다 상태값을 연산하는 로직도 재실행된다. 이게 이해가 잘 안 갈수도 있는데 리액트 사용자는 useCallback, useMemo하면 바로 아하! 할법한 내용이다. 이러한 상태관리 기법은 다른 플랫폼, 프레임워크에서도 많이 사용된다. 모르면 그저 배우는 수밖에 없다. 경험상 안드로이드는 이것보다 난해했다. mutableStateOf, MutableStateFlow.