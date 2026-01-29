location scope에서 사용하며 파일을 직접 서빙할 때 사용한다.

```nginx
locaiton / {
	try_files $uri $uri/ /index.html;
}
```

위 설정은 SPA 프로젝트 서빙할 때 많이 하는 설정이다.
`$uri`는 nginx 내장 변수로 유저가 입력한 경로를 반환해준다.

따라서 유저가 `/static/js/main-dzRqzX.js`를 요청하게 되면 첫 번째 규칙인 $uri에 따라서 `/static/js/main...`을 반환하고, 정적 리소스가 아닌 `/main` 같은 요청을 하게 되면 첫 번째 규칙과 두 번째 규칙에서 옳은 리소스를 찾지 못해 `/index.html`을 반환한다. 이때 리액트 라우터가 uri에서 `/main`을 확인하여 `<Route path="/main" element={<Main />} />`으로 라우트를 해주는 것이다.