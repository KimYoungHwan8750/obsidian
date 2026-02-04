```
claude mcp add local-db npx -- -y @bytebase/dbhub -- --dsn="mysql://아이디:비밀번호@아이피:포트/DB이름"
```

이때 특수기호 `%` 등은 `%25`로 이스케이프 처리해야한다.

```
claude mcp add local-db -- npx @bytebase/dbhub@latest --transport stdio --dsn "mariadb://아이디:비밀번호@아이피:포트/DB이름?sslmode=disable"
```