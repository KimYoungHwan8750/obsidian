
#### 예제
```java
int test = 10; // 10;
String test1 = String.valueOf(test); // "10"
int test2 = Integer.valueOf(test1); // 10
int test2 = Integer.parseInt(test1); // 10
```


#### 사용법
참조타입을 원하는 타입으로 변환한다.
* Integer
* Float
* Double
* String
* Long

```java
도착타입.valueOf(출발타입 변수);
```


#### [[toString]]과 다른 점
valueOf는 참조타입을 반환하기 때문에 NullPointerException를 일으키지 않고 "null"을 출력한다.

#### [[parseInt]]와 다른 점
valueOf는 참조타입을 반환하고 parseInt는 원시타입을 반환한다.
따라서 parseInt 역시 Null값에 대해 NullPointerException이 발생하고
또한 정수형이 아닌 수를 변환하려고 하면 NumberFormatException이 발생한다.