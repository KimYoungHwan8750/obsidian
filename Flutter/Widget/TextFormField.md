```dart
TextFormField(
	decoration: InputDecoration(
		labelText: "닉네임을 입력하세요",
		hintText: "닉네임",
		border: OutlineInputBorder(
			borderRadius: BorderRadius.all(Radius.circular(12)),
			borderSide: BorderSide.none
		),
		fillColor: Colors.blue.shade100,
		filled: true,
		floatingLabelBehavior: FloatingLabelBehavior.never
	),
	maxLength: 10,
	onChanged: (value) {
	},
	validator: (value) {
		if (value == null || value.isEmpty) {
			return '값을 입력해주세요';
		}
		if (!RegExp(r'^[0-9]+$').hasMatch(value)) {
			return '숫자만 입력하세요';
		}
		return null;
	}
),
```

TextField와 거의 모든 속성을 공유한다.

onSubmitted 같은 경우 onFieldSubmitted 속성을 사용하면 된다.

### TextField와 다른점
validator가 있다.

```dart
validator: (value) {
	if(value == null) {
		return "텍스트를 입력해주세요.";
	}
	return null; //
}
```

이 validator에서 반환하는 값이 textHelper 메세지로 사용된다.

나머지 속성은 TextField 위젯 정리글 참고
