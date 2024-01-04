해당 인스턴스의 클래스를 가져온다
NPE를 방지하기 위해서 null 체크를 해야한다.
```java
String hi = "hi";
System.out.println(hi.getClass()); // java.util.String
```