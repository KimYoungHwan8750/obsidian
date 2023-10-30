다양한 형태로 존재하는 JSON파일을 파싱해준다.

## JSON 파일
```json
{"member_snake1": "data1",  
"member_snake2": "data2"}
```
## 매핑할 Object
```java
@NoArgsConstructor  
@AllArgsConstructor  
@Setter  
@Getter  
@ToString  
public class Member_Snake {  
    private String member_snake1;  
    private String member_snake2;  
  
}
```

## 매핑
```java
ObjectMapper mapper = new ObjectMapper();  
Member_Snake member_snake = mapper.readValue(new File("C:\\Users\\seoye\\OneDrive\\바탕 화면\\영환이 작업 폴더\\프로젝트 폴더\\springStudy\\src\\main\\resources\\templates\\jsontest.json"), Member_Snake.class);  
log.info(member_snake.toString());
// Result : member_snake1 = data1, member_snake2 = data2
```