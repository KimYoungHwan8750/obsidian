
#### 특이사항
파라미터에 @ModelAttribute를 입력하지 않아도 스프링이 자동으로 매핑해준다.
요청 데이터가 int,String,boolean등 단순한 타입이면 [[@RequestParam]]을 참조하고 외의 경우엔 ModelAttribute를 참조하는데, 직관적인 코드 가독을 위해서 명시하도록 하자.
#### 이해를 돕기위한 예제
`/obj?k1=1&k2=2`

```java
@NoArgsConstructor
@Setter // 필수! @ModelAttribute는 기본 생성자가 있으면 기본 생성자로 생성 후 Setter메서드를 이용해 바인딩한다.
public class MyObj{
	private int k1;
	private int k2;
}

@GetMapping("/obj")
public void objTest(@ModelAttribute MyObj myObj){
	log.info(myObj.toString()); // k1=1, k2=2
}
```

## Map이나 List로 받아올 때 주의
ModelAttribute는 필드명과 일치하면 바인딩해주는 어노테이션이다.
Map이나 List의 필드엔 해당하는 이름이 없으므로 @RequestParam을 사용해야한다.



#### 주의사항
@NoArgsConstructor와 함께 쓸 경우 setter메서드가 필수. 이유는
ModelAttribute는 매핑할 때 다음의 경우가 있다.

생성자가 존재할 때
생성자가 존재하지 않을 때

* 생성자가 존재할 때 : 해당 생성자를 통해 생성하고 setter메서드를 통해 덮어씌운다.
* 생성자가 존재하지 않을 때 : 필드를 초기화하고 setter메서드를 통해 값을 입력한다.