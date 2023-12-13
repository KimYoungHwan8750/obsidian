헤더 푸터처럼 어느 페이지에서든 공통적으로 쓰이는 부분을 쉽게 구현할 수 있다.

## 사용법

```properties
implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
implementation 'nz.net.ultraq.thymeleaf:thymeleaf-layout-dialect'
```

위와 같이 타임리프와 레이아웃을 디펜던시에 추가해준다.
```html
<!DOCTYPE html>  
<html lang="en" xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout">  
<head>  
    <meta charset="UTF-8">  
    <title>Title</title>  
</head>  
<body>  
<div th:replace="~{layouts/header::header}"></div>  
  
<div layout:fragment="content"></div>  
  
<div th:replace="~{layouts/footer::footer}"></div>  
  
</body>  
</html>
```

layouts/header::header 문법 같은 경우 fragment(조각)을 사용하는 문법이며 layout문법은 layout:fragment로 적용한다.

```html
<!DOCTYPE html>  
<html lang="en" xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout" layout:decorate="~{layouts/default}">  
<head>  
    <meta charset="UTF-8">  
    <title>Title</title>  
</head>  
<body layout:fragment="content">  
응애티비  
</body>  
</html>
```

위 문서의 layout:fragment="content"는 layout:deforate="~{layouts/default}"에 의해 default.html을 참조해 화면이 구성된다.
default의 fragment="content"와 현재 html의 fragment="content"가 매핑되면서 화면이 렌더링된다.