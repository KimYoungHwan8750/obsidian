## RUN

이미지를 빌드하기 이전에 실행되는 명령어다.

```dockerfile
FROM node:22-alpine
RUN npm install prisma
```

위 경우는 node 이미지를 베이스로 해서 prisma를 설치한 이미지를 만드는 과정이다. 여러 명령어를 실행하려면 아래와 같은 방법들이 있다.

## CMD

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

## ENTRYPOINT

컨테이너를 실행할 때 기본으로 실행할 명령어 집합을 의미한다.

예를 들면 pyhon은 쉘에서 `python 내가만든파일.py`로 파이썬 코드를 실행하는데, 만약 python 파일을 실행하기만 하는 컨테이너라면 매번 python을 입력하는 대신에 `ENTRYPOINT ["python"]`를 설정하면 컨테이너를 실행할 때 자동으로 python 명령어가 실행된다.

## 차이점

RUN은 이미지 빌드 중에 실행되어 이미지 레이어에 결과물을 반영한다.
CMD는 컨테이너 구동시 실행되며 컨테이너 구동시 입력한 사용자 변수에 의해 오버라이딩된다.

`CMD ["-p", "8080"]`처럼 기본값으로 실행될 수 있게 만든 후 사용자의 `docker run xxxx -p 3000` 명령에 오버라이딩된다.

ENTRYPOINT는 CMD와 같은 역할을 하지만 사용자에 의해 오버라이딩되지 않는다는 차이점이 있다.

이 명령어들은 각각 shell form, exec form의 형태로 사용이 가능한데 아래에서 설명한다.

### Shell Form

`RUN npm i`와 같이 사용한다.

sh에서 실행되기 때문에 쉘 기능을 사용 가능하다.
(환경변수 치환 $HOME, 파이프 |, 리다이렉션 >)

PID1이 sh가 되기 때문에 주의가 필요하다. 이 점이 아주 중요한데, SIGINT나 같은 신호가 실행 중인 어플리케이션에 전달되는 것이 아니라 sh에 전달된다.

```python
import signal
import time
import sys

def handler(signum, frame):
    print("SIGTERM 받음! 정리 작업 중...")
    time.sleep(2)
    print("정상 종료 완료")
    sys.exit(0)

signal.signal(signal.SIGTERM, handler)

print("앱 시작")
while True:
    time.sleep(1)
```

따라서 신호를 처리하기 위한 위와 같은 코드가 동작하지 않으며 수많은 앱이 종료 시그널을 받아서 DB 작업을 하는 등 클린업 로직이 있을 것인데, 이러한 동작이 제대로 이루어지지 않을 수 있다.

### Exec Form

셸을 거치지 않고 직접 실행된다.

환경변수등 쉘 기능을 사용하려면 명시적으로 `"/bin/sh", "-c", "echo $HOME"`을 입력해줘야한다.


### 종합

위와 같은 이유들로 신호 처리가 중요하지 않은 RUN 명령어는 사용상 편의로 shell form을 많이 사용하며, CMD, ENTRYPOINT는 exec form을 많이 사용한다.

|ENTRYPOINT|CMD|결과 PID 1|CMD 적용 여부|
|---|---|---|---|
|Exec|Exec|실제 앱 ✅|✅ 결합됨|
|Exec|Shell|sh ❌|⚠️ 결합되지만 sh 생김|
|Shell|Exec|sh ❌|❌ 무시됨|
|Shell|Shell|sh ❌|❌ 무시됨|