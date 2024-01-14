## 생성
HttpServletResponse 객체가 관리한다.
```java
public thisIsControllerMethod(HttpServletResponse httpServletResponse){
	Cookie cookie = new Cookie(key,value);
	cookie.setMaxAge(60*60); // 3600초, 1시
	httpServletResponse.addCookie(cookie);
}
```