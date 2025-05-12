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

## 🖱️마우스 이벤트 리스너를 활용해서 그림 그리는 예제

```java
public class DragDrawCanvas extends JPanel {

    private final List<Point> points = new ArrayList<>();

    public DragDrawCanvas() {
        setBackground(Color.WHITE);
        setPreferredSize(new Dimension(600, 400));

        // 마우스 눌렀을 때 좌표 저장
        addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                points.add(e.getPoint());
                repaint();
            }
        });

        // 마우스 드래그할 때마다 좌표 계속 저장
        addMouseMotionListener(new MouseMotionAdapter() {
            @Override
            public void mouseDragged(MouseEvent e) {
                points.add(e.getPoint());
                repaint();
            }
        });
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        g.setColor(Color.BLACK);

        // 저장된 포인트들을 순서대로 선으로 연결
        for (int i = 1; i < points.size(); i++) {
            Point p1 = points.get(i - 1);
            Point p2 = points.get(i);
            g.drawLine(p1.x, p1.y, p2.x, p2.y);
        }
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("드래그해서 선 그리기");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        DragDrawCanvas canvas = new DragDrawCanvas();
        frame.add(canvas);

        frame.pack();
        frame.setLocationRelativeTo(null); // 화면 가운데 정렬
        frame.setVisible(true);
    }
}
```

# 🚀 추가 기능: Graphics2D (더 고급)

- `Graphics` 객체를 `Graphics2D`로 캐스팅하면  
    **회전, 스케일링, 변형(transform), 안티앨리어싱** 같은 고급 기능 사용 가능
    

```java
Graphics2D g2 = (Graphics2D) g;
g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
g2.fillOval(50, 50, 100, 100);
```
