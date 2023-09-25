
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
해당 비동기 요청에 대해 RequestBody 어노테이션을 사용해 데이터를 처리한다.
ResponseBody 어노테이션은 RequestBody의 헤더에 담겨있던 Content-Type을 읽어서 그와  같은 형식으로 매핑해 클라이언트에게 반환해준다.

Spring은 return 타입에 `@ResponseBody` 어노테이션이 붙어있을 경우, 클라이언트로부터 받은 HTTP Request의 ‘Accept’ header을 참고한다. 이 Accept header에 적혀있는 타입에 따라 객체를 어떤 형식으로 반환해서 돌려줄지가 결정된다.