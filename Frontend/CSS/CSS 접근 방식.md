
## 쓰기
1. CSS : `<style></style>` 스타일 태그를 선언해 사용한다.
2. setAttribute : 기존 정의된 스타일을 삭제하고 새로운 내용으로 덮어씌운다.
3. dom.style : 기존정의된 스타일에 내용을 추가한다. 
```CSS
font-size:1px;
color:white;
```


```CSS
font-size:1px;
color:white;
color:red;
```
dom.style.color="red";

4. dom.style.cssText : 기존 정의된 스타일을 삭제하고 새로운 내용으로 덮어씌운다.

참고로 벤치마킹 결과 style.color, style.backgroundColor 같은 원시구문이 가장 속도가 빨랐고 나머지는 거기서 거기였다. 속도는 대략 20~30% 정도 빠르다.

## 읽기
