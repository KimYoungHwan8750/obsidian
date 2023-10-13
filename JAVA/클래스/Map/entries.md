Map 객체를 생성과 동시에 초기화하고 싶을 때 사용한다.
#### 사용 예제
```java
Map<String,Object> map = Map.ofEntries(
							Map.entry("키1","데이터1"),
							Map.entry("키2","데이터2")
)
```