# Test

given-when-then 패턴이 사용된다

vitest를 예제로 든다면

```ts
function add(x: number, y: number) {
	return x + y
}
it('test1', () => {
	// given
	const num1 = 1
	const num2 = 2

	// when
	const result = add(num1, num2)

	// then
	expect(result).toBe(3)
})
```