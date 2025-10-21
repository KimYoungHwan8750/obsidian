## 1. Named Volume (권장)

### 기본 사용법

yaml

```yaml
services:
  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
      # postgres_data = 볼륨 이름
      # /var/lib/postgresql/data = 컨테이너 내부 경로

volumes:
  postgres_data:  # 볼륨 정의
```

**특징:**

- Docker가 관리하는 영역에 저장
- 컨테이너 삭제해도 데이터 유지 ✅
- 여러 컨테이너가 공유 가능
- 백업/복원 쉬움

### 실제 예시

yaml

```yaml
services:
  web:
    image: nginx
    volumes:
      - web_data:/usr/share/nginx/html
  
  db:
    image: mysql:8
    volumes:
      - db_data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: secret

volumes:
  web_data:
  db_data:
```

bash

```bash
# 실행
$ docker-compose up -d

# 볼륨 확인
$ docker volume ls
DRIVER    VOLUME NAME
local     myproject_web_data
local     myproject_db_data

# 데이터 위치
$ docker volume inspect myproject_db_data
# "Mountpoint": "/var/lib/docker/volumes/myproject_db_data/_data"
```

## 2. Bind Mount (호스트 디렉토리 연결)

### 기본 사용법

yaml

```yaml
services:
  web:
    image: nginx
    volumes:
      - ./html:/usr/share/nginx/html
      # ./html = 호스트의 상대 경로
      # /usr/share/nginx/html = 컨테이너 경로
```

**특징:**

- 호스트의 **실제 파일/디렉토리**를 연결
- 개발 중 코드 변경이 즉시 반영 (hot reload)
- 절대 경로 또는 상대 경로 사용

### 개발 환경 예시

yaml

```yaml
services:
  app:
    build: .
    volumes:
      # 소스 코드 동기화
      - ./src:/app/src
      - ./package.json:/app/package.json
      # node_modules는 제외 (컨테이너 것 사용)
      - /app/node_modules
    ports:
      - "3000:3000"
```

### 설정 파일 마운트

yaml

```yaml
services:
  nginx:
    image: nginx
    volumes:
      # 커스텀 설정 파일
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      # :ro = read-only (읽기 전용)
```

## 3. Anonymous Volume

yaml

```yaml
services:
  app:
    image: myapp
    volumes:
      - /app/data  # 이름 없는 볼륨
```

**특징:**

- 임시 데이터 저장
- 컨테이너 삭제 시 같이 삭제됨
- 거의 사용 안함

## 볼륨 옵션들

### Read-Only (읽기 전용)

yaml

```yaml
services:
  web:
    image: nginx
    volumes:
      - ./config:/etc/nginx:ro  # 읽기만 가능
```

### 권한 설정

yaml

```yaml
services:
  app:
    volumes:
      # rw = read-write (기본값)
      - ./data:/data:rw
      # ro = read-only
      - ./config:/config:ro
```