#### 사용 형태
Map.of(key,value,key,value);

```java
Map<String,Object> map = Map.of("키1","Value1","키2","Value2");
```

#### 주의사항
Map 클래스를 살펴보면
```java
Map.of(K k1, V v1);
Map.of(K k1, V v1,K k2,V v2);
```
이런 형태로 매개변수 숫자를 10개까지 받는 메서드가 하나하나 선언되어 있다.
이말은 곧 10개 이상의 매개변수를 초기화하면 오류가 발생한다는 뜻이다.
10개 이상의 값으로 초기화하려면 [[entries]]항목 참조.
