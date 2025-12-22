Input은 적절한 라벨이 반드시 있어야하며, 아이콘이나 기타 요소가 Label의 요소를 대신할 경우 `aria-label` 속성이나 `aria-labelledby`를 사용하면 된다.

`aria-label`은 그 자체로 라벨링이 되었음을 의미하며 `aria-labelledby`의 경우 텍스트가 있는 태그의 아이디를 명시하면 해당 태그에 적힌 텍스트를 라벨값으로 가져온다. 말로 하면 조금 난해한데 다음 코드를 보자.


```html
<p id="menu">오늘 점심</p>
<input aria-labelledby="menu"/>
둘이 같음
<input aria-label="오늘 점심"/>
```