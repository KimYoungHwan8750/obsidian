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


## 참조
[[Spring] Service, ServiceImpl 의 관계 (feat. OCP) (tistory.com)](https://junior-datalist.tistory.com/243)