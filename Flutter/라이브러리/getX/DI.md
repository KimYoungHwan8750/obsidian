Flutter에서 GetX를 활용해 DI를 하게 된다.

두 가지 패턴을 소개한다.

Binding

```dart
class SomethingBinding extends Bindings {
	@override
	void dependencies() {
		Get.put(SomeAController());
		Get.lazyPut(() => SomeBController());
	}
}
```

이러한 바인딩은 GetMaterialApp의 pages에서 Page객체의 속성 binding 또는 bindings를 통해 주입 가능하다.

binding, bindings를 통해 주입된 의존성은 해당 페이지가 pop 될 때 함께 메모리에서 제거된다.

만약 `put` 메서드의 `permanent` 속성을 `true`로 주게 되면 화면이 `pop` 된 후에도 메모리에 남아있게 된다. (그래서 Service는 기본값이 true)

```dart
class SomethingScreen extends StatefulWidget {
	SomethingScreen({super.key});
	@override
	State<SomethingScreen> createState() => 
}
```