```html
<input class="input_box" type="file" accept="image/jpg">
<img class="output_box">
```

```javascript
let $input_box = document.querySelector(".input_box");
$input_box.addEventListener("change",function(){
	console.log(this.files[0]); // 파일 정보가 표시됨.
	// 파일이 여러개라면 반복문으로 처리해줘야한다.
	let file = new FileReader();
	file.readAsDataURL(this.files[0]);
	file.onload = function(){
	let $output_box = document.querySelector(".output_box");
	$output_box.src = this.result;
	};
});
```
blob데이터를 다루는 방법엔 여러가지가 있다.

#### 다른 방법
코드가 훨씬 간소하고 깔끔하다.
또한 해당 BLOB 데이터에 대한 참조값만을 가지고 있으므로 재사용성이 뛰어나다. 다만 현재 화면을 벗어나게 되면 데이터의 재사용이 불가하므로 유저가 본인이 입력한 이미지를 확인하는 등의 임시조치에 적합하다.
```js
let $input_box = document.querySelector(".input_box");
$input_box.addEventListener("change",function(){
	let $output_box = document.querySelector(".output_box");
	$output_box.src = window.URL.createObjectURL(this.files[0]);
});
```