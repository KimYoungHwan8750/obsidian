# Type
타입스크립트는 Type이라는 개념이 도입된 만큼 Type에 관한 기능이 많이 추가되었다. typeof가 그러한데 
## typeof
typeof 키워드는 번거로운 타입 선언문을 획기적으로 줄여줄 수 있으나 학습이 필요한 키워드이다.
typeof를 쓰는 방식에 따라 추출되는 타입이 달라지므로 타입스크립트를 사용한다면 사용법을 꼭 숙지해야할 키워드이다.

다음은 대상에 따라 추출되는 객체 형태를 정리해보았다.

1. 원시타입
```ts
// Case1
const referNumber = 1
type ReferNumber = typeof referNumber // type ReferNumber = 1
const foo: ReferNumber = 1 // Ok
const bar: ReferNumber = 2 // Error

// Case2
const referNumber: number = 1
type ReferNumber = typeof referNumber // type ReferNumber = number
const foo: ReferNumber = 2 // Ok
```

원시타입은 타입을 명시적으로 지정해주지 않으면 해당 리터럴이 타입으로 지정된다.
문자열도 마찬가지로 `const a: string = "hi"`와 `const a = "hi"`가 반환하는 타입이 각각 `string`와 `"hi"`로 달라진다.

2. 객체
```ts
// Case1
const referObject = {
    a: 1,
    b: "hi"
}
/*
type ReferObject = {  
	a: number;  
	b: string;  
}
*/
type ReferObject = typeof referObject
```

```ts
// Case2
type ReferType = {
    a: 1
    b: "hi"
}
const referObject: ReferType = {
    a: 1,
    b: "hi"
}
/*
type ReferObject = {  
	a: 1;  
	b: "hi";  
}
*/
type ReferObject = typeof referObject
```

```ts
// Case3
const referObject = {
    a: 1,
    b: "hi"
} as const
/*
type ReferObject = {  
	a: 1;  
	b: "hi";  
}
*/
type ReferObject = typeof referObject
// 
```

그 대상이 객체일 경우엔 넓은 타입으로 추론한다. as const로 선언하면 해당 객체 내부 변수들의 타입이 리터럴로 고정된다.

### typeof의 다양한 활용

#### keyof typeof
모든 키를 유니온 타입으로 가진 타입을 반환한다.
```ts
const referType = {
	a: 1,
	b: "2",
	c: null,
	4: undefined,
	"5": false
}
// ReferType = "a" | "b" | "c" | 4 | "5"
type ReferType = keyof typeof referType
const temp: ReferType = 4 // Ok
const temp: ReferType = "4" // Error
const temp: ReferType = "d" // Error
```

#### typeof A\[keyof typeof A]
모든 value를 유니온 타입으로 가진 타입을 반환한다.

```ts
const referObject= {
    a: 1,
    b: () => "hi"
}
type A = typeof referObject[keyof typeof referObject]

const a: A = () => "" // Ok
const a: A = 1 // Ok
```

위 경우는 `1 | () => string` 타입을 반환한다.

즉 `keyof typeof A`는 `key` 쪽 타입을, `typeof A[keyof typeof A]`는 `value`쪽 타입을 반환한다.

#### ReturnType<>
앞서 `keyof typeof A`는 `key` 쪽 타입을, `typeof A[keyof typeof A]`는 `value`쪽 타입을 반환한다고 했다. 근데 `value`가 숫자를 반환하는 함수라면 `() => number`가 타입이 될 것이다.

```ts
const obj = {
	A: () => 1,
	B: () => "hello"
}
```

그렇다면 위 코드에선 `() => number`, `() => string` 타입밖에 가져오지 못하는 걸까?

아니다.

```ts
const obj = {
    a: () => 1,
    b: () => "hi"
}
// ObjType = number | string
type ObjType = ReturnType<typeof obj[keyof typeof obj]>
```

`a` 와 `b`는 `1`과 `"hi"`를 반환하는 함수다. `typeof A[keyof typeof A]`는 `value`측이 함수일 때 해당 함수의 타입을 가져온다. ReturnType은 함수의 반환 타입을 가져온다.

즉 `ReturnType<()=>number>`는 `number`를 반환하는 것이다. `typeof obj[keyof typeof obj]`가 각각 `() => 1`을 `() => nuber`로, `() => "hi"`를 `() => string`로 반환해준다.

그럼 `ReturnType<() => number>`, `ReturnType<() => string>`과 같은 코드가 되고 `ReturnType<>`은 함수가 반환하는 타입을 반환하니까 위 예제 코드에서 `ObjType`은 `number | string`을 가진 유니온 타입이 된다.

