```java
@PostMapping("/test")
public String test(HttpServletRequest request){
	System.out.println(request.getRequestURL());
	return "";
}
```

대상 URL

`http://127.0.0.1:8080/contextpath/servlcetpath/index.jsp?seq=1&type=NOTICE`

얻어오는 정보
`http://127.0.0.1:8080/contextpath/servlcetpath/index.jsp`