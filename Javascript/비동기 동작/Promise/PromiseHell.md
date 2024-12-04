Callback Hell에 대응하기 위해 나온 Promise문법이지만 Promise문법에도 PromiseHell이 존재한다.
```js
test.
.then(functionA)
.then(functionB)
.then(functionC)
.then(functionD)
.then(functionE)
.then(functionF)
```

위와 같이 Promise Chaining을 과하게 남용하면 결국 가독성을 해치고 Promise문법이 탄생한 의미를 저해하는 코드 작성법이 된다.

이를 해결하기 위해 ES8부터 도입된 async await 문법이 존재한다.