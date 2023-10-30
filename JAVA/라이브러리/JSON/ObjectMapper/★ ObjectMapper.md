
#### 사용 예제

```java
public void JsonObj(@RequestBody String obj) throws JsonProcessingException {  
    ObjectMapper mapper = new ObjectMapper();  
    Member_Snake member_snake = mapper.readValue(obj, Member_Snake.class);  
    log.info("member_snake1={}",member_snake.getMember_snake1());  
    log.info("member_snake2={}",member_snake.getMember_snake2());
```

JsonProcessingException에 예외를 전가해야한다.
예외를 전가하지 않고 클래스를 상속받아봤는데 기본 생성자가 없다며 생성이 안 된다.
예외 전가만 가능한 듯하다.

##  ★★ 심화 사용 예제
필드값과 객체, 배열까지 모두 응용한 예제이다.


#### EmbeddedObject (String, Object, List\<\>)
```java
@NoArgsConstructor  
@Getter  
@Setter  
public class EmbeddedObject{  
    private String f1;  
    private Member_Snake f2;  
    private List<Member_Snake> f3;  
    private EmbeddedObject(String f1, Member_Snake f2, List<Member_Snake> f3){  
        this.f1=f1;  
        this.f2=f2;  
        this.f3=f3;  
    }  
  
}
```

#### 클라이언트에서 보내는 객체
```js
let example =  
    {  
        "f1":"f1v",  
        
        "f2":  
            {"member_snake1":"v1",  
            "member_snake2":"v2"},
              
        "f3":[{"member_snake1":"l1",  
            "member_snake2":"l2"},  
            {"member_snake1":"l3",  
                "member_snake2":"l4"}]  
    }
```

#### 컨트롤러에서 Json을 객체에 매핑
```java
@PostMapping("/json_obj")  
public void JsonObj(@RequestBody String obj) throws JsonProcessingException {  
    ObjectMapper mapper = new ObjectMapper();  
    EmbeddedObject embeddedObject = mapper.readValue(obj, EmbeddedObject.class);  
    log.info(embeddedObject.getF1());  
    log.info(embeddedObject.getF2().getMember_snake1());  
    log.info(embeddedObject.getF2().getMember_snake2());  
    log.info(embeddedObject.getF3().get(0).toString());
    log.info(embeddedObject.getF3().get(1).toString());
```

#### Result
```java
log.info(embeddedObject.getF1());  // f1v
log.info(embeddedObject.getF2().getMember_snake1()); // v1
log.info(embeddedObject.getF2().getMember_snake2());  // v2
log.info(embeddedObject.getF3().get(0).toString());  // Member_Snake(member_snake1=l1, member_snake2=l2)
log.info(embeddedObject.getF3().get(1).toString()); // Member_Snake(member_snake1=l3, member_snake2=l4)
```


## 의문
이렇게만 보면 그냥 [[@RequestBody]]랑 뭐가 다를까 싶지만 ObjectMapper는 좀 더 다양한 상황에서 쓰일 수 있다.

#### 파일 읽어서 객체 만들기
```json
{"member_snake1":"값1",
 "member_snake2":"값2"}
```
위와 같은 형태의 JSON파일이 같은 경로에 member_snake.json이란 파일로 존재한다고 가정했을 때

```java
public static void main(String[] args) throws IOException {  
    System.out.println("hi");  
    File file = new File("C:\\Users\\seoye\\OneDrive\\바탕 화면\\영환이 작업 폴더\\프로젝트 폴더\\springStudy\\src\\main\\java\\com\\kyh\\springStudy\\TestArea\\member_snake.json");  
    ObjectMapper objMapper = new ObjectMapper();  
    Member_Snake member_snake= objMapper.readValue(file, Member_Snake.class);  
    System.out.println(member_snake.getMember_snake1());  
    System.out.println(member_snake.getMember_snake2());
```