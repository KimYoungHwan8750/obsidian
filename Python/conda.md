anaconda
miniconda가 있다.
anaconda는 수학, 딥러닝등 유용한 라이브러리 1500개 가량 미리 설치해준다. 용량은 5GB정도.
miniconda는 최소한의 라이브러리만 설치된다.

# Miniconda 설치법 (Linux)
윈도우 설치법은 그냥 공식 사이트에서 인스톨러 설치하면 되니 굳이 설명은 안 하겠다.
`wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh`
`bash ~/Miniconda3-latest-Linux-x86_64.sh`로 인스톨러 실행
마지막에 conda init 실행할거냐고 묻는데 귀찮기 싫으면 반드시 yes 입력해서 초기화한다.

그 후 `source ~/.bashrc` 실행. 끝.

둘 다 conda를 사용하여 가상환경 및 편리한 툴을 제공해주는 기본 토대는 같다.

```
conda create -n qwen_env python=3.10 -y

# 3. 환경 활성화 (이제부터 이 터미널은 qwen_env 환경입니다)
conda activate qwen_env
```

`conda create -n .venv`: .venv라는 가상환경 생성
`conda activate .venv`: .venv 가상환경 사용
`conda create -n .venv python=3.10 -y` 파이썬 3.10으로 가상환경 생성