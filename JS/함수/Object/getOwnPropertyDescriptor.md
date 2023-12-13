#### 사용법
```js
let myObj = {
	field1:1,
	field2:2
}
console.log(Object.getOwnPropertyDescriptor(myObj,"field1"))

```

hasOwn()는 true || false인데에 반해 위 메서드는 해당 프로퍼티에 대한 정보를 보여준다.

![[getOwnPropertyDescriptor.png]]