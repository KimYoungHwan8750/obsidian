location scope에 쓰이며 블랙 리스트를 의미한다.

```nginx
location /admin/ {
    deny 123.123.123.123;
    allow all; # 기본값이라 생략 가능
    # ... 기타 설정들
}
```