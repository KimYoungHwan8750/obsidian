
```html
<tip-box name="hi"></tip-box>
```

```js
    <script>    
    class TipBox extends HTMLElement{  
        connectedCallback(){  
            this.innerHTML = "내용~"  
        }  
    }  
    customElements.define("tip-box",TipBox)
```

---
#### 개요 :
* tip-box라는 커스텀 태그를 만들기 위해 tip-box를 정의한다.
* 해당 엘리먼트가 렌더링 될 때 원하는 동작을 connectedCallback(){}에 정의할 수 있다.