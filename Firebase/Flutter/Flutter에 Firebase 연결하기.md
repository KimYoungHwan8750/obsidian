## Project Setting

![Command](https://i.imgur.com/wReNoM6.png)

플러터에 파이어베이스를 연결하기 위해 프로젝트를 생성한다. Ctrl + Shift + P를 눌러 Command Panel을 연다. (VSCode 기준)

![Project Start Option Pick](https://i.imgur.com/Y84fmpq.png)

기본적인 카운터 프로젝트를 생성하기 위해 Application 선택. 그 후 프로젝트를 생성할 폴더를 선택하고 프로젝트 이름을 설정.

![Project Screenshot](https://i.imgur.com/hHefLvm.png)

이렇게 플러터 프로젝트가 간단하게 만들어졌다.

여기에 Firebase를 연결한 뒤 Firestore를 이용해보자.

### Firebase-CLI 설치

`npm install -g firebase-tools`

Firebase 설정을 도와주는 CLI를 설치한다. npm 전역 스코프에 설치하는 거라, 새로운 프로젝트를 만들더라도 CLI를 한 번 설치한 적이 있다면 재설치할 필요 없다.

`firebase login`

이후 Firebase에 연결하기 위해 로그인을 진행한다. 위 명령어를 사용하면 브라우저가 실행되고 로그인 창이 열린다.

`dart pub global activate flutterfire_cli`

flutter에서 firebase를 사용하기 위해 위 명령어를 입력한다. 이때 환경 변수가 정상적으로 설정되지 않으면 다음과 같은 메세지가 출력될 수 있다.

```
Package flutterfire_cli is currently active at version 1.0.1.
Downloading packages... . (1.0s)
The package flutterfire_cli is already activated at newest available version.
To recompile executables, first run `dart pub global deactivate flutterfire_cli`.
Installed executable flutterfire.
Warning: Pub installs executables into C:\추가해야할경로를설명해준다, which is not on your path.
You can fix that by adding that directory to your system's "Path" environment variable.
A web search for "configure windows path" will show you how.
Activated flutterfire_cli 1.0.1.
```

flutterfire_cli가 활성화되었지만 너의 환경 변수가 등록되어 있지 않으니 등록하라며 친절하게 등록해야할 경로도 알려준다.

`Warning: Pub installs executables into C:\추가해야할경로를설명해준다, which is not on your path.` 이 부분이다. 사람마다 다른 경로가 표시될 테니 표시되고 있는 경로를 `CTRL` + `C`로 복사해두자.

![Window Search Screenshot](https://i.imgur.com/jlqoS7n.png)

시스템 환경 변수 편집을 실행한다.

![System variable modify](https://i.imgur.com/exeU5LN.png)

고급 탭 - 환경 변수(N)... 클릭

![System variable setting](https://i.imgur.com/fyGvQEM.png)

시스템 변수 항목에서 Path란 이름을 가진 변수를 선택하여 편집 버튼을 누르거나 더블클릭한다. 스크린샷과 같이 다양한 변수가 이미 있을 텐데, 새로 만들기를 누른 뒤 위 경고메세지에서 나왔던 내용을 붙여넣기 한다. 나의 경우 `C:\Users\내계정이름\AppData\Local\Pub\Cache\bin`이었다.

이후 다시 `dart pub global activate flutterfire_cli`를 실행하면 다음과 같이 정상적으로 flutterfire_cli가 실행된다는 메세지가 나타난다.

```
Package flutterfire_cli is currently active at version 1.0.1.
Downloading packages... .
The package flutterfire_cli is already activated at newest available version.
To recompile executables, first run `dart pub global deactivate flutterfire_cli`.
Installed executable flutterfire.
Activated flutterfire_cli 1.0.1.
```

이제 프로젝트에 연결하기 위해 `flutterfire configure` 명령어를 실행한다.

```
i Found 3 Firebase projects.
? Select a Firebase project to configure your Flutter application with ›
❯ flutter-fire-store-59b85 (flutter-fire-store)
  intp-dev-web-push (INTP dev Web Push)
  reactnativeexample-f774e (ReactNativeExample)
  <create a new project>
```

나는 이미 만들어놓은 프로젝트 3개가 있으므로 위와 같이 3개의 프로젝트가 발견되었고 이 중 어떤 프로젝트에 연결할 것인지 고르는 화면이 표시된다. 아직 프로젝트가 없는 경우 [Firebase](https://console.firebase.google.com/)에서 프로젝트를 생성하고, Firestore를 사용해야하니 Firestore도 빌드해놓아야한다. 이러한 사용법은 공식 Docs나 인터넷 블로그에 이미 많이 작성된 내용이니 여기서는 생략한다.

프로젝트를 선택하면 ios, android 등 플랫폼을 선택하라는 메세지가 나타난다. 설정을 마치면 설정이 완료되었다는 메세지가 표시된다.

이제 앱에서 Firebase를 초기화하기 위해 `flutter pub add firebase_core` 명령어를 실행한다. 설정이 완료되고 `flutterfire configure`를 실행한다. 나의 경우 `You have an existing `firebase.json` file and possibly already configured your project for Firebase. Would you prefer to reuse the values in your existing `firebase.json` file to configure your project?`라는 메세지가 출력되는데, 이미 있는 파일보단 현재 flutterfire가 새로 설정하려는 내용이 적합할 것 같아서 no를 선택해 새로운 파일을 생성했다.

이제 기초설정이 모두 끝났다. 처음하면 이거했다 저거했다 복잡하게 느껴질 수 있는데, 데이터베이스에 접근하고 그 외 Firebase가 제공해주는 다양한 기능들을 `딸깍` 한 번에 누릴 수 있다는 것을 생각하면 감수할만하다. 나도 파이어베이스 설정에 이리치이고 저리 치이다가 한 번 성공해서 기록을 위해 이 포스트를 작성하며 두 번째 세팅을 하는 것인데, 약 5분안에 설정을 끝낼 수 있었다.

이제 `main.dart`에서 다음과 같이 코드를 작성한다.

```dart
// 두 패키지 임포트
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
```

```dart
void main() async{
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}
```

위 코드를 작성했다면 `flutter run`을 실행해 앱을 다시 빌드해준다.

이제 Firebase를 사용할 준비가 모두 끝났다. Firestore 플러그인을 추가해서 Firestore에서 데이터를 CRUD하는 작업을 해보자.

`flutter pub add cloud_firestore`

`flutterfire configure`

`flutter run`

위 명령어를 순서대로 실행해 Firestore 설정을 진행하고 이제 버튼을 누르면 데이터를 추가, 읽어오는 작업을 코드로 작성한다.

```dart
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async{
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
          child: TextButton(onPressed: addData, child: const Text('Add Data')
          ),
        ),
    );
  }
}
```

위는 화면에 Add Data라는 버튼 하나만 달랑 있고, 해당 버튼을 누르면 `"name": "Flutter Dev"`, `"age": 25`라는 데이터를 데이터베이스에 추가한다. 버튼을 누른 후 Firestore에 접속한다.

![firestore](https://i.imgur.com/0YgLCDi.png)

값이 잘 저장되었다. 반대로 값을 읽어와보자. addData 밑에 getData라는 함수를 만들고 내용을 작성한다.

```dart
void getData() async {
final docRef = db.collection("users");
docRef.get().then((querySnapshot) {
  querySnapshot.docs.forEach((doc) {
	print(doc.data());
  });
});
}
```

그리고 버튼 두 개를 만든다.

```dart
body: Column(
	children: [
	  ElevatedButton(
		onPressed: addData,
		child: const Text('Add Data'),
	  ),
	  ElevatedButton(
		onPressed: getData,
		child: const Text('Get Data'),
	  ),
	],
),
```

![Flutter App Screenshot](https://i.imgur.com/TH6et7t.png)

버튼 두 개가 생성된 모습. 이제 Get Data를 클릭한 후 콘솔을 확인해보자.

![console screenshot](https://i.imgur.com/9nI9pka.png)

내가 등록한 두 개의 데이터가 잘 표시된다. 이렇게 Firestore에 데이터를 읽고 쓰는 작업을 해봤는데, 처음이 어렵지 사용 방법 자체는 매우 단순하고 편했다. 설정하는 것을 성공했다면 본인이 알기 쉬운 방법으로 정리해두면, 아마 개발 커리어를 쌓으면서 두고두고 써먹을 편한 툴인 것 같다.

CRUD 외에 쿼리나 다른 기능들에 대해 알고 싶다면 [Firebase 공식문서](https://firebase.google.com/docs/firestore) 참조.