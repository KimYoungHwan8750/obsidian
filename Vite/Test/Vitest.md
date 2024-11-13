# Vitest

jest는 jest.setup.js, jest.config.js 그리고 설치해야하는 패키지가 많아서 다소 복잡하다.

그러나 vitest는 jest의 문법을 그대로 가지고 있고, vite의 컨셉에 맞게 설정 간소화가 **매우** 잘되어있다.

`npm i -D vitest`

이것으로 설정은 끝난다.

다만 내 개발환경에서만 그런 것인지 몰라도 `test`나 `expect`를 입력해 임포트를 하려고 했는데 메뉴에 없다. 수동으로 `import { test, expect } from 'vitest'`를 해주어야한다.

그러나 이 정도는 jest에 비하면 훨씬 간편하고 사용이 용이하다.

또한 jest와 달리 기본적으로 watch 모드로 동작해서, 테스트 코드에 변경이 있으면 즉시 테스트가 실행된다.

## UI Tool

UI를 통해 테스트 결과를 볼 수 있는 라이브러리도 존재한다.
`npm i -D @vitest/ui`
해당 패키지를 설치하고 `npx vitest --ui`를 실행하면 된다.

```json
  "scripts": {
	// ...
    "test": "vitest --ui"
  },
```