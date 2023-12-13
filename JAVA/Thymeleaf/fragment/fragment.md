조각을 뜻한다.
현재 문서에 다른 문서의 조각을 추가하거나 대체하고 싶을 때 insert문법과 replace문법을 사용해 렌더링 가능하다.


#### header.html
```html
<!DOCTYPE html>  
<html lang="en" >  
<head>  
    <meta charset="UTF-8">  
    <title>Title</title>  
</head>  
<body>  
<div th:fragment="header">얍얍</div>  
</body>  
</html>
```

위와 같이 header라는 이름의 조각을 선언해준다.

```html
<!DOCTYPE html>  
<html lang="en" >  
<head>  
    <meta charset="UTF-8">  
    <title>Title</title>  
</head>  
<body>  
<div th:insert="~{경로/header::header}"></div>  
</body>  
</html>
```

사용할 때는 th:insert나 th:replace를 이용해 경로를 참조하고 ::의 뒤에는 조각 이름을 선언해주면 된다.

insert는 말그대로 삽입(추가)이며 replace는 해당 태그를 완전히 대체한다.

위를 예로 들면

```html
<div th:insert="~{경로/header::header}"></div>  
<div th:replace="~{경로/header::header}"></div>  
```

```html
<!--insert-->
<div><div>얍얍</div></div>

<!--replace-->
<div>얍얍</div>
```

