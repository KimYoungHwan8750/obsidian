`npm i redux-persist`

```ts
import { configureStore, combineReducers, createStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import storage from 'redux-persist/lib/storage'
import UserReducer from './slice/userSlice';
import { persistStore, persistReducer } from 'redux-persist'

const combineReducer = combineReducers({
    user: UserReducer
})

const persistConfig = {
    key: 'root',
    storage,
	whiteList: ["user"] // user(리듀서 이름 사용): UserReducer
}

const persistedReducer = persistReducer(persistConfig, combineReducer)
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
```

### PersistConfig
whiteList, blackList 옵션이 있다.
보통은 whiteList만 사용해서 세션으로 관리가 필요한 데이터를 세션 스토리지에 저장한다.