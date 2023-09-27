#### Singular
반드시 [[@Builder]]패턴이 선행되어야한다.
List에  요소를 개별적으로 추가할 수 있게 해준다. 예를 들면
```java
@Builder
public class Forest{
	String tree;
	String flower;
	String grass;
	@Singular
	List<String> Animals;
}

Forest forest = Forest.builder().tree("나무").flower("꽃").grass("잡초").Animal("사자").Animal("기린");
```

리스트에 담긴 값도 `@Builder`어노테이션에 의해 getter 메서드로 조회 가능하다.

#### Builder를 사용하지 않고 List Getter 메서드 만들기

```java
public class User {
    private List<String> roles;

    public List<String> getRoles() {
        return new ArrayList<>(roles);
    }
}

```

해당 방식은 새로운 List를 만들고 roles의 값을 대입해 복사본을 만들어 반환하여 값을 표시한다.
이러한 방식을 사용하는 이유는 안정성에 있다. 만약 복사본이 아니라 원본을 반환한다고 가정해보자.

```java
public class User {
    private List<String> roles;

    public List<String> getRoles() {
        return new roles;
    }
}
```

이렇게 되면 `getRoles().add("안녕!")`을 통해 해당 객체를 호출하면 원래 리스트에 안녕!이라는 값이 추가된 리스트를 반환받는다. 안녕!이라는 값이 추가된 형태로 원래 객체가 갱신된다.

하지만 첫번째 방식처럼 새로운 리스트를 만들어 반환하게 되면 `getRoles().add("안녕!")`으로 인해 roles 리스트에 안녕!이 추가된 값을 반환받아 사용가능하지만 원래 객체는 안녕!이라는 값이 추가되지 않고 원본을 유지할 수가 있다.

## 주의사항

#### 네이밍 규칙

Singular어노테이션은 `List<String> Animals`에 대해 `.Animal("기린")`과 같은 단수형 메서드를 자동으로 만들어준다.

예시를 하나 더 들어보자면 `List<String> Trees`라는 리스트에 대해 .Tree()로 접근 가능하다.

참고하자면 자바는 변수와 필드 이름은 소문자로 시작할 것을 권고하고 있다.