#### Simple Logging Facade For Java
SLF4J

로거를 자동으로 생성해준다.
```java
private static final java.util.logging.Logger log = java.util.logging.Logger.getLogger(LogExample.class.getName());
// 위 내용을 자동으로 추가해준다.
```