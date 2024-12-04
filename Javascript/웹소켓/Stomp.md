```javascript
<script src="/webjars/stomp-websocket/2.3.3-1/stomp.min.js"></script>
```

서버에 배포할 땐 stomp.debug에 null을 대입하면 된다.
```js
let websocket = new SockJS(webSocketURI, null, {transports: ["/socket", "xhr-streaming", "xhr-polling"]});  
let stomp = Stomp.over(websocket);
stomp.debug = null;
```