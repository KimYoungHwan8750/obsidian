# useMemo

```tsx
export default function Component(){
	const num = calculator();
	function calculator(){
		let sum = 0;
		for (let i=0;i<10000;i++){
			sum++;
		}
		return sum;
	}
	return (
		<div>
			{num}
		</div>
	)
}
```

Component가 리렌더링될 때마다 변수 해당 컴포넌트에 정의되어있는 변수 할당도 다시 실행된다.
이때 `const num = 1;` 같은 간단한 할당은 리렌더링이 많이 일어나도 성능에 문제가 없다.

그러나 위와 같이 변수 할당에 연산이 포함되어있는 경우 리렌더링이 일어나면서 성능 저하가 발생한다. useMemo는 값을 메모이제이션해서 의존성이 바뀌지 않으면 이전에 연산해두었던 값을 재사용해서 컴포넌트를 최적화한다.

## 사용법

`useMemo(반환값이 있는 함수, [의존성1, 의존성2]`
`useMemo(() => {}, [])`

의존성 배열에 아무런 값도 넣지 않으면, 컴포넌트가 마운팅될 때 최초 1회만 변수가 할당된다. 만약 의존성 배열에 의존할 변수를 추가하게 되면, 해당 변수에 변화가 생길 때만 메모이제이션된 값을 사용하지 않고 새로 연산한다.