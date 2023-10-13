```java
@GetMapping("/test")
public String test(@SessionAttribute(name="key",required = false)){
return "test.html";
}
```

첫번째 인자로 키값, 두 번째 인자로 boolean을 받는다.
/test로 요청이 들어온 사용자의 세션을 "key"라는 키값으로 저장한다.
