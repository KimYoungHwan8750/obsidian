TextF

```dart
// 변수 선언
final GlobalKey<FormState> formKey = GlobalKey<FormState>();

// 위젯
Form(
  key: formKey,
  child: TextFormField(
	controller: textController,
	decoration: InputDecoration(
	  labelText: "닉네임을 입력하세요",
	  hintText: "닉네임",
	  border: OutlineInputBorder(
		borderRadius: BorderRadius.all(Radius.circular(12)),
		borderSide: BorderSide.none,
	  ),
	  fillColor: Colors.blue.shade100,
	  filled: true,
	  floatingLabelBehavior: FloatingLabelBehavior.always,
	),
	textInputAction: TextInputAction.next,
	maxLength: 10,
	onFieldSubmitted: (value) {
	  if (formKey.currentState!.validate()) {
		// Form 유효성 검증 OK!
	  }
	},
	validator: (value) {
	  if (value == null || value.isEmpty) {
		return '값을 입력해주세요';
	  }
	  if (!RegExp(r'^[0-9]+$').hasMatch(value)) {
		return '숫자만 입력하세요';
	  }
	  return null;
	},
  ),
),
```