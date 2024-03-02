## 이미지 다루기

### 환경

#### Package

```java
import javax.imageio.ImageIO;  
import java.awt.Image;  
import java.awt.image.BufferedImage;  
import java.awt.Graphics;  
import java.io.File;  
import java.io.IOException;
```

#### 디렉토리 구조

![디렉토리 구조](JAVA/바이너리%20데이터%20다루기/이미지%20다루기/image/Pasted%20image%2020240302015534.png)

##### Moon.png

![Moon](JAVA/바이너리%20데이터%20다루기/이미지%20다루기/image/Moon.png)

##### Check.png

![Check](JAVA/바이너리%20데이터%20다루기/이미지%20다루기/image/Check.png)

##### DrawImageExample
```java
public class DrawImageExample {
    // 워터마크 이미지 크기 20px
    private final static int WATERMARK_SIZE = 20;
    // 여유 공간 10px
    private final static int WHITE_SPACE = 10;
    // WIDTH가 20일 때 여유 공간을 10으로 주게되면 10px만큼 잘리게 됨
    private final static int WHITE_SPACE_WIDTH = WATERMARK_SIZE + WHITE_SPACE;
    public static void main(String[] args) throws IOException {
        // 필요한 파일들을 정의
        File file = new File("./Moon.png");
        File watermarkFile = new File("./Check.png");
        File processedFile = new File("./Result.png");

        // 파일을 이미지로 Read
        Image image = readImage(file); // 원본 이미지
        Image watermarkImage = readImage(watermarkFile); // 워터마크 이미지
        Image resizedWaterMarkImage = resizeImage(watermarkImage); // 워터마크 이미지 축소

        // 워터마크를 추가하고 파일로 저장
        BufferedImage processedImage = addWaterMark(image,resizedWaterMarkImage);
        ImageIO.write(processedImage,"png",processedFile);
    }
    public static Image readImage(File file) throws IOException {
        return ImageIO.read(file);
    }
    public static Image resizeImage(Image image){
        return image.getScaledInstance(WATERMARK_SIZE,WATERMARK_SIZE,Image.SCALE_DEFAULT);
    }
    public static BufferedImage addWaterMark(Image image, Image watermark){
        BufferedImage processImage = new BufferedImage(image.getWidth(null),image.getHeight(null),BufferedImage.TYPE_INT_RGB);
        Graphics graphics = processImage.getGraphics();
        graphics.drawImage(image,0,0,null);
        graphics.drawImage(watermark,image.getWidth(null) - WHITE_SPACE_WIDTH, WHITE_SPACE, null);
        graphics.dispose();
        return processImage;
    }
}
```

예제이기 때문에 예외 처리가 일부 생략되었다.

본인의 환경에 따른 적절한 예외처리가 필요하다. 예를 들어 필자는 블로그에 워터마크를 적용할 때, 이미지가 워터마크 파일 크기보다 작을 경우 예외를 발생시킨다. 확장자 검사도 필수이다.

##### 결과물

![결과물](JAVA/바이너리%20데이터%20다루기/이미지%20다루기/image/Result.png)



---

### 예제

#### 설명

```java
File file = new File("./Moon.png");
File watermarkFile = new File("./Check.png");
File processedFile = new File("./Result.png");
```

각각 파일, 워터마크 파일, 워터마크가 추가된 파일을 의미하는 경로이다.

```java
Image image = readImage(file); // 원본 이미지
Image watermarkImage = readImage(watermarkFile); // 워터마크 이미지
Image resizedWaterMarkImage = resizeImage(watermarkImage); // 워터마크 이미지 축소
```

ImageIO 객체의 read 메서드를 통해 각각의 파일을 이미지로 디코딩해 변수에 바인딩한다.

resize는 Image객체의 `getScaledInstance(width,height,hints)` 메서드를 이용한다.

