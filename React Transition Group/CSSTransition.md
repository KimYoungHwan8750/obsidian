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

**6가지 상태**
* classNames-enter : 컴포넌트가 마운트 될 때
* classNames-enter-active : 마운트 되며
* classNames-enter-done : 마운트 된 이후
* classNames-exit : 언마운트 될 때
* classNames-exit-active : 언마운트 되며
* classNames-exit-done : 언마운트 된 이후

만약 토글을 이용해 컴포넌트가 나타났다가 사라지게 하고 싶으면 CSSTransition 컴포넌트 속성에 `unMountOnExit`를 추가하면 된다.

이 기능은 `.classNames-exit-done{ display: none }`와 같은 동작을 한다.
