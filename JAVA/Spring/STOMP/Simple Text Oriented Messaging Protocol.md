## 구현 :
* payload는 json으로 전송해야한다. 일반 문자열로 보낼시 `[Object object]`이며 파싱에러가 발생한다.

#### Config
```java
@Configuration  
@EnableWebSocketMessageBroker  
public class StompConfig implements WebSocketMessageBrokerConfigurer {  
  
  
    @Override  
    public void registerStompEndpoints(StompEndpointRegistry registry) {  
        registry.addEndpoint("/socket")  
                .setAllowedOriginPatterns("*")  
                .withSockJS();  
    }  

	/**
	* 아래 내용은 필수 설정은 아니다.
	* prefix를 설정하는 registry인데 SimpleBroker같은 경우 유저가 메세지를 보내는 Destination이고
	* ApplicationDestinationPrefixes 같은 경우 구독할 때 prefix를 설정한다.
	*/
    @Override  
    public void configureMessageBroker(MessageBrokerRegistry registry){  
        registry.enableSimpleBroker("/one","/all");  
        registry.setApplicationDestinationPrefixes("/stomp");  
    }  
}
```

---
#### Controller
```java
@RestController  
@RequiredArgsConstructor
public class WebSocketRestController {  
    private final SimpMessagingTemplate simpMessagingTemplate;  
    StompHeaders stompHeaders;  
    @MessageMapping("/message/send")  
    public String MessageTest(testDTO testDTO, MessageHeaders messageHeaders){  
        System.out.println(messageHeaders);  
        System.out.println("msg내용 =" + testDTO.toString());  
        simpMessagingTemplate.convertAndSend("/one/message/sender","컨트롤러 내용");  
        return "STOMP 테스트";  
    }  
}
```

---
#### dataDTO
```java
@ToString  
@Getter@Setter  
public class testDTO {  
    private String field1;  
    private String field2;  
}
```