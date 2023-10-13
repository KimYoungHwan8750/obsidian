
#### 발생 상황 정리

----
#### toList()메서드를 통해 리스트로 형변환된 불변 객체를 수정하려고 할 때
Stream 객체를 .toList()로 변환한 뒤, 변환된 List의 값을 수정하려고 하면 발생하는 오류이다. 만약 수정을 가능하게 하려면 Collectors.toList()를 인자로 넣은 collect메서드를 사용해야한다.

`.collect(Collectors.toList());`

---

#### Map.of() 또는 Map.entries()를 통해 초기화된 Map객체를 수정하려고 할 때
Map.of()메서드나 Map.entries()를 통해 초기화된 Map객체를 수정하려고 하면 해당 오류가 발생한다.