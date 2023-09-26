#### Query
```java
@Repository
public interface Repository_Example extends JpaRepository<className,primaryKeyType>{
@Query (value ="SELECT * FROM className WHERE ID = :id", nativeQuery = true)
List<className> testQuery(String id);
}
```

해당 구문은 jpa에 정의된 메서드 외에 직접 쿼리를 작성해 메서드를 정의한다.

`nativeQuery = true` 해당 구문은 jpa에서 제공하는 쿼리 문법 대신 사용하고 있는 데이터베이스의 쿼리 문법을 사용하겠다는 명시적 표현이다.

`ID = :id` 바인드 변수를 사용할 수 있다. `:id`는 `testQuery(String id)`의 파라미터 `id`에 대응한다.