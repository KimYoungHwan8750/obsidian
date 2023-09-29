[[★ JdbcTemplate]]랑 같은 구조를 가지지만 `:id`같은 바인드 변수를 사용 가능하다.

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


## 가변인자
JdbcTemplate는 가변인자를 Object 배열로 받아오는 반면 NamedParameterJdbcTemplate는 가변인자를 Map으로 받아온다.

```java
Boolean loginCheck(String id, String pw){
sql = "SELECT * FROM USER WHERE ID = :id AND PW = :pw";
Map<String,Object> order = new Map<>();
put()

return namedParameterJdbcTemplate.query(sql,params,Mapper관련 로직)
}

//.query(sql,params,Mapper관련 로직)에서 params 대신에
//Map.of("id",id,"pw",pw)와도 같이 사용 가능하나 MapSqlParameterSource 사용이 권장된다.
```