배열을 순회하며 요소를 하나하나 꺼내올 수 있다.
이때 특이사항이 존재하는데
forEach를 쓰면 내부 람다식에 3개의 인자를 전달해준다.
각각 순서대로 서술한다.
1. 첫번째 인자 : 순회중인 인덱스의 요소 그 자체
2. 두번째 인자 : 순회중인 인덱스 번호
3. 세번째 인자 : 순회중인 요소 그 자체

```js
let arr = [1,2,3,4,5,6];
	arr.forEach((elem,idx,array)=>{
	// 0번째 인덱스를 순회중이라고 가정했을 때
	console.log(elem); // 1
	console.log(idx);  // 0
	console.log(array); // [1,2,3,4,5,6]
	}
)

let arr = [1,2,3,4,5,6];
	arr.forEach(function(elem,idx,array){
	// 0번째 인덱스를 순회중이라고 가정했을 때
	console.log(elem); // 1
	console.log(idx);  // 0
	console.log(array); // [1,2,3,4,5,6]
	}
)
```