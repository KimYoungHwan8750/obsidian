# Flutter/Dart Test Expect Matchers Guide

Flutter/Dart 테스트의 `expect` 함수에는 다양한 **Matcher**들이 있습니다.

## 1. 기본 비교 Matchers

### `equals()` - 값 비교

```dart
expect(actual, equals(expected));
expect(2 + 2, equals(4));
expect('hello', equals('hello'));
```

### `same()` - 동일한 객체 참조

```dart
var list1 = [1, 2, 3];
var list2 = list1;
expect(list2, same(list1)); // 같은 객체
expect([1, 2, 3], isNot(same([1, 2, 3]))); // 다른 객체
```

## 2. 타입 검사 Matchers

### `isA<T>()` - 타입 확인

```dart
expect(42, isA<int>());
expect('hello', isA<String>());
expect([1, 2, 3], isA<List<int>>());
```

### `isInstanceOf<T>()` - 인스턴스 확인 (deprecated, isA 사용 권장)

```dart
expect(42, isInstanceOf<int>());
```

## 3. null 검사 Matchers

### `isNull` / `isNotNull`

```dart
expect(null, isNull);
expect('hello', isNotNull);
```

## 4. 숫자 비교 Matchers

### `greaterThan()`, `lessThan()`, `greaterThanOrEqualTo()`, `lessThanOrEqualTo()`

```dart
expect(10, greaterThan(5));
expect(3, lessThan(10));
expect(5, greaterThanOrEqualTo(5));
expect(5, lessThanOrEqualTo(10));
```

### `closeTo()` - 근사값 비교 (부동소수점)

```dart
expect(3.14, closeTo(3.1, 0.1)); // 3.1 ± 0.1 범위
expect(1.0 / 3.0, closeTo(0.333, 0.001));
```

### `inInclusiveRange()` - 범위 안에 있는지

```dart
expect(5, inInclusiveRange(1, 10)); // 1 <= 5 <= 10
```

## 5. 문자열 Matchers

### `contains()` - 포함 여부

```dart
expect('hello world', contains('world'));
expect('Flutter', contains('lut'));
```

### `startsWith()`, `endsWith()`

```dart
expect('Flutter', startsWith('Flu'));
expect('Dart', endsWith('art'));
```

### `matches()` - 정규표현식

```dart
expect('test@email.com', matches(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'));
```

### `hasLength()` - 길이 확인

```dart
expect('hello', hasLength(5));
expect([1, 2, 3], hasLength(3));
```

## 6. 컬렉션 Matchers

### `isEmpty`, `isNotEmpty`

```dart
expect([], isEmpty);
expect([1, 2, 3], isNotEmpty);
expect('', isEmpty);
expect('hello', isNotEmpty);
```

### `containsValue()`, `containsKey()` - Map용

```dart
var map = {'name': 'John', 'age': 30};
expect(map, containsKey('name'));
expect(map, containsValue(30));
```

### `containsAll()` - 모든 요소 포함

```dart
expect([1, 2, 3, 4, 5], containsAll([2, 4]));
```

### `everyElement()` - 모든 요소가 조건 만족

```dart
expect([2, 4, 6, 8], everyElement(isEven));
expect(['a', 'ab', 'abc'], everyElement(startsWith('a')));
```

### `anyElement()` - 하나라도 조건 만족

```dart
expect([1, 3, 4, 7], anyElement(isEven)); // 4가 짝수
```

## 7. 예외 처리 Matchers

### `throwsA()` - 특정 예외 던지는지

```dart
expect(() => int.parse('abc'), throwsA(isA<FormatException>()));
expect(() => throw Exception('error'), throwsException);
```

### `throwsArgumentError`, `throwsStateError` 등

```dart
expect(() => List.filled(-1, 0), throwsArgumentError);
expect(() => [].first, throwsStateError);
```

## 8. Future 관련 Matchers

### `completes` - Future가 성공적으로 완료

```dart
expect(Future.value(42), completes);
```

### `completion()` - Future 완료 후 값 검사

```dart
expect(Future.value(42), completion(equals(42)));
expect(Future.value('hello'), completion(startsWith('h')));
```

## 9. 논리 연산 Matchers

### `allOf()` - 모든 조건 만족

```dart
expect(10, allOf([
  greaterThan(5),
  lessThan(15),
  isA<int>()
]));
```

### `anyOf()` - 하나라도 만족

```dart
expect('hello', anyOf([
  equals('hi'),
  equals('hello'),
  equals('hey')
]));
```

### `isNot()` - 부정

```dart
expect(5, isNot(equals(3)));
expect('hello', isNot(isEmpty));
```

## 10. 커스텀 Matchers

### 직접 Matcher 만들기

```dart
Matcher isEven = predicate<int>((n) => n % 2 == 0, 'is even');
expect(4, isEven);
expect(3, isNot(isEven));
```

## 종합 사용 예시

```dart
test('comprehensive example', () {
  var user = User(name: 'John', age: 30, emails: ['john@test.com']);
  
  expect(user.name, equals('John'));
  expect(user.age, inInclusiveRange(18, 65));
  expect(user.emails, hasLength(1));
  expect(user.emails, contains('john@test.com'));
  expect(user.emails.first, matches(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'));
  expect(user, isA<User>());
});
```

## 자주 사용하는 Matchers 요약

|Matcher|용도|예시|
|---|---|---|
|`equals()`|값 비교|`expect(result, equals(expected))`|
|`isA<T>()`|타입 확인|`expect(obj, isA<String>())`|
|`isNull/isNotNull`|null 검사|`expect(value, isNotNull)`|
|`contains()`|포함 여부|`expect(list, contains(item))`|
|`hasLength()`|길이 확인|`expect(list, hasLength(3))`|
|`isEmpty/isNotEmpty`|비어있는지 확인|`expect(list, isEmpty)`|
|`throwsA()`|예외 확인|`expect(() => code, throwsA(isA<Exception>()))`|
|`completion()`|Future 결과 확인|`expect(future, completion(equals(value)))`|

이런 Matchers들을 조합해서 정확하고 읽기 쉬운 테스트를 작성할 수 있습니다!