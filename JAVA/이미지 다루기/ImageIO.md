```java
Image bufferedImage = ImageIO.read(file); // 간단하게 이미지를 읽어올 수 있는 유용한 메서드를 제공한다.
// BufferedImage형태로 제공하기 때문에 Graphics를 이용해 작업을 한 후에
ImageIO.write(bufferedImage,format,file); // 이와 같은 형태로 포맷과 위치를 지정할 수 있다.
```

## Format
file이 이미 경로/image.png 라는 형태로 png라는 포맷을 담고 있다고 하더라도 포맷을 설정해야한다.
이는 확장자와 별개로 ImageIO가 인코딩하는 방식이 결정되기 때문이다.