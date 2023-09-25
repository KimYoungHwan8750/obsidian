
#### ResponseBody
[[@RequestBody]]를 통해 Parameter값을 받아들이고 해당 데이터의 headers에 담긴
MIME정보를 받아와서 ResponseBody를 통해 같은 형식의 데이터를 보내준다.
```java
fetch("/test",
	{
	method:"post",
	headers:{"Content-Type":"application/json"},
	body:JSON.stringify({"data1":"data2"})
	})
```
해당 비동기 요청에 대해 RequestBody 어노테이션으로 요청한 정보들을 서버에 받아온다.
ResponseBody 어노테이션은 해당 정보를 RequestBody의 헤더에 담겨있던 Content-Type와 같은 형식으로 매핑해 클라이언트에게 반환해준다.