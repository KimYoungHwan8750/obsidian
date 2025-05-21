상태 관리를 위한 Controller라는 개념을 사용한다.

## 📒단순 상태 관리

```dart
class SimpleController extends GetxController {
  int counter = 0;

  void increase() {
    counter++;
    update();
  }
}
```

```dart
class MyHomePage extends StatelessWidget {
  MyHomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Get.put(SimpleController()); // controller 등록
    return Scaffold(
      appBar: AppBar(
        title: const Text("단순 상태관리"),
      ),
      body: Center(
        child: GetBuilder<SimpleController>( // 실시간 렌더링
          builder: (controller) {
            return ElevatedButton(
              child: Text(
                '현재 숫자: ${controller.counter}',
              ),
              onPressed: () {
                controller.increase();
                // Get.find<SimpleController>().increase();
              },
            );
          },
        ),
      ),
    );
  }
}
```

 |

## 👏반응형 상태 관리

```dart
class SimpleController extends GetxController {
  RxInt counter = 0.obs;

  void increase() {
    counter++;
  }
}
```

```dart
Get.put(ReactiveController());
```