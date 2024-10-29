# cross-env

`npm install --save-dev cross-env`

Linux에선 `NODE_ENV=production npm start`를 통해 환경 변수를 production 모드로 설정하고 Windows에선 `set NODE_ENV=production && npm start`로 환경 변수를 설정할 수 있는데, 보시다시피 명령어가 다르다. cross env를 설치하면 `cross-env NODE_ENV=production && npm start`와 같이 `cross-env`를 붙이는 것으로 두 가지 플랫폼에서 같은 문법을 통해 환경 변수를 설정할 수 있다.