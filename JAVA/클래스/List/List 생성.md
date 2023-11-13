```java
List<Object> list = new ArrayList<>();
List<Object> list = Arrays.asList();
List<Object> list = List.of();
List<Object> list = Collections.emptyList();
```

위와 같은 방법들로 생성 가능하다.
100억번 돌려본 결과 네 개 모두 2ms~3ms정도 걸렸다.
그러나 Arrays.asList()는 항상 마지막으로 실행이 완료되고 Idle에서도 경고 문구를 보여주므로 기분 나쁘니까 쓰지 말