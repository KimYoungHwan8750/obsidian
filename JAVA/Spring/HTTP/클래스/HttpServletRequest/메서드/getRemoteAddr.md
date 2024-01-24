클라이언트의 Ip 주소를 가져온다.
프록시 등 변수가 생길 경우 다른 값을 가져올 수도 있기 때문에 정확한 값을 가져오기 위해선 아래와 같은 코드를 추가해야한다.


* VM 옵션에 `-Djava.net.preferIPv4Stack=true` 추가
```java
public String goToMain(Model model, HttpServletRequest request) {  
    String ip = request.getHeader("X-Forwarded-For");  
    if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {  
        ip = request.getHeader("Proxy-Client-IP");  
    }  
    if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {  
        ip = request.getHeader("WL-Proxy-Client-IP");  
    }  
    if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {  
        ip = request.getHeader("HTTP_Client-IP");  
    }  
    if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {  
        ip = request.getHeader("HTTP_X_FORWARDED_FOR");  
    }  
    if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {  
        ip = request.getRemoteAddr();  
    }
}
```
