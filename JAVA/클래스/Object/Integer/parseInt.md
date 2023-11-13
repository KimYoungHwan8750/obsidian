
#### 예제
```java

String test1 = "1";
String test2 = "2.1";

int testInt = parseInt(test1); // 1
float testFloat = parseInt(tset2); // NumberFormatException
```

#### [[valueOf]]와 다른 점
참조타입으로 반환하느냐, 원시타입으로 반환하느냐의 차이다.
단순한 정수만 필요할 경우 parseInt를 사용하는 게 당연히 처리속도나 메모리 성능에 좋다.