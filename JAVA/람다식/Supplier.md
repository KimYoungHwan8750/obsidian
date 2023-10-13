#### Supplier\<T\>
인자를 받지 않고 T타입 객체를 리턴한다.
#### 사용 예제
```java
Supplier<String> test = ()->"안녕";
sout(test.get()); // 안녕
```

#### 메서드
get() : 실행