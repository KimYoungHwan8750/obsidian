form의 submit을 수행한다.
#### 예제
```html
<form class = "myForm">
</form>


<button class = "submit">완료</button>
```


```js
const $myForm = document.querySelector('.myForm');
const $button = document.querySelector('.submit');

$button.addEventlistener('click',()=>{
	$myForm.submit(); // myForm의 서브밋 이벤트 실행
})

```