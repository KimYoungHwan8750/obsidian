# useTransition
컴포넌트 전환 간에 딜레이를 최소화하기 위해 개발된 훅이다.
[리액트 공식 문서](https://ko.react.dev/reference/react/useTransition)에 예제가 있으니 먼저 실행해보고 이 문서를 읽으면 이해가 쉬우리라 생각한다.


## 사용법
`const [isPending, startTransition] = useTransition()` 기본적인 문법이다.
a, b, c 페이지가 있고, b 페이지는 렌더링되는데 1초가 걸리는 복잡한 페이지이다. 이때 잘못해서 b를 클릭했다. 이내 실수를 깨닫고 c를 클릭해보지만 b 컴포넌트가 렌더링되느라 페이지의 모든 작업이 중단된 상태이다(예제는 극단적으로 페이지 동작을 멈춰놓은 경우).

예제도 매우 간편하지만 처음보는 사람에게 다소 이해가 안 될 것이라고 생각해 한 눈에 들어오도록 코드를 다시 짰다. 다음과 같은 형태가 된다.

```tsx
type TabType = 'a' | 'b' | 'c'
export default function Home(){
    const [tab, setTab] = useState<TabType>('a')
    return (
        <>
        <button onClick={() => setTab('a')}>a</button>
        <button onClick={() => setTab('b')}>b</button>
        <button onClick={() => setTab('c')}>c</button>

        {tab == 'a' && <A/>}
        {tab == 'b' && <B/>}
        {tab == 'c' && <C/>}
        </>
    )
}

function A(){
    return (
        <div>a</div>
    )
}

function B(){
    let time = performance.now()
    while (performance.now() - time < 500) {
    }
    return (
        <div>b</div>
    )
}

function C(){
    return (
        <div>c</div>
    )
}
```

위 코드는 한눈에 봐도 문제가 보이는데, B 컴포넌트가 렌더링되는데 500ms가 지연된다.
이때 b를 누르게 되면 B 컴포넌트 렌더링을 대기하게 되고 a나 c 버튼을 눌러도 아무런 반응이 없다.



이를 `useTransition`으로 극복 가능하다.
`isPending`은 현재 보류중인 컴포넌트가 있는지 여부가 boolean 값으로 할당되고, `startTransition`은 콜백을 매개변수로 받는 함수가 할당된다.

위 코드는 메인쓰레드를 중지시키므로 useTransition을 사용하더라도 b 메뉴를 클릭한 순간 동작이 중지됨. 
```tsx
const B = memo(function B() {
    return (
        <div>
            {Array(500).fill(0).map((_, i) => (
                <SlowItem key={i} />
            ))}
        </div>
    )
})

function SlowItem() {
    let time = performance.now()
    while (performance.now() - time < 1) {
    }
    return <div>item</div>
}
```

추후 수정할 것