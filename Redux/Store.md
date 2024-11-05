# Store

스토어는 프로젝트에 단 하나만 존재한다.

`dispatch => reducer => store`

dispatch를 통해 액션과 페이로드를 전달한다. 해당하는 액션에 맞는 함수를 reducer가 반환해주고, store는 객체를 새로운 상태로 업데이트해서 반환해준다.

```ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./count-store"

const store = configureStore({
    reducer:{
        counter: counterReducer,
		//exam: examReducer
		//리듀서를 추가하고 싶다면 위와 같이 적으면 된다.
		//combineReducers를 사용할 필요없다. configureStore()가 알아서 처리해주기 때문
    },
})

export type RootState = ReturnType<typeof store.getState>
export default store
```


![createSlice](Redux/createSlice.md#createSlice)