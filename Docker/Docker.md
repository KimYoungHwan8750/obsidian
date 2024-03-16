## Docker

도커란 가상환경을 이미지화해서 다양한 환경을 자유롭게 오고갈 수 있게 해주는 오픈소스 가상화 플랫폼이다. 이는 환경이 바뀔 때마다 다시 환경 구축해야하는 번거로움을 극단적으로 단축해주고, 도커 허브에 있는 다양한 이미지를 빠르게 다운 받을 수 있어 생산성에 큰 도움을 준다.

### 왜 쓸까?

위의 예시를 통해서는 이해가 잘 안 될수가 있다.

본인의 경우 노트북 2개와 데스크톱1개를 돌아가면서 사용하기 때문에  ==개발 환경이 자주 바뀐다==. 심지어 피씨방에서 코딩할 때도 간혹 있는데, 이렇게 4개 이상의 디바이스에서 프로그래밍을 할 때마다 매번 파이썬을 설치하고 JDK를 설치하고 깃을 설치하는 과정이 너무나 번거로운 것이다.

개인으로 작업하면서 많은 디바이스를 사용함에도 이리 번거로운데, 가령 협업을 하게 된다면 어떨지 생각해보자.

팀원이 10명만 되더라도 모든 팀원이 같은 환경을 구축해야하고, A라는 앱에 추가되는 기능으로 인해 환경이 바뀌게 된다면 나머지 9명 또한 같은 환경을 구축하는데에 비용(여기서 말하는 비용이란 단순한 재화가 아닌 인력이나 학습 비용등의 의미도 포함한다)이 발생한다. 심지어 그 9명이 각 1개의 디바이스만 사용한다는 보장은 없으므로 최소 9 + @개 환경을 새로 구축해야한다.

하지만 도커를 사용하면 어느 디바이스에서 작업하더라도 도커만 설치하면 현재 컴퓨터에서 손쉽게 개발 환경을 동기화시킬 수 있다.

### 시작하기

#### 환경

* Window11

#### 학습 배경

Docker를 안 들어본 사람은 없을 것이다.

특히 채용 공고를 보면 Docker와 Kubernetes 같은 단어들을 흔히 볼 수 있기에 실무에서 일하려면 필수적으로 익혀야할 기술로 알고 있었다.

달리 말하면 취직을 하기 전까진 나중에···, 나중에··· 하면서 학습을 미뤘었는데 최근 면접 기회를 얻게 되었고 해당 기업에서 요구하는 스택에 포함되어 이참에 공부를 진행하게 되었다.

#### 설치하기

##### 도커 메인 화면

![docker homepage](Docker/image/Pasted%20image%2020240316155516.png)

도커의 메인화면.

GetStarted를 눌러 다운로드 페이지로 이동할 수 있다.

![download page](Docker/image/Pasted%20image%2020240316155651.png)

본인의 개발환경에 맞는 버전을 설치하면 된다.

필자는 Windows에서 진행했다.

##### 도커 실행 화면

![docker lunch page](Docker/image/Pasted%20image%2020240316160020.png)

![docker search](Docker/image/Pasted%20image%2020240316161132.png)

도커 허브에서 이미지를 검색해 다운받을 수 있다.

![downloaded ubuntu](Docker/image/Pasted%20image%2020240316161254.png)

우분투 이미지가 다운로드되었다.

#### 가상 환경 접속하기

이제 쉘에서 docker를 통해 여러 작업이 가능하다.

```shell
# ubuntu 이미지를 사용해 test_container라는 이름을 가진 컨테이너 생성
PS C:\Users\younghwan\Desktop> docker create -i -t --name test_container ubuntu

86c406491658730cdd9f65477e3e1e2bb1220aec8233455a97f87fe3c254606f

# 컨테이너 목록 표시, test_container라는 ubuntu 이미지를 사용한 컨테이너가 7초 전에 만들어졌다는 정보를 알 수 있다.
PS C:\Users\younghwan\Desktop> docker ps -a

CONTAINER ID   IMAGE     COMMAND       CREATED         STATUS    PORTS     NAMES
86c406491658   ubuntu    "/bin/bash"   7 seconds ago   Created             test_container
```

