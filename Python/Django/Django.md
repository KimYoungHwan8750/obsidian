## Django

Java에는 SpringBoot, Python에는 Django가 있다.

INTP Dev는 스프링부트로 개발되었지만 Python도 시간내서 공부하며 문법이 매력적이라고 생각했고 자연스럽게 Django에도 눈길이 갔다. 이번 장에선 Python Django 프로젝트를 시작하는 방법과 간단하게 스프링 부트와 차이점을 소개하려고 한다. 

### 테스트 환경

* 윈도우 11
* PyCharm 2023.3.4 Community
* Python 3.1.2
* pip3
* Django
* venv(가상환경)

Idle은 PyCharm이나 VSCode등 본인이 편한 걸 사용하면 된다.

본 포스트는 PyCharm 2023.3.4 Community 버전으로 작성되었다.

### Django를 시작하기 전에···.

#### 버전 확인

터미널이나 cmd, shell에 `python`을 입력한다.

![python](Python/Django/image/Pasted%20image%2020240309055849.png)

위와 같이 버전 정보가 표시되면 정상적으로 동작하는 것이다.

![python error](Python/Django/image/Pasted%20image%2020240309055533.png)

#### 환경 변수

만약 버전 정보가 표시되지 않고 앱스토어가 열리거나 위와 같은 문구가 출력된다면 다음을 체크해야한다.

* 파이썬 설치 여부
* 환경변수

파이썬이 설치되었는데도 여전히 위와 같은 에러가 발생한다면 환경 변수를 확인해야한다.

![window search](Python/Django/image/Pasted%20image%2020240309060509.png)

윈도우 검색창에 환경을 입력하면 시스템 환경 변수 편집이 표시된다.

![env path](Python/Django/image/Pasted%20image%2020240309060628.png)

환경 변수(N)... 클릭

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

#### 가상 환경

파이썬을 이용해 새 프로젝트를 시작할 때 가상환경에서 구동하는 게 좋다. 사실 권장이 아니라 필수에 가깝다.

프로젝트 A, B, C를 만들었다고 가정한다.

* A : Django 1.1, Selenium 1.5, Numpy 1.5
* B : Selenium 2.0
* C : Seaborn 2.5

A와 B와 C가 사용하는 라이브러리가 모두 다르고, A와 B의 경우 공통적으로 Selenium을 사용하긴 하지만 버전이 다르다. 하지만 여러분이 기본적으로 `pip` 또는 `pip3`를 통해 라이브러리를 설치하게 되면 아까 환경변수에서 설정했던 경로의 Lib(라이브러리) 폴더에 설치된다.

이때 무슨 문제가 발생할까?

1. 예상치 못한 함수를 임포트해서 사용할 수 있다.
2. 버전 관리가 매우 어려워진다.

흔히 발생하는 상황은 아니지만 Seaborn만 사용하는 C에서 Selenium의 함수를 사용할 수 있게 된다. 또한 Selenium 1.5버전을 사용하던 A가, B로 인해 Selenium이 2.0으로 업그레이드되면서 기존 함수를 쓸 수 없어진다던가 하는 예상치 못한 사이드 이펙트가 발생할 수 있다.

##### 가상 환경 만들기

본인의 python 버전에 따라 `pip` 또는 `pip3`를 사용하기 바란다.


```shell
pip3 install virtualenv
```

가상 환경은 파이썬 3.4부터 기본 탑재되어 있다. 만약 설치되지 않았다면 위 명령어를 실행한다

```shell
virtualenv -p python3 intp_dev
```

파이썬 버전과 가상 환경 이름은 본인 임의로 설정하면 된다.

![file created](Python/Django/image/Pasted%20image%2020240311015555.png)

그 후 python3 기반의 intp_dev라는 가상 환경이 생성되었다.

![virtual enviroment directory](Python/Django/image/Pasted%20image%2020240311015729.png)

내용을 확인해보면 로컬 컴퓨터에 설치된 python과 유사한 구조의 새로운 가상 환경임을 확인할 수 있다.

![virtual enviroment](Python/Django/image/Pasted%20image%2020240311015653.png)

필자는 현재 Django를 설치했기 때문에 파일 목록에 Django-admin이 보인다.

이제 해당 가상 환경에 접속해서 필요한 라이브러리를 설치하고 개발을 진행해야하는데, 우선 가상 환경에 접속하기 위해 해당 가상 환경이 설치된 디렉토리로 이동한다. 예를 들면 아까 생성한 intp_dev 폴더가 존재하는 경로에서 shell을 실행하면 된다.

```shell
source intp_dev/bin/activate # Linux
source intp_dev/Scripts/activate # Windows
```

