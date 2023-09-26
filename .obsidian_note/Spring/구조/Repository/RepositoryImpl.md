#### RepositoryImpl

리파지토리임플을 작성해야 하는 경우는 다음과 같다.

```java
@Repository
public interface RepositoryChat extends ChatDAO {

}
```

JPA를 상속받으면 JPA Data가 자동으로 ChatDAO 구현체를 작성해주었지만 위처럼 그렇지 않은 경우 유저가 직접 ChatDAO가 제공하는 모든 메서드들을 구현해야한다.

```java
public interface RepositoryChatImpl extends RepositoryChat {
private final JdbcTemplate jdbctemplate;
@Override
	Boolean checkEmail(String email){
	}

}
```