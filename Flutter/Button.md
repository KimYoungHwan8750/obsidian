
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