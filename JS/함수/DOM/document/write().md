```js
document.write("텍스트");
```

#### 응용


```js

<html>
	<head>
	</head>
	<body>
		<div>1</div>
		<div>2</div>
		<script type="text/javascript">
		let a = 2;
		let b = 3;
		
		document.write("<div>"+a+b+"</div>");
		</script>
		<div>3</div>
	</body>
</html>

```

연산이나 for문도 가능하다.
하위 태그는 안 되고 오로지 document에서만 write함수가 실행 가능하며 스크립트 태그의 위치에 해당 내용이 삽입된다.