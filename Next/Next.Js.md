# Next.js

React 진영의 풀스택 프레임워크다.

## Create Next App

Create React App처럼 Next로 빠르게 프로젝트를 시작할 수 있게 도와주는 보일러 플레이트다.

`npx create-next-app 프로젝트이름`

프로젝트가 생성되면서 다양한 옵션을 제공해준다.

이 과정에서 eslint, typescript, tailwindcss 적용 여부를 물어보기 때문에 해당 패키지들을 따로 설치할 필요가 없다. 유용한 기능들이라 대부분 Yes를 사용하면 된다.

대략 import alias (@/\*)... 라는 내용이 있는데 이는 @를 사용해 루트 디렉토리를 가리킬 수 있게 해준다.

예를 들면 `src/a.js`에서 `import "./b.js"`를 임포트하다가, a를 `src/dir/a.js`로 옮기게 되면 임포트 구문이 상대경로를 가리키므로 존재하지 않는 `src/dir/b.js`를 가리키게 된다. 이때 `@/src/b.js` 구문을 사용하게 되면 a파일의 위치가 바뀌어도 임포트 구문을 수정해줄 필요가 없다.

