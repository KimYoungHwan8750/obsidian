
프로미스 체이닝이 거듭될수록 가독성을 저해하고 Promise의 본래 목적을 저해하는 난잡한 코드가 되는데, 이를 방지하기 위해 나온 문법이다.

비동기 코드들을 동기형태로 표현해줄 수 있다.

## 프로미스 표현법

```js
// 기존 Promise 문법
// 입력받은 값에 1을 더해서 프로미스 객체로 반환하는 코드
function addOne(value){
	return new Promise((ok,no)=>{
	ok(value+1)
	})
}

// 태스크1 : 계산을 시작할 프로미스 객체를 반환하는 태스크
let task1 = new Promise((ok,no)=>{
	ok(1)
})

task1
.then(addOne)
.then(addOne)
.then(addOne)
.then(addOne)
.then(res=>console.log(res)); // 5출력

```

## async await 표현법

```js

// 위의 코드를 동기식 표현으로 작성

function addOne(value){
	return new Promise((ok,no)=>{
	ok(value+1)
	})
}

let startTask = async()=>{
	let task1 = await new Promise((ok,no)=>{ok(1)})
	let task2 = await addOne(task1);
	let task3 = await addOne(task2);
	let task4 = await addOne(task3);
	let task5 = await addOne(task4);
	console.log(task5) // 5
}
startTask();
```

이처럼 깔끔한 코드가 만들어진다.

IIFE(즉시 실행 함수 표현식)과 조합해서 쓰면 편리하다.

![IIFE](Javascript/함수/function/IIFE.md#IIFE)