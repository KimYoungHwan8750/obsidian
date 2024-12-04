
## 사용

- passive
```js
document.body.addEventListener("click",()=>{
	console.log("클릭이벤트!");
},{passive:true});
```

1. 이벤트 리스너의 3번째 인자로 {passive:true}를 전달해주면 preventDefault를 사용하지 않는다고 명시하여 preventDefault를 체크하는 로직을 실행시키지 않아 속도에 이득을 가져다준다.
2. 기본값은 false이나 크롬 최신버전에선 true가 기본값이 되었다.
3. scroll같은 블럭 동작 같은 경우 기본값이 true이다.
* capture