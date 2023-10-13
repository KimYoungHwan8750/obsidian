```java
@Service("test")
public class myRepository{
	@Override
	public parentMethod(){
		System.out.println("부모 메서드 오버라이딩");
	}
}
```

스프링 컨테이너에 빈을 등록한다.
Repository는 DB에 접근하는 객체임을 명시해준다.
[[@Repository]]와 기능적 차이가 있는 것은 아니다.