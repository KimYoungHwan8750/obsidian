### Restart 옵션
restart의 경우 컨테이너가 중지되었을 때 재시작 옵션을 지정한다.

cli에서는 `docker run --restart no`와 같이 사용하면 된다.

#### 1. no (기본값)

yaml

```yaml
services:
  app:
    image: myapp
    restart: no  # 또는 생략
```

**동작:**

- 컨테이너가 중지되면 **재시작 안함**
- 수동으로만 시작 가능

**사용 시기:**

- 일회성 작업
- 테스트 컨테이너

#### 2. always (가장 많이 사용)

yaml

```yaml
services:
  web:
    image: nginx
    restart: always
```

**동작:**

- 어떤 이유로 중지되든 **항상 재시작**
- Docker 데몬이 시작될 때도 자동 시작
- 수동으로 `docker stop` 해도 재시작됨

**사용 시기:**

- 웹 서버
- API 서버
- 항상 실행되어야 하는 서비스

#### 3. on-failure (권장)

yaml

```yaml
services:
  app:
    image: myapp
    restart: on-failure
    # 또는 재시도 횟수 제한
    # restart: on-failure:5
```

**동작:**

- **에러로 종료**된 경우만 재시작 (exit code ≠ 0)
- 정상 종료(exit code = 0)면 재시작 안함
- 수동 `docker stop`은 재시작 안함

**사용 시기:**

- 대부분의 애플리케이션 (권장!)
- 에러 복구가 필요한 서비스

#### 4. unless-stopped

yaml

```yaml
services:
  db:
    image: postgres
    restart: unless-stopped
```

**동작:**

- `always`와 거의 동일
- 단, **수동으로 중지하면 재시작 안함**
- Docker 데몬 재시작 시 자동 시작

**사용 시기:**

- 데이터베이스
- 수동 제어가 필요한 서비스

## 비교표

|정책|에러 시|정상 종료 시|수동 stop 후|Docker 재시작 시|
|---|---|---|---|---|
|**no**|❌|❌|❌|❌|
|**always**|✅|✅|✅|✅|
|**on-failure**|✅|❌|❌|✅|
|**unless-stopped**|✅|✅|❌|✅|