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

# Request 매핑 전략

1. consumes, produces
2. params
3. headers
## consumes, produces

#### consumes
comsumes로 정의한 content type을 매핑 전략에 사용할 수 있다.
아래는 hi라는 path로 들어온 Content Type : application/json 타입에 대해서만 반응한다.
```java
@PostMapping(value="/hi",consumes=MediaType.APPLICATION_JSON_VALUE)
public String hi(){
	...
}
```

produces
produces로 정의한 accept 전략에 사용할 수 있다.
무슨 의미냐하면 클라이언트측에서 헤더에 Accept:application/json라고 명시해놓았다고 가정하자.

RestController
```java
@PostMapping(value="/hi",produces = MediaType.APPLICATION_JSON_VALUE)
public String testMethod1(){
	return "json 응답";
}

@PostMapping(value="/hi",produces = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
public String testMethod2(){
	return "form urlencoded 응답";
}
```

클라이언트는  같은 주소에 대한 요청으로 위 응답 중 json 응답을 받아보게 될 것이다.

## params

```java
// /post?useYn=Y 일 경우 호출됨  
@RequestMapping(value="/post", params="useYn=Y")  
  
// not equal도 가능  
@RequestMapping(value="/post", params="useYn!=Y")  
  
// 값에 상관없이 파라미터에 useYn이 있을 경우 호출됨  
@RequestMapping(value="/post", parmas="useYn")  
  
// 파라미터에 useYn이 없어야 호출됨  
@RequestMapping(value="/post", params="!useYn")
```

## headers

```java
헤더 값으로 구분할 수 있다.  
방식은 위의 params와 비슷하다.

@RequestMapping(value="/post", headers="content-type=text/*")
```



매핑 전략 조합

```java
@RequestMapping(value="/post", params="useYn=Y")  
public class PostController{  
    // /post?useYn=Y&isForeign=Y 에 매핑됨  
    @RequestMapping(params="isForeign=Y")  
}
```