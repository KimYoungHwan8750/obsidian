```js
<script src="/..." defer></script>
```

Defer속성을 지닌 script태그를 만나자마자 JS를 백그라운드에서 로드한다.
이후 DOMContentLoad가 완료되면 로드했던 JS를 실행한다.
따라서 동작의 순서가 보장되기 때문에 범용적으로 쓰기 가장 좋은 속성이다.