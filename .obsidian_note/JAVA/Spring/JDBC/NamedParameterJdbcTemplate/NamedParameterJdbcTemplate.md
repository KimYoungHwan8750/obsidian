[[JdbcTemplate]]랑 같은 구조를 가지지만 `:id`같은 바인드 변수를 사용 가능하다.

```java
Boolean loginCheck(String id, String pw){
sql = "SELECT * FROM USER WHERE ID = :id AND PW = :pw";
MapSqlParameterSource params = new MapSqlParameterSouce();
params.addValue("id",id);
params.addValue("pw",pw);

return namedParameterJdbcTemplate.query(sql,params,Mapper관련 로직)
}

//.query(sql,params,Mapper관련 로직)에서 params 대신에
//Map.of("id",id,"pw",pw)와도 같이 사용 가능하나 MapSqlParameterSource 사용이 권장된다.

```