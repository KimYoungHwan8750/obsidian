```java
@Repository
public interface ChatService {
@Autowired
private final RepositoryChat repChat;
ChatService(RepositoryChat repChat){
this.repChat = repChat;
}

}
```