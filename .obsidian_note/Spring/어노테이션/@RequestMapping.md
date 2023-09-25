#### RequestMapping

해당 어노테이션은 Get,Post,Delete,Put등등 모든 요청을 처리할 수 있다.
잘못된 동작을 막기 위해 보통은 @GetMapping이나 @PostMapping으로 세분화하는 편이지만
@RequestMapping을 사용하는 경우가 있다.
그 경우는 바로 아래에 서술한다.

#### Class레벨에 @RequestMapping

class레벨에서 @RequestMapping을 붙이게 되면 Url을 상속시킬 수 있다.


#### 예제

```java
@RequestMapping ("/view")
@Controller
public class move_View{
	@GetMapping("/post")
	public String post(){
	return "post.html";
	}
}
```
위의 코드에서 post()메소드는 /view/post 요청이 들어와야만 동작한다.