![created docker container](Docker/image/Pasted%20image%2020240316162302.png)

도커 컨테이너가 추가되었다.

이제 해당 가상환경의 쉘을 사용하고 싶다면 `docker attach 이름`명령어를 수행하면 된다.

```shell
# test_container를 start한다.
PS C:\Users\younghwan\Desktop> docker start test_container

test_container

# test_container의 shell에 접속한다.
PS C:\Users\younghwan\Desktop> docker attach test_container

# test_container의 shell이 실행되었다.
root@86c406491658:/#
```

이제 우리가 생성한 우분투 인스턴스를 사용하는 가상환경이 만들어졌고 접속까지 되었다.

가상 환경을 새로 만들 때마다 패키지 매니저를 업데이트 해놓는 습관을 들이는 것을 추천한다.

```shell
# 패키지 업데이트
apt-get update -y
apt-get upgrade -y
```

이제 `git`을 입력하면 오류가 날 것이다.

git을 설치하자.

```shell
# git 설치
apt-get install git
# git 설치 후 git 명령어 수행
git
```

```shell
root@86c406491658:/# git
usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           [--super-prefix=<path>] [--config-env=<name>=<envvar>]
           <command> [<args>]

These are common Git commands used in various situations:

start a working area (see also: git help tutorial)
   clone     Clone a repository into a new directory
   init      Create an empty Git repository or reinitialize an existing one

work on the current change (see also: git help everyday)
   add       Add file contents to the index
   mv        Move or rename a file, a directory, or a symlink
   restore   Restore working tree files
   rm        Remove files from the working tree and from the index

examine the history and state (see also: git help revisions)
   bisect    Use binary search to find the commit that introduced a bug
   diff      Show changes between commits, commit and working tree, etc
   grep      Print lines matching a pattern
   log       Show commit logs
   show      Show various types of objects
   status    Show the working tree status

grow, mark and tweak your common history
   branch    List, create, or delete branches
   commit    Record changes to the repository
   merge     Join two or more development histories together
   rebase    Reapply commits on top of another base tip
   reset     Reset current HEAD to the specified state
   switch    Switch branches
   tag       Create, list, delete or verify a tag object signed with GPG

collaborate (see also: git help workflows)
   fetch     Download objects and refs from another repository
   pull      Fetch from and integrate with another repository or a local branch
   push      Update remote refs along with associated objects

'git help -a' and 'git help -g' list available subcommands and some
concept guides. See 'git help <command>' or 'git help <concept>'
to read about a specific subcommand or concept.
See 'git help git' for an overview of the system.
```

깃이 정상적으로 설치되었다.

또한 도커는 commit, run, pull등 깃과 유사한 명령어 구조를 가지고 있어 깃 사용자는 익히는 게 어렵지 않은 편이다.

##### 명령어


일부 명령어엔 docker를 명령어 가장 앞에 적어야한다. (ex: pull ubuntu => docker pull ubuntu)

| 명령어                                        | 동작                      | 예시                                             |
| --------------------------------------------- | ------------------------- | ------------------------------------------------ |
| pull 이미지_이름                              | 이미지를 내려받는다       | docker pull ubuntu                               |
| create -i -t --name 컨테이너_이름 이미지_이름 | 컨테이너 생성             | docker create -i -t --name test_container ubuntu |
| ps -a                                         | 컨테이너 상태 확인        | docker ps -a                                     |
| start 컨테이너_이름                           | 컨테이너 동작             | docker start test_container                      |
| attach 컨테이너_이름                          | 해당 컨테이너 커멘드 접속 | docker attach test_container                     |
| exit                                          | 컨테이너 접속 해제        | exit                                             |
| commit 컨테이너_이름 이미지_이름              | 커밋                      | docker commit test_container test_image          |
| images                                        | 현재 이미지 확인          | docker images                                    |
| login                                         | 로그인                    | docker login                                                 |


## 마치며

다양한 환경을 사전에 만들어두고 필요에 따라 사용 가능하다는 것이 핵심이다. 따라서 협업의 생산성을 높여주기 때문에 본인이 취준 중인 개발자라면 반드시 익혀야할 스택이라고 생각한다.

### Reference

[도커 홈페이지](https://www.docker.com/)