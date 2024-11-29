# 개요

CSS를 통해 transition을 주기 위한 컴포넌트.

```tsx
import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

export default function Home(){
    const [state, setState] = useState(false);
    const nodeRef = useRef<HTMLDivElement>(null);
    return (
        <>
        <CSSTransition
            in={state}
            timeout={700}
            nodeRef={nodeRef}
            classNames={"menu"}
            >
                <div ref={nodeRef} className="w-20 h-20 bg-red-100">
                    <div>hi</div>
                </div>

        </CSSTransition>
        <button onClick={() => setState(!state)}>버튼</button>
        </>
    )
}
```

입력한  classNames를 기준으로 6가지 상태가 생성된다.

**9가지 상태**
* classNames-appear: 컴포넌트가 처음 마운트 될 때
* classNames-appear-active: 컴포넌트가 처음 마운트 되며
* classNames-appear-done: 컴포넌트가 처음 마운트 된 후
* classNames-enter : 컴포넌트가 마운트 될 때
* classNames-enter-active : 마운트 되며
* classNames-enter-done : 마운트 된 이후
* classNames-exit : 언마운트 될 때
* classNames-exit-active : 언마운트 되며
* classNames-exit-done : 언마운트 된 이후

만약 토글을 이용해 컴포넌트가 나타났다가 사라지게 하고 싶으면 CSSTransition 컴포넌트 속성에 `unMountOnExit`를 추가하면 된다.

이 기능은 `.classNames-exit-done{ display: none }`와 같은 동작을 한다.

## Property

	in: boolean
	- true 일때 enter를 트리거하고, false일 때 exit를 트리거한다.

	timeout: number
	- 상태, 상태-active, 상태-done 흐름의 간격을 제어한다.

	nodeRef: ForwardRef<HTMLAttributes<HTMLDivElement>> (자세한 확인 필요)
	- 제어할 nodeRef를 찾아가기 위해 필요하다. 하위에 애니메이션이 적용될 요소에서 ref로 이 nodeRef를 넘겨주어야 제어가 가능해진다.

	classNames: string
	- classNames-enter, classNames-enter-active, classNames-enter-done 등 CSS로 애니메이션을 주기 위한 이름을 지정한다. 여기서 설정한 이름에 enter, appear, exit에 active, done 등의 상태가 붙는다.

	mountOnEnter: void, unmountOnExit: void
	- in이 true로 트리거 될 때 DOM에 생성된다. (기본적으로 appear 상태)
	- 마운트가 끝나면 해당 요소가 DOM에서 제거된다.

	onEnter, onEntering, onEntered, onExit, onExiting, onExited
	- 각각의 이벤트가 발생할 때 실행할 함수를 전달해줄 수 있다.

	appear: void
	- 처음 나타날 때에도 애니메이션이 적용될 건지를 설정한다. appear 속성을 추가하면 appear, appear-enter, appear-done 상태가 추가된다.

---

## 주의 사항
아마 나같이 바보 같은 착각을 하는 사람은 없으리라고 생각하지만, 혹여나 다음과 같이 착각하면 안 된다.
이것은 말 그대로 애니메이션을 트리거하는 것이다. 나는 open 상태가 true일 때 A는 보이고 B는 보이지 않아야하며 open이 false(close) 상태일 때 A는 보이지 않고 B는 보여야하는 상태를 원했다. mountOnEnter를 사용하면 구현가능하지만, 내가 원하는 상태는 DOM에서 보이진 않지만 공간은 차지하는 형태여야했다. 즉 두 가지 컴포넌트간에 스위칭이 일어나는 형태로 구현을 해야했고 SwitchTransition 또는 onEntered를 통해 컴포넌트의 스타일을 변경해줌으로써 해결했다. 아마 세부적인 내용이라 이러한 문제가 어떤 상황인지 이해하기 어려울수가 있다. 본인은 후에 같은 어려움을 겪었을 때 해결하고자 내용을 적어두긴 했는데 비슷한 상황을 겪었다면 이 방법을 권장하고 아니라면 "저런 문제도 겪는구만"하고 짚고 넘어가자.