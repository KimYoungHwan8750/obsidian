```java
// ... webClient를 사용하는 코드
Map<String, Object> result = //... webClient요청
// 위의 Map은 unchecked assignment 경고 문구가 발생한다.
@SuppressWarnings("unchecked")
Map<String, Object> result = //... 해당 어노테이션으로 경고 문구를 없앨 수 있다.
// 이때 형변환 에러가 확실히 뜨지 않는 게 보장된 경우에만 사용해야하고, 적절하게 주석으로 이유를 설명하는 게 좋다.

```