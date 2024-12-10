# useContext

`useContext<T>()`
의미 그대로 컨텍스트를 형성할 수 있다.
Provider를 통해 해당 컨텍스트를 제공해주며 이전에는 Consumer로 컨텍스트를 사용했지만 라이브러리에선 useContext 사용을 권장하고 있다.

간단한 카운터 프로그램을 컨텍스트를 사용해서 구현해보자.

```tsx
type AppContextType = {
  count: number
  negative: boolean
  setCount: (count: number) => void
  setNegative: (trigger: boolean) => void
} | null

const AppContext = createContext<AppContextType>(null)

export default function AppProvider(props: PropsWithChildren) {
  const [count, setCount] = useState(0)
  const [negative, setNegative] = useState(false)
  const provider: AppContextType = {
    count,
    negative,
    setCount,
    setNegative
  }
  return (
    <AppContext.Provider value={provider}>
      {props.children}
    </AppContext.Provider>
  )
}
```

위 코드는 카운터 프로그램의 상태를 관리하는 전역 컨텍스트를 설계한 것이다.
컨텍스트는 제공해주는 위치에 따라 전역일수도, 특정 컴포넌트에서 제한될 수도 있다.

그 이유는 위에서 정의한 컨텍스트는 `Provider`를 통해서 제공되기 때문이다.

```tsx
createRoot(document.getElementById('root')!).render(
	  <AppProvider>
		<Home/>
	  </AppProvider>
)
```

카운터 프로그램의 진입점이다. Home은 카운터가 들어갈 메인 페이지고 그것을 AppProvider가 감싸고 있다. 이를 통해 Home은 AppProvider가 제공해주는 `AppContext`를 사용할 수 있다.

방금 만든 `AppContext`를 편하게 사용하기 위해 다음과 같이 커스텀 훅으로 만들어두면 좋다.

```tsx
export function useAppContext() {
  const appContext = useContext(AppContext)
  if (!appContext) {
    throw Error('AppProvider를 통해서 컨텍스트를 제공받아야합니다.')
  }
  return appContext
}
```

`AppContext`는 `AppContextProvider`를 통해서 제공받지 않으면 `createContext()`에서 설정한 기본값을 제공받는다. 따라서 `useAppContext`에서 appContext가 null이면 `Provider`를 통해서 제공받지 않은 기본값이므로 위와 같이 에러 메세지를 표시할 수 있다.

만약 `createContext('default')`로 생성했다면, 컨텍스트 내에서 생성한 것인지 판별하기 위한 위의 조건식을 `if(appContext === 'default')`가 되는 것이다.

`<AppContext.Provider value={'hi'}>`를 통해 `AppContext`를 공유 받은 하위 요소들만이 `AppContext`의 컨텍스트에 접근할 수 있고, `hi`를 반환받을 수 있다.


이제 카운터 프로그램을 구현해보자.

```tsx
const appContext = useAppContext()
const nodeRef = useRef<HTMLInputElement>(null)
const setCount = () => {
	if (nodeRef.current) {
		appContext.setCount(nodeRef.current.valueAsNumber)
	}
}
return (
	<>
	카운트 : {appContext.negative?'-':'+'}{appContext.count}
	<div className="flex gap-6">
		<label htmlFor="count">숫자</label>
		<input className="bg-red-600/20" id="count" type="number" ref={nodeRef} />
		<button onClick={() => setCount()}>셋팅</button>
	</div>
	<button onClick={() => appContext.setNegative(!appContext.negative)}>전환</button>
	</>
)
```

버튼을 누를 때마다 `appContext`에서 제공해주는 `setCount(nodeRef.current.valueAsNumber)`를 통해 `appContext`의 `count`를 원하는 숫자로 설정하고 있다. 이를 통해 기존의 `props drilling`을 극복하고 컴포넌트간의 상호작용이 가능하다.

https://imgur.com/a/dlHB1vV