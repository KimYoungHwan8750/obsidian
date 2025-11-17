## 핵심: is는 TypeScript에게 "타입 정보"를 알려주는 것

### 문제 상황

```typescript
interface Fruit {
  name: string
  price: number
}

interface User {
  name: string
  email: string
}

// ❌ 일반 boolean 함수
function isFruit(data: Fruit | User): boolean {
  return 'price' in data
}

const data: Fruit | User = { name: '사과', price: 1000 }

if (isFruit(data)) {
  console.log(data.price) // ❌ 에러!
  // TypeScript: "data는 여전히 Fruit | User 타입이야"
  // "isFruit가 true를 반환해도 난 모르겠어"
}
```

**문제**: `boolean`을 반환하는 함수는 TypeScript에게 타입 정보를 주지 못함함

### 해결: is 키워드

```typescript
// ✅ 타입 가드 함수
function isFruit(data: Fruit | User): data is Fruit {
  return 'price' in data
}

const data: Fruit | User = { name: '사과', price: 1000 }

if (isFruit(data)) {
  console.log(data.price) // ✅ OK!
  // TypeScript: "isFruit가 true면 data는 Fruit 타입이구나!"
}
```

## is 키워드의 의미

```typescript
function isFruit(data: Fruit | User): data is Fruit
//                                     ^^^^^^^^^^^
// "만약 이 함수가 true를 반환하면, 
//  data 파라미터는 Fruit 타입이다"
```

### 단계별 동작

```typescript
function isFruit(data: Fruit | User): data is Fruit {
  return 'price' in data
}

const item: Fruit | User = getSomeData()

// 1단계: 함수 호출 전
console.log(item) // 타입: Fruit | User

// 2단계: if문 진입
if (isFruit(item)) {
  // 3단계: if 블록 내부
  console.log(item) // 타입: Fruit ✅ (좁혀짐!)
  console.log(item.price) // ✅ 가능
  
} else {
  // 4단계: else 블록
  console.log(item) // 타입: User ✅ (자동으로 추론됨)
  console.log(item.email) // ✅ 가능
}

// 5단계: if문 밖
console.log(item) // 타입: Fruit | User (원래대로)
```

## 비교: boolean vs is

### 일반 boolean 함수

```typescript
function isFruit(data: Fruit | User): boolean {
  return 'price' in data
}

const data: Fruit | User = { name: '사과', price: 1000 }

if (isFruit(data)) {
  // TypeScript 생각:
  // "isFruit는 그냥 true/false를 반환하는 함수일 뿐"
  // "data가 무슨 타입인지는 모르겠어"
  
  console.log(data.price) 
  // ❌ 에러: Fruit | User 타입에는 price가 확실하지 않음
}
```

### is 키워드 사용

```typescript
function isFruit(data: Fruit | User): data is Fruit {
  return 'price' in data
}

const data: Fruit | User = { name: '사과', price: 1000 }

if (isFruit(data)) {
  // TypeScript 생각:
  // "isFruit가 true를 반환했네?"
  // "함수 정의를 보니 data is Fruit라고 되어있어"
  // "그럼 여기서 data는 Fruit 타입이구나!"
  
  console.log(data.price) 
  // ✅ OK: data는 Fruit 타입으로 좁혀짐
}
```

## 실전 예시로 이해하기

### 예시 1: null 체크

```typescript
// ❌ 일반 함수
function isNotNull(value: string | null): boolean {
  return value !== null
}

const name: string | null = getName()

if (isNotNull(name)) {
  console.log(name.toUpperCase()) 
  // ❌ 에러: name은 여전히 string | null
}
```

```typescript
// ✅ 타입 가드
function isNotNull(value: string | null): value is string {
  return value !== null
}

const name: string | null = getName()

if (isNotNull(name)) {
  console.log(name.toUpperCase()) 
  // ✅ OK: name은 string으로 좁혀짐
}
```

### 예시 2: 배열 필터링

```typescript
const items: (string | null)[] = ['apple', null, 'banana', null]

// ❌ 일반 함수 사용
function isNotNull(value: string | null): boolean {
  return value !== null
}

const filtered = items.filter(isNotNull)
console.log(filtered) // 타입: (string | null)[] ❌
// TypeScript는 여전히 null이 있을 수 있다고 생각함
```

```typescript
// ✅ 타입 가드 사용
function isNotNull<T>(value: T | null): value is T {
  return value !== null
}

const filtered = items.filter(isNotNull)
console.log(filtered) // 타입: string[] ✅
// TypeScript가 null이 제거되었음을 알고 있음!
```

