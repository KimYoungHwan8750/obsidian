## 구현 :

```java
@Configuration  
@EnableWebSocketMessageBroker  
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {  
  
  
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