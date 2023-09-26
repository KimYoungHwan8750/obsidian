#### Autowired

```java

public class Car{
	String wheels;
	String doors;
}

public class Genesis{
	public final Car car;
	public Genesis Genesis(Car car){
	this.car = car;
	}
	
}
```

@Autowired 어노테이션은 위와 같은 생성자 주입을 자동으로 해준다.

