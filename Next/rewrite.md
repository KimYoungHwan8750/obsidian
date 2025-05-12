별도의 백엔드 서버를 구축했을 때 fetchAPI에 모든 주소를 적지 않고 `"/api/auth"`와 같이 호출했을 때 백엔드 서버로 프록시 시키는 것이 가능하다.

예를 들어 next로 구성한 프론트엔드 포트가 5173번이고, nest로 구성한 백엔드 포트가 3000번이다. 이때 개발자는 모든 비지니스 로직을 서버(nest)에서 처리한다.

next 단에서 `fetch("/post")`와 같이 사용하게 되면 `localhost:5173/post`로 요청이 가게 되는데, 이 모든 요청을 `localhost:3000/post`로 프록시하기 위한 설정이라고 보면 된다.

next.config.ts에 다음과 같이 rewrite 함수를 정의하면 된다.

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ];
  },
};

export default nextConfig;
```

`:path*`는 와일드카드를 사용한 패턴으로, `/`라는 루트 디렉토리에 있는 모든 요청 정보를 :path라는 변수명을 활용해 destination에 전달해주는 것으로, 위 코드는 모든 요청에 대해 프록시가 동작한다.