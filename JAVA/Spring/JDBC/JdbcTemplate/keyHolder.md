자동으로 key를 생성해준다.
```java
KeyHolder keyholder = new GeneratedKeyHolder();
Map<String,Object> map = jdbcTemplate.update(sql,param,keyholder,new String[]{})

```


그게 실시간 화면 크기 비율에 맞춰지는 코드가 있고
화면 크기에 맞춰서 처음에 딱 자리잡히고 고정되는 코드가 있어

지금 %로 해놓은 건가?