```js
function xy(x){  
    return function (y){  
        return x+y;  
    }  
}  
console.log(xy(1)(2)); //3출력
```
괄호를 두 개 쓰면 리턴 함수에 인자를 전달해줄 수 있다. 자세한 건 위 예제 참고.