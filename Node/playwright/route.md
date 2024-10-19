# route

웹 요청을 처리한다.
요청 차단, 요청 전달, 요청 즉시 수행과 request의 헤더나 바디등 다양한 정보를 인터셉트할 수 있다.

```js
const { chromium } = require('playwright')
const browser = await chromium.launch({headless: false});
const page = await browser.newPage();
page.route('**/*', (route, request) => {
    route.abort(); // 요청 차단
    route.continue(); // 다음 라우터로 요청 전달
    route.fallback(); // 더 이상의 라우터 동작 없이 여기서 바로 요청 보냄
})
```