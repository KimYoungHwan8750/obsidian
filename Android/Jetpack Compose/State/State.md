# State

React의 useState와 비슷한 느낌.
State를 변경하면 리컴포지션(리렌더링)이 발생한다.

```kotlin

@Composable
fun SearchBarText(){
	var text by remember { mutableStateOf("") }
	TextField(
		value = text,
		onValueChange = {t -> text = t} // 밸류를 업데이트 해주지 않으면 타이핑해도 아무런 일도 발생하지 않는다.
	)
}
```

* `by remember {mutableStateOf("")}` :  임시(화면 회전시 값 초기화)
* `by remeberSaveable {mutableStateOf("")}` : 화면 회전시에도 값 유지

대부분의 상황에 remeberSaveable을 사용하는 것이 적합하다.