Dart의 함수형 프로그래밍을 위한 패키지

#### Failure

실패 케이스를 생성할 때는 자유롭게 데이터 타입을 사용하여도 되지만 주로 아래와 같이 케이스를 만든다.

이전 글에서 살펴본 freezed로도 Failure 데이터를 만들 수 있다.

```dart
@freezed
class Failure with _$Failure {
  const factory Failure.networkError() = _NetworkError;
  const factory Failure.tokenExpired() = _TokenExpired;
}
```