
#### Object to JSON
```javascript
{"data":"data1",
 "data2":"data2"}
 //이러한 구조를 가진 객체를 JSON.stringify로 JSON으로 변환해준다.
```
#### JSON to Object
```java
@GetMapping
public String example(@RequestBody String Example){
SOUT(Example)
}
```
JSON을 어떤 형태로 받느냐에 따라 활용할 수 있는 방법이 각각 다르다.

1. Object
2. String
3. 서버에 존재하는 객체 형태

## 1. Object
#### [[Map]]으로 저장

Object를 Map으로 받아서 JSON이 가진 Key와 Value를 Map에 저장한다.
```java
@PostMapping("/example")
public void example(@RequestBody Map<String,Object> map){
	map.get("제이슨에서 보낸 키값");
}
```
원하는 객체에 값을 넣기 위해서 builder나 setter 메서드를 이용한다.

## 2. String
#### JSONObject 객체를 생성해 JSON형태로 저장

```java
@PostMapping("/example")
public String example(@RequestBody String Example){
JSONObject this_is_example = new JSONObject(Example);
String test= this_is_example.getString("키값");
}
```

## 3. 서버에 존재하는 객체 형태
```js
let dataObj = {"data1":"data1밸류",
		    "data2":"data2밸류"};

let fetchOptions = {
					headers:{"Content-Type":"application/json"},
					body:JSON.stringify(dataObj),
					method:"POST"						
				   }

```

```java
public class DataObj{
	private String data1;
	private String data2;
	@Override
	public String toString(){
	return "data1:"+data1+
		   "data2:"+data2;}
}

@ResponseBody
@PostMapping("/test")
public void test(@RequestBody DataObj dataObj){
	DataObj obj = dataObj;
	System.out.println(obj.toString());
}
```



------
# 탐구\[해결됨\]

파라미터로 String이 아니라 다른 것들도 써봤는데 잘 모르겠다.
Object Example로 파라미터를 받고
SOUT를 이용해 콘솔을 봤는데 String으로 받았을 때랑 같은 값이 출력되나
스트링으로 받아서 제이슨으로 파싱하면 데이터를 사용할 수 있는데에 반해
Object로는 아직 어떻게 값을 사용할 수 있는지 모르겠다.

## 해결방안

현재 문서에 정리되어 있음

------




# 주의사항

[[★ 매핑]]: JSON의 키와 같은 필드를 가진 객체에 JSON을 매핑하려고 할 때 제대로 되지 않는 경우가 있다. 그것은 Spring의 Mapping 전략이 camelCase라서 발생하는 문제인데, 자세한 건 링크된 메모를 참조하자.
