```dart
class SomethingService extends GetxService {

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

생명주기 함수

* onClose(): 서비스가 삭제될 때
* onInit(): 초기화 될 때 (동기, 비동기 불가)
* onReady(): 초기화 된 후 (비동기 가능)

onReady의 경우 controller에서 사용하게 되면 UI의 렌더링이 완료된 후 실행하는 것이 보장되어 있다. (React의 useEffect와 유사)

위 코드를 보면 의아한 점이, super.onClose()는 다른 생명주기 함수와 다르게 코드의 마지막에 호출된다. 이것은 코드가 실행되는 흐름을 생각해보면 당연한 이치인데, Init과 Ready는 준비하는 과정이다. 부모의 기능이 자식으로 확장되기 때문에 부모의 기능이 실행된 후 자식의 기능이 실행되어야한다.

참고로 GetX에서 위 생명주기 함수들의 실제 구현은 비어있다. 근데도 호출해주는 이유는 미래를 위한 일종의 안전 장치이다. getX가 업데이트되면서 필요에 의해 생명주기 함수에 기본 동작이 추가될수가 있기 때문에 명시적으로 호출해주는 것이 좋다.