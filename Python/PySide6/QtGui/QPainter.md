## QPainter

그리기 객체이다.
StatusBar를 Gradient로 표현하고 싶을 때 PySide6에서는 background: linear-gradient()를 지원하지 않아 QPainter를 이용해 그려야한다.

```python
from PySide6.QtWidgets import QApplication, QMainWindow, QStatusBar  
from PySide6.QtGui import QPainter, QLinearGradient, QColor  
from PySide6.QtCore import Qt  
  
  
class GradientStatusBar(QStatusBar):  
    def __init__(self):  
        super().__init__()  
  
    def paintEvent(self, event):  
        painter = QPainter(self)  
        gradient = QLinearGradient(0, 0, self.width(), 0)  # 가로 방향 그래디언트  
  
        # 그라데이션 색상 설정  
        gradient.setColorAt(0.0, QColor("red"))  
        gradient.setColorAt(0.3, QColor("red"))  # 30% 지점까지 빨간색  
        gradient.setColorAt(0.7, QColor("blue"))  # 30%-70% 구간에서 파란색으로 변환  
        gradient.setColorAt(1.0, QColor("blue"))  
  
        # 그라데이션 적용  
        painter.fillRect(self.rect(), gradient)  
        super().paintEvent(event)  # 기본적인 그리기 유지 (텍스트 등)  
  
  
class MainWindow(QMainWindow):  
    def __init__(self):  
        super().__init__()  
        self.setWindowTitle("Gradient StatusBar Example")  
  
        # 커스텀 그래디언트 StatusBar 설정  
        status_bar = GradientStatusBar()  
        self.setStatusBar(status_bar)  
  
        self.statusBar().showMessage("Hello with Gradient StatusBar!")  
  
  
if __name__ == "__main__":  
    app = QApplication([])  
  
    window = MainWindow()  
    window.resize(400, 300)  
    window.show()  
  
    app.exec()
```