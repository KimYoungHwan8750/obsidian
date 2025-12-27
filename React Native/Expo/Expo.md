## Expo란?
React Native로 개발을 진행하기 위한 서비스의 집합체. 즉 개발 플랫폼이다. React가 CRA를 버리고 Next를 택한 것처럼 React Native CLI 역시 버림받아 Expo로 넘어왔다.

공식툴을 밀어내고 당당히 공식 문서에서 사용을 권장하게 된 만큼 그 편리함은 Next와 마찬가지로 매우 유저 친화적이고 편하다.

`npx create-expo-app@latest`로 빌드한다.
기본적으로 android 폴더와 ios 폴더 없이 매우 가벼운 프로젝트로 시작을 해준다. (맘에 듦)

`npx expo prebuild`를 실행하면 android와 ios 폴더를 생성해주며 hermes 설정은 gradle.properties에서 `hermesEnabled=true` 속성을 통해 활성화할 수 있다.