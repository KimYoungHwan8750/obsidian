# historyAPI

## go()

`history.go(n)`

음수는 뒤로가기, 양수는 앞으로 가기이다.
범위에 해당하지 않는 값을 넣으면 아무 동작도 하지 않는다.

## back()

`history.back()`
`history.go(-1)`

둘이 같다.

## forward()

`history.forward()`
`history.go(1)`

둘이 같다.

## pushState(state, title, url)

`history.pushState(state, title, url)`

state는 {a:1, b:1}과 같이 객체이며, title은 어떠한 기능도 없는 meta data로만 쓰인다. url은 실제 주소를 변경한다. (페이지는 리로드되지 않는다.)

현재 history를 바꾼다.

만약 a -> b -> c에서 `history.go(-2)`를 통해 a페이지를 바라보는 상태에서 `history.pushState({}, null, "f")`를 하면 history는 a -> f가 된다.

## replaceState(state, title, url)

`history.replaceState(state, title, url)`

pushState와 같은 기능을 한다.

다만 pushState는 length가 +1되며 이후 기록은 지워지지만, replace는 length가 유지되며 현재 페이지가 바뀌고 이후 기록도 유지된다.

즉 a -> b -> c에서 `history.go(-2)`로 a페이지를 바라보며 `replaceState({}, null, "f")`를 하게 되면 f -> b -> c가 된다.

## popstate 이벤트

window.addEventListener('popstate', (evt) => {
	console.log(evt.state);
})

popstate를 통해 앞/뒤로가기 이벤트를 캐치할 수 있으며 evt객체에서 state를 가져올 수 있다.