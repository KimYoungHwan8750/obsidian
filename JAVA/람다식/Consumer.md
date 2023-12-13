#### Consumer\<T\>
T를 인자로 받고 리턴 값은 없다.

#### 사용 예제
```java
Consumer<String> test = text->sout(text+"입니다.");
test.accept("사람"); // 사람입니다.
```

#### 메서드
accept(매개변수) : 실행
andThen() : 연속적으로 실행시킬때 사용

#### andThen() 예제
```java
Consumer<String> test1 = text->sout(text+"테스트1");
Consumer<String> test2 = text->sout(text+"테스트2");
Consumer<String> test3 = text->sout(text+"테스트3");

test1.andThen(test2).andThen(test3).accept("홀리몰리 과카몰리 ");
// 홀리몰리 과카몰리 테스트1
// 홀리몰리 과카몰리 테스트2
// 홀리몰리 과카몰리 테스트3
```

