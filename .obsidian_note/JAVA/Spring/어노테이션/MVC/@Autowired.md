#### Autowired

```java

public class Car{
	String wheels;
	String doors;
}

public class Genesis{
	public final Car car;
	public Genesis(Car car){
	this.car = car;
	}
/*@Autowired
public class Genesis{
	public final Car car;
	public Genesis(Car car){
	this.car = car;
	} 이 코드는 같은 동작을 한다.
	생성자가 하나일 때는 @Autowired가 없어도 스프링이 알아서 의존성을 주입해준다.
	이 경우 위와 같이 Autowired를 붙이지 않는 편이 현대적인 코드 스타일링에 더 부합하다.
	(코드에는 필요한 정보만 최소한으로 표시한다)*/
	
}
```

@Autowired 어노테이션은 위와 같은 생성자 주입을 자동으로 해준다.

