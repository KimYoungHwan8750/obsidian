#### Data Access Object

```java
public interface ChatDAO{

	Boolean checkEmail(String email);
	Boolean checkID(String email);
	Boolean checkEmail(String email);
	Boolean checkEmail(String email);
	
}
```

DAO를 상속받은 ChatDAOImpl 클래스는
ChatDAO의 추상 메서드들을 오버라이딩해야하며 public 메서드로 정의해야한다.
또한 [[@Repository]] 어노테이션을 클래스에 선언해서 빈에 등록해야한다.
