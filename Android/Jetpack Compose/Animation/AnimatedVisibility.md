# AnimatedVisibility

```kotlin
var isOpened by rememberSaveable { mutableStateOf(false) }
val animatedAlpha by animateFloatAsState { targetValue = if(isOpened) 1f else 0f }
AnimatedVisibility(visible = isOpened) {
Box(modifier = Modifier
	.fillMaxWidth()
	.graphicsLayer {
		alpha = animateAlpha
	}
	.height(heightAnimation)
	.background(color = Color.Red))
}
```

`AnimatedVisibility` 함수안에 렌더링할 요소를 작성한다.
visible에 전달받은 Boolean 값에 따라 요소 마운트/언마운트가 결정되며, graphicsLayer 속성에서 alpha가 0f가 되는 순간 언마운트된다. 따라서 요소가 마운트/언마운트 될 때 자연스럽게 제거되는 효과를 볼 수 있다.

사라질 때의 시간과 나타날 때의 시간은 `AnimatedVisibility` 함수에서 `enter`, `exit` 속성을 통해 조절 가능하다.

```kotlin
    var isOpened by remember { mutableStateOf(false) }
        AnimatedVisibility(visible = isOpened, enter = fadeIn(animationSpec = tween(500)), exit = fadeOut(animationSpec = tween(500))) {
        Box(modifier = Modifier
            .fillMaxWidth()
            .height(40.dp)
            .background(color = Color.Red))
        }

        Box(modifier = Modifier
            .fillMaxWidth()
            .height(40.dp)
            .background(color = Color.Yellow))
        Button(onClick = {isOpened = !isOpened}) {
        }
    }
```

`enter` 속성에 `fadeIn(animationSpec = tween(durationMillis = 500))`을 전달하면 fadeIn효과가 500millis 만큼 적용되며 나타난다.
`exit` 속성엔 `fadeOut(animationSpec = tween(durationMillis = 500))`을 전달하면 fadeOut 효과가 500millis 만큼 적용되며 사라진다.