## Nest에서 env 변수 설정
`npm i --save @nestjs/config` 설치

root에 .env파일 생성(.env, .development.env, .production.env 등등)
env가 앞에 붙나 뒤에 붙나 nest는 잘 작동

여러 env 파일을 명시한 경우 조건에 맞는 순서부터 뒤로 적용하며 중복되는 내용이 있으면 덮어쓰기함.

```typescript
ConfigModule.forRoot({
  envFilePath: ['.env.development.local', '.env.development'],
});
```


```properties
API_KEY=dsadasktraz.3$1@
# 또는
API_KEY="dsadasktraz.3$1@"
```

쌍따옴표가 없어도 잘 작동하나 env파일에서 `#`은 주석을 의미하며, 띄어쓰기가 포함되는 경우에도 쌍따옴표를 필요로 하므로 왠만하면 쌍따옴표를 이용하는 걸 추천한다.

이렇게 설정한 환경변수들은 `process.env.API_KEY`와 같이 사용 가능하다.

