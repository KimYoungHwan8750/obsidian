## Compose란?
여러 컨테이너를 동시에 운영하기 용이 yaml 파일로 정의함

docker-compose.yaml 파일에 아래 서술할 내용을 정의하면 된다.

### 서비스 정의

```yaml
services:
	app:
		image: mysql:8
		volumes:
		- db: /var/lib/mysql
		restart: unless-stopped
		environment:
		- MARIADB_ROOT_PASSWORD=123
		network:
		- mynetwork
		port:
		- "3306:3306"
volumes:
	db:
		external: true
networks:
	mynetwork: {}
```

db의 external 옵션의 경우 이미 외부에 있는 db라는 이름의 볼륨을 사용하겠다는 것이다. (해당 볼륨이 존재하지 않으면 에러)

Dockerfile로도 빌드가 가능한데, 이때는 아래와 같이 작성한다.

```yaml
services:
	test:
		build:
			context: .
			dockerfile: Dockerfile # 안 적어도됨. 기본값이 Dockerfile
```

Volumes등 Compose와 같은 옵션이 존재할 경우 Compose가 해당 옵션을 덮어쓴다.

### Args


||args|environment|
|---|---|---|
|**사용 시점**|이미지 **빌드 시**|컨테이너 **실행 시**|
|**Dockerfile에서**|`ARG`로 받음|`ENV`로 받거나 런타임 사용|
|**이미지에 저장**|❌ (빌드 후 사라짐)|✅ (값이 이미지에 포함)|

## 구체적인 예시

### args - 빌드 타임 변수

**docker-compose.yml**:

yaml

```yaml
services:
  nextjs:
    build:
      context: .
      args:
        NODE_ENV: production
        APP_VERSION: 1.0.0
```

**Dockerfile**:

dockerfile

```dockerfile
FROM node:18-alpine

# ARG로 빌드 인자를 받음
ARG NODE_ENV
ARG APP_VERSION

WORKDIR /app
COPY package*.json ./

# 빌드 시점에 사용
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm ci --only=production; \
    else \
      npm install; \
    fi

COPY . .
RUN npm run build

# 여기서 ARG는 더 이상 사용 불가! (빌드 끝)
CMD ["npm", "start"]
```

### environment - 런타임 변수

**docker-compose.yml**:

yaml

```yaml
services:
  nextjs:
    build: .
    environment:
      - DATABASE_URL=postgresql://localhost/mydb
      - API_KEY=${API_KEY}  # .env 파일에서 가져옴
      - NODE_ENV=production
```

**애플리케이션 코드에서 사용**:

javascript

```javascript
// pages/api/data.js
export default async function handler(req, res) {
  // 런타임에 환경변수 사용
  const dbUrl = process.env.DATABASE_URL;
  const apiKey = process.env.API_KEY;
  
  // DB 연결, API 호출 등...
}
```

## 실전 사용 패턴

### 1. **빌드 최적화에 args 사용**

yaml

```yaml
services:
  nextjs:
    build:
      args:
        NODE_ENV: production  # 프로덕션 의존성만 설치
        PYTHON_VERSION: 3.11   # 특정 버전 도구 설치
```

dockerfile

```dockerfile
ARG NODE_ENV=development
ARG PYTHON_VERSION=3.9

# 빌드 시 조건부 실행
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm ci --only=production; \
    fi
```

### 2. **민감 정보는 environment + 파일로**

yaml

```yaml
services:
  nextjs:
    build: .
    environment:
      - DATABASE_URL=${DATABASE_URL}  # 런타임에 주입
      - SECRET_KEY=${SECRET_KEY}
    env_file:
      - .env.local  # 파일에서 환경변수 로드
```

### 3. **둘 다 사용하는 경우**

yaml

```yaml
services:
  nextjs:
    build:
      args:
        NODE_ENV: production     # 빌드 최적화
        NEXT_PUBLIC_API: /api    # 빌드에 포함될 공개 변수
    environment:
      - DATABASE_URL=${DB_URL}   # 런타임 민감 정보
      - REDIS_URL=${REDIS_URL}
```

dockerfile

```dockerfile
# 빌드 시점
ARG NODE_ENV
ARG NEXT_PUBLIC_API
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API}

RUN npm run build  # NEXT_PUBLIC_API_URL이 빌드에 포함됨

# 런타임 시점의 환경변수는 여기서 설정 안 함
# docker-compose의 environment로 주입됨
```

## 보안 주의사항

yaml

```yaml
# ❌ 나쁜 예 - 빌드 args에 비밀키
services:
  app:
    build:
      args:
        DB_PASSWORD: secret123  # 이미지 히스토리에 남음!

# ✅ 좋은 예 - 런타임 environment
services:
  app:
    build: .
    environment:
      - DB_PASSWORD=${DB_PASSWORD}  # 런타임에만 존재
```

**정리**:

- **args** = 빌드 설정 (어떻게 이미지를 만들까?)
- **environment** = 실행 설정 (실행할 때 뭐가 필요할까?)

민감한 정보(비밀번호, API 키)는 절대 `args`에 넣으면 안 돼요!