폼 안에 input의 name속성에 적힌 값이 Parameter 이름으로 쓰인다.
#### 예제

```html
<form>
<input type="text" name="id" value="">
<button></button>
</form>
```

보통 이벤트 리스너와 함께 쓰이는 경우가 많기 때문에 아래에 관한 메모를 참조하자.

## 폼데이터 바인딩

```js

Case 1.
let Member_snake={  
    member_snake1:"m1"  
}  

Case 2.

let Member_snake={  
    member_snake1:"m1",  
    member_snake2:"m2"  
}  

Case 3.

let Member_snake={  
    member_snake1:"m1",  
    member_snake2:"m2",  
    member_snake3:"m3"  
}  
```

컨트롤러
```java
...생략(@ModelAttribute Member_snake member_snake){
	log.info(member_snake.toString())
}
```

결과
```java
Case 1.
member_snake1=m1
member_snake2=null;

Case 2.
member_snake1=m1
member_snake2=m2

Case 3.
member_snake1=m1
member_snake2=m2
```

#### 결과 도출 : 파라미터와 같은 필드가 있으면 바인딩되고 아니면 null

```js
let Member_snake={  
    member_snake1:"m1",  
    member_snake2:"m2",  
    member_snake3:"m3",  
}
```

```java
@PostMapping("/params")  
public Member_Snake ParamsTest(@ModelAttribute Member_Snake member_snake,@RequestParam (value = "member_snake1")String member1,@RequestParam String member_snake3){  
    log.info("member_snake 객체 : {}, member_snake1 = {}, member_snake3 = {}",member_snake.toString(),member1,member_snake3);  
return member_snake;  
}
```
또한 위와 같은 코드에서 log에 객체와 member_snake1, member_snake3 값이 모두 출력되는 걸 보면 파람값의 재사용도 허용되며 ModelAttribute에 값이 바인딩되지 않은 m3도 출력되는 걸 보면 객체에 값이 바인딩되었다고 하더라도 값이 소비되거나 하진 않는다.

말그대로 폼데이터를 넘겨주면 해당 엔트리를 자바에서 변수처럼 자유자제로 사용 가능하다.
#### 유용한 사용법

```html
<form class="testForm">
<input type="text" name="id" value="1">
<input type="text" name="pw" value="2">
</form>
```
위와 같은 형태의 폼데이터의 submit()이벤트를 중간에 탈취해서
사용자가 원하는 연산을 할 수 있다.

```js
let $testForm = document.querySelector(".testForm");
$testForm.addEventListener('submit',(evt)=>{
	evt.preventDefault();
	let form = new FormData(this);
	
	// {id:1,
	//	value:2}
})

```


![[폼태그와 이벤트 리스너]]

![[URLSearchParams]]