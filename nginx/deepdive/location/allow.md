location scope에 쓰이며 화이트 리스트를 의미한다.
allow를 허용했다고 다른 사용자들의 접근이 막히는 것이 아니기 때문에 deny와 함께 사용한다.
```nginx
location /admin/ {
    allow 123.123.123.123;
    deny all;
    # ... 기타 설정들
}
```