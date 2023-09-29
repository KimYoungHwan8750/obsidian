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

#### 특징
* RowMapper보다 사용이 용이하다. 컬럼명과 필드명만 일치하면 RowMapper처럼 따로 메서드 오버라이딩을 진행할 필요가 없다.
* RowMapper보다 고수준 클래스이다보니 불필요한 리소스도 포함되고 이는 성능 저하 및 유연성 저하로 이어진다.