#### 오버라이딩
부모 요소에서 정의된 메서드를 재정의하여 사용하는 것

```java
public class MotherTest{
public test(){
sout("수정되기 전입니다.");
	}
}
```

오버라이딩
```java
public class ChildTest extends MotherTest{
@Override
public test(){
sout("수정된 후 입니다.")
}
}
```