
```sh
pip3 install pyside6
```

QtDesigner는 pyside6 라이브러리 안에 설치된다.
나는 코드로만 UI를 짤 것이므로 생략.

```python
from PySide6.QtWidgets import (
	QPushButton,
	QApplication,
)

app = QApplication(sys.argv)
button = QPushButton()
button.show()
app.exec()
```

버튼 하나를 표시하는 기본적인 PySide 프로그램이다.
