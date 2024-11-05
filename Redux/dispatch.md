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