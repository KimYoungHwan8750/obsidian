NPE를 예방하기 위해 만들어진 클래스.

```java
List<String> items = getItems();
sout(items.size());
```

getItems() 메서드를 통해 문자열 리스트 객체를 얻어온 다음 엘리먼트 개수를 출력하는 코드다.
getItems() 메서드가 null값을 리턴하면 items.size() 코드에서 NPE가 발생하게된다.

```java
List<String> items = getItems();
if(items != null){
	sout(items.size());
}
```
따라서 이렇게 수정해야한다.

```java
House house = getRandomHouse();
if(house != null && house.getOwner() != null && house.getOwner().getName != null){
	sout("House owner: "+house.getOwner().getName());
}
if(house.getAddress() != null){
	sout("House address: "+house.getAddress());
}
```

House객체를 받아 집 주인 이름과 집 주소를 출력하는 코드인데, null값을 가질수있는 가능성을 고려해야하기 때문에
조건절의 조건이 훨씬 길어졌다.

```java
public final class Optional<T>{
	private final T value;
}
```

Optional\<T\> 클래스는 null값일수도 있는 어떤 변수를 감싸주는 '래퍼' 클래스이다.
Optional 클래스는 제너릭으로 값의 타입을 지정해주어야한다.
Optional 클래스는 여러가지 메서드를 통해 value 값에 접근하기 때문에 바로 NPE가 발생하지 않으며, null일수도 있는 값을 다루기 위한 다양한 메서드들을 제공해준다.

위의 House 코드를 Optional\<String\>클래스를 이용해 다음과 같이 재작성할수 있다.


```java
House house = getRandomHouse();
Optional.of(house)
		.map(House::getOwner)
		.map(House::getName)
		.ifPresent(n -> sout("House owner: "+n));

Optional.of(house)
		.map(House::getAddress)
		.ifPresent(a -> sout("House address: "+a));
```


우선 Optional 객체를 생성하기 위해서는 다음 메서드들을 사용해야한다.

```java
Optional<String> optional = Optional.of(value);
```

이 경우 value 변수의 값이 null인 경우 NPE가 발생한다. 반드시 값이 있어야 하는 경우 of() 메서드를 사용한다.

```java
Optional<String> optional = Optional.ofNullable(value);
```

이 경우 value 변수의 값이 null일수 있다. value 변수가 null인 경우 Optional.empty()가 리턴된다.

```java
Optional<String> optional = Optional.empty();
```

빈 Optional 객체를 생성한다. 비어있는 Optional 객체라하면, Optional 객체 자체는 있지만 내부에서
가리키는 참조가 없는 경우를 빈 객체라고 한다. Optional.empty() 객체는 미리 생성되어 있는 싱글턴 인스턴스이다.

## ==`중간처리`==

Optional 객체를 가져와서 어떤 처리를 하고 다시 Optional 객체를 반환하는 메서드들이 있다.
중간처리 메서드들을 이어붙여 로직을 반복해서 사용하는것이 가능하다.

#### ==`filter()`==

filter 메서드의 인자로 받은 람다식이 참이면 Optional 객체를 그대로 통과시키고 
거짓이라면 Optional.empty()를 반환하여 추가로 처리 안되도록 한다.

```java
//ABCD
Optional.of("ABCD").filter(v -> v.startsWith("AB")).orElse("NOT AB");
//Not AB
Optional.of("XYZ").filter(v -> v.startsWith("AB")).orElse("NOT AB");
```
"ABCD"로 시작한 Optional 객체의 filter() 조건은 참이므로 "ABCD"가 리턴된다.
"XYZ"로 시작한 Optional 객체의 경우 filter()에서 빈 Optional 객체가 리턴되므로 orElse에 적어둔"NOT AB"가 리턴된다.

STREAM의 filter와 유사하다.

#### ==`map()`==

Optional 객체의 값에 어떠한 수정을 가해서 다른 값으로 변경하는 메서드.

```java
Optional.of("XYZ").map(String::toLowerCase).orElse("Not AB");
```

## ==`리턴 메서드`==

중간처리 메서드들은 Optional 객체를 리턴해서 메서드 체인으로 사용할수 있는 반면, 값을 리턴해서 메서드 체인을 끝내는 메서드들도 있다.

#### ==`isPresent()`==

isPresent() 메서드는 Optional 객체의 값이 null인지 여부, 즉 값이 존재하는지 여부만 판단해준다.

```java
Optional.of("TEST").isPresent(); // true
Optional.of("Test").filter(v -> "Not Equals".equals(v)).isPresent(); //false
```


#### ==`ifPresent()`==

ifPresent() 메서드는 람다식을 인자로 받아, 값이 존재할때 그 값에 람다식을 적용해준다.
만약 Optional 객체에 값이 없다면 람다식이 실행되지 않는다.

