
**encodeURIComponent**는 알파벳,0~9의 숫자 - _ . ! ~ * ' ( ) 를 제외한 문자를 이스케이프 처리

encodeURIComponent는 / ? : @ & = + $ # 도 이스케이프 처리를 해버리는데 & ? 와 같이 uri에서 특수한 기능을 하는 문자는( ex. &는 uri에서 다음 파라메터를 나타냄) 인코딩 하면 안 되므로 path 전체를 인코딩 할때는 encodeURI를 사용.

그리고 파라미터 값에 & 등의 특수문자가 값으로 들어갈 때는 인코딩 해줘야 하므로 파라미터 값에는 encodeURIComponet 사용


#### 이스케이프할 문자 추가
encodeURICompontent는 JSON형식인 홑따옴표를 인코딩하지 않는데 다음과 같이 이스케이프할 문자를 추가 지정할 수 있다.
```js
function encodeAll(s) { return encodeURIComponent(s).replace(/[']/g, escape); // escape시킬 문자를 추가지정 

encodeURIComponent("채팅칠 때 '를 누르는 병이 있어요.").replace(/[']/g,escape); // 사용자 정의 함수를 만들지 않고 바로 사용하기
```