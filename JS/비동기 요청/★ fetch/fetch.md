## 비동기

한때 혁신으로 떠들썩했던 비동기 동작은 이제는 트렌디한 웹사이트를 만드는데 필수적인 요소가 되었습니다. 어플리케이션의 SPA(Single Page Application) 방식에 익숙해진 나머지 이제 웹사이트를 이용할 때도 화면이 깜빡거리면 괜히 불편하곤 합니다.

이때 필요한 것이 비동기 요청입니다. 렌더링은 이후의 몫이니 우선 요청하는 방법을 알아보겠습니다.

### 그렇다면 비동기는 어떻게 동작할까?

우선 가볍게 예제 하나를 보겠습니다.

##### RestController

```java
@GetMapping("/text")  
public ResponseEntity<String> getString(){  
    return new ResponseEntity<>("텍스트 응답!",HttpStatus.OK);  
}
```
#### fetch

```js
let result;
fetch('/text')
    .then(res=>res.text())
    .then(res=>{result = res})
console.log(result) // 기댓값 : 텍스트 응답!
```

`fetch`를 통해 `/text`에 요청을 보내고 응답받은 데이터를 text로 디코딩하여 result라는 변수에 저장합니다.

콘솔로그를 확인하면 어떤 값이 출력될까요?

![비동기 요청](JS/비동기%20요청/★%20fetch/image/Pasted%20image%2020240227013731.png)

result에 undefined가 출력됩니다.

분명히 서버에서 응답을 받았는데 왜 변수에 아무런 값도 할당되지 않았을까요?

비동기의 핵심이 여기에 있습니다.

![비동기 플로우](JS/비동기%20요청/★%20fetch/image/제목%20없음-2.png)

fetch는 비동기로 동작하여 본래 흐름에서 벗어나 파란색 블럭에 해당하는 구간에서 병렬 실행됩니다. 이때 fetch를 보내자마자 바로 `console.log(result)`가 실행되어 아직 응답을 받지 못한 상태에서 콘솔 로그를 출력합니다. 그러니 변수에 아무런 값이 없는 것처럼 보이죠.

그렇다면 변수가 출력되는 세 가지 경우를 함께 보겠습니다.

1. 첫 번째

```js
let result;
fetch('/text')
	.then(res=>res.text())
	.then(res=>{result = res})
setTimeout(()=>{console.log(result)},500)
// 텍스트 응답!
// 예제를 위한 코드입니다.
// 응답이 500ms안에 온다는 보장이 없으므로 실무에서 쓰면 큰일나요!
```

2. 두 번째

```js
let result;
fetch('/text')
	.then(res=>res.text())
	.then(res=>{
	result = res;
	console.log(result);
})
// 텍스트 응답!
```

3. 세 번째

```js
let result;
async function printResult(){
	let response = await fetch('/text');
	let text = await response.text();
	result = text;
	console.log(result);
}
printResult();
// 텍스트 응답!
```

![세가지 요청](JS/비동기%20요청/★%20fetch/image/Pasted%20image%2020240227014910.png)

이해가 되셨나요?

비동기는 실행순서가 보장되지 않기 때문에 실행 순서를 보조해주는 await이나 then메서드와 함께 사용됩니다. 해당 문법들은 앞으로 차차 포스트하겠습니다.
### Fetch

#### 지원

![can i use](JS/비동기%20요청/★%20fetch/image/Pasted%20image%2020240226225152.png)

오페라 브라우저에선 아예 지원하지 않으므로 XMLHttpRequest로 대체해야합니다.

그 외 브라우저에선 2014년 이전 버전들이 대체로 지원되지 않는 모습이네요.

저 같은 경우 개발 블로그를 운영하고 있기 때문에 대부분 최신 버전을 사용할 것으로 예측되어 fetch를 사용했지만 다양한 연령의 고객이 이용하는 웹사이트의 경우 지원 여부를 잘 확인해야합니다.

```js
if (window.fetch){
	// fetch
} else {
	// XMLHttpRequest
}
```

window객체의 fetch를 참조해서 사용 가능할 경우 true가 반환되니 위처럼 polyfill 처리를 해주시면 되겠습니다.
#### 문법

```js
fetch(url,{options})
```

먼저 구조를 보겠습니다.

url과 options라는 객체를 인자로 받습니다.

url엔 원하는 주소를 적으면 되고, options의 내용은 테이블로 설명드리겠습니다.

