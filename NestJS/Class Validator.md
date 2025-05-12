class validator를 사용하려면 ValidationPipe를 nest 앱에 등록해야한다.

```ts
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
```

이후 dto 클래스를 작성하고 validator 규칙을 명명한다.

```ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
```

만약 **규칙에 위반**되면,

- 요청 정지
- 400 응답을 보냄
- 에러 내용을 **자동으로 JSON 형식**으로 반환

프론트에서 아래와 같이 잘못된 요청을 보냈다고 가정한다.


```json
{
	"username": "",
	"email": "not-an-email",
	"password": "123" 
}
```

아래와 같이 응답이 온다.

```json
{
  "statusCode": 400,
  "message": [
    "username should not be empty",
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}

```
