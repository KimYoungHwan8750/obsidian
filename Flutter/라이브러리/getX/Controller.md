```dart
class SomethingController extends GetxController {

@override
void onInit() {
	super.onInit();
	// ...code
}

@override
void onReady() {
	super.onReady();
	// ...code
}

@override
void onClose() {
	// ...code
	super.onClose();
}

}
```

* onInit: 동기 동작(비동기 X), Get.put 또는 Get.lazyPut으로 인스턴스가 등록될 때 실행
* onReady: 위젯이 화면에 렌더링된 직후 1회 실행(비동기 동작 가능)
* onClose: 컨트롤러가 메모리에서 제거될 때 호출
