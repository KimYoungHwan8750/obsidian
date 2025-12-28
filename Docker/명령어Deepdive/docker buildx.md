build 명령어 대신 buildx를 표준으로 사용해도 좋으며, 현재 전환의 과도기에 있다고 보면 된다.

우선 로컬에서 간단하게 할 때는 기본 빌더를 써도 좋지만, GithubAction이나 Jenkins등을 써서 CI/CD를 구축하는 경우 서버는 대개 서버와 로컬 환경이 다르므로 플랫폼을 지정해서 빌드해줘야한다.

`docker buildx create --name BUILDER_NAME --driver docker-container --bootstrap`

핵심 옵션을 살펴보자.
## 빌더 생성 관련 명령어
`--name`: 빌더의 이름을 지정

`--driver`: 기본값은 docker다. 이는 로컬 데몬에 종속되어있어 docker-container를 반드시 지정해야한다. 이는 빌드용 도커 컨테이너를 따로 운용해서 멀티플랫폼 빌드를 수행하는 역할을 한다.

`--bootstrap`: 이 명렁어 (빌드)가 끝나는 즉시 빌드용 컨테이너를 구동함. 옵션 사용 안 하면 추후 첫 빌드를 수행할 때 컨테이너가 구동됨

`--use`: 빌더 생성과 동시에 해당 빌더를 사용하겠다는 의미이다. create 이후 use 명령어를 따로 쓰지 않기 위한 단축 명령어다.

## 빌더 관련 명령어
`docker buildx ls`: 빌더 목록

`docker buildx use BUILDER_NAME`: BUILDER_NAME에 맞는 빌더 사용

`docker buildx use default`: 기본 빌더 사용

`docker buildx rm BUILDER_NAME`: BUILDER_NAME 삭제

`docker buildx inspect --bootstrap`: inspect는 원래 빌더의 상세 정보를 표시해주는 기능을 가졌지만 `--bootstrap` 옵션이 추가되면 성격이 바뀐다. 시운전하여 빌더 컨테이너가 빌드 작업을 수행하는데 이상이 없는지 테스트하게 된다.


## 빌드 관련 명령어
`docker buildx build`: 기본 형태

`-t`: name:1.0.0과 같이 이미지 이름과 버전을 명시할 수 있다.

`--push` or `--load`: build 결과물 처리 방식 설정
>- `--push`: docker hub에 업로드. 멀티 플랫폼 사용할 경우 필수
>- `--load`: 단일 플랫폼 빌드했을 때만 사용 가능. 이유는 플랫폼 별 빌드 파일을 처리할 마땅한 워크 플로우가 없음.

`-o type=docker,dest=my-app.tar`: 출력물의 타입과 경로를 지정한다. docker 타입으로 내보낸 이미지는 추후 `docker load` 명령어로 불러올 수 있다.

`--no-cache`: 아주 <span style="color:red">핵심적인 옵션</span>이다. 도커는 캐시를 사용하는데, 만약 Dockerfile에 `git clone`이나 `apt update && apt upgrade` 같은 명령어가 있다면, 실제로 패키지나 git 저장소 소스 코드의 내용이 달라졌더라도 캐싱된 소스 코드를 사용하게 된다. 이러한 동작을 잘 이해하고 도커를 사용해야한다. 그러나 이때 --no-cache 옵션을 사용하게 되면 아예 캐시를 사용하지 않게 되는데 이러한 점을 극복하고자 캐시 버스팅이라는 우회 방법을 쓴다.

```dockerfile
FROM ubuntu:latest
# 캐싱이 필요한 필요없는 코드들
# ...
RUN 
```

`--platform`: 

|**플랫폼 명칭**|**설명**|**비고**|
|---|---|---|
|**`linux/amd64`**|일반적인 Intel/AMD 64비트 PC 및 서버|가장 표준적|
|**`linux/arm64`**|애플 실리콘(M1/M2/M3), AWS Graviton, 최신 모바일 기기|최근 수요 급증|
|**`linux/arm/v7`**|라즈베리 파이 3/4 등 32비트 ARM 기기|IoT 기기용|
|**`linux/386`**|아주 오래된 32비트 Intel/AMD 환경|거의 안 쓰임|
|**`windows/amd64`**|윈도우 컨테이너 환경|특정 윈도우 이미지 필요|