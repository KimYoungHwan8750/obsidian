[[JSON]]을 이용해 보낸다.
#### JAVA SCRIPT

```
<script>
let obj = new Object;
obj.data1 = "data1";
obj.data2 = "data2";
obj.data3 = "data3";
</script>

/* RESULT 
console.log(obj)
<data1:"data1";
*/
```
[클라이언트 객체를 서버 객체로 이식하기]>(https://hdhdeveloper.tistory.com/114)


#### 객체 형태

```
let object =
	{ 
	data1:"data1",
	data2:"data2"
	}
```

```
let object = new Object;
	object.data1 = "data1";
	object.data2 = "data2";
```

이 둘은 기본적으로 JSON.stringify(object)를 통해 서버로 보냈을 때

```
Map<String,Object> example라는 동일한 양식으로 값을 받아올 수 있다.
```

```
example.get("원하는 키")를 통해 사용 가능하다.
```
