## 어노테이션?
SpringBoot에서 느꼈던 익숙한 맛, Decorator.

Spring에서 많은 영감을 받은 Nest에서도 마찬가지로 구현되어있다.

| Decorator                | 의미                                |
| ------------------------ | ----------------------------------- |
| @Request(), @Req         | req                                 |
| @Response(), @Res        | res                                 |
| @Next()                  | next                                |
| @Session()               | req.session                         |
| @Param(param?: string)   | req.params, req.params\['param'\]   |
| @Body(param?: string)    | req.body, req.body\['param'\]       |
| @Query(param?: string)   | req.query, req.query\['param'\]     |
| @Headers(param?: string) | req.headers, req.headers\['param'\] |
| @Ip()                    | req.ip                              |
| @HostParam               | req.hosts                           |

그렇다면 이것들이 뭘 의미하는가?

위 테이블 의미 그대로다. @Req는 req 그 자체를 의미하며 @Session은 req.session을 의미한다. 그럼 모두 Req로 받으면서 그때그때 필요한 프로퍼티에 접속하면 안 되냐고? 당연히 가능하다.

```ts
@Controller()
export class AppController {
	@Get()
	whatYourName(@Req() req) {
		const name = req.query["name"];
		return `Your name is ${name}`;
	}
	// 다른 예
	@Get()
	whatYourName(@Query("name") name) {
		return `Your name is ${name}`;
	}
}
```

다만 제대로 숙련한다면 코드 줄 수를 많이 줄일 수 있고 직관적이다.

스프링부트를 썼다면 `@Param`과 `@Query`를 헷갈릴 수도 있는데, `@Param`은 동적파라미터, 그러니까 `/post/:id/info`와 같은 동적 url을 파라미터로 바인딩한다. `@Query`는 익숙한 쿼리파라미터, 즉 `/chat?userId=gildong&userPw=123`이다.

`@Query("userId") userId`로 userId 파라미터에 접근 가능하다.

## Custom Decorator 만들기

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

`@Param(param?: string)`, `@Query(param?: string)`과 같이 request의 특정 속성에 바로 접근할 수 있는 간편한 Decorator를 직접 만들 수 있다.

위 코드는 공식문서에 나와있는 내용으로, request의 user 속성에 바로 접근하는 Decorator를 정의하고 있다.

```typescript
@Get()
async findOne(@User() user: UserEntity) {
  console.log(user);
}
```

이렇게 request.user 속성을 가리키는 user 변수를 얻을 수 있다.

그렇다면 `@Query(param?: string)`처럼 파라미터를 받아서 해당 속성에 중첩된 속성을 얻는 방법은 없을까? 라고 한다면 당연히 있겠지.

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
```

user속성에 data라는 문자열을 key로 가진 속성이 있다면 해당 응답을 반환하고, 그게 아니라면 user를 반환하고 있다. 해당 속성이 없다면 null을 반환한 뒤, null 체크를 통해 응답의 status code를 적절하게 변경하든가 적절한 조치를 취하면 된다.

## 여러 Decorator를 조합
```typescript
import { applyDecorators } from '@nestjs/common';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
```

코드가 곧 설명, 다른 Decorator를 조합해서 다시 하나의 새로운 Decorator를 만들 수 있다.