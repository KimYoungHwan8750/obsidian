BEAN으로 등록하게 되면 스프링 컨테이너에 의해 관리되며 하나의 인스턴스만 존재하게 된다.
따라서 DTO같은 경우엔 데이터를 처리하고 싶을 때마다 새로운 객체를 생성하고 수정하게 되기 때문에 DTO는 BEAN으로 등록하면 안 된다.
```java
public Class Test{}


public interface TestService{
Test test;
@Autowird
TestService(Test test){
	this.test = test;
	}
}
```

위의 코드는 오류를 일으킨다. 스프링에서 Test 라는 빈을 찾지 못한다.

```java
@Repository // 또는 @Bean
public Class Test{}


public interface TestService{
Test test;
@Autowird
TestService(Test test){
	this.test = test;
	}
}
```
어노테이션을 활용해서 Test를 Bean으로 등록해주어야만 TestService에서 Test라는 Bean을 사용 가능하다.