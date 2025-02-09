## 단순히 공간을 차지하게 만드는 위젯
레이아웃을 구성함에 있어 단순한 공간차지만을 위한 위젯이 필요할 때가 있다. 이때 사용하는 위젯이다. 두 요소를 만들고 한 요소에 10만큼 패딩을 주는 것보다 10 사이즈의 빈 위젯을 만드는 것이 더 직관적이기 때문.

```dart
children: [
  Container(
	width: Size.infinite.width,
	height: 100,
	color: Colors.red,
  ),
  const SizedBox(
	height: 10
  ),
  Container(
	width: Size.infinite.width,
	height: 100,
	color: Colors.blue,
  ),
],
```

![](https://i.imgur.com/yuOXPid.png)
