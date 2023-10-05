#### ? 플레이스 홀더 사용법
```java
@Repository
public class ChatDAOImpl implements ChatDao {
	private final JdbcTemplate jdbcTemplate;
	@Autowired
	public ChatDAOImpl(JdbcTemplate jdbcTemplate){
	this.jdbcTemplate = jdbcTemplate;
	}
	
@Override
	List<Chat> checkId(String id, String pw) {
	String sql = "SELECT * FROM Chat WHERE ID = ? AND PW = ?";
	List<Chat> chats = jdbcTemplate.query(sql, new Object[]{id,pw}, new ChatRowMapper());
	return chats;
	}
}
```

가독성을 위해 바인드 변수를 사용하고 싶다면 [[NamedParameterJdbcTemplate]]를 사용하면 된다.

#### 매개변수 순서

*  ? 플레이스 홀더를 사용하지 않을 때
	1. sql
	2. 매퍼

```java
public void Test(String id, String pw){
	String sql = "SELECT * FROM USER WHERE ID = "+id+" AND PW = "+pw;
	MyObject test = jdbcTemplate.queryForObject(sql,new MyRowMapper());
}
```
 그러나 위 방법은 가독성이 너무 떨어지고 사용성이 좋지 않다. 따라서 아래에 나열된 다른 방법들을 사용하는 게 좋고, 굳이 사용하겠다면 StringBuffer를 사용해야 한다.

#### [[StringBuffer]]

```java
public void Test(String id, String pw){
	StringBuffer sql = new StringBuffer();
	sql.append("SELECT * FROM USER WHERE ID = ");
	sql.append(id);
	sql.append(" AND PW = ");
	sql.append(pw);
	MyObject test = jdbcTemplate.queryForObject(sql,new MyRowMapper());
	
}
```


* ? 플레이스 홀더를 사용하면서 순서를 배열로 전달할 때
	1. sql
	2. 배열
	3. 매퍼

```java
public void Test(String id, String pw){
	String sql = "SELECT * FROM USER WHERE ID = ? AND PW = ?";
	Object[] placeholderOrder = new Object[]{id,pw};
	//String sql = SELECT * FROM USER WHERE ID = id AND PW = pw 로 매핑된다

	MyObject test = jdbcTemplate.queryForObject(sql,placeholderOrder,new MyRowMapper());
}
```

* ? 플레이스 홀더를 사용하면서 순서를 가변인자로 전달할 때
	1. sql
	2. 매퍼
	3. 가변인자

```java
public void Test(String id, String pw){
	String sql = "SELECT * FROM USER WHERE ID = ? AND PW = ?";
	
	MyObject test = jdbcTemplate.queryForObject(sql,new MyRowMapper(),id,pw);
	//String sql = SELECT * FROM USER WHERE ID = id AND PW = pw 로 매핑된다
}
```

## 유용한 메서드

#### query() : 
쿼리를 사용하고 반환받은 값 자체를 처리할 수 있다.
예를 들면
```
jdbcTemplate.query("SELECT * FROM USER WHERE ID = 1",sql)
```
또한 아무런 로우도 조회되지 않았을 때 null이 아니라 빈 리스트를 반환하므로 조회결과가 없는 상황을 `.size() == 0`으로 처리 가능하다.
#### update() :
쿼리로 인해 영향을 받은 row의 수를 반환한다.
#### execute() :
void와 같은 동작을 한다.
CREATE TABLE 같은 동작을 할 때 적합하다.

#### queryForObject :

예외 발생
* EmptyResultDataAccessException : 조회 결과가 없을 때
* IncorrectResultSizeDataAccessException : 로우가 2개 이상 조회 되었을 때
* IncorrectResultSetColumnCountException : 조회된 컬럼수와 매핑할 객체의 필드가 일치하지 않을 

단일행 단일열에 대한 값을 반환 받는다.
매개변수의 마지막에는 매핑할 방식을 정의할 수 있다.
내가 만든 객체에 매핑을 원할 때는 [[★ RowMapper]]를 재정의해야한다.

매핑

* 임의의 객체에 매핑할 때:

조회된 로우를 MyObject의 인스턴스에 매핑한다고 가정

#### MyObject
```java
@Setter
public MyObject{
int age;
String name;
}
```
#### MyRowMapper
```java
public class MyRowMapper implements RowMapper<MyObject>{
@Override
public MyObject mapRows(ResultSet rs, int rowNum) throws SQLException{
	MyObject obj = new MyObject();
	obj.setAge(rs.getInt("AGE")) // 컬럼 이름 AGE의 값을 setAge를 통해 MyObject에 할당
	obj.setName(rs.getString("NAME"))
	return obj;
	}
}
```
#### 쿼리문

```java
public class ObjectJoinImpl implements ObjectJoinDAO {
	private final JdbcTemplate jdbcTemplate;
	ObjectJoinImpl(JdbcTemplate jdbcTemplate){
		this.jdbcTemplate = jdbcTemplate;
	}
	@Override
	public MyObject checkRows(int ID, String PW){
		sql = "SELECT * USER FROM ID = ? AND PW = ?";
		Object params = new Object({ID,PW})
		MyObject test = jdbcTemplate.queryForObject(sql,params,new MyRowMapper());
	}
}
```


* 원시또는 참조타입 변수에 값을 반환할 때 :
```java
public class ObjectJoinImpl implements ObjectJoinDAO {
	private final JdbcTemplate jdbcTemplate;
	ObjectJoinImpl(JdbcTemplate jdbcTemplate){
		this.jdbcTemplate = jdbcTemplate;
	}
	@Override
	public MyObject checkRows(int ID, String PW){
		sql = "SELECT * USER FROM ID = ? AND PW = ?";
		Object params = new Object({ID,PW})
		String test = jdbcTemplate.queryForObject(sql,params,String.class);
	//  int    test = jdbcTemplate.queryForObject(sql,params,Integer.class);
	}
}
```