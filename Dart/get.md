## getter 자동 생성
```dart
class User {
	static String get name {
		return "사람";
	}
}
void main() {
	print(User.name);
	// print(User.getName()); 기존  Getter 방식
}
```