리눅스는 bin, 윈도우는 Scripts 폴더 내에 activate를 실행해주면 된다.

만약 둘 다 아니라면 intp_dev 폴더 내에서 activate 파일의 경로를 찾아 source 명령어에 해당 경로를 대입하면 된다. 폴더 구조가 단순해 찾는 것이 어렵진 않다.

![virtual enviroment example](Python/Django/image/Pasted%20image%2020240311020602.png)

이처럼 실행에 성공하면 괄호 안에 가상 환경 이름이 표시된다.

가상 환경을 종료할 때는 `deactivate`를 입력하면 가상 환경에서 빠져나올 수 있다.

이제 모든 세팅이 끝났다. 원하는 라이브러리를 설치하고 독립된 환경에서 개발을 진행하면 된다. 또한 가상 환경을 이용하면 위에 언급한 단점들을 보완해줄 뿐만 아니라 자주 사용되는 베이스 환경을 만들 수 있다. 예를 들면 나는 웹 개발자이고, 어느 프로젝트를 하더라도 파이어 베이스 메세징을 이용해 푸시 알림을 발송하며 Django Framework를 사용한다.

`pip freeze > 파일명.txt`

또는

`pip3 freeze > 파일명.txt`

Django를 설치하고 기타 필요한 라이브러리를 설치한 후에 위 명령어를 입력하면 현재 가상 환경에 설치된 라이브러리 정보가 txt 파일로 생성된다.

![pip3 freeze run](Python/Django/image/Pasted%20image%2020240311011457.png)

`pip3 freeze > test.txt`를 입력한 생성된 `test.txt` 파일을 실행시킨 화면이다.

이 파일에 기재된 라이브러리를 버전 정보 그대로 다른 가상 환경에 설치하고 싶다면 `pip install -r test.txt` 또는 `pip3 install -r test.txt`를 실행하면 된다. 실제로 사용할 땐 test말고 좀 더 직관적인 이름을 사용하면 된다.

이렇듯 버전 관리가 매우 유용해지고 라이브러리 간 충돌에 대응하기가 쉬워진다. 또한 본인이 알뜰하게 구성해놓은 필수 라이브러리들을 다른 가상 환경에도 손쉽게 설치 가능하니 단점을 보완할 뿐만 아니라 편의성도 제공해준다. 사용 안 할 이유가 없지 않은가.
### Django 시작하기

#### 설치하기

```shell
pip3 install django
```

django를 설치한다. 공식 문서에선 파이썬 3.4.x를 사용하라고 하니 참고한다.

```shell
django-admin startproject 프로젝트명
```

![start django project](Python/Django/image/Pasted%20image%2020240311021757.png)

프로젝트를 생성한다.

![django directory](Python/Django/image/Pasted%20image%2020240311021912.png)

생성된 프로젝트를 확인해보면 manage.py와 intp_dev 폴더가 하나 더 생성되어있다.

우리는 이제부터 manage.py를 이용해 intp_dev 프로젝트를 관리할 수 있다.

```shell
python manage.py
```

![django manage file](Python/Django/image/Pasted%20image%2020240311022219.png)

사용 가능한 명령어 메뉴얼이 표시된다. 이제 간단한 웹사이트를 만들어보자.

본인이 사용하는 Idle을 사용해  프로젝트를 연다.

해당 프로젝트에선 (PyCharm Community Edition 2023.3.4)이 사용되었다.

#### 메인 화면 구성하기

![project layer](Python/Django/image/Pasted%20image%2020240311022656.png)

프로젝트를 처음 실행하면 위와 같이 구성된다.

일단 메인 화면을 만들 것이므로 views.py파일을 intp_dev에 만든다.

![add views](Python/Django/image/Pasted%20image%2020240311023142.png)

views.py가 추가되었다.

##### views.py

```python
from django.http import HttpResponse  
  
def main(request):  
    return HttpResponse("메인화면입니다.")
```

views에 위 내용을 작성한다.

우리가 원하는 것은 메인 화면이므로 index화면을 반납해야한다.

주소에 아무런 URI도 입력하지 않았다면 위 View를 경유해 `메인화면입니다.`라는 텍스트를 응답받는다.

이제 메인 화면을 요청 받았을 때 main 함수가 존재하는 View와 매핑해주어야하는데 urls.py에 코드를 추가함으로써 해당 동작이 가능해진다.

##### urls.py

```python
# 수정 전 코드
from django.contrib import admin  
from django.urls import path  
  
urlpatterns = [  
    path('admin/', admin.site.urls),  
]
```

