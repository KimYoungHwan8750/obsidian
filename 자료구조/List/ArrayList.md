동적 배열이다.
```java
ArrayList<Integer> arrayList = new ArrayList<>();  
arrayList.add(1);
```

코드를 분석해보면 기본값이 10으로 설정되어있다. 요소를 추가할 때마다 크기가 부족해지면 내부적으로 더 큰 사이즈의 배열을 만들고 기존 배열의 값을 복사한다.

