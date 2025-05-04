[출처](https://kyurasi.tistory.com/entry/Firebase-function-%EC%9C%BC%EB%A1%9C-Nest-%EB%B0%B1%EC%97%94%EB%93%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0)

`npm install -g firebase-tools @nestjs/cli`를 통해 사전 준비.

nest가 이미 깔려 있는 경우엔 당연히 생략 가능하다.

functions를 사용하려면 프로젝트 요금제가 Blaze(종량제)로 업그레이드되어야한다.

1. 스크립트 복사:functions/package.json에서 build와 start를 제외한 모든 스크립트를 메인 package.json으로 복사합니다.
2. 엔진 및 메인 속성 복사:functions/package.json의 engines와 main 속성을 메인 package.json으로 복사합니다.
3. 의존성 복사:functions/package.json의 모든 의존성을 복사하되, TypeScript는 메인 package.json에 이미 있으므로 제외합니다.
4. 함수 폴더 삭제:functions 폴더를 삭제합니다.
5. 새 파일 생성:프로젝트의 루트에 index.ts라는 새 파일을 생성하고, 그 안에 아래의 내용을 추가합니다.
