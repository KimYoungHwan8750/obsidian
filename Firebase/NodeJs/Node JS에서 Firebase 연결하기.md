## 프로젝트 설정
필자의 환경은 Next15 +React19이나, NodeJS를 타겟팅하므로 참고만 해두기 바란다.

`npm install firebase-admin --save`

```js
const { initializeApp, applicationDefault, cert, getApps } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const serviceAccount = require('./path/to/serviceAccountKey.json');

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}

export const db = getFirestore();
```

이러면 끝이다. Flutter에서도 Firebase를 연동해봤지만 Node 환경에서는 정말 딸깍하면 끝이다. 참고로 서비스 어카운트 변수가 불러오는 `.json` 파일은 [구글 클라우드 콘솔](https://console.cloud.google.com/iam-admin/serviceaccounts/)의 서비스 계정 탭에서, 해당 프로젝트에 들어가 키를 발급받으면 된다.

![Google Cloud Console Screenshot](https://i.imgur.com/qufL1Z5.png)

위 화면에서 해당 프로젝트의 키관리 탭에 들어가 `json` 포맷으로 키를 생성한 후 내려받아 임포트하면 된다.

또한 공식 문서와 다르게 `if (!getApps().length)`라는 내용이 있는데, Firebase를 1번만 초기화하기 위해 추가된 안전장치이다. 개발 서버에서 HMR(Hot Module Reload) 같은 기능 때문에 수십, 수백번 초기화되는 걸 방지하기 위한 코드다.