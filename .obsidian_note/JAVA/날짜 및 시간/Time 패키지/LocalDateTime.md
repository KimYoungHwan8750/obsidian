#### LocalDateTime
[[Date]]보다 최신형의 클래스이다.
자바에서는 Date 클래스보다 LocalDateTime 클래스 사용을 권장하고 있다.

```java
LocalDateTime time = LocalDateTime.now();
// 현재 날짜 정보가 time변수에 담긴다.
```


#### Method

* LocalDateTime.now() : 현재 시간을 받아온다.
* LocalDateTime.of(년,월,일,시간,분,초,밀리세컨드) : 원하는 단위까지의 날짜를 생성한다. 단, 분까지는 필수 입력사항이다. 분까지만 입력하면 00초로 표시된다.

#### 생성된 인스턴스에서 사용 가능한 Method
* .getDayOfWeek() : 일요일이면 SUNDAY 반환
* .getDayOfYear() : 12월 30일이면 364 반환
* .getDayOfMonth() : 날짜 정보가 12월 30일이면 30 반환
* .getMonth() : 5월이면 MAY 반환
* .getMonthValue() : 5월이면 5 반환
* .format(#포매터 인스턴스) :
```java
//.format 예제
LocalDateTime date = LocalDateTime.now();
DateTimeFormatter form = DateTimeFormatter.ofPattern("yyyy MM dd hh:mm:ss")
sout(date.fomat(form)); // 포매터에 저장된 패턴대로 반환
```
#### DateTimeFormatter

[[DateTimeFormatter]]와 함께 사용하면 보기 좋은 형태로 표현이 가능하다.
