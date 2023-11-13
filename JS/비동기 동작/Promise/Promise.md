프로미스 객체는 new Promise()를 통해 생성하고 매개인수로 executor 함수를 받는다.
executor함수의 첫번째 인자는 resolve함수이고 두번째 인자는 reject 함수이다.

아래의 세가지 status를 가진다.
- pending(대기): 이행하지도, 거부하지도 않은 초기 상태
- fulfilled(이행): 연산이 성공적으로 완료됨
- rejected(거부): 연산이 실패함
## 예제
```js
/*
	ok = resolve, no = reject
	resolve와 reject의 이름을 커스텀 할 수 있다는 것을 보여주기 위한 예제로,
	보통 resolve와 reject는 보편적으로 쓰는 콜백함수명이기 때문에 준수해야한다.
*/
let hi = new Promise((ok,no)=>{
	setTimeout(()=>{
		ok("성공했어요.")
	},5000);

}) 


```

resolve와 reject를 호출하면 각각 성공과 실패에 해당하는 프로미스 객체가 반환된다.
반환된 프로미스 객체에 .then메서드와 .catch 그리고 .finally 메서드를 통해 적절한 동작을 수행할 수 있다.
