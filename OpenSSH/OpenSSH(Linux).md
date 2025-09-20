## 공통
ubuntu의 경우 `hostname -i` 명령어를 통해 현재 ip를 확인이 가능하다.
`apt install vim`을 통해 편집기를 설치하고 한글 데이터를 올바르게 다루기 위해 locale 설정을 UTF-8로 해준다.

## 서버 설정법

리눅스 환경에 처음 진입한 경우 패키지 업데이트를 실행한다.
`sudo apt update`
`sudo apt upgrade`를 통해 패키지 업데이트 실시
`apt install openssh-server`

root유저로 접속하는 것은 위험하므로 사용자를 추가한다.

`useradd 사용자명` 이때 `useradd -m 사용자명` 명령어를 사용하면 자동으로 `/home/사용자명` 경로에 폴더를 만들어준다. 접속한 사용자는 접속시 자동으로 위 폴더로 접속된다. 패스워드 설정은 `passwd 사용자명`을 입력하게 되면 추가적으로 패스워드를 입력받는 프롬프트가 표시된다.

이후 `service ssh start`를 통해 서비스를 실행해주어야한다. 원격 사용자가 root 계정으로 접속하는 것을 허용하려면 따로 설정을 해주어야한다. 여기선 상세하게 다루지 않는다.

## 클라이언트 설정법

마찬가지로 `apt update`, `apt upgrade`를 수행해준다.

`apt install openssh-client`를 수행한 후 앞서 `hostname -i` 명령어로 확인한 ip를 통해 서버에 접속한다.

`ssh 유저이름@서버ip`를 통해 접속이 가능하다.