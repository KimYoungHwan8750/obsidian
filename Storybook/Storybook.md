## Storybook
Storybook이란 React 컴포넌트를 문서화하기 위한 UI 개발 도구이다. 자동 문서화뿐만 아니라 컴포넌트를 렌더링하는 일종의 테스트 공간을 제공해주기도 하며, 무엇보다 초보자들에겐 Storybook에서 내가 만든 컴포넌트를 렌더링하기 위해 Storybook에서 요구하는 틀에 맞추어 컴포넌트를 제작하다보면 재사용성이 우수한 컴포넌트를 짜는 습관을 들일 수 있다.

### 시작하기
storybook의 컴포넌트들은 stories 디렉토리에 `파일명.stories.확장자`와 같이 작성된다. 예를 들면 버튼에 대한 스토리는 `Button.stories.ts`와 같이 작성될 수 있다.

여러 설명보다 코드를 보는 것이 직관적인 이해에 도움이 되므로 바로 코드를 보며 익혀보자.

```tsx
// MyComponent.tsx
type MyComponentProps = {
  text: string
};
const MyComponent = (props: MyComponentProps) => {
  return (
    <button>
      {props.text}
    </button>
  )
}

export { MyComponent };
```

이 컴포넌트는 `props`으로 `text`를 전달받아서 렌더링하는 단순한 버튼 컴포넌트다.

```ts
// MyComponent.stories.ts
import { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./MyComponent";
const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
}

export default meta;

type Story = StoryObj<typeof MyComponent>;

export const FirstStory: Story = {
  args: {
    text: "Hello World"
  },
}
```

Storybook을 사용하려면 Meta와 Story에 대해 이해해야하는데, Meta는 컴포넌트에 대한 전역 설정(스토리북에 등록될 그룹핑, 이름, 렌더링할 컴포넌트 등)이며, Story는 해당 컴포넌트가 가질 수 있는 여러 스토리(인스턴스)를 의미한다. 당장에 이해가 안 되더라도 아래에서 차근차근 설명하므로 걱정하지 말자.

먼저, Meta는 컴포넌트에 대한 전역 설정이라고 했다. 그럼 무엇을 설정할 수 있는지 살펴보자.

---

`title`

title 속성은 일종의 경로를 설정한다. Seperator로 `/`를 사용하며 마지막 `/` 이후 문자열은 컴포넌트의 이름이 된다. 위 코드에서 일부를 수정한 후 스토리북에서 확인해보자.

```ts
const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  title: "MyCustomComponent/MyComponent",
}
```

![](https://i.imgur.com/dp7TkH5.png)

보이는가? MYCUSTOMCOMPONENT 그룹의 MyComponent가 생성되었고 해당 컴포넌트의 First Story를 확인 가능하다.

---

`tags`

`"autodocs"`으로 설정하면 아래 화면과 같이 해당 컴포넌트에 대한 문서를 자동으로 만들어준다.

```tsx
const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  title: "MyCustomComponent/MyComponent",
  tags: ["autodocs"]
}
```

![](https://i.imgur.com/JOS9O1N.png)

---

`decorators`

말 그대로 데코레이터 패턴이다. 요소에 추가적인 조작을 수행하고 싶을 때 사요한다.

```tsx
const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  title: "MyCustomComponent/MyComponent",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div>
        추가작업
        <Story/>
      </div>
    )
  ],
}
```

내가 만든 컴포넌트가 데코레이터에서 Story라는 변수에 담긴다. 위 코드를 보면 Story를 렌더링하는 새로운 JSX Element를 반환하고 있다.

![](https://i.imgur.com/D6GKs1k.png)

---

`parameters`

정렬, 배경색등을 지정할 수 있다.

```tsx
const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  title: "MyCustomComponent/MyComponent",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div>
        추가작업
        <Story/>
      </div>
    )
  ],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark"
    }
  }
}
```

![](https://i.imgur.com/aKwSgrG.png)

---

`args`

컴포넌트에 전달할 인자값을 설정할 수 있다.

```tsx
export const FirstStory: Story = {
  args: {
    text: "Hello World"
  },
}
```

이렇게 설정하면 `MyComponent`를 렌더링하면서 `text` 속성에 `"Hello World"`를 전달해준다.

---

`render`

```tsx
export const FirstStory: Story = {
  args: {
    text: "Hello World!"
  },
  render: (args) => <MyComponent text={args.text} />,
}
```

리액트 디자인 패턴을 조금 공부하다보면 알게 되는 `render props` 패턴을 사용할 수 있게 도와주는 기능이다.

---

`argsType`

파라미터의 타입을 명시적으로 지정해준다. 기본값은 타입 추론에 의해 제공되므로 `text: string`에 대한 문서가 생성될 때 `text`의 값을 변경하는 `input` 태그의 `type`가 `text`로 생성된다. 이때 명시적으로 타입을 `boolean`로 바꿔보자.

```tsx
export const FirstStory: Story = {
  args: {
    text: "Hello World!"
  },
  argTypes: {
    text: {
      description: "여긴 설명",
      type: "boolean"
    }
  },
  render: (args) => <MyComponent text={args.text} />,
}
```

![](https://i.imgur.com/DcUFBPo.png)

`MyComponent`의 `text` 속성이 `string` 타입인데도 불구하고 컨트롤 패널이 true/false를 스위치하는 것으로 바뀌었다.

---

위에 언급한 속성에서 `title`을 제외한 속성들은 Meta, Story에서 모두 사용 가능하다.

Meta는 여러개의 Story를 가지게 되므로 Meta에 설정한 속성들은 Meta 하위의 모든 Story에 적용된다.

Meta든 Story든 이름을 지정하지 않으면 기본값이 적용되는데, Story 같은 경우 내보낸 스토리 이름이 그대로 적용된다. 만약 다르게 하고 싶다면 `name` 속성을 사용하면 된다.



이렇게 간단한 설정 방법을 알아보았다.

