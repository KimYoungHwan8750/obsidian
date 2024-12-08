```js
// stack = Last In First Out
let array = [1,2,3,4,5];
array.push(6); // push메서드의 리턴값은 넣은 값 그 자체다.
console.log(array); // [1,2,3,4,5,6]

array.pop(); // 반환 값: 꺼낸 값 그 자체 (6)



//queue = First In First Out
let array = [1,2,3,4,5];
array.push(6); // array = [1,2,3,4,5,6]
array.shift(); // 1, array = [2,3,4,5,6]
array.unshift('일') // 5 배열의 크기 반환
```

### Stack
* push : 맨 뒤에 값을 넣는다.
	* 반환 값은 넣은 값 그 자체
* pop : 맨 뒤의 값을 꺼내온다.
	* 반환 값은 꺼낸 값 그 자체

### Queue
* push : 맨 뒤에 값을 넣는다.
	* 반환 값은 넣은 값 그 자체
* shift : 맨 앞에 값을 꺼내온다.
	* 반환 값은 꺼낸 값 그 자체
* unshift : 맨 앞에 값을 넣는다.
	* 반환 값은 넣고 난 후 배열의 크기