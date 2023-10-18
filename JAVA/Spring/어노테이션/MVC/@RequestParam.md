쿼리스트링의 Parameter값을 받아온다.
POST요청의 쿼리스트링에도 사용이 가능하지만 그렇다면 Post방식으로 전송할 필요가 없다.
또한 form태그의 name 값과 일치한다면 사용 가능하다.
FormData의 키값을 파라미터로 가져 올 수 있다.


#### form태그안 input태그의 name이 Key이름이고 value가 Value가 된다
```html
<form>
<input type="text" name="value1">
<button>전송</button> <!-- 기본 타입이 submit이다. -->
</form>
```

```java
@PostMapping("/form")
public String formTest(@RequestParam String value1){ // 이때 매개변수명이 파라미터명과 일치해야함
	log.info("value1={}", value1);
	return value1;
}
```

#### FormData 예제
#### 자바
```java
@PostMapping("/obj")
public String formTest(@RequestParam String k1, @RequestParam String k2){ // 이때 매개변수명이 파라미터명과 일치해야함
	log.info("k1={}, k2={}",k1,k2);
	return "";
}
```

#### 자바스크립트
```js
let formData = new FormData();
formData.append("k1","v1");
formData.append("k2","v2");
fetch("/obj",{method:"post",body:formData})
```

#### 결과
```java
// k1=v1
// k2=v2
```