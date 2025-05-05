```dart
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:kakao_flutter_sdk/kakao_flutter_sdk.dart' as kakao;
import 'firebase_options.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:http/http.dart' as http;
void main() async{
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  kakao.KakaoSdk.init(
    nativeAppKey: '2ecf509509e0b6bfc0eb89b8ad5d2015',
);
  FirebaseAuth.instance
  .authStateChanges()
  .listen((User? user) {
    if (user == null) {
      print('유저 비로그인 상태!');
    } else {
      print('유저 로그인 상태!');
    }
  });
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final db = FirebaseFirestore.instance;
  void addData() async {
    await db.collection('users').add({
      'name': 'Flutter Dev',
      'age': 25,
    });
  }

  void login() async{
    try {
      kakao.OAuthToken token = await kakao.UserApi.instance.loginWithKakaoTalk();
      kakao.User user = await kakao.UserApi.instance.me();
      OAuthProvider oAuthProvider = OAuthProvider('oidc.remember');
      OAuthCredential oAuthCredential = oAuthProvider.credential(
        idToken: token.idToken,
        accessToken: token.accessToken,
      );
      UserCredential userCredential = await FirebaseAuth.instance.signInWithCredential(oAuthCredential);
        '\n회원번호: ${user.id}'
        '\n닉네임: ${user.kakaoAccount?.profile?.nickname}'
        '\n이메일: ${user.kakaoAccount?.email}'
        '\n아이디: ${token.idToken}'
        '\n토큰: ${token.accessToken}');
    } catch (error) {
      print('카카오톡으로 로그인 실패 $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
          child: TextButton(onPressed: login, child: const Text('Add Data')
          ),
        ),
    );
  }
}
```