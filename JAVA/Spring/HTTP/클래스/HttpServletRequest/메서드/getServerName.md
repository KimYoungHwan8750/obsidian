```java
@PostMapping("/test")
public String test(HttpServletRequest request){
	System.out.println(request.getServerName());
	return "";
}
```

대상 URL

`http://127.0.0.1:8080/contextpath/servl  etpath/index.jsp?seq=1&type=NOTICE`
