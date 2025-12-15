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

storage는 기본적으로 localStorage(컴퓨터 재부팅해도 유지)를 사용한다.
Session Storage를 사용하려면 `'redux-persist/lib/storage/session'`를 임포트해야한다.

```tsx
// Local Storage (특정 리듀서용: user)
import localStorage from 'redux-persist/lib/storage'; 
// Session Storage (나머지 리듀서용: 기본값)
import sessionStorage from 'redux-persist/lib/storage/session'; 
```
### Session Storage와 Local Storage 혼합해서 사용하기
```tsx
// 1. Local Storage를 사용할 'user' 리듀서 설정
const userPersistConfig = {
    key: 'user', // 리듀서 키와 동일하게 설정 (필수 아님)
    storage: localStorage, // 👈 Local Storage 지정
    whitelist: ['tokens'], // (선택 사항) AuthReducer의 내부 상태 중 특정 필드만 저장하고 싶다면 사용
};

const persistedAuthReducer = persistReducer(userPersistConfig, AuthReducer);
```

```tsx
const rootReducer = combineReducers({
    // Local Storage로 미리 감싼 리듀서 사용
    user: persistedAuthReducer, 
    
    // 나머지 리듀서들은 Session Storage를 사용하게 됩니다 (3단계에서 설정)
    [baseApi.reducerPath]: baseApi.reducer,
    sensorStatusName: sensorStatusNameReducer,
    // ... 나머지 리듀서들
});


// 2. Session Storage를 기본으로 사용하는 Root Persist 설정
const rootPersistConfig = {
    key: 'root',
    storage: sessionStorage, // 👈 Session Storage 지정 (기본값)
    whitelist: ['sensorStatusName', 'sensorData', 'myProfile', 'passwordChange', 'sensorState'], 
    // Session Storage를 사용할 리듀서를 명시적으로 모두 나열합니다. 
    // 'user'는 이미 Local Storage 설정이 완료되었으므로 제외합니다.
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    // ...
});
```
### PersistConfig
whiteList, blackList 옵션이 있다.
보통은 whiteList만 사용해서 세션으로 관리가 필요한 데이터를 세션 스토리지에 저장한다.