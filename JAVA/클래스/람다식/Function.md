#### Function\<T,R\>
T타입 인자를 받고 R타입의 객체를 반환한다.

#### 사용 예제
```java
Function<String,Integer> test = text->text.equals("true")?1:0;  
System.out.println(test.apply("true1")); // 0
System.out.println(test.apply("true")); // 1
```

#### 메서드
apply(인자) : 실