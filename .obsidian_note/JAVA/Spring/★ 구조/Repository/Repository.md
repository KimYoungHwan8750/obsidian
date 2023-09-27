Repository는 기능적으로 DAO와 유사하다.
```java
@Repository
public interface RepositoryChat extends JpaRepository<entityName,primaryKeyType>, ChatDAO {

}
```
