package의 dependencies에 다음과 같이 코드를 작성한다.

```json
"dependencies": {
  "@your-org/shared-module": "git+https://github.com/your-org/shared-module.git#v1.0.0"
}
```

이렇게 하면 `node_modules/your-org/shared-module`에 패키지가 설치된다.
`#1.0.0`과 같은 커밋해쉬나 태그가 없으면 항상 최신커밋을 이용하게 되므로 버전관리를 위해서 태그나 커밋해쉬를 사용하자.
