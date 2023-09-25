Object가 null 값일 때 다루기 쉽게 만들어놓은 Optional객체.
객체가 null일 경우에도 안전하게 원하는 동작을 수행할 수 있다.
```
Optional test = test.empty(); // 빈 객체임을 명시
test.ifPresent(t -> t.getter메서드()); // t에 선언된 getter 메서드 사용
```