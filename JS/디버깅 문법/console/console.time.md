
코드 실행 시간을 측정할 수 있다.
```js
/*
	라벨명을 지정해줌으로써 console.timeEnd와 조합해 사용 가능하다.
*/
console.time("라벨명");
```


```js
function delay(ms){  
    return new Promise((ok,no)=>{  
        setTimeout(()=>{ok()},ms)  
    })  
}  

let promise = async ()=>{  
    console.time("측정1")  
    console.time("측정2")  
    let task1 = await delay(2000);  
    console.timeEnd("측정1") // 약 2초  
    let task2 = await delay(2000);  
    console.timeEnd("측정2") // 약 4초  
}  
promise()

```




![[console.timeEnd]]