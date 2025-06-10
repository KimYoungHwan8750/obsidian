설치가 완료된 다음 서비스 설정 및 구동을 위해 powershell을 관리자 모드에서 열어준다. (관리자 모드 중요 ✅)

그 다음 아래 명령어를 통해 정상적으로 설치되어있는지 확인한다.
 
`Get-WindowsCapability -Online | ? Name -like 'OpenSSH*'`
 
OpenSSH.Server의 State에 Installed 라고 보인다면 제대로 설치된 것이 맞다.
그 다음 아래 명령어를 통해 현재 서비스 상태를 확인해본다.
 
`Get-Service sshd`
 
아마 OpenSSH 서버를 구동시키지 않았다면, Status가 Stopped 으로 되어있을 것이다. 
아래 명령어를 통해 서비스를 시작 시킬 수 있다.
 
`Start-Service sshd`
 
참고로, 부팅 할 때 마다 실행하게끔 하는 방법은 다음과 같다.
 
`Set-Service -Name sshd -StartupType 'Automatic'`

만약 자동 실행을 취소하고 싶다면 다음 명령어를 실행한다.

`Set-Service -Name sshd -StartupType 'Automatic'`

linux의 경우 `/home/user/.ssh/authorized_keys` 경로에 공개키를 보관한다.

window의 경우 개인키는 `C:\Users\<사용자명>\.ssh\id_rsa`에 보관한다.
공개키는 `C:\Users\<사용자명>\.ssh\id_rsa.pub`에 보관

키 생성 방법 `ssh-keygen -t rsa -b 4096 -C "kyh@example.com"`

만약 방화벽이 동작 중이라면 `Windows 설정 > 업데이트 및 보안 > Windows 보안 > 방화벽 및 네트워크 보호 > 고급 설정`에서 인바운드 규칙을 설정해준다.

**[출처]** [[ Windows ] 윈도우에서 ssh 서버 활성화하기: mac에서 windows ssh 접속하기](https://blog.naver.com/twilight_teatime/223668641470)|**작성자** [사진찍는 개발자](https://blog.naver.com/twilight_teatime)



**`