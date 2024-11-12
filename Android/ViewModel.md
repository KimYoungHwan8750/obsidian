# ViewModel

Android Architecture Components라고도 한다.

MVVM 아키텍처를 구현할 때 사용한다.
(Model - View - ViewModel)

* Model: 데이터 저장이나 비즈니스 로직을 담당한다. 보통 데이터베이스와 상호작용한다.
* View: UI를 담당하는 역할이다. 화면을 표시하고 사용자 입력을 처리한다.
* ViewModel: View와 Model 사이를 중재한다. Model에서 데이터를 가져와 View에 제공한다.

```kotlin
data class CountState(){
	val count: Int = 0
}
// ViewModel을 상속받아야함
class CountViewModel: ViewModel(){
	private val _count = MutableStateFlow(CountState())
	val count: StateFlow<CountState> = _count.asStateFlow()

	fun incrementCount(){
		_count.update { state -> state.copy(count = state.count + 1) }
	}

	fun decrementCount(){
		_count.update { state -> state.copy(count = state.count - 1) }
	}
}
```

\_count는 뷰모델 내부에서만 수정 가능하고, count를 통해 외부에 노출시킨다.
함수명에서 알 수 있듯이 MutableStateFlow는 수정 가능한 상태 흐름이고, cout는 StateFlow(아마도 immutable이 생략된듯하다)이다.

\_count로부터 asStateFlow 함수로 count에 할당해주어서 readonly 개념으로 쓰이는 것 같다.
개념이 React 진영의 redux의 스토어와 리듀서랑 비슷한 것 같다.


```kotlin
@Composable
fun Main(viewModel: CountViewModel = viewModel()){
	const countState by viewModel.count.collectAsStateWithLifeCycle()
	Column {
		Text(text = "${countState.count}")
		Button(onClick = {
			viewModel.incrementCount()
		}) {
			Text(text = "증가")
		}
		Button(onClick = {
			viewModel.decrementCount()
		}) {
			Text(text = "감소")
		}
	}
}
```

## state를 가져오는 함수

`collectAsStateWithLifecycle`와 `collectAsState`가 있다.

collectAsState는 백그라운드에서도 동작해야하는 경우(뮤직 플레이어) 사용되나 대부분의 경우 `collectAsStateWithLifecycle`가 사용된다.