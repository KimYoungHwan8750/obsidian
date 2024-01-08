css도 이벤트를 다른 클래스에 전파할 수 있다.

```css
.myClass:hover ~ .myObj{
		background-color:red;
}
```
해당 예제는 myClass에 hover이벤트가 발생했을 때
myObj의 background-color를 빨간색으로 바꾸어준다.