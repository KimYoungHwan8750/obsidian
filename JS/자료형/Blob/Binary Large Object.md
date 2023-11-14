	바이너리 데이터만을 담은 이진 형태의 값의 집합이다.
File과 다른 점이라면, 파일은 modifiedDate나 fileName등 부수적인 요소가 더해진 형태이다.
파일이 BLOB를 상속받고 기능을 더한 형태라고 보면 된다.

BLOB데이터를 가공해서 웹에서 표현하고 싶다면 MIME TYPE을 지정해주면 되는데 사용법은 다음과 같다.

#### 서버 코드
```java
@RestController  
public class ReturnImg {  
    @GetMapping("/get_image")  
    public byte[] Img() throws IOException {  
        File file = new File("C:\\upload\\1.jpg");  
        return FileCopyUtils.copyToByteArray(file);  
    }  
}
```

#### 자바스크립트 코드
```js
//let blob = new Blob([Uint8Array.Typed],{options});
	fetch(url)
	.then(res=>res.arrrayBuffer())
	.then(res=>{
	let uInt8Array = new Uint8Array(res);
	let blob = new Blob([uInt8Array],{type:"image/jpg"})
	//이렇게 만들어진 blob는 createObjectURL을 이용해 사용 가능하다.
	$DOM.src = window.URL.createObjectURL(blob);
		}
	)
```