파라미터를 주소에 넘기고 싶을 때
```HTML
<a th:href="@{/hello}">basic url</a>
<a th:href="@{/hello(param1=${param1}, param2=${param2})}">hello query param</a>
<a th:href="@{/hello/{param1}/{param2}(param1=${param1}, param2=${param2})}">path variable</a><a th:href="@{/hello/{param1}(param1=${param1}, param2=${param2})}">path variable + query parameter</a>
```
param1=p1
param2=p2
* /hello
* /hello?param1=p1,param2=p2
* /hello/p1/p2
* /hello/p1?param2=p2

일반 타임리프식처럼 서버에서 넘긴 값을 사용할 때
```HTML
<a th:href="${model}"
```