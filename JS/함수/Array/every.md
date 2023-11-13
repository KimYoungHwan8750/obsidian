`Array.every()`

배열의 모든 내용이 조건을 충족하는지 검사한다.
```js
    let arr = [1,2,3,4,5];
    console.log(
	    arr.every((num)=>{
	    return num<5;
	    })
    );
```

내부 람다식으로 반환한 값이 모두 true일 때 true 반환

이를 응용해서 서로 다른 인덱스를 가졌지만 내용이 모두 같은 배열을 조사할 수 있다.

```js
let a = [1,3,5,4,2];
let b = [5,2,1,4,3];
	console.log(a.every((item)=>{
		return b.includes(item);
	})) // true
```
