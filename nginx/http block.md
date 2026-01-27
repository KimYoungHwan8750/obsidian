## http
- 구성요소
	- server
		- location
	- upstream (load balancing)
### server
관리할 도메인/서비스를 정의한다.
server 블록에서 많은 일을 할 수 있는데, 대표 유스케이스를 알아보자.

#### 도메인 별 서비스
```nginx
http {
    # example.com 처리
    server {
        listen 80;
        server_name example.com www.example.com;
        
        location / {
            proxy_pass http://backend1:8000;
        }
    }
    
    # blog.com 처리
    server {
        listen 80;
        server_name blog.com www.blog.com;
        
        location / {
            proxy_pass http://backend2:3000;
        }
    }
    
    # api.mysite.com 처리
    server {
        listen 80;
        server_name api.mysite.com;
        
        location / {
            proxy_pass http://api_backend:5000;
        }
    }
}
```
각각의 도메인에 대해 대상 서비스를 지정할 수 있다.

#### 악의적 접근 방지

```nginx
http {
    # 정상적인 도메인만 서비스
    server {
        listen 80;
        server_name mysite.com www.mysite.com;
        location / {
            proxy_pass http://backend:8000;
        }
    }
    
    # IP 직접 접근, 알 수 없는 도메인 차단
    server {
        listen 80 default_server;
        server_name _;
        return 444;  # 악의적 스캐닝 차단
    }
}
```

아이피로 접근할 시 default_server 설정에 의해 해당 접근을 차단한다.
404를 return 하게 되면 해당 서버가 존재한다는 힌트를 주게 되므로 444를 반환하여 그 어떤 응답도 하지 않게 설정하는 것이 보안에 좋다.

#### https 리다이렉트
```nginx
http {
    # HTTP (80포트) - HTTPS로 리다이렉트
    server {
        listen 80;
        server_name example.com;
        
        return 301 https://$host$request_uri;
    }
    
    # HTTPS (443포트) - 실제 서비스
    server {
        listen 443 ssl;
        server_name example.com;
        
        ssl_certificate /etc/ssl/certs/example.crt;
        ssl_certificate_key /etc/ssl/private/example.key;
        
        location / {
            proxy_pass http://backend:8000;
        }
    }
}
```
http 요청을 자동으로 https로 리다이렉트 할 때 사용 가능하다.

#### location
### upstream