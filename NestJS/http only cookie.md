## . 🔒 `cookie-parser` 설치 및 설정

bash

복사편집

`npm install cookie-parser`

**`main.ts`**에 다음을 추가하세요:

```ts
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'https://your-frontend.com',
    credentials: true, // 쿠키 허용 필수
  });

  await app.listen(3000);
}
```

---

## 2. 🍪 쿠키로 리프레시 토큰 보내기

**Auth Controller**에서 리프레시 토큰을 쿠키로 설정:

```ts
@Post('login')
async login(@Res({ passthrough: true }) res: Response, @Body() loginDto: LoginDto) {
  const { accessToken, refreshToken } = await this.authService.login(loginDto);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true, // HTTPS 환경에서만 사용
    sameSite: 'strict', // 또는 'lax'
    path: '/auth/refresh',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
  });

  return { accessToken }; // 액세스 토큰은 JS에서 쓸 수 있게 응답으로
}

```
---

## 3. 🔄 리프레시 엔드포인트에서 쿠키 사용

```ts
@Post('refresh')
refresh(@Req() req: Request): any {
  const refreshToken = req.cookies?.refreshToken;
  return this.authService.refreshAccessToken(refreshToken);
}
```
---

## 4. ❌ 로그아웃 시 쿠키 제거
```ts
@Post('logout')
logout(@Res({ passthrough: true }) res: Response) {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/auth/refresh',
  });
  return { message: 'Logged out' };
}
```
---

## 5. 🧪 프론트에서 fetch 사용 예

```ts
fetch('https://api.example.com/auth/refresh', {
  method: 'POST',
  credentials: 'include'
});
```

✅ 꼭 `credentials: 'include'` 있어야 브라우저가 쿠키를 보냅니다.