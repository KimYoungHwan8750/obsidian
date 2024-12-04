
객체와 배열을 위해 존재하는 반복문

```js
let obj = {a:1,b:2};

for (let key in obj){
	console.log("키:"+key+"밸류:"+obj[key])
}
```