현재는 admin 페이지만 연결되어있는데 해당 코드 밑에 위 내용을 추가한다.

```python
# 수정 후 코드
from django.contrib import admin  
from django.urls import path  
from intp_dev.views import main  
  
urlpatterns = [  
    path('admin/', admin.site.urls),  
    path('', main)  
]
```

이제 기본 화면으로 요청이 들어오면 view의 main함수가 실행되면서 `"메인화면입니다."`를 반환한다.

서버를 실행해 확인해보자.

manage.py 파일이 있는 곳 또는 현재 실행중인 Idle의 터미널에 `python manage.py runserver`를 실행한다.

![run django server](Python/Django/image/Pasted%20image%2020240311024026.png)

마이그레이션 관련한 경고 문구가 표시되는데 DB 관련 설정은 다음에 포스트하고 이번 장은 생략한다.

`127.0.0.1:8000`, 즉 루프백 주소로 서버가 실행되었다. 브라우저에서 localhost:8000에 접속해보자.

![localhost](Python/Django/image/Pasted%20image%2020240311024221.png)

하지만 이는 단순히 `메인화면입니다.`라는 텍스트 값을 반환하고 있으므로 스프링부트로 치면 RestController와 같은 동작을 한다.

우리는 미리 작성된 html을 반환해야하며 이는 MTV(스프링부트의 MVC와 대응한다) 레이어 중 Template에 해당한다. 또한 템플릿이 사용할 정적 파일의 집합인 static 폴더를 만들고 js파일과 css파일을 위치시켜야한다.

##### settings.py

```python
# 수정 전
ROOT_URLCONF = 'intp_dev.urls'  
  
TEMPLATES = [  
    {  
        'BACKEND': 'django.template.backends.django.DjangoTemplates',  
        'DIRS': [],  
        'APP_DIRS': True,  
        'OPTIONS': {  
            'context_processors': [  
                'django.template.context_processors.debug',  
                'django.template.context_processors.request',  
                'django.contrib.auth.context_processors.auth',  
                'django.contrib.messages.context_processors.messages',  
            ],  
        },  
    },  
]
```

```python
# 수정 후
ROOT_URLCONF = 'intp_dev.urls'  
TEMPLATES_DIR = BASE_DIR / 'templates' # 수정 된 부분
TEMPLATES = [  
    {  
        'BACKEND': 'django.template.backends.django.DjangoTemplates',  
        'DIRS': [TEMPLATES_DIR], # 수정 된 부분
        'APP_DIRS': True,  
        'OPTIONS': {  
            'context_processors': [  
                'django.template.context_processors.debug',  
                'django.template.context_processors.request',  
                'django.contrib.auth.context_processors.auth',  
                'django.contrib.messages.context_processors.messages',  
            ],  
        },  
    },  
]
```

templates에 대한 기본 위치를 설정해줌으로써 뷰에서 템플릿을 반환할 때 `templates/main.html`이 아니라`main.html` 같은 간략한 형태를 사용할 수 있게 되었다.

이제 static 파일에 대한 기본 참조 경로를 설정해보자.

```python
STATIC_URL = 'static/'  
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')] # 추가된 코드
```

이로써 정적 파일을 불러올 때 static 경로를 생략할 수 있다.

##### 현재까지 Directory 구조

![django directory layer](Python/Django/image/Pasted%20image%2020240311032132.png)


뷰에서 데이터가 아닌 템플릿(html)을 리턴해야 하므로 views.py를 수정해야한다.

##### views.py

```python
from django.shortcuts import render  
  
def main(request):  
    return render(request, "main/main.html")
```

render 함수를 통해 main 폴더에 있는 main.html를 응답하고 있다.

main.html의 내용을 보자.

##### main.html

```html
<!DOCTYPE html>  
<!--static 파일들을 모두 로드한다-->
{% load static %}  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>메인화면</title>  
<!--static/css/main.css를 로드한다-->
    <link rel="stylesheet" href="{% static 'css/main.css'%}">  
</head>  
<body>  
<p>렌더링된 메인화면입니다.</p>  
<!--static/js/main.js를 로드한다-->
<script src="{% static 'js/main.js'%}"></script>  
</body>  
</html>
```

##### main.css

```css
p{  
    color:red;  
}
```

##### main.js
```js
console.log('메인페이지')
```

##### 렌더링된 메인 화면

![rendered main](Python/Django/image/Pasted%20image%2020240311032447.png)

메인화면에서 CSS와 JS파일이 정상적으로 동작한다.

```html
<link rel="stylesheet" href="{% static 'css/main.css'%}">  
```

