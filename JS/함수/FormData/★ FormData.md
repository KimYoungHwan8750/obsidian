FormData는 form과 같은 동작을 한다. 무슨 말이냐면 데이터를 보낼 때 키값과 밸류 값이 파라미터와 그 값으로  쓰인다. 예제를 보면 이해하기가 쉽다.

#### 대응하는 자바 객체
```java
public class FormData{
	public String firstData;
	public String secondData;
}
```

#### 컨트롤러
```java
@PostMapping("/obj")
public FormData formTest(@ModelAttribute FormData formdata){
	log.info(formdata.toString());	
}
```
#### 자바스크립트
```js
let formData = new FormData();
formData.append("firstData":"1");
formData.append("secondData":"2");
let url = "/obj";
let options = 
	{
	body:formData,
	method:'post'
	}
fetch(url,options);
```

즉 자바 측에서 Parameter 관련된 함수들을 사용가능하면서 쿼리스트링엔 표기되지 않는 form 태그와 같은 역할을 한다.

쿼리스트링이`/obj?test=1`일 때 form 태그를 통해 보내면 `/obj` 와 같이 쿼리스트링이 표시되지 않지만 컨트롤러에서 `@RequestParam String test` 와 같이 사용 가능하다.