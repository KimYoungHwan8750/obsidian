# useLocation

`react-router-dom`에서 제공하는 훅이다.

`Router`태그나 `RouterProvider` 내부에 있는 컴포넌트에서만 사용 가능하다.

browerAPI인 location을 React에서 사용하기 위한 형태로 제공해준다.

`const location = useLocation()`을 통해 location 객체를 획득 가능하고, `location.hash나 location.pathname`처럼 기존 location 객체를 사용하듯이 사용할 수 있다.

location의 내용이 변경되면 컴포넌트에 리렌더링을 일으킨다.

```tsx
import { useLocation } from "react-router-dom"

function App() {
  let location1 = useLocation();
  return (
    <>
    {location1.hash}
    </>
  )
}
export default App

```