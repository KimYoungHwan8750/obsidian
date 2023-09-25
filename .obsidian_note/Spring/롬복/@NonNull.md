#### NonNull
Null값이 들어올 시에 NullPointerException을 일으키고 싶은 변수 위에 사용하면 된다.

#### 예제

```java
@Setter
public class Obj{
@NonNull 
String id;
}

Obj obj = new Obj();
obj.setId(null); // NullPointerException 발생


```

## 주의사항

위 코드를 보면 알겠지만 id에 대한 setter 메서드가 setId()로 정의되어 있다.
롬복의 getter 메서드와 setter 메서드는 자바의 명명규칙인 camelCase를 따르기 때문에 사용에 유의가 필요하다.
