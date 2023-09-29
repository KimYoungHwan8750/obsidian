#### BeanPropertyRowMapper
JDBC 모듈에 있는 클래스이다.
쿼리문을 통해 조회한 결과를 원하는 객체에 매핑하기 위해 사용한다.
#### 예제
```java
JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
String sql = "Select name, age FROM USER_INFO";
List<USER> user = jdbcTemplate.query(
	sql,
	new BeanPropertyRowMapper<>(USER.class)
);
```
조회해서 나온 결과를 USER객체에 매핑해서 리스트로 반환한다.
USER객체는 조회할 테이블의 컬럼명과 같은 필드를 가져야한다.