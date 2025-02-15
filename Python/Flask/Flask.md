## Flask

Flask는 경량형 프레임워크다.

비교되는 프레임워크로는 Django가 있고, 근래에 FastAPI라는 신흥 프레임워크가 등장해 개발자에게 Django, Flask, FastAPI라는 세 가지 선택지가 생기게 되었다.

나는 세 가지 모두 간단하게 찍먹해보았기 때문에 모든 기능을 다 알지 못한다. 느낀 점과 세간에 익히 알려진 내용을 토대로 비교를 하니 비판적인 시선으로 봐주었으면 좋겠다.

### Django

어드민 페이지와 다양한 기능, 위에 언급한 세 가지 프레임워크 중 가장 무겁다.

### Flask

최소한의 기능을 제공해주고 Django보다 가볍고 빠르다. 그러나 자바 + 스프링부트로 개발을 했던 나에겐 Flask도 이미 신세계였다. 웹페이지에 Hello World를 출력하기까지 소모되는 시간은 대략 1분.

### FastAPI

사용해본 적은 없지만 비동기식으로 동작해 위에 언급한 두 가지 프레임워크보다 최소 1.5배 이상 빠르다고 한다. Restful한 마이크로 서비스 아키텍처에 잘 어울린다고 하니 트렌드에 따라 조만간 공부를 해 볼 예정이다.

## Flask 시작하기

### 설치법

파이참의 터미널에서 진행하거나, shell에서 진행하거나 편한 방식을 선택하면 된다.

![python terminal](Python/Flask/image/Pasted%20image%2020240602001957.png)

`pip install flask` or `pip3 install flask`

pip 버전에 따라 적절한 명령어를 입력한다.

설치가 완료되면 python 파일을 하나 생성하고 코드를 입력한다.

```python
from flask import Flask  
  
app = Flask(__name__)  
# / 주소로 요청이 오면 return에 해당하는 화면을 표시한다.
@app.route("/")  
def main():  
    return "main화면"  
# debug = True 시 live reloading 활성화
app.run(debug=True)
```

![flask server run](Python/Flask/image/Pasted%20image%2020240602002635.png)

콘솔을 확인해보면 5000번 포트에서 서버가 실행되었음을 알 수 있다

단 6줄로 간단한 웹페이지를 작성할 수 있다.

![main page](Python/Flask/image/Pasted%20image%2020240602002614.png)

이때 스트링을 응답해주기 때문에 함수마다 페이지에 대한 코드를 작성하려면 가독성이 박살나기 마련이다.

html을 응답하기 위한 방법은 다음과 같다.

```python
from flask import Flask, render_template  
  
  
app = Flask(__name__)  
  
@app.route("/")  
def main():  
    return render_template("main.html")  
  
app.run(debug=True)
```

`render_template`를 임포트해주고 return 문에 해당 함수를 호출하고 원하는 템플릿 파일을 작성해주면 된다. 이때 주의사항이 있는데 templates 폴더를 root 디렉토리로 삼게 되니 templates/main.html 파일을 반환하게 되는 셈이다.

![directory tree](Python/Flask/image/Pasted%20image%2020240602003911.png)

```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>Title</title>  
</head>  
<body>  
main.html입니다.  
</body>  
</html>
```

![render templates](Python/Flask/image/Pasted%20image%2020240602004022.png)

`render_template` 함수의 두 번째 인자부터 그 후에 입력하는 인자를 사용해 템플릿 문법을 통해 서버측 데이터를 웹페이지에 표시 가능하다. 예제를 보자.

```python
from flask import Flask, render_template  
  
app = Flask(__name__)  
  
@app.route("/")  
def main():  
    return render_template("main.html", word="글자입력")  
  
app.run(debug=True)
```

```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>Title</title>  
</head>  
<body>  
main.html인데 글자가 {{word}}입니다.  
</body>  
</html>
```

![render template template grammer](Python/Flask/image/Pasted%20image%2020240602004255.png)

간단한 소규모 프로젝트는 플라스크로도 충분히 소화 가능하다.

이때 DB는 보통 SQLAlchemy나 SQLite를 사용하는데 SQLite는 정말 작은 소형 프로젝트에 추천하고 대개의 경우 SQLAlchemy가 채택되는 편이다. 추후 포스팅은 하겠지만 자세한 내용은 구글링을 추천한다.


