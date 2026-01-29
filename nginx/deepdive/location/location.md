라우팅을 담당하는 블록이기 때문에 매우 중요하다.
location의 주요 규칙에 대해 몇 가지 알아보자.

## 슬래시

4가지 경우의 수가 있어서 헷갈릴 수 있는데 다음과 같이 생각하면 쉽다.
- location/, proxy_pass/
- location/, proxy_pass
- location, proxy_pass/
- location, proxy_pass

4가지 경우의 수를 보기 전에, Devide and Conquer 해보자.

### location에 /가 있고 없고 차이
location에 /가 있으면 정확히 해당 주소와 매칭된다.
`location /test/`:
	- `/test/`: 매칭됨
	- `/testa`: 매칭 안됨
	- `/test/abc`: 따로 `/test/abc/`에 대한 location 설정이 없다면 매칭됨
`location /test`:
	- `/test`: 매칭됨
	- `/testname`: 매칭됨
	- `/testname/abc`: 매칭됨
	- `/test/abc`: 매칭됨

즉 location에 /가 있으면 딱 명시한 만큼의 경로만 매칭되게 만들고 /가 없으면 해당 location을 prefix로 가지는 모든 경로를 찾도록 동작한다.


### proxy_pass에 /가 있고 없고 차이
이는 단순 명료하다.
사용자가 `/test/api`로 요청을 했고 `location /test/`로 작성되어있다.
/가 있으면 nginx가 편집기 모드로 동작하고 /가 없으면 전달자 모드로 동작한다. 다음은 해당 내용을 설명하는 예시이다.

`proxy_pass example/`: location에 있는 문자열이 사라진 나머지 경로인 `example/api`가 됨
`proxy_pass example`: 사용자가 원래 보낸 경로 `example/test/api`가 됨
