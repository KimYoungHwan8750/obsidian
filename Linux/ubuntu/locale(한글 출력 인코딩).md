`apt install locales`
`locale-gen ko_KR.UTF-8`

아래 두 가지 명령어를 실행해서 현재 세션의 인코딩을 바로 UTF-8로 적용 가능하며, 영구적으로 적용하려면 추가적인 절차를 밟아야한다.
`export LANG=ko_KR.UTF-8`
`export LC_ALL=ko_KR.UTF-8`

`echo "export LANG=ko_KR.UTF-8" >> ~/.bashrc`
`echo "export LC_ALL=ko_KR.UTF-8" >> ~/.bashrc`

경로에서 ~는 홈 디렉토리를 의미한다. 사용자별로 홈 디렉토리는 다르므로 유의.
`.bashrc` 파일은 bash run command 파일로, 해당 쉘이 시작될 때 자동으로 실행되는 스크립트이다.

`source ~/.bashrc` 명령을 통해서 스크립트를 바로 실행해 설정을 적용할 수 있기 때문에 현재 세션에 적용하기위한 `export LANG=ko_KR... export LC_ALL=ko_KR...`을 생략해도 된다.
