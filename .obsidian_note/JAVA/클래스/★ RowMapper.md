#### RowMapper

내가 만든 객체에 매핑하기 위해 RowMapper 인터페이스를 상속받아서 재정의해야한다.
RowMapper\<T\> T에 매핑을 원하는 객체를 입력한다.
아래는 필드에 `name`과 `age`를 가진 Person이라는 객체에 조회된 로우를 매핑하기 위한 예제이다.
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

`Person`객체에 DB 컬럼을 매핑한 객체를 생성하는 RowMapper
```java
person.setName(rs.getString("name")) // 컬럼명 name의 값들을 필드변수 name에 매핑한다.
// setName은 @Setter 어노테이션에 의해 person 객체 내부에 정의된 메서드이므로 name이라는 필드명을 인식하고 camelCase에 의거해 setName이라는 메서드가 만들어진 것이다. setName이라고 해서 Name이라는 필드명에 매핑된다고 착각하기 쉬우니 주의.

re.getTimestamp("date") // 원하는 타입으로 가져올 수 있다.
```

## 주의사항
* RowMapper 인터페이스의 mapRow(ResultSet rs, int rowNum) 메서드를 오버라이딩해야한다.