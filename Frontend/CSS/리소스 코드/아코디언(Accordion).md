
리액트 예제 코드

```js
import styled from "styled-components";
import { useRef, useState } from "react";

function Item() {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        const content = contentRef.current;
        if (!content) return;

        if (!isOpen) {
            content.style.height = content.scrollHeight + 'px';
        } else {
            content.style.height = '0px';
        }
        setIsOpen(!isOpen);
    };

    return (
        <Details>
            <Summary onClick={handleToggle}>프로젝트</Summary>
            <Content ref={contentRef}>
                <div>
                    테스트 내용입니다
                    <br/>
                    여러 줄도 가능
                    <br/>
                    부드럽게 펼쳐집니다
                </div>
            </Content>
        </Details>
    )
}

const Details = styled.div``;

const Summary = styled.div`
    background: #444;
    color: #fff;
    padding: 10px;
    outline: 0;
    border-radius: 5px;
    cursor: pointer;
    text-align: left;
    box-shadow: 1px 1px 2px gray;
    user-select: none;
`;

const Content = styled.div`
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease;
    
    > div {
        padding: 10px;
    }
`;

export default Item;
```