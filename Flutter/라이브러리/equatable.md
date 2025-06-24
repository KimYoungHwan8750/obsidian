객체간 동등성 검사를 쉽게 만들어주는 라이브러리.

```dart
class Number extends Equatable {
	const Number({require this.number});
	final int number;

	@override
	List<Object> get props => [number]; // 이곳에 동등성 검사에 사용할 필드 명시
}
```

```dart
Number(10) == Number(10) // true, 원래라면 객체 간 비교라서 false이다.
```
