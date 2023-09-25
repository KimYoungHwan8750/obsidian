Body에 담긴 데이터를 사용할 수 있는 방법이 두 가지가 있다.

#### 클라이언트에서 보낸 객체가 서버 쪽에 존재하는 객체일 경우


객체 내부에 설정된 getter setter 메소드를 통해 데이터를 열람 및 조작 가능하다.

#### 클라이언트에서 보낸 객체가 서버엔 존재하지 않는 객체일 경우


```java
@ResponseBody
@GetMapping
public void test(@RequestBody Map<String,String> object){
object.get("키이름");
}
```
해당 방식을 통해 데이터를 가져올 수 있다.