##### hints
* Image.SCALE_DEFAULT : 기본 알고리즘
* Image.SCALE_SMOOTH : 부드러운 이미지
* Image.SCALE_FAST : 빠른 렌더링
* etc...

##### 워터마크 추가(핵심)
```java
BufferedImage processImage = new BufferedImage(image.getWidth(null),image.getHeight(null),BufferedImage.TYPE_INT_RGB);
```

`BufferedImage(width,height,hints)` 객체는 빈 캔버스를 반환한다.

`image.getWidth(null)` 메서드와 `image.getHeight(null)`메서드를 통해 원본의 크기를 유지하며, 해당 매개 인자에 전달된 null은 옵저버를 의미한다. 옵저버는 이미지를 추적하는 기능을 제공하는데, 이 경우 렌더링 도중이 아닌 완성된 이미지의 크기를 가져와야하므로 옵저버를 사용할 필요가 없다. 따라서 null을 전달해준다.

이해가 잘 가지 않는다면 다음 예시가 있다.

1. 1GB 이미지를 로드한다. 해당 이미지는 10000px * 10000px의 크기를 보유한다.
2. 크기가 크기 때문에 파일을 읽는데 시간이 오래 걸린다.
3. 5000px * 5000px까지 읽은 상태에서 이미지의 크기를 구했을 때 기댓값은 10000px * 10000px이지만 실제로는 5000px * 5000px가 출력된다.

그리고 세 번째 인자로 hints를 전달하고 있다.

hints
* BufferedImage.TYPE_INT_RGB : 투명한 영역을 Black으로 처리
* BufferedImage.TYPE_INT_ARGB : 투명한 영역을 보존
* BufferedImage.TYPE_BYTE_GRAY : 투명한 영을 Black으로 처리하고, 흑백 이미지를 생성한다
* etc...

###### BufferedImage.TYPE_INT_RGB

![BufferedImage.TYPE_INT_RGB](JAVA/바이너리%20데이터%20다루기/이미지%20다루기/image/Result%201.png)

###### BufferedImage.TYPE_INT_ARGB

![BufferedImage.TYPE_INT_ARGB](JAVA/바이너리%20데이터%20다루기/이미지%20다루기/image/Result%202.png)

###### BufferedImage.TYPE_BYTE_GRAY
![BufferedImage.TYPE_BYTE_GRAY](JAVA/바이너리%20데이터%20다루기/이미지%20다루기/image/Result%203.png)

---

```java
Graphics graphics = processImage.getGraphics();
graphics.drawImage(image,0,0,null);
graphics.drawImage(watermark,image.getWidth(null) - WHITE_SPACE_WIDTH, WHITE_SPACE, null);
graphics.dispose();
```

`getGraphics()` 메서드를 이용해 `Graphics`객체를 얻는다.

이미지로부터 얻은 Graphics 객체는 해당 이미지에 접근 권한을 갖게 된다.

`drawImage(Image,x,y,observer)`메서드를 통해 이미지를 그릴 수 있다. 위 예제에서 processImage라는 빈 캔버스를 생성했기 때문에 우선 원본 이미지를 그대로 그려준다.

x, y는 이미지를 x좌표와 y좌표만큼 이동해서 그릴 수 있게 해준다. 이 경우 원본 이미지를 그대로 그려야하므로 0을 전달한다.

이후 워터마크 이미지를 덧대어 그려준다. 이때 WHITE_SPACE를 x와 y 값으로 전달하게 된다. 본인은 10px만큼의 여유를 주고 싶어서 해당 Constant를 10으로 설정했다.

이때 워터마크 이미지의 x 값은 설정하고 싶은 White space에 워터마크 이미지의 width 만큼을 추가해주어야한다. 그렇지 않으면 이미지가 원본 캔버스를 벗어나게 된다.

모든 작업이 종료되었으면 `dispose()` 메서드를 호출해 시스템에 리소스를 반납한다.

링크 : [깃허브 예제](https://github.com/KimYoungHwan8750/draw-watermark-example-java)