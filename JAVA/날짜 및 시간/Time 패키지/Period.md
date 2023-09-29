#### Period
형식이 일치하는 두 날짜 데이터 간의 시간 차이를 출력한다.
getDays()
getMonths()
getYears()가 있다.
일 미만 단위의 차이는 출력 불가능하다.

```java
LocalDate date1 = LocalDate.of(2022,12,25); // date1 변수에 2022년 12월 25일을 저장
LocalDate date2 = LocalDate.of(2022,12,26); // date2 변수에 2022년 12월 26일을 저장
Period period = Period.between(date1,date2);
sout(period.getDays()+"일 차이"); // 1일 차이 출력
```