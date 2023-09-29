#### SimpleDateFormat

```java
Date date = new Date();
SimpleDateFormat formater = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss.SSS");
formater.format(date);
```

위와 같은 코드는 현재 시간을 년도/월/일 시간/분/초.밀리세컨드까지 표시해준다.

`("yyyy/MM/dd hh:mm:ss.SSS a");` 뒤에 a를 덧붙이면 오전, 오후로 표현해준다.

