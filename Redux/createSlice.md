# createSlice

RTK(ReduxToolKit)에서 리듀서와 액션을 쉽게 만들 수 있게 도와주는 함수이다.

```ts
import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
        incrementCount: (state, action) => state + action.payload,
        decrementCount: (state) => state-1
    }
})

export const { incrementCount, decrementCount } = countSlice.actions
export default countSlice.reducer
```

만약 State가 원시 타입이 아니고 객체라면 어떨까?

위의 코드에서 State만 객체로 바꾸는 코드이다.

```ts
import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
    name: 'counter',
    initialState: {
		count: 0,
		temp: 0
	},
    reducers: {
        incrementCount: (state, action) => state + action.payload, // 에러
        decrementCount: (state) => state-1 // 에러
    }
})

export const { incrementCount, decrementCount } = countSlice.actions
export default countSlice.reducer
```

왜 에러가 발생할까?

그것은 `(state, action) => state + action.payload`가 반환하는 타입이 원시타입이다. 원래는 {count: 1, temp: 1}과 같이 State와 같은 구조를 가진 객체를 반환해야하지만 RTK는 내부적으로 immer로 객체의 변화를 감지하기 때문에 state.count = 1과 같이 변경해줘도 immer가 새로운 객체를 생성해준다.

`state + action.payload` 연산 결과는 단순한 원시 타입이다.

```ts
incrementCount: (state, action) => ({count: state.count - action.payload, test: 0}),
decrementCount: (state) => ({count: state.count - 1, test: 0})
```

따라서 위와 같이 같은 형태를 지닌 객체를 반환해줘야한다.

```ts
incrementCount: (state, action) => {state.count += action.payload},
decrementCount: (state) => {state.count -= 1}
```

또는 위와 같이 사용할 키값에만 접근해 새로운 객체를 반환해줄 수 있다.

>[!info] 핵심 요약
>```js
>type UserState = {
>	age: 0,
>	name: "test"
>}
>```
>위 객체에 대한 상태 변경 방법 2가지
>```js
>setState: (state, action) => {
>	state.name = "이름";
>	state.age = 1;
>}
>```
>또는
>```js
>// 객체를 반환하게 되면 해당 객체로 변경된다.
>// 즉 아래와 같은 경우 age 값이 null이 된다.
>setState: (state, action) => {
>	return {
>		name: "이름",
>	}
>}
>```
>객체를 반환하면서 값을 유지하려면
>```js
>// 객체를 반환하게 되면 해당 객체로 변경된다.
>setState: (state, action) => {
>	return {
>		name: "이름",
>		...state
>	}
>}
>```