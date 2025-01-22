## RestAPI
RestAPI를 사전적으로 설명하는 용어는 인터넷을 찾아보면 아주 쉽게 나온다. 나는 내 나름대로 Restful한 API란 무엇인가를 설명하기 위해 노력해보려 한다.

Restful한 API. RestAPI란 쉽게 말해 데이터 창구 역할을 하는 엔드포인트라고 생각한다. 해당 엔드포인트는 같은 엔드포인트이더라도 GET, POST 등 HTTP Method에 따라 다른 동작이 가능하다. 각 엔드포인트 주소는 user/post/123 등 계층 구조를 가지며 한 눈에 보기에도 그 기능이 명확하게 분별되어야한다.

Restful함을 강조하는 사람들의 말을 들어보면 요즘 개발 트렌드와 별반 다르지 않은 것 같다. 마이크로 서비스 아키텍처, 추상화, 의존성 역전, 순수함수. 모두 다 다른 복잡한 것은 알 필요 없이 자신의 자리에서 자기에게 주어진 역할만 하면 된다는 의미가 내포된 단어들이다. RestAPI도 이러한 가치관에 부합하여 나타난 엔드포인트 형태라고 생각된다.

### Next에서 RestAPI 구현하기
Next에서는 이를 어떻게 구현할까?

간단명료하게 말하자면 app 폴더 내에 api 폴더를 만들고 route.js 또는 route.ts를 만든다. 이를 통해 `/api`에 접속하면 해당 route에 정의된 `GET, POST` 등의 HTTP Method가 실행된다.

이때 api 폴더에 `name`이란 또 다른 이름의 폴더를 만들고 내부에 route.ts를 정의하면 `/api/name`에 접속했을 때 해당 RestAPI가 호출된다. 이때 함수는 `export async function GET(req: NextRequest)` 형식으로 선언되어야한다. 이때 반드시 함수 이름을 모두 대문자로 적어야한다. POST 방식으로만 호출되고 싶다면 함수명을 POST로 하면 되고, GET과 POST를 모두 사용하고 싶으면 각각의 이름으로 함수를 작성하면 된다.

`GET(req: NextRequest)` 형태처럼 `Reqeust` 객체를 사용해 요청에 대한 처리가 가능하며, `NextRequest`는 기본 객체인 `Request`를 Next 측에서 확장시켜 기능을 추가한 버전이다. 당연히 Next에서는 이 객체를 사용할 것을 권장한다.

전체 코드는 다음과 같다.

```ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log('누군가 GET 메서드를 호출함')
  return NextResponse.json("Hello World", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
```

![Development Server Screen Shot](https://i.imgur.com/YB1nh3A.png)

Hello World를 응답받아 메세지가 표시되며, 이때 터미널을 확인하면 console.log가 실행되어 아래 스크린샷과 같이 `누군가 GET 메서드를 호출함`이 출력된다.

![Terminal Screen Shot](https://i.imgur.com/TBaa5Aq.png)

Django나 Spring을 사용해본 사람이라면 바로 본론이 궁금할 거라고 생각하는데, 데이터를 주고 받는 방법에 대해 알아보자.

우선 쿼리 파라미터 받는 방법이다.

```ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const param = req.nextUrl.searchParams.get("파라미터1");
  console.log(`유저가 입력한 값: ${param}`);

  return NextResponse.json(`당신은 ${param}를 입력하셨군요!`, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
```

![Query Parameter Screen Shot](https://i.imgur.com/nk1T7bw.png)

url을 확인해보면 `http://localhost:3001/api?파라미터1=내가%20뭘%20입력했게` 인 것을 볼 수 있다. 서버에서는 `req.nextUrl.searchParams.get("파라미터1")`를 통해 파라미터1에 적힌 내용을 받아오고 있다. 간단명료해서 코드가 곧 설명이 될 것이다.

path 경로 자체를 파라미터로 받는 동적 파라미터라는 것이 존재하는데, 동적 파라미터의 개념을 안다면 왕초보는 아닐테니 구태여 설명하진 않는다.

위 코드에서 간단한 텍스트를 반환하는 것치곤 코드가 꽤 긴 편이다.

```ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return new NextResponse("Hello World")
}
```

Hello World만 달랑 반환하는 간단한 RestAPI이다.