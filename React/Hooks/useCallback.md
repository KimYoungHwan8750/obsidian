# useCallback

함수의 참조를 저장한다. useMemo는 반환값을 저장하고, 의존성에 변화가 없으면 이전에 저장해두었던 값을 재사용하는 것으로 간단하게 설명이 가능하고, 다른 Hooks는 비교적 직관적이지만, useCallback은 동작 방식을 이해하고 실제로 사용해보지 않으면 이해하기가 다소 어려울수도 있다.

```tsx
import { useState } from "react";
function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <ChildComponent/>
      <div>
        {count}
      </div>
      <button onClick={() => setCount(n => n+1)}>Increment</button>
    </>
  )
}

function ChildComponent(){
  console.log('create child component')
  return (
    <p>child</p>
  )
}
export default App
```

위 코드를 보면,  ChildComponent가 렌더링될 때마다 콘솔에 `create child component`가 출력된다. 버튼을 클릭해 count가 변경되면 부모 컴포넌트인 `<App/>`이 리렌더링되고, 자식 컴포넌트인 ChildComponent도 리렌더링되면서 Increment 버튼을 클릭할 때마다 콘솔에 `create child component`가 출력된다.

하지만 자식 컴포넌트는 count 값과 관계가 없는데도 불구하고 리렌더링이 발생하는 것은 그다지 효율적이지 않다.

```tsx
// ChildComponent에는 변경사항이 없다.
function App() {
  const [count, setCount] = useState(0);
  const component = useMemo(() => <ChildComponent/>, []);
  return (
    <>
      {component}
      <div>
        {count}
      </div>
      <button onClick={() => setCount(n => n+1)}>Increment</button>
    </>
  )
}
```

하지만 위 코드는 의존성 배열에 빈 배열을 할당해주었다. 빈 배열을 할당하면 리렌더링과 관계없이 마운트 될 때 최초 1회만 실행된다.

따라서 `<ChildComponent/>`가 메모이제이션되어 새로운 `<ChildComponent/>`를 반환하지 않고, 기존 컴포넌트가 렌더링되면서 `create child component`를 출력하지 않는다(리렌더링 되지 않는다).

```tsx
function App() {
  const [count, setCount] = useState(0);
  const callback = useCallback(() => {
    console.log("launch callback");
    let components = []
    for (let i = 0; i < 10; i++) {
      components.push(<ChildComponent/>)
    }
    return components;
  }, []);
  const value = useMemo(() => callback(), [callback])
  return (
    <>
      {value}
      <div>
        {count}
      </div>
      <button onClick={() => setCount(n => n+1)}>Increment</button>
    </>
  )
}
```

위 코드를 보면 함수를 통해 `<ChildComponent/>`를 10개 생성해 렌더링하고 있다. useMemo는 메모이제이션된 callback 함수를 사용해 `<ChildComponent/>` 10개를 포함하고 있는 `components`를 메모이제이션하고 있다. 그 결과 리렌더링이 발생해도 `<App/>`에 렌더링되어있는 자식컴포넌트들엔 리렌더링이 발생하지 않는다. 따라서 Increment 버튼을 눌러도 `create child component`가 출력되지 않는다.