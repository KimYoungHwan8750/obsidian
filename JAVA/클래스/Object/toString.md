
#### 예제
```java
int test = 10; // 10;
String str = Integer.toString(test); // "10"
```

#### 사용법
참조타입을 문자열로 변환한다.
* Integer
* Float
* Double
* Long

```java
출발타입.toString(출발타입과 형이 일치하는 변수);
Integer.toString(3);
Float.toString(3.14F);
Doutble.toString(3.14);
Long.toString(100000000000000000L);
```



#### [[valueOf]]와 다른 점

toString은 입력된 문자열이 null이면
NullPointerException이 발생한다.
valueOf는 "null"이 출력된다.