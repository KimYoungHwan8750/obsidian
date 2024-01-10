```java
File file = new File("path");
file.mkdir();
file.mkdirs();
```

## mkdirs() :
mkdirs는 설정한 경로를 무조건 생성하고 이미 파일이 있을 경우 덮어씌운다.
덮어씌우는 행위를 하더라도 반환되는 값이 다른데, 파일이 이미 있어서 덮어씌우게 된 경우에 폴더를 만든 것은 아니기 때문에 mkdirs()의 반환값이 false가 된다.
반대로 없는 폴더를 생성하면 true를 반환한다.
또한 권한 생성이나 잘못된 파일명 등을 설정했을 경우 false를 반환한다.
### mkdir() :
mkdir는 설정한 경로의 상위 폴더가 없으면 false를 반환하고 아무런 행위도 하지 않는다.