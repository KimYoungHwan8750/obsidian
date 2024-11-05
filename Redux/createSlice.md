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