모듈의 초기화 단계에서 환경 변수를 사용할 때, ConfigModule이 먼저 초기화되어야 환경 변수에 확실하게 접근이 가능하다. 이때 ConfigModule이 초기화 된 후 원하는 모듈의 초기화를 가능하게 해주는, 즉 순서를 보장해주는 함수다.

```ts
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
```

useFactory 옵션으로 의존성을 주입받아 기존 원하는 셋팅을 객체로 return해주면 된다. 자세히보면 () => ({}) 형태이므로 객체가 반환되는 것을 알 수 있다. inject 속성에는 의존성 주입에 사용될 class를 주입하면 된다.