## Utility Type
매.우. 중요한 대목. 타입스크립트 영영 안 쓸 거 아니면 외워라.

### Partial\<T>
모든 속성을 선택적으로 만듦.

```ts
type ExampleType = {
	name: string
	age: number
};

/**
* 아래 코드는
* {name?: string, age?: number}가 된다. 
*/
type PartialExampleType = Partial<ExampleType>;
```

### Required\<T>
모든 선택 속성을 필수로 변경

```ts
type ExampleType = {
	name?: string
	age?: number
};

/**
* 아래 코드는
* {name: string, age: number}가 된다. 
*/
type RequiredExampleType = Required<ExampleType>;
```

### Readonly\<T>
모든 속성을 읽기 전용으로 변경

### Pick\<T>
타입에서 특정 키만 선택하여 새 타입 생성한다. 그러면 처음부터 해당 타입으로 생성하면 되지 않나 생각할 수 있다. 아래 코드를 보자.

```ts
type ExampleA = {
	a: string
	b: number
	c: boolean
};

// type PickExampleA = {a: string};와 결과가 같다.
type PickExampleA = Pick<ExampleA, "a">;
```

아마 위 코드를 보면 "엥? 그럼 처음부터 {a: string}인 타입을 만들면 되는 거 아님?"이라고 생각할 수 있다.

```ts
type ExampleA = {
	a: string
	b: number
	c: boolean
};

type PickerType = {
	a: boolean
	c: string
}

// PickExampleA = {a: string, c: boolean}
type PickExampleA = Pick<ExampleA, keyof PickerType>;
```

이렇게 Example에서 다수의 타입을 추출할 수 있다. 여기서 ExampleA의 a는 string타입, c는 boolean인데 PickerType의 a는 boolean, c는 string타입이다. 그 이유는 PickExampleA 타입에서 알 수 있다.

```ts
type ExampleA = {
	a: 1,
	b: 2,
	c: 3
};

type Result = keyof ExampleA; // "a" | "b" | "c"
```

keyof는 객체의 키값을 문자열로 반환한다.

### Omit\<T>
해당 제너럴 타입을 제외한 타입을 반환한다.

### Record\<Keys, Type>
지정된 키 타입으로 객체 타입을 생성한다.

```ts
// key값이 string이고 value가 boolean인 객체 타입
type RecordType = Record<string, boolean>;

// key값으로 "a" 또는 "b"만 올 수 있고 value가 number 타입인 객체 타입
type RecordType2 = Record<"a" | "b", number>;
```

### ReturnType\<T>
함수의 반환 타입을 추출한다.

```ts
const getPhoneNumber = (): string => {
	return "010-1234-5678";
}
type SomeType = ReturnType<typeof getPhoneNumber>; // string
```

### 매핑 수정자

```ts
type Mutable<Type> = {
  -readonly [prop in keyof Type]: Type[prop];
};
```

이것을 이해하려면 아래와 같은 사전 지식이 필요하다.

```ts
type A = {
  a: string
  b: number
}
type B = A['a'] // string
```

그러면 위 코드도 해석이 된다.

`-readonly`는 말 그대로 해당 속성을 제거하겠고 이제 키와 타입인데, Type의 키값이 순서대로 prop에 할당되니 key는 그대로, Type\[prop\]에서도 본래의 키값이 할당되니 value의 타입도 그대로다. 즉 readonly만 제거하는 코드가 되는 것.


### satisfies
타입을 이리저리 뒤섞다보면 구체적인 타입 정보, 예를 들면 "hi"가 string으로 변환되는 경우가 있다. 그걸 방지해준다는데 자세한 것은 문제해결이 필요할 때 다시 정리할 예정. as 와 비슷한 역할을 한다고 보면 된다.

### TypeGaurd
타입의 범위를 좁히는 함수를 말한다. 방금 막 프로젝트 진행 중 TypeGaurd의 필요성 때문에 기록하는 것이니 현장감 100%의 코드라고 볼 수 있겠다.

```ts
let data: FirstJoinResponse = {};
[AppConstant.direction.TOP, AppConstant.direction.BOTTOM].forEach((flag) => {
  let frame: Mutable<EditorData>;
  frame.direction = flag;
  frame.text = this.editorService.getText(flag);
  frame.language = this.editorService.getLanguage(flag);
});
this.socket.emit(AppConstant.websocketEvent.FIRST_JOIN, data);
```

나는 data에 반드시 모든 값을 넣을 거라는 사실을 아는데 컴파일러는 지금 당장 FirstJoinResponse가 {}이니 빨간줄을 찍찍 긋는다.