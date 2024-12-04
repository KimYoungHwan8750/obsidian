# useTransition
컴포넌트 전환 간에 딜레이를 최소화하기 위해 React 18부터 도입된 훅이다.
[리액트 공식 문서](https://ko.react.dev/reference/react/useTransition)에 예제가 있으니 먼저 실행해보고 이 문서를 읽으면 이해가 쉬우리라 생각한다.


## 사용법
우선 먼저 유스케이스를 보자.

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

const B = memo(function B(){
    const list = []
    for (let i=0; i<500; i++) {
        list.push(<LazyB/>)
    }

    return (
        <div>
            {list}
        </div>
    )
})

function LazyB() {
    let time = performance.now()
    while (performance.now() - time < 1) {
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

이를 `useTransition`으로 극복 가능하다. `useTransition`은 React에서 구현한 concurrent rendering을위한 훅이다. 이는 작업에 우선 순위를 부여하도록 도와준다. React는 자체 스케쥴러를 사용해 이를 관리하여 큰 계산으로 인해 메인 쓰레드의 작업이 지연되는 것을 해결한다.

`isPending`은 현재 보류중인 컴포넌트가 있는지 여부가 boolean 값으로 할당되고, `startTransition`
은 콜백을 매개변수로 받아 해당 동작에 대한 우선순위를 메인쓰레드의 작업보다 낮추어 동시 실행이 가능하게 해준다.

```tsx
export default function Home(){
    const [tab, setTab] = useState<TabType>('a')
    const [isPending, startTransition] = useTransition()
    return (
        <>
        <button onClick={() => startTransition(() =>setTab('a'))}>a</button>
        <button onClick={() => startTransition(() =>setTab('b'))}>b</button>
        <button onClick={() => startTransition(() =>setTab('c'))}>c</button>
        {isPending&&'loading...'}
        {tab == 'a' && <A/>}
        {tab == 'b' && <B/>}
        {tab == 'c' && <C/>}
        </>
    )
}
```

Home 컴포넌트에만 위와 같은 변경사항이 적용되었다.
기존에 메인쓰레드에 지연을 유발하는 `setTab`함수를 `startTransition`함수로 래핑해서 우선순위를 낮춰주었다. 또한 `isPending` 플래그를 사용해 현재 `startTransition`으로 인해 지연 목록에 태스크가 있다면 `loading...` 메세지를 출력해 UI/UX를 보완할 수 있다.

이제 a를 누르고 b를 누르면 `loading...` 메세지가 출력된다. 이전에는 컴포넌트를 렌더링하는 도중에 쓰레드가 멈춘 것처럼 a와 c 탭을 눌러도 아무런 반응이 없었는데 이제는 즉각적으로 반응한다. `startTransition`으로 인해 우선순위가 낮아진 태스크는 수행 중에 다른 작업이 들어올 경우 진행 중이던 작업을 중단하고 우선 순위가 높은 메인쓰레드의 작업을 우선 수행하기 때문에 `<A/>`와 `<B/>`가 즉각적으로 렌더링 될 수 있는 것이다.