## Dockerfile
도커 파일이란 이미지를 빌드하기 위한 스크립트 파일이다. 모든 도커파일은 FROM으로부터 시작되어야한다.

`FROM`
어떤 이미지를 베이스로 만들 것인지를 정의한다.
FROM node:22-alpine은 내 이미지 목록에 node:22-alpine이 있으면 실행하고 없으면 docker pull node:22-alpine을 수행한 뒤 빌드가 진행된다.

---

`ARG`
`FROM`전에 사용 가능한 몇 안되는 명령어. 도커파일 내에서 사용할 변수를 지정할 수 있다.
```dockerfile
ARG HI=node-alpine

FROM ${HI}
ARG LS=/ls
CMD ${LS}
```

---

`RUN`

이미지가 빌드되는 동안 실행되는 명령어다.

```dockerfile
FROM node:22-alpine
RUN npm install prisma
```

위 경우는 node 이미지를 베이스로 해서 prisma를 설치한 이미지를 만드는 과정이다. 여러 명령어를 실행하려면 아래와 같은 방법들이 있다.

---

`ENTRYPOINT`

컨테이너를 실행할 때 기본으로 실행할 명령어 집합을 의미한다.

예를 들면 pyhon은 쉘에서 `python 내가만든파일.py`로 파이썬 코드를 실행하는데, 만약 python 파일을 실행하기만 하는 컨테이너라면 매번 python을 입력하는 대신에 `ENTRYPOINT ["python"]`를 설정하면 컨테이너를 실행할 때 자동으로 python 명령어가 실행된다.

---

`CMD`

컨테이너를 실행할 때 기본으로 실행할 명령어 집합을 의미한다.

python을 실행할 때를 가정해 설명하면 이해가 쉬울 것 같다.

```dockerfile
FROM python
ENTRYPOINT ["python"]
CMD ["main.py"]
```

이 도커파일로 빌드된 이미지는 python을 베이스로 하여 컨테이너가 실행되면 자동으로 python 명령어가 실행된다. `file1`, `file2`가 있다고 가정했을 때 `python file1.py`, `python file2.py`를 입력할 것 없이 `file1.py`, `file2.py`만 입력해도 원하는 결과를 얻을 수 있다.

이때 docker run 명령어의 CMD에 아무런 인자도 전달하지 않으면 main.py가 실행되고, file1.py 인자를 전달하면 CMD에 정의된 main.py는 완전히 대체되어 실행되지 않는다.

따라서 `ENTRYPOINT ["python"]`과 `CMD ["python"]`은 얼핏보면 같은 동작을 하지만, 유저가 인자를 전달하는 순간 python은 실행되지 않기 때문에 컨테이너 실행과 동시에 반드시 실행되어야할 명령어라면 `ENTRYPOINT`에 전달하는 것이 좋다.

---
`as`
스테이지에 별칭을 지정할 때 쓴다.
해당 컨테이너 실행의 결과물만이 필요할 때 사용한다.

```dockerfile
FROM nginx:latest as builder
---

```


---

`LABEL`
메타데이터를 정의 가능하다.
key=value 형식을 띈다.

```dockerfile
FROM node:22-alpine
LABEL creator=younghwan
LABEL fruit=apple
```

---

`VOLUME`
영구저장소를 정의한다.

사용자는 Dockerfile의 VOLUME 섹션을 보고 이 이미지가 어떤 영구저장소를 필요로하는지 알 수 있다.

```dockerfile
FROM mariadb
VOLUME ["/var/lib/mysql"]
```

보안상의 이유로 Dockerfile에서는 호스트의 경로를 입력하지 못한다.

위 옵션은 다음 커맨드에 의해 구현된다.

```shell
docker run -v 호스트의어떤경로:/var/lib/mysql #...생략
```

Docker는 VOLUME의 인자로 전달된 경로와 -v 옵션에 전달된 컨테이너의 경로가 매칭되면 적절한 볼륨을 생성한다. 만약 Dockerfile에는 VOLUME섹션이 있지만 docker run에서 -v 옵션을 통해 볼륨을 할당하지 않으면 자동으로 익명 볼륨이 생성된다.

그렇다면 볼륨에 대해 좀 더 파헤쳐보자.

볼륨은 호스트의 로컬디스크에 마운팅되는 경우와 명명된 볼륨에 마운팅되는 경우, 익명 볼륨에 마운팅 되는 경우가 있다.

이것은 내가 볼륨에 대해 생각해보면서 정리한 내용이라 다소 사실과 다를 수 있으니 참고용으로 사용하길 바란다.

1. 명명된 볼륨에 마운팅되는 경우

여기서 명명된 볼륨이란 `docker volume create 볼륨이름`으로 생성된 볼륨을 의미한다. 이렇게 생성된 볼륨은 비어있는 상태이며, `docker run -v 볼륨이름:/something/path`에 의해 초기화된다. 이후 `볼륨이름:/something/path`이 `-v`에 의해 호출되면 해당 볼륨엔 데이터가 있으므로 볼륨의 내용이 컨테이너에 강제로 덮어씌워진다.

2. 바인드 마운트(볼륨에 호스트 경로를 입력)

이 경우 호스트와 도커 간 데이터 공유가 가능해진다.

3. 익명 볼륨

