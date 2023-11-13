오차 없는 숫자 연산을 위해 고안된 자료형이다.

- **BigDecimal**은 **Java** 언어에서 숫자를 정밀하게 저장하고 표현할 수 있는 유일한 방법이다.
- 소수점을 저장할 수 있는 가장 크기가 큰 타입인 **double**은 소수점의 정밀도에 있어 한계가 있어 값이 유실될 수 있다.
- **Java** 언어에서 돈과 소수점을 다룬다면 **BigDecimal**은 선택이 아니라 필수이다.
- **BigDecimal**의 유일한 단점은 느린 속도와 기본 타입보다 조금 불편한 사용법 뿐이다.

### BigDecimal 기본 용어

- `precision`: 숫자를 구성하는 전체 자리수라고 생각하면 편하나, 정확하게 풀이하면 왼쪽부터 0이 아닌 수가 시작하는 위치부터 오른쪽부터 0이 아닌 수로 끝나는 위치까지의 총 자리수이다. `unscale`과 동의어이다. (ex: 012345.67890의 **precision**은 11이 아닌 9이다.)

- `scale`: 전체 소수점 자리수라고 생각하면 편하나, 정확하게 풀이하면 소수점 첫째 자리부터 오른쪽부터 0이 아닌 수로 끝나는 위치까지의 총 소수점 자리수이다. `fraction`과 동의어이다. (ex: 012345.67890의 **scale**은 4이다. 하지만 0.00, 0.0의 **scale**은 모두 1이다.) **BigDecimal**은 **32bit**의 소수점 크기를 가진다.

- `DECIMAL128`: **IEEE 754-2008**에 의해 표준화된, 부호와 소수점을 수용하며, 최대 34자리까지 표현 가능한 10진수를 저장할 수 있는 형식이다. 2018년 미국 정부의 총 부채액이 15조 7천 500억 달러로 총 14자리 임을 감안하면, 금융권에서 처리되는 대부분의 금액을 수용할 수 있는 크기이다. **Java**에서는 **BigDecimal** 타입을 통해 공식적으로 지원한다.

### 초기화

자주 쓰는 값은 초기화 메서드가 따로 존재한다.
또한 문자열로 초기화해야한다.
```java
BigDecimal.ZERO
BigDecimal.ONE
BigDecimal.TEN
new BigDecimal("0.01");
```

### 비교연산

```java
new BigDecimal("0.1100").equals(new BigDecimal("0.110")) // false;
new BigDecimal("0.1100").compareTo(new BigDecimal("0.110")) // 0;
```
객체A.compareTo(객체B) : 소숫점 아래 0을 제거한 뒤 값이 같으면 0 반환
객체 A가 B보다 낮으면 -1반환, 높으면 1반

### 사칙연산

```java
// 기본적으로 왼쪽 값을 기준으로 연산이 진행된다.
// a.subtract(b)는 a-b가 된다.
a.add(b) : 더하기
a.subtract(b) : 빼기
a.muliply(b) : 곱하기

a.divide(b) : 나누기 // 무한 소수일 경우 ArithmeticException가 발생한다.
a.divide(b,3,RoundingMode.Half_Even) // 3자리 수까지만 표기하고 반올림
a.remainder(b) : 나눈 후 나머지 반환
a.abs() : 절댓값
a.min(b) : 두 수 중 낮은 값 반환 // 순서가 바뀌어도 상관없다.
a.max(b) : 두 수 중 높은 값 반
a.setScale(2,RoundingMode.HALF_EVEN); // 반올림 정책 명시
```

범용적인 내용은 모두 명시하였다.
해당 메모는 [티스토리](https://jsonobject.tistory.com/466)를 참조한 것으로, 금융권 업무에 필요할 정도로 정교한 통화 정책이 필요하다면 위 블로그를 참조