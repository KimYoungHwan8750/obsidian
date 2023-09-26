#### RowMapper
```java

public class PersonRowMapper implements RowMapper<Person> {
    @Override
    public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
        Person person = new Person();
        person.setName(rs.getString("name"));
        person.setAge(rs.getInt("age"));
        return person;
    }
}
```

`Person`객체에 DB 테이블을 매핑한 객체를 생성하는 RowMapper
```java
pserson.setName(rs.getString("name")) // 컬럼명 name의 값들을 필드변수 Name에 매핑한다.
```