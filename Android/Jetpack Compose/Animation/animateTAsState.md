# animateTAsState

animation을 적용하기 위해 값의 시작점과 도착지점을 정할 수 있다.

```kotlin
val animatedHeight by animateDpAsState {targetValue = if(조건) 80.dp else 40.dp}
Box {
	// 조건이 참이면 80.dp, 거짓이면 40.dp를 가진다.
	modifier = Modifier.fillMaxWidth().height(animatedHeight)
}
```