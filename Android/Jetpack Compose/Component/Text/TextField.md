# TextField

텍스트를 입력받을 때 사용하는 요소다.
html의 input 태그와 유사하다.

```kotlin
TextField(
	value = ""
	onValueChange = {}
	colors = TextFieldDefaults.colors(
		unfocusedContainerColor = Color.Yellow,
	)
)
```

Material Design3가 적용되어있어 간편하게 사용 가능하다.
`colors`속성에 `TextFieldDefaults.colors()`메서드를 사용하고, `colors()`메서드에 unfocuesedContainerColor, focusedLabelColor 등이 있다. 편한대로 설정하면 된다.

또한 `textStyle = TextStyle( color = Color.Red )`로 내부 글자의 속성을 지정할 수 있다/