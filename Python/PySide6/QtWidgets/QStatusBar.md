## QStatusBar

```python
# 임포트 생략

app = QApplication(sys.argv)
mw = QMainWindow()
mw.show()
sb = QStatusBar(mw)
sb.showMessage("Intp Dev v1.1")
mw.setStatusBar(sb)
app.exec()

```