```
claude mcp add local-db npx -- -y @bytebase/dbhub -- --dsn="mysql://아이디:비밀번호@아이피:포트/DB이름"
```

이때 특수기호 `%` 등은 `%25`로 이스케이프 처리해야한다.

윈도우는 `cmd /`로 래핑해줘야함
```
claude mcp add local-db -- cmd /c npx @bytebase/dbhub@latest --transport stdio --dsn "mariadb://아이디:비밀번호@아이피:포트/DB이름?sslmode=disable"
```

리눅스
```
claude mcp add local-db -- npx @bytebase/dbhub@latest --transport stdio --dsn "mariadb://아이디:비밀번호@아이피:포트/DB이름?sslmode=disable"
```