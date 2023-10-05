```java
DriverManagerDataSource dataSource = new DriverManagerDataSource();  
dataSource.setDriverClassName("oracle.jdbc.OracleDriver"); // adjust for your DBMS  
dataSource.setUrl("jdbc:oracle:thin:@wearvillage.c38c15agkmuv.ap-northeast-2.rds.amazonaws.com:1521:VILLAGE"); // adjust for your database URL  
dataSource.setUsername("admin"); // adjust for your username  
dataSource.setPassword("admin12345"); // adjust for your password
jdbcTemplate = new JdbcTemplate(dataSource);
```

#### jdbcTemplate 데이터소스 주입
setDriverClassName
setUrl
setUsername
setPassword
네 가지 메서드를 이용해 값을 대입하고 JdbcTemplate에 매개변수로 사용하면
JdbcTemplate를 사용할 수 있다.