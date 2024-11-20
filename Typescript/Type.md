# Type
타입스크립트의 타입에 대해 정리해본다.

* number
* string
* any
* unknown
* void
* object
* undefined
* null
* ...(추가 예정)

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