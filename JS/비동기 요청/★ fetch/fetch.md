## fetch()

#### 문법
```javascript
fetch("url",{options}).then().catch(); // 기본 구조
fetch(url,options).then(res=>res.json()).then(res=>console.log(res)).catch();
//res의 정보를 json으로 가져오기.
fetch(url,options).then(res=>res.text()).then(res=>console.log(res)).catch();
//res의 정보를 text로 가져오기.

```
res.json() : 
json() 함수에 JSON.parse가 포함되어 있어서 자바스크립트 객체로 변환해준다.


#### options에는
```javascript
method:"post" // "post","put"등이 들어갈 수 있다.
headers:{} // headers 안에는 "Content-Type":"application/json" 등 요청-응답 포맷을 설정할 수 있다.
body: // 원하는 데이터를 실어보내면 된다.
```


# options 구조


## headers
## body
## method:



































