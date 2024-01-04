## 이벤트 리스너 :
이벤트 리스너를 정의할 수 있다.
스프링 4.2버전 이상부터 사용 가능하다.
4.2버전 이하에서는 ApplicationEvent를 상속받고
ApplicationListener\<T\>를 구현한다.


---
## 사용법 :
1. 이벤트 리스너를 사용할 객체를 생성한다.
```java
@Component  
public class MyObject {  
    String hi = "hi";  
}
```

2. 이벤트 리스너를 등록한다.
```java
@Component
public class WebSocketEventListener {  

    @EventListener  
    public void listenerTest(MyObject myObject){  
        System.out.println("호출됨!");  
    }  

}
```

3. 이벤트 퍼블리셔를 통해 이벤트를 발생시킨다.
```java
@RestController
@RequiredArgsConstructor
private final ApplicationEventPublisher publisher;  
@GetMapping("/event")  
public void eventTest(MyObject myObject){  
    publisher.publishEvent(myObject);  
}
```

---

## 추가 정보 :
* 하나의 객체에 여러 이벤트를 핸들링할 수 있다.
* 이때 핸들링되는 이벤트들의 순서가 중요하다면 @Order 어노테이션을 이용한다.
![[@Order]]