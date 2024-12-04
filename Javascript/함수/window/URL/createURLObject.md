Blob를 img 태그의 src 속성에 표현한다고 했을 때 해당 사진을 여러번 사용해야 할 때 유용하다.
src에 binary 데이터를 복사 붙여넣기하면 사진의 용량이 클 경우 10 장만 재사용되어도 클라이언트에게 큰 부담이 될 것이다.

이 함수는 Blob데이터를 참조하는 주솟값을 저장해놓기 때문에 리소스 낭비를 줄여준다.
```js
fetch(url,options)
	.then(res=>res.blob())
	.then(res=>
	{
	let dataUrl = window.URL.createURLObject(res);
	$DOM.src= dataUrl; // res값을 참조하는 url 생성
	});

```