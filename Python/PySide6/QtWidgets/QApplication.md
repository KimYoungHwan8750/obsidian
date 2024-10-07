## QApplication

PySide로 만든 프로그램은 반드시 QApplication이 하나 존재해야한다.

```python
# 최소 단위의 프로그램
import sys
from PySide6.QtWidgets import QApplication
app = QApplication(sys.argv)
app.exec()
```

이때 인자에는 sys.argv를 넘겨주는게 관행적이다.
실질적으론 인터프리터로 실행할 때 매개변수를 입력해서 매개변수에 맞게 개발자 모드로 실행시킨다던가 하는 동작이 가능하지만 소규모 개인프로젝트를 쓸 때는 크게 신경쓸 필요가 없어보인다.