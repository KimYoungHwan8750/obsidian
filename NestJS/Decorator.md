```ts
@HttpCode(HttpStatus.OK) // 응답을 200으로 명시적으로 제어
@Post('login') // Post는 기본 응답이 201임
	signIn(@Body() signInDto: Record<string, any>) {
	return this.authService.signIn(signInDto.username, signInDto.password);
}
```