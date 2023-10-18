```java
@PostMapping("/test")
public String test(HttpServletRequest request){
	System.out.println(request.getContextPath());
	return "";
}
```

대상 URL

`http://127.0.0.1:8080/contextpath/servletpath/index.jsp?seq=1&type=NOTICE`

얻어오는 정보
`/contextpath`
