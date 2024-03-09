## Django


### 테스트 환경

* 윈도우 11
* PyCharm 2023.3.4 Community
* Python 3.1.2
* pip3
* Django
* venv(가상환경)

Idle은 PyCharm이나 VSCode등 본인이 편한 걸 사용하면 된다.

본 포스트는 PyCharm 2023.3.4 Community 버전으로 작성되었다.

### Django 시작하기

#### 버전 확인

터미널이나 cmd, shell에 `python`을 입력한다.

![python](Python/Django/image/Pasted%20image%2020240309055849.png)

위와 같이 버전 정보가 표시되면 정상적으로 동작하는 것이다.

![python error](Python/Django/image/Pasted%20image%2020240309055533.png)

만약 버전 정보가 표시되지 않고 앱스토어가 열리거나 위와 같은 문구가 출력된다면 다음을 체크해야한다.

* 파이썬 설치 여부
* 환경변수

파이썬이 설치되었는데도 여전히 위와 같은 에러가 발생한다면 환경 변수를 확인해야한다.

![window search](Python/Django/image/Pasted%20image%2020240309060509.png)

윈도우 검색창에 환경을 입력하면 시스템 환경 변수 편집이 표시된다.

![env path](Python/Django/image/Pasted%20image%2020240309060628.png)

환경 변수(N)... 클릭릭

![](Python/Django/image/Pasted%20image%2020240309060727.png)

해당 화면에서 두 가지 변수가 확인된다.

* (사용자 계정)에 대한 사용자 변수(U)
* 시스템 변수(S)

사용자 변수에 입력한 Path는 해당 사용자에 한해서만 적용되고 시스템 변수는 모든 사용자에게 동일하게 적용되는 환경 변수이다.

이제 python 인터프리터의 경로를 Path에 등록해주면 된다. 시스템 변수 또는 사용자 변수 모두 Path라는 변수가 존재하는데, 원하는 스코프에 있는 Path 변수를 클릭해 편집(E) 또는 편집(I)를 클릭한다.

![env settings](Python/Django/image/Pasted%20image%2020240309061648.png)

새로 만들기를 클릭한 후 python.exe가 존재하는 경로를 입력한다. 추후 pip를 사용하기 위해 방금 등록한 주소를 복사하여 `\Script`를 가리키는 경로를 하나 더 추가한다.

* `python.exe가 있는 경로`
* `python.exe가 있는 경로\Scripts`

