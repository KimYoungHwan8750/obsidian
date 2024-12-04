### IIFE
immediately-invoked-function-expression
즉시 실행 함수 표현
전역 변수의 네임 스페이스 오염등을 방지하기 위해서 사용한다.
```js
(function(){console.log("콘솔 로그에 출력됨")}())
```
위 코드는 따로 호출되지 않았음에도 불구하고 콘솔로그가 찍힌다.
await async와 같이 쓰기 유용하다.