```java
//TEST 출력
Optional.of("Test").ifPresent(System.out::println);
//아무것도 출력되지 않는다.
Optional.ofNullable(null).ifPresent(System.out::println);
```

#### ==`get()`==

Optional 객체가 가지고 있는 value의 값을 꺼내온다. 만약 Optional 객체에 값이 없다면, NoSuchElementException을 발생시킨다.
```java
Optional.of("TEST").get(); // TEST 리턴
Optional.ofNullable(null).get(); // NoSuchElementException
```

#### ==`orElse()`==

중간처리 메서드들을 거치며 혹은 원래 Optional 객체가 비어있었다면, orElse() 메서드에 지정된 값이 기본적으로 리턴된다.

```java
Optional.of("XYZ").filter(v -> v.startsWith("AB")).orElse("NOT AB"); //"NOT AB" 리턴
```

#### ==`orElseGet()`==

중간처리 메서드들을 거치면서 혹은 원래 Optional 객체가 비어있었다면, orElseGet() 메서드의 인자로 입력되어 있는 Supplier 함수를 적용하여 객체를 얻어온다.

```java
Optional.of("XYZ").filter(v -> v.startsWith("AB")).orElseGet(() -> "NOT AB") // "NOT AB" 리턴
```

orElse()메서드는 메서드의 인자를 항상 평가한다. 즉, orElse에 객체를 생성해서 Optional 객체가
비어있는 경우 리턴하도록 할수도 있는데, orElse() 메서드의 인자 평가가 항상 발생한다.
따라서 객체를 생성하는 비용이 크다면 orElse() 메서드를 사용하면 안된다.

대신 orElseGet() 메서드는 Optional 객체가 비어있는 경우에만 Supplier 함수를 실행한다.
따라서 객체를 생성하는 비용이 크다면 orElseGet() 메서드를 사용해야만 한다.

#### ==`orElseThrow()`==

중간처리 메서드들을 거치면서 혹은 원래 Optional 객체가 비어있었다면, Supplier 함수를 실행해 예외를 발생시킨다.

```java
Optional.of("XYZ").filter(v -> v.startsWith("AB")).orElseThrow(NoSuchElementException::new);
```

자바 10버전에서 인자를 받지 않고도 가능하게 추가되었다.
```java
Optional.ofNullable(value).orElseThrow(NoSuchElementException::new);
Optional.ofNullable(value).orElseThrow();
```
두 메서드는 동일하게 작동한다.

## ==`추가된 메서드들`==

#### ==`or()`==

중간처리 메서드로 orElse, orElseGet()과 비슷하다. 하지만 or() 메서드는 Optional 객체를 리턴한다.
메서드 체인 중간에서 Optional.empty()가 되었을때, Optional.empty() 대신 다른 Optional 객체를 만들어서 뒤쪽으로 넘겨주고 싶을때 사용한다.

```java
Optional.ofNullable(value)
		.map(value.getValue())
		.or(() -> Optional.ofNullable(user.getFavorite)))
		.orElse("No Favorite");
```

value가 null이거나 value의 getValue() 메서드가 null을 리턴했을때, Optional.ofNullable(user.getFavorite())를
실행해서 만들어진 Optional 객체를 넘겨준다.
만약 user.getFavorite() 메서드가 null을 리턴한다면 "No Favorite" 문자열을 리턴하고, 아니라면 getFavorite() 메서드로 얻어진 값이 리턴된다.

#### ==`ifPresentOrElse()`==

최종적으로 값을 반환하는 메서드이다. ifPresent() 메서드와 유사하지만 인자를 하나 더 받는다.
첫번째 인자로 받은 람다식은 Optional 객체에 값이 존재하는 경우 실행된다.
두번째 인자로 받은 람다식은 Optional 객체가 비어있을때 실행된다.

#### ==`stream()`==

stream()메서드는 중간처리 연산자로, Optional 객체를 바로 stream 객체로 전환시켜주는 메서드다.

```java
List<String> result = List.of(Optional.of("ABCD"), Optional.of("ABCC"), Optional.of("XYCD"))
		.flatMap(Optional::stream)
		.filter(v -> v.startsWith("AB"))
		.collect(Collectors.toList());
```


## 기본형에 대한 Optional

int, long, double형 자료에 대한 래퍼 클래스로, OptionalInt, OptionalLong, OptionalDouble 클래스가 제공된다.
Optional, Optional, Optional처럼 사용할수 있다. 하지만 이 경우 AutoBoxing, Unboxing이 발생한다.
기본형 값을 위한 Optional 클래스인 OptionalInt, OptionalLong, OptionalDouble을 사용하도록 하자.

많을수록 좋지 않은 클래스다. null처리를 간편하게 할 수 있도록 도와주지만 남용하지는 말자.