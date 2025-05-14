```dart
import 'package:get/get.dart';
import 'package:pomodoro/controller/pomodoro_controller.dart';

class PomodoroBinding extends Bindings {
  @override
  void dependencies() {
    Get.put(PomodoroController());
	// Get.put(PomodoroController(), permanent: true); 영구 지속(라우트가 변해도 살아있음)
	// Get.lazyPut<PomodoroController>(() => PomodoroController()); find할 때 생성
  }
}
```
 
페이지에 종속되는 컨트롤러를 자동으로 주입/해제한다.

```dart
    return GetMaterialApp(
      home: const Scaffold(
        body: Pomodoro(),
      ),
      getPages: [
        GetPage(
          name: "/",
          page: () => const Pomodoro(),
          binding: PomodoroBinding(), // 여기에 Binding 연결!
        ),
      ],
    );
```

사용하는 측에서는 `Get.find()`를 사용해 주입받은 컨트롤러를 검색한다.

```dart
final PomodoroController pomodoroController = Get.find();
```

