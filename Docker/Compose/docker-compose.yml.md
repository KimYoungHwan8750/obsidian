# services
서비스를 정의하기 위한 기본 프레임이다.
서비스 이름을 나열할 수 있다.

```yml
services:
	- fastapi:
		image: python:3.10-bookworm
	- nest:
		image: node:latest
```

---
## 서비스 내에서 사용하는 옵션
### image
어떤 이미지를 사용할지 지정 가능하다.
`image: python:3.10-bookworm`과 같이 사용한다.

### build

#### context
빌드를 실행할 context를 지정할 수 있다.
이 옵션은 아주 중요한데, 가령 프로젝트 폴더 하위에 A, B, C 폴더가 있고 A, B, C 폴더에는 각각 도커 파일이 존재한다. 프로젝트 폴더에 docker-compose.yml 파일을 작성해 각 도커파일을 이용해 서비스로 묶으려고 할 때 docker-compose에서 context를 .으로 설정하게 되면 다음과 같은 유의 사항들이 있다.

A 폴더의 도커파일에서 `COPY readme.md /app`과 같은 명령어가 있을 때 도커파일 입장에서는 현재 폴더의 `readme.md`이지만 compose의 `context .`에 의해 실행될 때는 `COPY A/readme.md /app`가 되어야한다.

#### dockerfile
도커 파일 이름이 Dockerfile이 아닐 때 어떤 파일을 기반하여 이미지를 빌드할지 지정한다.
`dockerfile: Dockerfile-fastapi`

### container_name
컨테이너 이름을 지정할 수 있다. 하지만 이 옵션은 비추천한다. docker-compose의 기본 정책을 따르는 것이 좋다. 서비스를 업스케일할 때, container1, container2와 같이 자동으로 숫자를 업데이트해주는데 컨테이너 이름이 고정되어 있으면 이러한 동작을 할 수 없다.
`container_name: test_container`

### depends_on
서비스의 시작 순서를 정할 수 있다.
```yml
services:
	service1:
		image: python:3.10-bookworm
	service2:
		depends_on: service1 # service1이 실행된 후 실행
		image: python:3.13-bookworm
```

### volumes
사용할 볼륨을 설정한다.
```yml
volumes:
	- nginx.conf /etc/nginx/ # bind mount 또는
	- nginx-data:/etc/nginx/ # named volume
```

### networks
사용할 네트워크를 설정한다.
```yml
networks:
	- nginx-network

networks:
	nginx-network: {} # 네트워크 선언하거나 이미 만들어진 네트워크 있어야함
```

### ports
바인딩할 port를 설정한다.
```yml
ports:
	- 8080:80 # 호스트의 8080을 컨테이너의 80에 매핑
	- 7777:7143 # 여러개도 가능
```

### deploy (고급)
호스트의 gpu 자원을 사용할 때 쓴다.
```yml
deploy:
	  resources:
		reservations:
		  devices:
			- driver: nvidia
			  count: 1 # 사용할 GPU 개수 (모두 사용하려면 all)
			  capabilities: [gpu]
```
호스트에 nvidia container toolkit이 설치되어 있어야한다.

### environments
환경변수를 설정한다.
```yml
environment:
	GENERIC_TIMEZONE: "Asia/Seoul"
	TZ: "Asia/Seoul"
	N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS: true
	N8N_RUNNERS_ENABLED: true
	DB_TYPE: postgresdb
	DB_POSTGRESDB_DATABASE: "n8n"
	DB_POSTGRESDB_HOST: "n8n-postgres"
	DB_POSTGRESDB_PORT: 5432
	DB_POSTGRESDB_USER: postgres
	DB_POSTGRESDB_SCHEMA: public
```

### restart
컨테이너 재시작 옵션을 설정한다.
`restart: always`

설정값:
- no: 기본값, 컨테이너가 종료되어도 재시작하지 않음
- always: 사용자가 stop으로 껐더라도 docker engine이 재시작할 때 다시 시작함
- on-failure: 정상 종료 시그널이 아닌 다른 시그널로 종료된 경우 재시작
- unless-stopped: 사용자가 명시적으로 stop한 경우에는 docker engine이 재시작되어도 다시 시작하지 않음

주의: always는 프로세스가 정상 종료되어도 재시작되기 때문에 일회성 컨테이너에 always를 줄 경우 무한 반복 작업을 실시함

### profiles
profiles이 설정된 서비스는 기본적으로 `docker compose up` 대상에서 제외된다.
`profiles: ["my-app1"]`이 설정된 서비스는 `docker compose --profile my-app1 up`으로 기존 서비스들과 함께 실행할 수 있다.

여러개를 명시할 때는 `--profile a --profile b` 이렇게 써도 되지만 `COMPOSE_PROFILES=a,b docker compose up`이 조금 더 깔끔하다.

마찬가지로 `docker compose down`에서도 제외되므로 주의하자.

---