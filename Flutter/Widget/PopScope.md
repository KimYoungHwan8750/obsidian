get을 사용할 때,
라우트에 요소가(뒤로갈 수 있는) 화면이 존재하면 back 동작, 없으면 한 번 더 누르면 종료됩니다 동작

```dart
class _CreateNicknameScreenState extends State<CreateNicknameScreen> {
  DateTime? currentBackPressTime;

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false, // 자동 팝 방지
      onPopInvoked: (didPop) async {
        if (didPop) return;
        
        await _handleBackPress();
      },
      child: Scaffold(
        appBar: AppBar(
          title: const Text(
            "Choice One",
            style: TextStyle(color: Colors.white),
          ),
          centerTitle: true,
          iconTheme: IconThemeData(color: Colors.white),
          backgroundColor: Color(0xFF191919),
        ),
        body: Center(
          child: TextField(
            decoration: InputDecoration(
              labelText: "닉네임을 입력하세요",
              border: OutlineInputBorder(),
              hintText: "닉네임",
            ),
            maxLength: 20,
            onSubmitted: (value) {
              debugPrint("입력된 닉네임: $value");
            },
          ),
        ),
      ),
    );
  }

  Future<void> _handleBackPress() async {
    // 이전 화면이 있으면 일반 뒤로가기
    if (Navigator.canPop(context)) {
      Navigator.pop(context);
      return;
    }
    
    // 루트 화면일 때만 "앱 종료" 로직
    DateTime now = DateTime.now();
    if (currentBackPressTime == null || 
        now.difference(currentBackPressTime!) > Duration(seconds: 2)) {
      currentBackPressTime = now;
      
	    Get.snackbar(
	      '알림',
	      '한 번 더 누르면 앱이 종료됩니다',
	      snackPosition: SnackPosition.BOTTOM,
	      duration: Duration(seconds: 2),
	      backgroundColor: Colors.black87,
	      colorText: Colors.white,
	    );
    } else {
      // 앱 종료
      Navigator.of(context).pop();
      // 또는 SystemNavigator.pop();
    }
  }
}
```

get을 사용하지 않을 때

```dart
class _CreateNicknameScreenState extends State<CreateNicknameScreen> {
  DateTime? currentBackPressTime;

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false, // 자동 팝 방지
      onPopInvoked: (didPop) async {
        if (didPop) return;
        
        await _handleBackPress();
      },
      child: Scaffold(
        appBar: AppBar(
          title: const Text(
            "Choice One",
            style: TextStyle(color: Colors.white),
          ),
          centerTitle: true,
          iconTheme: IconThemeData(color: Colors.white),
          backgroundColor: Color(0xFF191919),
        ),
        body: Center(
          child: TextField(
            decoration: InputDecoration(
              labelText: "닉네임을 입력하세요",
              border: OutlineInputBorder(),
              hintText: "닉네임",
            ),
            maxLength: 20,
            onSubmitted: (value) {
              debugPrint("입력된 닉네임: $value");
            },
          ),
        ),
      ),
    );
  }

  Future<void> _handleBackPress() async {
    // 이전 화면이 있으면 일반 뒤로가기
    if (Navigator.canPop(context)) {
      Navigator.pop(context);
      return;
    }
    
    // 루트 화면일 때만 "앱 종료" 로직
    DateTime now = DateTime.now();
    if (currentBackPressTime == null || 
        now.difference(currentBackPressTime!) > Duration(seconds: 2)) {
      currentBackPressTime = now;
      
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('한 번 더 누르면 앱이 종료됩니다'),
          duration: Duration(seconds: 2),
          backgroundColor: Colors.black87,
        ),
      );
    } else {
      // 앱 종료 - 두 가지 방법 중 선택
      Navigator.of(context).pop(); // 방법 1
      // SystemNavigator.pop(); // 방법 2 (완전한 앱 종료)
    }
  }
}
```