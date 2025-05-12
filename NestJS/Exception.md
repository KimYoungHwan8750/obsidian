Nest에서는 기본적으로 Http 응답 코드별 Exception을 정의해두었다.

가령 Jwt를 활용한 백엔드 로직을 구성할 때, Unauthorization을 의미하는 401 코드를 반환하는 Exception은 다음과 같다.

```ts
@Post("login")
login(@Body() loginDto: LoginDto) {
	if (!this.loginService.validateUser(loginDto)) throw new UnauthorizedException("Invalid User");
}
```

이에 대한 응답은 다음과 같이 처리하면 된다.

```ts
const res = await fetch("/login", {
	method: "POST",
	body: JSON.stringify(data),
	credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.status === 401) {
		const text = await res.json();
		console.log(text);
	}
```

이때 주의할 점으로 401을 응답하는 것은 어디까지나 개발자 관점에서 에러인 것이지, http 요청과 응답 자체는 정상적으로 이루어졌다. 즉 인증을 요구하는 API에 http 요청을 날렸으나 인증되지 않은 사용자라는 정상적인 응답이 온 것이다. 이를 인증에 실패했으니 "실패"라고 보면 안 된다.

```json
{
    "message": "Invalid User",
    "error": "Unauthorized",
    "statusCode": 401
}
```

`throw new UnauthorizedException("Invalid User")`를 통해 응답받은 json 데이터는 위와 같다.