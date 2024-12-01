# Proxy
Proxy란, 흔히 아는 것처럼 대리자의 역할을 한다.

```ts
type NumProxy = {
    num: number
}
const num: NumProxy = {
    num: 1
}
const numProxy = new Proxy(num, {
    get:(target, prop, recieve) => {
        console.log('target: ', target)
        console.log('prop: ', prop)
        console.log('recieve: ', recieve)
        return target[prop]
    },
    set:(target, prop, value, recieve) => {
        console.log('target: ', target)
        console.log('prop: ', prop)
        console.log('value: ', value)
        console.log('recieve: ', recieve)
        return true
    }
})
numProxy.num
console.log('------')
numProxy.num = 10
```

```shell
# 결과
target:  { num: 1 }
prop:  num
recieve:  { num: 1 }
------
target:  { num: 1 }
prop:  num
value:  10
recieve:  { num: 1 }
```

아마 코드가 곧 설명이 될 것이라고 생각하는데, get과 set등 원본 객체를 감싸는 Proxy 객체를 만들어서, 원본 객체에 get, set 작업을 하거나 순회를 하거나, 삭제를 하는 등 다양한 작업을 하기 전 후로 추가적인 동작을 원할 때 사용하면 된다.

위에서는 get과 set만 수정했지만, 순회할 때나 프로퍼티를 삭제할 때 has나 deleteProperty를 정의하면 된다. 유용하지만 당장 프로젝트에 도입할 일이 없으므로 상세한 기술은 아래에서 확인한다.
[Inpa dev](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Proxy-Reflect-%EA%B3%A0%EA%B8%89-%EA%B8%B0%EB%B2%95)