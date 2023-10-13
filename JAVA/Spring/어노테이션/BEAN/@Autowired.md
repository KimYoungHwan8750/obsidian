
```java
public interface ParentInterface {
	void test();
}

@Repository("childClass")
public class childClass implements ParentInterface{
	@Override
	public void test(){
	System.out.println("테스트");
	}
}
```

인터페이스를 구현할 때 의존성주입을 자동으로 해준다.

#### Autowired 리팩터링
#### 전

```java
@Service
public class ServiceImpl {
	private final ParentInterface parentInterface;
	ServiceImpl(ParentInterface parentInterface){
	this.parentInterface = new ChildClass();
	}
}
```
#### 후
```java
@Service
public class ServiceImpl{
	@Autowired
	private final ParentInterface parentInterface;
}
```


#### 참고사항
Autowired는 의존성을 주입할 때 "타입"을 통해 주입한다.
따라서 다음과 같이 같은 타입이 두 개 이상일 때는 다른 방법을 사용해야한다.
예제를 보겠다.

```java
public interface ParentInterface {
	void test();
}

@Repository("childClass1")
public class childClass1 implements ParentInterface{
	@Override
	public void test(){
	System.out.println("테스트1");
	}
}

@Repository("childClass2")
public class childClass2 implements ParentInterface{
	@Override
	public void test(){
	System.out.println("테스트2");
	}
}
```

## 방법
1. 구현체 이름으로 찾기 :
```java
public class ServiceImpl implements Service{
	private final ParentInterface childClass;
}
```