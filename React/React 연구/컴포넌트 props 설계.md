## 패딩, 마진 너무 자주 쓰여
이번 프로젝트에서 공통 컴포넌트를 바닥부터 쌓아올리는 귀중한 경험을 했다. 그 과정에서 Card 컴포넌트, Button 컴포넌트, Flex 컴포넌트등 레이아웃의 기초가 되는 컴포넌트들에서 padding에 대한 요청이 굉장히 많이 들어왔다.

처음엔 padding을 주는 컴포넌트인 Padding을 만드는 것으로 팀원들의 넋두리를 달래려고 했으나 Padding이 정말 너무나도 많이 쓰이는 나머지 아래와 같은 꼴이 나고 말았다.

```tsx
<Card>
	<Padding padding={16}>
		<Card>
			<Padding padding={14}>
				<Flex>
					<Padding paddingX={12} paddingTop={6}>
						중첩 카드 구조
					</Padding>
				</Flex>
			</Padding>
		</Card>
	</Padding>
</Card>
```

<s style="font-size: 20px">패딩 지옥</s>

이렇게 컴포넌트에 패딩이 무조건 따라 붙으니 결국 거의 모든 컴포넌트의 속성에 패딩이 추가되었고 Padding 컴포넌트의 존재 의미가 퇴색되었다. 오히려 패딩 컴포넌트가 있음으로써 사용자가 혼란을 겪게 될 여지가 있었다. 패딩이라는 컴포넌트가 있는데 굳이 패딩 속성을 쓰는 게 맞을까? 같은.

### 컨셉

내가 공통 컴포넌트를 만들 때 사용한 전략은 유연성이었다. 구체적인 목적을 가지고 해당 기능을 훌륭히 수행하는 컴포넌트를 만들기엔 경험도 실력도 한참 모자람을 인지하고 있었기 때문에, 기존 태그의 기능을 모두 수행할 수 있는 디자인만 입힌 형태의 컴포넌트가 나한테 적절한 선택지였다.

따라서 리액트의 `componentPropsWithRef` 타입을 사용해 기존 속성을 모두 상속하고 추가적으로 자주 사용되는 padding, color, backgroundColor 등의 속성을 추가해서 사용했다.

```tsx
type ButtonProps = ComponentPropsWithRef & {
	padding?: string | number;
	paddingX?: string | number;
	paddingY?: string | number;
	paddingTop?: string | number;
	paddingRight?: string | number;
	paddingBottom?: string | number;
	paddingLeft?: string | number;
	// ... 기타 props
}

const Button = ({
	padding,
	paddingX, paddingY,
	paddingTop, paddingRight, paddingBottom, paddingLeft
}: ButtonProps) => {
	return(
		<button
			style={{
				paddingTop: paddingTop ?? paddingY ?? padding,
				paddingRight: paddingRight ?? paddingX ?? padding,
				paddingBottom: paddingBottom ?? paddingY ?? padding,
				paddingLeft: paddingLeft ?? paddingX ?? padding,
			}}
		
			{...props}
		>
			예쁘고 아름다운 나의 버튼
		</button>
	)
}
```

?? 연산자의 단축 평가로 인해 paddingTop 값이 있으면 paddingTop 값만 적용되고 이후는 무시되기 때문에 복잡한 코드없이 우선순위를 구현한 예제이다. 이때 주의할점으로는 ?? (nullish 병합 연산자)를 사용해야한다는 것이다. ||는 `null`과 `undefined` 말고도 0, false도 false로 판단한다.

따라서 다음과 같은 상황에서 문제가 생긴다.

>paddingY을 10px 준 후 paddingBottom을 0으로 설정

```tsx
<Padding paddingY={10} paddingBottom={0}>패딩 적용</Padding>
```

평가가 어떻게 진행되는지 보자

```tsx
// 1. paddingTop = undefined 이므로 paddingY 적용
// 2. paddingY = 10이므로 paddingTop은 곧 10
paddingTop: paddingTop || paddingY || padding

// 1. paddingBottom = 0이므로 paddingY 적...용?!!! STOP!!!!!!!!!!!
paddingBottom: paddingBottom || paddingY || padding
```

---

### 속성도 모듈화 해버려
위에선 padding, paddingY, paddingTop이라는 우선순위를 요구하는 같은 속성에 대한 처리 방법을 살펴봤다. 이번에 설명할 내용은 padding 타입 자체에 대한 모듈화이다.

현재 너무 자주 쓰이는 padding은 Button 컴포넌트에도 속성으로 정의되어있고 Card 컴포넌트에도 속성으로 정의되어 있고 Flex 컴포넌트에도... ~~그만~~

```tsx
type PaddingSize = string | number;
type ButtonProps = ComponentPropsWithRef<"button"> & {
	padding?: PaddingSize;
	paddingX?: PaddingSize;
	//... padding
}

type PaddingProps = ComponentPropsWithRef<"div"> & {
	padding?: PaddingSize;
	paddingX?: PaddingSize;
	//... padding
}

type FlexProps = ComponentPropsWithRef<"div"> & {
	padding?: PaddingSize;
	paddingX?: PaddingSize;
	//... padding
}
```


```tsx
type PaddingProps = {
	padding?: PaddingSize;
	paddingX?: PaddingSize;
	paddingY?: PaddingSize;
	paddingTop?: PaddingSize;
	paddingRight?: PaddingSize;
	paddingBottom?: PaddingSize;
	paddingLeft?: PaddingSize;
}
type BUttonProps = ComponentPropsWithRef<"button"> & PaddingProps;
```