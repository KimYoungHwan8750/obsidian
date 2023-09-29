```java
StringBuffer test = new StringBuffer("test");  
test.replace(0,1,"수정"); // 수정est
```

`replace(시작 인덱스, 종료 인덱스, 삽입할 문자열)`의 형태로 쓴다.
delete+insert가 조합된 형태라고 보면 된다.

`replace(2,5,"hi");
2번째 인덱스(가 포함)부터 5번째 인덱스의 ==앞의 내용==까지를 삭제한 후에 hi가 삽입된다.