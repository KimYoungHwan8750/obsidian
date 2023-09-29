#### 예제
```java
StringBuffer test = new StringBuffer("test");  
test.delete(0,2);  // st
```
`delete(인덱스부터, 인덱스 앞까지)`
다소 헷갈릴 수도 있는데, (3,5)라는 값을 넣으면
3번째 인덱스가 포함된 글자부터 5번째 인덱스 글자의 앞까지 제거한다고 생각하자.
ex)
1 2 3 4 5
delete(2,4) // 1 2 5
