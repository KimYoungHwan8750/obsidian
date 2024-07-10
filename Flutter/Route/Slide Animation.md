```dart
Route MyRouter{
	return pageRouteBuilder(
		pageBuilder: (context, animation, secondaryAnimation) => MyWidget(), // MyWidget = 내가 작성한 페이지
		transitionBuilder: (context, animation, secondaryAnimation, child){
			const begin = Offset(1.0, 0.0); // X축, Y축. X축 -1(왼쪽에서 나타남), Y축 -1(위에서 나타)
			const end = Offset.zero; // 원점
			const curve = Curves.ease; // ease 외에도 linear, easeIn, easeOut 등등
			var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
			return SlideTransition(
				position: animation.drive(tween),
				child: child,
			);
		},
	)
}
```

```dart
onPressed = (){
	Navigator.push(MyRouter());
}
```