
Unsigned Int 8 Array
양수만 존재하는 8비트 배열이다.
0부터 255의 값을 가진다.
색깔이 0부터 255의 값을 가진다는 것을 생각하면 미디어 타입을 전송하는데 적합한 형태인 것을 예상할 수 있다.

ArrayBuffer로 부터 값을 읽어들이려면 아래와 같이 하면 된다.
```js
let data = 서버에서 보낸 이미지 ArrayBuffer;
let uInt8Array = new Uint8Array
```