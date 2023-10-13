#### RequiredArgsConstructor
초기화되지 않은 final 필드나 NonNull이 붙은 필드에 대해 생성자를 생성한다.

```java
@RequiredArgsConstructor
public class MyService{
	private final Dao1 dao1;
	private final Dao2 dao2;
	private final Dao3 dao3;
}
```

스프링에서는 생성자 주입 방식을 권유하는데
그러려면
```java
public class MyService{
	private final Dao1 dao1;
	private final Dao2 dao2;
	private final Dao3 dao3;
	@Autowired
	MyService(Dao1 dao1, Dao2 dao2, Dao3 dao3){
	this.dao1 = dao1;
	this.dao2 = dao2;
	this.dao3 = dao3;
	}
}
```
위와 같은 형태가 된다.
주입될 객체가 늘어나면 코드 수정이 번거롭다.
이때 @RequiredArgsConstructor를 사용하면 편리하다.


#### 주의사항

[[Spring] @RequiredArgsConstructor 어노테이션을 사용한 "생성자 주입" (velog.io)](https://velog.io/@developerjun0615/Spring-RequiredArgsConstructor-%EC%96%B4%EB%85%B8%ED%85%8C%EC%9D%B4%EC%85%98%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%83%9D%EC%84%B1%EC%9E%90-%EC%A3%BC%EC%9E%85)