### 예시 3: API 응답 처리

```typescript
interface SuccessResponse {
  success: true
  data: any
}

interface ErrorResponse {
  success: false
  error: string
}

type Response = SuccessResponse | ErrorResponse

// ❌ 일반 함수
function isSuccess(res: Response): boolean {
  return res.success === true
}

const response: Response = await fetchData()

if (isSuccess(response)) {
  console.log(response.data)
  // ❌ 에러: Response 타입에는 data가 확실하지 않음
}
```

```typescript
// ✅ 타입 가드
function isSuccess(res: Response): res is SuccessResponse {
  return res.success === true
}

const response: Response = await fetchData()

if (isSuccess(response)) {
  console.log(response.data) // ✅ OK: SuccessResponse
} else {
  console.log(response.error) // ✅ OK: ErrorResponse
}
```

## is의 동작 원리

```typescript
function isFruit(data: Fruit | User): data is Fruit {
  return 'price' in data
}

// TypeScript 컴파일러의 사고 과정:

// 1. 함수 시그니처 확인
//    "이 함수는 data is Fruit를 반환한다고 선언했네"

// 2. if 문에서 사용
if (isFruit(someData)) {
  // "isFruit가 true를 반환했어"
  // "그럼 someData는 Fruit 타입이야" ← is 키워드 덕분
  
} else {
  // "isFruit가 false를 반환했어"
  // "그럼 someData는 User 타입이야" ← 자동 추론
}
```

## 중요한 규칙

### 1. is 키워드는 책임이 따른다

```typescript
// ⚠️ 위험: 잘못된 타입 가드
function isFruit(data: Fruit | User): data is Fruit {
  return true // 항상 true 반환 (잘못됨!)
}

const user: User = { name: 'John', email: 'john@example.com' }

if (isFruit(user)) {
  // TypeScript: "isFruit가 true니까 user는 Fruit야"
  console.log(user.price) // 런타임 에러! (price 속성 없음)
}

// is 키워드를 쓰면 TypeScript는 당신을 믿습니다!
// 잘못 구현하면 런타임 에러 발생
```

### 2. 제네릭과 함께 사용

```typescript
// 모든 타입에 대해 null 체크
function isNotNull<T>(value: T | null): value is T {
  return value !== null
}

const str: string | null = 'hello'
const num: number | null = 123

if (isNotNull(str)) {
  str.toUpperCase() // ✅ string
}

if (isNotNull(num)) {
  num.toFixed(2) // ✅ number
}
```

### 3. 여러 조건 조합

```typescript
function isFruit(data: unknown): data is Fruit {
  return (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    'price' in data &&
    typeof (data as any).price === 'number'
  )
}

// unknown 타입도 안전하게 좁힐 수 있음
const unknownData: unknown = getSomeData()

if (isFruit(unknownData)) {
  console.log(unknownData.price) // ✅ Fruit
}
```

## 시각적 이해

```typescript
function isFruit(data: Fruit | User): data is Fruit {
  return 'price' in data
}

// 실행 흐름:

const data: Fruit | User = ...

         ┌─────────────┐
         │   isFruit   │
         │    호출     │
         └──────┬──────┘
                │
        ┌───────┴───────┐
        │               │
    true 반환       false 반환
        │               │
        ▼               ▼
  ┌─────────┐     ┌─────────┐
  │  Fruit  │     │  User   │
  └─────────┘     └─────────┘
     data는          data는
   Fruit 타입!    User 타입!
```

## 핵심 정리

### is 키워드 = 타입 보증서

```typescript
// is 없이
function check(x: A | B): boolean
// → "true/false만 알려줄게"

// is 있으면
function check(x: A | B): x is A
// → "true면 x는 A 타입이라고 보증할게!"
```

### 문법 구조

```typescript
function 함수명(파라미터: 타입A | 타입B): 파라미터 is 타입A {
//                                      ^^^^^^^^^^^^^^^^
//                                      "true면 타입A다"
  return /* 타입A인지 체크하는 로직 */
}
```

### 사용 목적

```typescript
// 1. 유니온 타입 좁히기
Fruit | User → Fruit

// 2. null/undefined 제거
string | null → string

// 3. unknown 타입 안전하게 사용
unknown → 구체적 타입

// 4. 배열 필터링 후 타입 보장
(T | null)[] → T[]
```

