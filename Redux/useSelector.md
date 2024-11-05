# useSelector

스토어에 저장된 객체를 가져오기 위해 사용하는 함수.

![Store](Redux/Store.md#Store)

Store에 대해 정리한 내용을 보면 `export type RootState = ReturnType<typeof store.getState>` 구문이 보인다.

이를 통해 store에 저장된 객체들에 대한 정보를 반환받을 수 있다.

```tsx
export default function Home(){
	const counter = useSelector((state: RootState) => state.counter) // 원시타입이라서 state.counter로 접근 가능하다. 만약 {isActive: 0, count:0}과 같은 구조라면 state.counter.count로 접근 가능하다.
}
```

또한, 해당 State에 변화가 발생하면 useSelector를 통해 해당 객체를 사용하고 있는 모든 컴포넌트는 리렌더링이 발생한다.

## Redux는 신이다

여기서 redux의 유용함이 드러난다.

```js
const countSlice = createSlice({
    name: 'counter',
    initialState: {
        count:0,
        test:0,
    },
    reducers: {
        incrementCount: (state, action) => {state.count += 1},
        incrementTest: (state) => {state.test += 1},
    }
})
```

위와 같이 count와 test를 key로 가지고 있는 State가 있고 count를 +1하는 리듀서, test를 +1하는 리듀서가 있다.

이때 이 State를 참조하는 컴포넌트들은 리렌더링이 발생할 것이다. 그러나 `useSelector((state: RootState) => state.counter.count)`를 사용해 counter의 count만 참조하게 되면, test가 증가해 State에 변화가 생긴다고 하더라도 count 값만을 참조하고 있는 컴포넌트에 리렌더링이 발생하지 않는다.