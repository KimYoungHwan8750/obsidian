JSON 타입


#### 예제
클라이언트에서 다음과 같은 형식의 데이터를 보낸다.
```js
function jsonObj(){  
    let example =  
        {  
            "k1":"v1",  
            "k2":  
                {  
                    "k2.1":"v2.1",  
                    "k2.2":"v2.2"  
                },  
            "k3":["k3.1","k3.2","k3.3"]  
        };  
  
    let url = "/json_obj";  
    let options = {  
        method:"post",  
        headers:{"Content-Type":"application/json"},  
        body:JSON.stringify(example)  
    }  
  
    fetch(url,options);  
}
```

```java
@PostMapping("/json_obj")  
public void JsonObj(@RequestBody String obj) throws JSONException{  
    JSONObject jsonObject = new JSONObject(obj);  
    log.info("1"+jsonObject.getString("k1"));  
    log.info("2"+jsonObject.getJSONObject("k2").toString());  
    log.info("3"+jsonObject.getJSONArray("k3").get(2).toString());  
  
  /*
   1= "v1"
   2= {"k2.2":"v2.2","k2.1":"v2.1"}
   3= k3.3
}
```

