#### 사용법

Index는 0부터 시작한다.

```java
StringBuffer str = new StringBuffer(#초기 문자열을 넣을 수 있다.);
str.append("12345") // "1 2 3 4 5"
str.insert(3,"'3.5'") // "1 2 3 '3.5' 4 5"
str.delete(0,2) // "3 3.5 4 5"
str.reverse() // "5 4 3.5 3"
```