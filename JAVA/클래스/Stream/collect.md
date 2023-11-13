수정이 가능한 리스트 복사본을 만들 때 사용한다.
인자로 Collectors.toList()를 넣으면 toList와 같은 동작을 하며, 수정이 가능한 복사본이 만들어진다.
```java
List<Object> list = new ArrayList<>();
list.stream()...collect(Collectors.toList());
```