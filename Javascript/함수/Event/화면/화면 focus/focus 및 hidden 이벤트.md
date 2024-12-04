```js
window.addEventListener('focus',()=>{}); // 유저가 현재 창에 포커스를 두고 있는지 판단
window.addEventListener('blur',()=>{}); // 유저가 현재 창에서 포커스를 떠났는지 판단
document.addEventListener("visibilitychange", function() {
	if(document.hidden) {
	// 숨겨졌을 때
	} else {
	// 숨겨진 상태가 아닐 
	}
})
```