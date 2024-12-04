
## then
```js
/*
	첫번째 매개인수로 성공시 콜백함수
	두번째 매개인수로 실패시 콜백함수를 받는다.
	이는 catch문 사용의 권장으로 이어지니 해당하는 내용은 catch 블록에 서술한다.
*/
Promise.ptorotype.then(fulfilledCallback,rejectedCallback)

```


```js
let test = new Promise((resolve,reject)=>{
	setTimeout(()=>{
		resolve("3초 뒤에 메세지 뜸")
	},3000)
})
console.log(test) // Pending 상태인 Promise 객체 정보 출력됨
test.then(()=>{console.log(test)} // fulfilled 상태인 Promise 객체 정보 출력됨
// 3초 뒤에 메세지 뜸

```

두번째 매개인수로 reject에 대한 처리를 하게 되면 catch로 예외를 던지지 않으며 해당 then의 reject에 대한 처리만 가능하므로 사용법을 숙지한다면 유용하게 사용 가능하다.
## catch
프로미스의 결과가 rejected일 때의 동작을 수행할 수 있다.
then의 두번째 인자로 예외처리하는 것보다 용이한 것이,
가독성에도 좋도 어느 블록에서 에러가 나도 캐치해서 사용자에게 보여줄 수 있다.

```js
test
.then(functionA)
.then(functionB)
.then(functionC)
.then(functionD)
.catch(e=>console.error(e));

// 어느 프로미스에서 에러가 나도 catch가 가능하다.
```

또한 then의 두번째 인자를 통해 reject에 대한 처리를 하게 되면 catch문에는 잡히지 않는다.
## finally
파이널리 함수는 매개인수를 받지 않는다.
따라서 then 및 reject의 연산 결과를 finally 블럭에서 사용할 수 없으며
응답의 성공과 실패 여부에 상관 없이 반드시 실행되어야 하는 코드를 넣으면 된다.