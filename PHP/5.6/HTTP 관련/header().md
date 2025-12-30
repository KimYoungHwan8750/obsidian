리다이렉트 등을 처리하는데 있어서 표준적인 방법
```php
if ($is_logged_in) {
    header("Location: http://www.example.com/home.php");
    exit; // 중요: 헤더를 보낸 후 아래 코드가 실행되지 않도록 반드시 종료!
}
```