| options | * 표시는 기본값                                                                         |
| ------- | --------------------------------------------------------------------------------- |
| method  | *GET, POST, PUT, PATCH, DELETE, etc...                                            |
| headers | Content-Type, Accept, [더보기](https://fetch.spec.whatwg.org/#forbidden-header-name) |
| body    | formData, JSON                                                                    |
| cache   | *default, no-cache, reload, force-cache, only-if-cached                           |
| 그외      | mode, redirect, referrerPolicy 등등                                                 |
주의할 점으로, Get과 Post를 제외한 나머지 method는 반드시 대문자로 작성해야합니다.

또한 body의 Content-Type과 헤더의 Content-Type이 일치해야합니다.

#### 예제
##### 프로젝트 구조

![프로젝트 구조](JS/비동기%20요청/★%20fetch/image/Pasted%20image%2020240226232419.png)
RestController 하나와 index 페이지, 그리고 비동기 렌더링될 대상인 asyncHtml 페이지
3개의 파일로 이루어진 단순한 예제입니다.

##### RestController
```java
@GetMapping("/data")  
public ResponseEntity<byte[]> getData(){  
    ClassPathResource classPathResource = new ClassPathResource("templates/asyncHtml.html");  
    try(FileInputStream fileInputStream = new FileInputStream(classPathResource.getFile())) { 
        byte[] html = fileInputStream.readAllBytes();  
        fileInputStream.close();  
        return new ResponseEntity<>(html, HttpStatus.OK);  
    } catch (Exception e){  
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);  
    }  
}
```

asyncHtml.html을 읽어 이진 데이터를 응답하는 코드입니다.

##### index.html


```html
<!DOCTYPE html>  
<html lang="ko">  
<head>  
    <meta charset="UTF-8">  
    <title>Title</title>  
    <style>        
    .origin{  
            position: absolute;  
            width: 400px;  
            height: 400px;  
            border: 1px solid grey;  
            top:50%;  
            left:50%;  
            transform: translate(-50%,-50%);  
        }  
    </style>  
</head>  
<body>  
<div class="origin">  
    <p>이 영역을 비동기로 렌더링해볼게요.</p>  
</div>  
<script>  
    (async function (){  
        let response = await fetch('/data');  
        let text = await response.text();  
        console.log(text); // 서버에서 받은 데이터를 출력해보겠습니다.  
    })()  
</script>
</body>  
</html>
```

![index.html](JS/비동기%20요청/★%20fetch/image/Pasted%20image%2020240226233655.png)

##### async.html

```html
<!DOCTYPE html>  
<html lang="ko">  
<head>  
    <meta charset="UTF-8">  
    <title>Title</title>  
    <style>        
    .async_item{  
            width: 100%;  
            height: 100%;  
            background: red;  
        }  
    </style>  
</head>  
<body>  
<p class="async_item">  
    비동기로 렌더링 됐어요  
</p>  
</body>  
</html>
```

![async.html](JS/비동기%20요청/★%20fetch/image/Pasted%20image%2020240226234518.png)

##### 코드 설명

```js
    (async function (){  
        let response = await fetch('/data');  // '/data'에 요청을 보낸다. (기본값 : Get)
        let text = await response.text();  // 응답받은 데이터를 텍스트로 디코딩하겠다는 의미
        console.log(text); // 텍스트로 디코딩된 Response 출력
    })()
```

![응답 결과](JS/비동기%20요청/★%20fetch/image/Pasted%20image%2020240226233446.png)

서버에서 응답한 이진 데이터가 제대로 출력됩니다.

이제 이를 index.html에 비동기식으로 렌더링해보겠습니다.

##### index.html (수정)


```js
(async function (){  
    const domParser = new DOMParser();  
    let response = await fetch('/data');  
    let text = await response.text();  
    let asyncDocument = domParser.parseFromString(text,'text/html');  
    let $originItem = document.querySelector('.origin_item');  
    let $asyncItem = asyncDocument.querySelector('.async_item');  
    $originItem.replaceWith($asyncItem);  
})()
```

![index.html 수정](JS/비동기%20요청/★%20fetch/image/Pasted%20image%2020240226234147.png)

DomParser를 이용해 text를 html로 파싱했습니다.`parseFromString` 메서드가 리턴하는 값은 html (document)이므로 해당 변수에 querySelector를 사용해 원하는 요소만 조작 가능합니다.

`replaceWith`를 통해 origin_item이 asyncHtml에서 가져온 요소로 대체되었습니다.

아직 Style이 적용 안되었는데 마찬가지로 렌더링해줍니다.

```js
(async function (){  
    const domParser = new DOMParser();  
    let response = await fetch('/data');  
    let text = await response.text();  
    let asyncDocument = domParser.parseFromString(text,'text/html');  
    let $originItem = document.querySelector('.origin_item');  
    let $asyncItem = asyncDocument.querySelector('.async_item');  
    let asyncStyle = asyncDocument.head.querySelector('style');  
    $originItem.replaceWith($asyncItem);  
    document.head.append(asyncStyle);  
})()
```

![asyncHtml 렌더링 후](JS/비동기%20요청/★%20fetch/image/Pasted%20image%2020240226235827.png)

잘 렌더링되었습니다.

---
### 추신

```js
(()=>{})() // 또는
(function (){})()
```

코드를 보시면 위와 같은 형태를 사용하는 것을 알 수 있습니다.

이는 IIFE (Immediately Invoked Function Expression), 즉시 실행 함수 표현이라고 하는데 await & async를 top level에서 실행 가능하게끔 만들어줍니다.

```js
async function 비동기(){
	let result = await 비동기동작();
}
비동기();
```

IIFE를 사용하지 않으면 위의 코드처럼 함수를 한 번 더 호출해야합니다.

await & async는 다음 포스트에서 다루겠습니다.

링크 :
[깃허브 예제](https://github.com/KimYoungHwan8750/fetch-example)





























