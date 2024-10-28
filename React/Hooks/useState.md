# useState

Hooks중에 하나. 컴포넌트의 상태를 관리하는 Hook이며 리렌더링을 유발한다.

```tsx
export default function App(){
	const [count, setCount] = useState(0);
	const [name, setName] = useState("홍길동");
	const [favorites, setFavorites] = useState(["게임", "운동"]);
}
```

구조할당분해를 이용해 `변수명`, `set변수명`으로 활용된다.

set변수명으로 state에 변화가 일어날 경우 컴포넌트가 리렌더링되고, useState로 관리하는 state를 자식 컴포넌트에 전달했을 때, state에 변화가 일어나면 해당 state를 사용하는 자식 컴포넌트도 리렌더링된다.