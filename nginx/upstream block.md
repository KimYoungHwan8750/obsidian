```nginx
stream {
    upstream db_servers {
		# 기본값은 라운드 로빈
		# least_conn; 최소 연결 분배
        server 10.0.0.1:3306 # weight 기본값 1;
        server 10.0.0.2:3306 weight=3; # 3배 더 많은 요청 처리
        server 10.0.0.3:3306 backup # 백업용 서버. 메인 서버들이 다 죽었을 때만 동작;
		# max_fails=3 요청 실패시 최대 3회 실패
		# fail_timeout=30s 죽었다고 판단되면 30초간은 아무 요청도 보내지 않음
		# slow_start=30s 서버가 실행되고 30초 동안은 트래픽을 점진적으로 증가시킴
		server 10.0.0.4:3306 max_fails=3 fail_timeout=30s slow_start=30s;
    }

    server {
        listen 3306;
        proxy_pass db_servers;
    }
}
```

3306번 포트에서 대기. 3306으로 들어오는 포트를 db_servers로 전달하겠다는 뜻이다.
db_servers는 upstream에서 정의한 블록이며, 10.0.0.1:3306과 10.0.0.2:3306로 구성되어 있다.
기본적으로 라운드로빈으로 동작한다.
