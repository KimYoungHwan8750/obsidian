
Entity에 JSON객체를 매핑하려고 할 때 제이슨 키 값과 자바 필드를 원하는 값으로 매핑 가능하다.

### 사용법

#### 예제
```javascript
// 자바 스크립트 측 객체
let obj = {"PW":"testPassword"}


```
```java
// 자바 측 객체
@Getter
public class Test{
private String PW;
}

@PostMapping(value="/test")
public void test(@RequestBody Test test){
sout(test.getPW()); // "testPassword"
}
/* 
obj를 서버에 보내게 되었을 때 obj와 같은 자바 객체가 있을시 매핑해서 사용 가능한데 자바 객체의 필드명이 모두 대문자일 경우 같은 PW인데도 매핑이 안 되는 현상이 발생한다.
이는 자바의 명명 규칙이 camelCase를 따르기 때문에 매핑하는 과정에서 클라이언트측 객체의 PW를 자바 객체 PW에 매핑하는 과정에서 자바 객체의 필드명 PW를 pw로 읽어들이면서 생기는 오류이다.
*/
```

```java
@JsonProperty("PW")  
private String PW;

// JSON 객체 중 키값 "PW"를 자바 객체 PW에 매핑시켜준다.
```

```java
@JsonProperty("password")  
private String PW;

// JSON 객체 중 키값 "password"를 자바 객체 PW에 매핑시킨다.
```