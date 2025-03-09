## Flex

`flex-basis`
Flex 아이템의 기본 크기를 설정한다. 이때 `flex-direction: rows`일 때는 `width`, `flex-direction: column`일 때는 `height` 속성에 대한 기본 크기가 설정된다. 단위는 `px`, `%`, `vh`등 `width` 속성에서 사용 가능한 속성들이 사용가능하다

기본값은 auto, 이는 아이템의 기본 width 값을 사용한다. 아이템의 width가 설정되어있지 않으면 해당 아이템의 콘텐츠 크기 값이 된다.

```css
.item {
	flex-basis: 100px;
}
```

만약 item이 100px이 안 되면 100px에 맞춰지며, 100px이 넘는 아이템은 본인 콘텐츠 크기만큼 늘어난다.

```css
.item {
	flex-basis: 100px;
}
```

![](https://i.imgur.com/rEyuege.png)



B와 C 박스는 100px로 고정되어있지만 A 박스는 컨텐츠가 100px를 초과한다. 이때 width가 적절히 조절되며 100px보다 큰 너비를 차지하게 된다. 이때 A 컨테이너의 `width` 속성을 `100px`로 조절한다면?

![](https://i.imgur.com/lN7MjCx.png)

100px보다 크기가 큰 요소지만 `width`가 100px로 고정되며 컨텐츠가 요소를 벗어나게 된다. 이런 경우 적절하게 개행처리를 해주기 위해선 `word-break` 속성을 이용하면 된다.

![](https://i.imgur.com/o12UOJN.png)


그렇다면 100px보다 크기가 크지 않은 요소의 width를 200으로 조정한다면?

![](https://i.imgur.com/rEyuege.png)

크기가 flex-basis를 초과하지 않을 땐 `width` 속성보다 `flex-basis` 속성이 우선시되어 변화가 없다.


---

`flex-grow`

컨테이너에 남은 공간을 어느 비율로 가져갈지를 정한다.

예를 들면 A, B, C 아이템이 있고 B 아이템에만 `flex-grow` 속성을 1로 주면 사용 가능한 모든 공간을 B가 차지한다.

```css
.item {
	flex-basis: 100px;
}

.item-b {
	flex-grow: 1;
}
```

![](https://i.imgur.com/Nm0Kcj2.png)

그럼 이번엔 C에도 똑같이 `flex-grow` 속성을 1로 줘보자.

![](https://i.imgur.com/VMRX1wn.png)

이번엔 B의 `flex-grow` 속성을 2로 준다.

![](https://i.imgur.com/2Wyby0c.png)

이는 flex-basis의 크기를 반영한 뒤 남은 공간을 비율대로 가져간다. 예를 들어 컨테이너의 크기가 1000px이고 모든 아이템의 flex-basis가 200px이라면 200px * 3(A, B, C) = 600px로 400px이 남고 B, C 아이템의 `flex-grow`가 1이라면 각각 200px, 200px씩 나눠가지는 셈이다.

---

`flex-shrink`
`flex-grow` 마찬가지로 `flex-basis`에 할당된 것보다 아이템이 작아질 때 동작을 정의한다. `flex-shrink`가 0이면 아이템은 고정 크기를 유지하며, 1 이상의 값을 가지게 되면 비율 순서대로 아이템이 작아진다.

이번에는 아이템 A, B, C에 `flex-basis`를 300px로 주고 `flex-shrink` 옵션은 아직 주지 않았다.

![](https://i.imgur.com/pYNEagc.png)

아이템들이 균일하게 300px을 유지하고 있다. 이제 B 아이템만 `flex-shrink`를 0으로 주면 컨테이너가 축소될 때 B의 크기는 고정된다.

```css

.item-b {
	flex-shrink: 0;
}
```

![](https://i.imgur.com/vduSLxw.png)

스크린샷과 같이 B는 크기를 유지했지만 다른 아이템들은 크기가 축소되었다.

따로 설정하지 않았을 때 `flex-grow`는 0, `flex-shrink`는 1로 설정된다. 이는 컨테이너 여유 공간이 존재해도 아이템은 자동으로 늘어나지 않으며, 컨테이너가 축소되면 아이템은 축소되는 것을 의미한다.