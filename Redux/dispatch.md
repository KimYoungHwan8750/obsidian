# dispatch

적절한 리듀서와 매칭하고 스토어에서 불변 객체를 반환받기 위한 함수다.

기본 형식은 `dispatch({type: "counter", num: 10})`등과 같이 사용해 호출할 액션과 페이로드를 전달하지만, createSlice를 사용해서 만들어진 인스턴스의 action 키를 내보내면 자동으로 type과 payload가 적힌 객체를 반환해준다.

* createSlice를 사용하지 않은 dispatch()
```tsx
export default function Home(){
	const dispatch = useDispatch();
	return(
		// count/Increment 타입의 함수를 호출하고 payload 값을 인자로 넘겨준다.
		<button onClick={dispatch({type:"count/Increment", payload:10})}></button>
	)
}
```

* createSlice를 사용한 dispatch()
```tsx
import { increment } from "..파일경로/countSlice"
export default function Home(){
	const dispatch = useDispatch();
	return(
		// count/Increment 타입의 함수를 호출하고 payload 값을 인자로 넘겨준다.
		<button onClick={dispatch(increment(10))}></button>
	)
}
```

redux toolkit에선 createSlice를 사용하면 action과 reducer를 만들어주는데, 어떤 메세지가 담기는지 다음의 예제를 실행시켜보면 확인할 수 있다.

```ts
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementCount: (state) => state+1,
    decrementCount: (state) => state-1
  }
})
```

만들어지는 메세지는 name/reducer 형태를 가지게 되는데 위 slice는 `counter/incrementCount`와 `counter/decrementCount` action을 자동으로 생성해준다. 이를 export해서 dispatch 함수 내에서 실행하게 되는 것이다.

```ts
const dispatch = useDispatch()
return (
	<button onClick={() => dispatch(incrementCount())>증가</button>
	<button onClick={() => dispatch({type: 'counter/incrementCount'})}>증가</button>
)
```

위 두 버튼은 결과적으로 같은 동작을 한다.