스프링부트 개발자라면 익숙한 문법 하나를 볼 수 있다. 타임리프와 유사한 `{% static ''%}`와 같은 형태를 볼 수 있는데, 장고에선 이를 템플릿 문법이라 하며 말 그대로 템플릿(html)에서 사용 가능한 문법이다.

템플릿 문법의 동작을 알아보기 위해 views.py를 다시 수정해보자.

##### views.py

```python
def main(request):
    content = {"f1_key": "f1_value",
               "f2_key": "f2_value"}
    return render(request, "main/main.html", content)
```

##### main.html

```html
<p>렌더링된 메인화면입니다.</p>  
<p>{{f1_key}}</p>
```

![template grammer](Python/Django/image/Pasted%20image%2020240311033335.png)

f1_key의 벨류인 f1_value가 출력된다.

뷰에서 전달된 객체에 `{{object key}}`형태로 간단하게 접근 가능하다.

이 외에도 조건문, 반복문, 필터 등 다양한 문법이 존재한다.

```html
{% if f1_key != 'f1_value'%}  
<p>  
    f1_value  
</p>  
{% endif %}
```

![template if grammer](Python/Django/image/Pasted%20image%2020240311034205.png)

조건문 안의 내용이 false이므로 f1_value가 렌더링되지 않았다.

## Django와 SpringBoot

### 차이점

우선, 그동안 꼭 사용해보고 싶었는데 미루던 Django를 학습하게 되어 매우 즐거운 시간이었다. 또한 SpringBoot와 비교하며 사용하다보니 여러가지 장단점을 찾을 수 있었다.

이는 사용 2일차에 작성한 문서이기 때문에 지극히 초보자의 관점이자 개인적인 관점임을 밝힌다.

**Django 장점**

* Python 언어로 작성되었으므로 해당 언어의 장점을 상속받는다. (느슨한 타입 체크, 방대한 라이브러리)
* 뷰와 템플릿간의 상호작용이 **매우** 쉽다.
* ORM에 기인한 모델 정보에 접근하기 **매우** 쉽다.
* 어드민 페이지가 탑재되어있다.

**Django 단점**

* Python 언어로 작성되었으므로 해당 언어의 단점을 상속받는다. (느슨한 타입 체크, 느린 속도)
* 요청부터 응답하기까지 일련의 과정들의 독립성이 스프링 부트에 비해 부족하다.

**SpringBoot 장점**

* Java 언어로 작성되었으므로 해당 언어의 장점을 상속받는다. (엄격한 타입 체크, 인터페이스 기반 프로그래밍)
* 레이어를 많이 나뉘어 의존 관계를 많이 줄일 수 있다.

**SpringBoot 단점**

* Java 언어로 작성되었으므로 해당 언어의 단점을 상속받는다. (엄격한 타입 체크, 과한 설계)


이 외에도 사용자에 따라 학습에 대한 벽이 느껴지는 경우도 있고 개인적인 취향에 따라 이야기가 많이 다르다보니 객관적으로 서술할만한 항목들에 대해서만 나열해보았다.

특히 Python이 제공하는 각종 편리한 기능들(인덱스 슬라이싱, 리스트 컴프리헨션)과 그 외 문법들을 써보고 상당한 충격을 받았던 경험이 있다.

그야말로 '와 너무 편한데...?'

정말 개인 프로젝트 정도는 뚝딱 해치울 수 있는 환경을 제공하고 있었다.

반대로 자바는 그야말로 점잖다.

가뜩이나 컨트롤러 -> 서비스 -> 리파지토리 단계를 거치는데, 다형성이나 캡슐화, 단일 책임 원칙을 신경쓰다보면 인터페이스에 기반해 구현체를 사용하게 되고 매개변수를 각 계층끼리 전달하게 되면서 매개변수 타입을 적어주는 것마저도 귀찮아진다. 또한 방금 서술했듯이 과한 설계를 하게 되면 클래스가 많아지고 코드량이 많아진다.

그럼 과한 설계를 안 하면 되지 않나, 라고 할 수 있지만 과한 설계를 하지 않기 위해 설계에 신경을 써야하는 추가 비용이 발생하는 아이러니한 상황이다.

### 결론

장단점이 명확한 두 가지 프레임워크를 모두 사용해봄으로써 프로젝트를 진행할 때 선택지가 많아졌고, 본인 프로젝트에 맞는 장단점을 소유한 프레임워크를 고르면 되니 설레는 일이다.

두 가지 프레임워크 모두 매우 매력적이다.

학습에 대한 비용 및 장단점에 기인하여 프레임워크를 고르면 된다.

그러나 개인 프로젝트를 만들 때는 장고를 앞으로 자주 사용하게 될 것 같다.