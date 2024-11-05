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

만약 리듀서가 원시 타입이 아니고 객체라면 어떨까?

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

그것은 `(state, action) => state + action.payload`가 반환하는 타입이 원시타입이다.

`state + action.payload`는 연산이 되어 단순한 원시타입이 될 것인데, 현재 state는 count와 temp를 키로 가지고 있는 객체이다.

```ts
incrementCount: (state, action) => ({count: state.count - action.payload, test: 0}),
decrementCount: (state) => ({count: state.count - 1, test: 0})
```

따라서 위와 같이 같은 형태를 지닌 객체를 반환해줘야한다.

```ts
incrementCount: (state, action) => {state.count += action.payload},
decrementCount: (state) => {state.count -= 1}
```

또는 위와 같이 사용할 키값에만 접근해 새로운 객체를 반환해줄 수 있다. 가독성이나 사용성 측면에서 위 방법이 좋아보인다.