특성 자체는 명명된 볼륨과 같다. 즉 '이름이 없는 명명된 볼륨' 개념이다. 더 정확히 말하자면 당연히 이름은 있지만 그 이름은 어떠한 의미도 없이 Docker의 알고리즘에 의해 랜덤하게 생성된 이름이며, 이는 곧 개발자의 제어를 벗어난 볼륨을 의미한다.

여기서 데이터의 생명 주기도 짚고 넘어가자. 볼륨 부분은 내가 특히나 헷갈려했던 부분이라 최대한 상세하게 서술한다.

`A컨테이너 시작->중지->시작`
이 경우 컨테이너는 볼륨의 유무와 상관없이 데이터가 유지된다.

문제는 A컨테이너와 다른 B컨테이너 사이의 볼륨이다. 이때 Dockerfile을 생성하는 사람은 데이터의 유지가 필요하다고 생각될 경우 VOLUME 섹션을 작성할 수 있는데, 사용자는 이를 보고 명명된 볼륨을 사용할지, 바인드 마운트할지, 익명 볼륨을 사용할지를 결정하면 된다.

만약 내가 이 데이터를 가지고 좀 많은 컨테이너를 생성해가며 작업을 할 것 같다. (명명된 볼륨)

소스 코드등 내가 실시간으로 데이터를 다루며 로컬에서 작업을 해야할 거 같다. (바인드 마운트)

그냥 컨테이너를 새로 시작할 때마다 새로운 데이터였으면 좋겠다. (깔끔한 초기 세팅으로 시작하고 싶다) (익명 볼륨)

즉 Dockerfile에 작성하는 VOLUME은 해당 이미지를 만드는 사람의 의도(너가 사용해야할 저장소가 있어)이고, 사용하는 사람이 -v 옵션에 무엇을 주느냐는 사용자의 의지(그 사용해야할 저장소를 나는 컨테이너에서 공유할거야/내 로컬에 마운트해서 작업할거야/어차피 테스트할거라 만들 때마다 초기 상태로 돌아가고 싶어)이다.

처음에 이 개념이 몹시 이해 안 됐지만 나는 이렇게 이해함으로써 볼륨을 적절하게 다룰 수 있게 되었다.

---

`EXPOSE`

EXPOSE는 문서의 역할을 한다. 사용자가 EXPOSE를 보고 노출되어야 하는 포트에 대한 정보를 얻을 수 있다. 실질적인 역할을 수행하는 메타데이터는 아니다.

개발자는 이 메타데이터를 확인하여 `docker run -p` 옵션을 적절하게 사용할 수 있다.

---

`ENV`

환경 변수를 정의 가능하다.

예를 들면 Java는 JAVA_HOME 환경 변수를 사용해 경로 정보를 옳게 읽어들이고 여러가지 작업을 한다. 이를 ENV로 생각하자면 `ENV JAVA_HOME=/some/path/bin`처럼 쓰이는 셈이다.

참고로 mariadb는 `MARIADB_ROOT_PASSWORD=비밀번호` 같은 환경 변수를 사용한다.

---

`ADD`
COPY 명령어에 추가적인 기능이 있는 명령어다. COPY는 단순 복사만 수행하지만 ADD는 URL로부터 파일 다운받기, 압축 해제 같은 고급 기능을 지원한다. 레이어 캐시를 무효화하는 등 고급 기능에 따른 예기치 않은 동작이 있을 수 있으므로 단순한 복사 작업에는 COPY 명령어를 사용할 것을 공식 문서도 권하고 있다.

---

`WORKDIR`
Dockerfile 내 명령어들이 동작할 디렉토리를 정의한다.

```dockerfile
FROM node:22-alpine
COPY ./host/app /docker/app
WORKDIR root
COPY ./host/app /docker/app
# ./host/app /root/docker/app
```

참고로 COPY 명령은 빌드컨텍스트(Dockerfile이 실행되고 있는 경로)에만 접근 가능하다. /C:/ProgramFiles 같은 경로엔 접근할 수 없다.

WORKDIR은 위와 같이 Dockerfile 내에서 Docker의 경로에 prefix를 붙이는 작업이라고 보면 이해가 편할 것이다.

좀 더 구체적인 예제를 보자.

```dockerfile
FROM node:22-alpine
COPY ./host/app /docker/app
WORKDIR root
COPY ./host/app /docker/app
# ./host/app /root/docker/app
WORKDIR /
# 또는 WORKDIR ../
COPY ./host/app /docker/app
# ./host/app /docker/app
```

WORKDIR 이후에 참조되는 도커의 경로는 WORKDIR에 의해 변경되며 별도의 WORKDIR을 정의하지 않는한 유지된다. 보통 명시적으로 절대경로를 사용하지만 상대경로도 가능하다.

`USER`
`ONBUILD`
`STOPSIGNAL`
`HEALTHCHECK`
`SHELL`

### RUN, CMD, ENTRY POINT 핵심 차이점

RUN은 이미지 빌드시에 실행되어 이미지에 결과물이 반영된다.
ENTRY POINT는 컨테이너 실행시 실행되며 이미지에 영향을 끼치지 않는다.
CMD는 컨테이너 실행시 실행되며 이미지에는 영향을 끼치지 않는다. ENTRY POINT와 다르게 유저가 매개변수를 입력하면 덮어씌워져서 유의해야한다.