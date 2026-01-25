`-d`: 백그라운드 실행 (데몬 모드)
`--build`: 컨테이너 시작 전 강제 재빌드
`-scale 서비스명=숫자`: 해당 서비스를 숫자만큼 더 실행

아래는 scale 옵션의 예제이다. fastapi 서버가 3개 더 실행된다.
이때, 호스트쪽 포트를 명시하지 않아야한다. (당연하다, 포트 충돌나니까)
```yml
ports:
	- "8000" # 컨테이너 내부 포트만 명시하거나 

#아예 ports 항목을 작성하지 말아야한다.
```


```shell
PS F:\project\nginx-demo> docker compose up --scale fastapi=3 -d    
time="2026-01-25T23:41:40+09:00" level=warning msg="No services to build"
[+] up 4/4
 ✔ Container nginx-demo-fastapi-1 Running                                                                                                                                                   0.0s 
 ✔ Container nginx-demo-fastapi-3 Created                                                                                                                                                   0.7s 
 ✔ Container nginx-demo-fastapi-2 Created                                                                                                                                                   0.7s 
 ✔ Container nginx-demo-nginx-1   Running  
```

위처럼 서비스가 정상적으로 3개 실행된다.
이때 로드밸런서(nginx)를 사용하게 된다면 서비스명을 명시하게 되면 해당 서비스명으로 위 3개의 아이피:포트가 바인딩되어 로드밸런서를 동작시킬 수 있다.

여기서 주의할게, 이미지 자체에 있는 캐시는 다시 쓴다. 따라서 이미지에 `git clone ...어떤리포지토리"가 있으면 해당 이미지는 리포지토리 내용은 모른채로 `git clone ...어떤리포지토리`만 바라보므로 수정사항이 있어도 명령어가 같으니 해당 캐시를 재사용한다. 따라서 이미지 빌드할 때 --no-cache를 사용해야 이미지가 갱신되며 이때 캐싱을 무시한 이미지를 안전하게 사용하기 위해서 --build 옵션을 사용해 서비스 전체를 재빌드할 수 있게 해주는 것이 좋다.