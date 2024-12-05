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