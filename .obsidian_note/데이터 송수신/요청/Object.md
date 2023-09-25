[[JSON]]형식으로 변환 후 보낸다.
#### JAVA SCRIPT

```javascript
let obj = new Object;
obj.data1 = "data1";
obj.data2 = "data2";
obj.data3 = "data3";

/* RESULT 
console.log(obj)
<data1:"data1";
*/
```
[객체를 서버에 전송하기]>(https://hdhdeveloper.tistory.com/114)


#### 객체 형태

```javascript
let object =
	{ 
	data1:"data1",
	data2:"data2"
	}
```

```javascript
let object = new Object;
	object.data1 = "data1";
	object.data2 = "data2";
```

이 둘을 JSON형태로 서버에 보냈을 때

```
Map<String,Object> example라는 동일한 양식으로 값을 받아올 수 있다.
```

```
example.get("원하는 키")를 통해 사용 가능하다.
```
