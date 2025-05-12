자바의 Canvas는 JPannel을 상속한 후 paintComponent 메서드를 오버라이딩해서 구현한다.

```java
class MyCanvas extends JPanel {
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        // 여기서 그림을 그린다!
    }
}
```

| 메서드                                                       | 설명                   |
| ------------------------------------------------------------ | ---------------------- |
| `setColor(Color c)`                                          | 그리기 색상 설정       |
| `drawLine(int x1, int y1, int x2, int y2)`                   | 선 그리기              |
| `drawRect(int x, int y, int width, int height)`              | 사각형 테두리 그리기   |
| `fillRect(int x, int y, int width, int height)`              | 사각형 내부 채우기     |
| `drawOval(int x, int y, int width, int height)`              | 원(타원) 테두리 그리기 |
| `fillOval(int x, int y, int width, int height)`              | 원(타원) 내부 채우기   |
| `drawString(String str, int x, int y)`                       | 문자열 출력            |
| `drawImage(Image img, int x, int y, ImageObserver observer)` | 이미지 출력            |


# 🚀 추가 기능: Graphics2D (더 고급)

- `Graphics` 객체를 `Graphics2D`로 캐스팅하면  
    **회전, 스케일링, 변형(transform), 안티앨리어싱** 같은 고급 기능 사용 가능
    

```java
Graphics2D g2 = (Graphics2D) g;
g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
g2.fillOval(50, 50, 100, 100);
```
