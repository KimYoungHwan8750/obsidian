활용 예제 코드

```conf
server {
    listen 80;
    server_name localhost;

    # 1. 기존 정적 파일들 (index, page1은 Nginx가 직접 처리)
    location / {
        root   /usr/share/nginx/html;
        index  index.html;
    }

    location /page1 {
        alias /usr/share/nginx/html/page1.html;
    }

    # 2. page2에 대해서만 FastAPI 서버로 라우팅 (리버스 프록시)
    location /page2 {
        # 서비스 이름 'fastapi'와 내부 포트 '8000'을 사용합니다.
        proxy_pass http://fastapi:8000/page2;

        # 프록시 필수 헤더 설정
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

nginx 내부에서 정적 페이지 index, page1을 호스팅한다.
page2로 오는 요청을 같은 네트워크상의 fastapi에 전담한다.

### 설정
