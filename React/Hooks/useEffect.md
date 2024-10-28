# useEffect

**사용형태**
`useEffect(function, deps)`

## useEffect(() => {}, \[])

useEffect에 빈 배열을 전달하는 형태로, 해당 컴포넌트가 마운트 될 때 한 번만 실행된다.

만약 function에서 return에 함수를 넘겨주면 컴포넌트가 Unmount 될 때 해당 함수에 적힌 내용을 수행한다.

빈 배열도 전달하지 않으면 함수가 리렌더링 될 때마다 useEffect가 실행된다.

## useEffect(() => {}, \[deps])

함수와 더불어 의존성 배열에 추적할 변수를 추가할 수 있다.

```ts
const [variable, setVariable] = useState(true)
const [name, setName] = useState("홍길동")
useEffect(() => {}, [variable]) // variable의 변경사항에 대해서만 useEffect 실행
```


## useEffect(() => {return function}, \[deps])

cleanup 함수라고 하며, deps가 빈 배열일 경우 언마운트 되기 전에 수행된다.