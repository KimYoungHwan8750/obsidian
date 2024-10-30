# useRef

실제 DOM을 참조할 때 사용하는 훅이다.

```tsx
export default function App(){
	const ref = useRef(null);
	return (
		<p ref={ref}></p>
	)
}
```

이렇게 `useRef()`를 통해 변수에 할당한 값은 계속 유지된다. 즉 p요소의 내용이 변경된다고 해서 ref에 할당되는 값이 바뀌는 것은 아니다. 해당 요소에 대한 참조만을 가리키고 있다. 가령 p 태그에 해당하는 요소에 대한 참조를 ref에 할당하고, `p요소.remove()`로 해당 요소를 DOM에서 제거해도 p요소에 대한 참조는 남는다.