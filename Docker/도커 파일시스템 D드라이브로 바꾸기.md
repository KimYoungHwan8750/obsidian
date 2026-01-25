1. 도커 데스크탑 종료
2. `wsl -l -v`로 도커 관련 프로세스가 모두 종료되었는지 확인

```shell
PS F:\project\n8n\trend> wsl -l -v
  NAME              STATE           VERSION
* Ubuntu            Running         2
  docker-desktop    Running         2
```  
3. D:\Docker\backup 폴더 생성
4. `wsl --export docker-desktop D:\Docker\backup\docker-data.tar` 명령어 실행
5. `wsl --export Ubuntu D:\Docker\backup\ubuntu-data.tar` 명령어 실행
