
## 사용
```js
document.body.addEventListener("click",()=>{
	console.log("클릭이벤트!");
},{passive:true});
```

* 이벤트 리스너의 3번째 인자로 {passive:true}를 전달해주면 preventDefault를 사용하지 않는다고 명시하여 preventDefault를 체크하는 로직을 실행시키지 않아 속도에 이득을 가져다준다.