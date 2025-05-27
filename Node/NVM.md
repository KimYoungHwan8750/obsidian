## NVM이란?
Node Version Manager의 약자로, 노드 버전을 스위치하며 사용할 수 있다.

나 같은 경우 nvm이 종합적으로 관리를 해서 그런지 nvm을 설치한 이후부터는 IDE의 터미널에서 node 명령어를 사용할 수 없었다. CMD에서 `cd 작업경로`를 사용해 해당 워크 스페이스로 이동한 뒤 node 명령어를 사용했다.

`nvm install 22`: 노드 22의 최신 버전 설치(ex. 22.1.6)
`nvm install 22.0`: 노드 22.0.0 버전 설치
`nvm ls`: 현재 설치된 노드 버전
`nvm use 22`: node 22버전 사용
