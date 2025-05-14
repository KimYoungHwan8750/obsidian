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

| 특징               | 동작                                                      | Navigator API와 1:1 대응             | 스택 영향     |
| ------------------ | --------------------------------------------------------- | ------------------------------------ | ------------- |
| **`Get.to(page)`** | 새 `MaterialPageRoute`를 만들어 **현재 라우트 위**에 올림 | `Navigator.push(context, …)`         | **push**      |
| `Get.off(page)`    | 새 라우트를 올리고 **직전 1 개** 제거                     | `pushReplacement`                    | push ＋ pop 1 |
| `Get.offAll(page)` | 새 라우트만 남기고 **전체 스택 삭제**                     | `pushAndRemoveUntil((route)=>false)` | clear ＋ push |
| `Get.back()`       | 맨 위 라우트 1 개 **pop**                                 | `Navigator.pop(context)`             | pop           |

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