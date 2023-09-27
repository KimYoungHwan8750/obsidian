#### DateTimeFormatter

```java
LocalDateTime date = LocalDateTime.now();
sout(date); // 현재 시간이 초단위까지 출력되나 보기 좋은 형태가 아니다.
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 hh시 mm분 ss초 sss밀리세컨드"); // 포맷의 끝에 a를 기입하면 24시간이 오전 오후로 표시된다.
sout(formatter.format(date)); // YYYY년 MM월 DD일 HH시 MM분 SS초 SSS밀리세컨드
```
