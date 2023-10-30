```js
function testMethod(t1,t2,t3){
	if(arguments.length==1){
		console.log("인자가 하나입니다.");		
		} else if (argumetns.length==2){
		console.log("인자가 둘입니다.");
		} else if (arguments.length==3){
		console.log("인자가 셋입니다.");
		} else {
		console.log("인자가 셋 이상입니다.");
		}
}
```

#### 사용 예제
함수 내에서 쓰면 현재 함수의 인자에 대한 여러가지 정보를 얻어올 수 있다.
