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

만약
```js
let object;
let object2;
object2.obj2="obj2"
object2.obj3="obj3"

object.data1 = "data1";
object.data2 = object2;
```
이런 형태로 문자열과 객체가 동시에 존재하는 오브젝트 `object`를 서버쪽에 송신하게 되면
서버 단에서는
```java
@GetMapping("/test")
@ResponseBody
public String test(@RequestBody Map<String,Object> object){
String str = (String) object.get(#Key값);//해당 key의 밸류는 문자열로만 이루어진 object여야한다.
}
```
Map Entries를 String, Object로 받아서 처리할 수 있다.