# useId

useId는 사용하는 경우가 확실한 훅이다.

```tsx
export default function Home({text}:{text: string}){
	return(
		<label htmlFor={text}>input</label>
		<input id={text}>{text}
	)
}
```