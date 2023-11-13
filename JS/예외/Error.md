```js
throw new Error("문자",
				   {
				   cause:{
					   why:"서버측에 아직 코드 안 짜놨습니다.",
					   what:"시간이 없었어요."
					   }
				   }
			   );
```

해당 방식으로 에러를 발생시키면 일반 에러와 같이 에러에 대한 구체적인 정보를 함께 제공해준다.

```js
try{
	throw new Error("문자",
				   {
				   cause:{
					   why:"서버측에 아직 코드 안 짜놨습니다.",
					   what:"시간이 없었어요."
					   }
				   }
			   );
} catch(err){
	console.error(err);
	console.error(err.message); // err과 같은 동작을 한다.
	console.error(err.cause); // cause 값이 출력된다.
}
```