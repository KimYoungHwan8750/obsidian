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

헬퍼 패턴을 사용하면 `AuthController.to.value`와 같은 형식으로 사용할 수 있다.
```dart
class AuthController extends GetXController {
	static AuthController get to => Get.find();
	RxInt value = 0;
}
```


## 생명주기 함수

|  함수 | 동작  |
|---|---|
|`onInit()`|컨트롤러가 처음 메모리에 생성될 때|초기화, 스트림 바인딩, 초기 데이터 로딩 등|
|`onReady()`|`onInit()` 이후, **위젯이 렌더링된 후 한 번** 호출됨|UI와 상호작용할 작업 (예: 팝업, 네비게이션 등)|
|`onClose()`|컨트롤러가 `dispose`될 때 (메모리에서 제거될 때)|리소스 정리, 스트림 해제, 타이머 취소 등|
|`onDelete()`|`Get.delete()`나 자동 소멸 시 실행됨|`onClose()`와 거의 동일하게 동작 (구버전 호환용)|