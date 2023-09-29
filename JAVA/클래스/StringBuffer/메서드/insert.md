#### 예제
```java
StringBuffer test = new StringBuffer("test");  
test.insert(2,"얍"); // te얍st
```

단순하게 생각하면 된다.
첫번째 매개변수로 2을 줬을 경우 넣을 문자열의 첫번째 인덱스는 반드시 2가 된다.

```java
StringBuffer test = new StringBuffer("123456")
test.insert(3,"안녕"); // 123안녕456
```