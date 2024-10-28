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