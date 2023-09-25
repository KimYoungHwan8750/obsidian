
Entity에 JSON객체를 매핑하려고 할 때 제이슨 키 값과 자바 필드를 원하는 값으로 맵핑 가능하다.

### 사용법
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