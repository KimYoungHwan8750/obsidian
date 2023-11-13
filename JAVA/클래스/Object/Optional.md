### 올바른 Optional 사용법 가이드

- Optional 변수에 Null을 할당하지 말아라
- 값이 없을 때 Optional.orElseX()로 기본 값을 반환하라
- 단순히 값을 얻으려는 목적으로만 Optional을 사용하지 마라
- 생성자, 수정자, 메소드 파라미터 등으로 Optional을 넘기지 마라
- Collection의 경우 Optional이 아닌 빈 Collection을 사용하라
- 반환 타입으로만 사용하라


#### 제공 메서드

`Optional<MyObject> obj`

```java
obj.of(Object); // Object가 null이면 NullPointerException 발생
obj.ofNullable(Object); // Object가 null 가능
obj.orElse(T); // 값이 있으면 obj를 반환하고 값이 없으면 T를 반환
obj.orElseGet(Supplier람다함수); // 값이 있으면 obj를 반환하고 없으면 Supplier 함수 반환
obj.empty(); // 객체를 null로 초기화
obj.orElseThrow(예외); // null 일 때 예외 던지

``` 



# 매우 중요한 내용

orElse() 나 orElseGet()이나 Optional객체가 null이냐 아니냐에 따라서 옵셔널 객체의 제너릭 타입을 반환한다는 것은 같다.
다만 orElse()는 null 일 때와 null이 아닐때를 모두 실행한 뒤에 원래 동작을 하고, orElseGet()은 null이 아닐 때만 유저가 원하는 제너릭 타입을 반환한다.
이것은 사소하지만 자칫 큰 대형사고로 이어질 수 있는데 이유는 다음과 같다.

```java
Optional<String> str = Optional.ofNullable("hi");
str.orElse(testMethod()); // hi
str.orElseGet(()->{return testMethod()}); // hi
//둘 다 Null이 아니기 때문에 hi를 반환한다. 하지만 testMethod()에 동작이 있다면 결과값이 달라진다.

public String testMethod(){
	System.out.printf("null이 아닌데도 동작함");
	return "default";
}

// 위 코드에서 str.orElse(testMethod())는 콘솔에 null이 아닌데도 동작함이 출력된다.
// 하지만 반대로 str.orElseGet(()->{return testMethod()})는 아예 메서드가 호출되지 않는다.

```