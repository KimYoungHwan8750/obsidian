CORS 정책을 허용한다.
메서드 단위에 쓰면 해당 메서드만 허락하며 만약 모든 메서드에 크로스 오리진을 허용하고 싶으면 클래스 위에 해당 어노테이션을 붙이면 된다.
@CrossOrigin은 모든 도메인,메서드를 허용한다.
일부만 하고 싶으면 아래 예제를 참고.

```java
@CrossOrigin (origins="https://wearvillage.store/chat, https://wearvillage.store/chatroomlist")
public class Controller{
	@GetMapping
	...생략
}
```