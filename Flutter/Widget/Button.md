## Button

TextButton, OutlinedButton, ElevatedButton가 있다.

TextButton은 글자만 존재하는 버튼이고 OutlinedButton은 테두리가 있는 버튼, ElevatedButton은 그림자 효과가 있는 입체감 있는 버튼이다.

예제)

```dart

TextButton(
	onPressed: () {},
	style: TextButton.styleFrom(
		foregroundColor: Colors.red,
	),
	child: Text("텍스트 버튼"),
)

```

### TextButton

![Text Button](Flutter/image/Pasted%20image%2020240707144021.png)

```dart
TextButton(
	onPressed: (){},
	child: Text('텍스트 버튼'),
)
```

### OutlinedButton

![Outlined Button](Flutter/image/Pasted%20image%2020240707144138.png)

```dart
OutlinedButton(
	onPressed: (){},
	child: Text('텍스트 버튼'),
)
```

### ElevatedButton

