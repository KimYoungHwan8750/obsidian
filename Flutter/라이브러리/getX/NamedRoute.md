아주 간단한 형태의 Route로는 `Get.to(const Second())`가 있다. 그러나 이는 인스턴스식 화면 이동으로, 웹개발처럼 라우트를 경로(Name)에 바인딩할 수 있다.

```dart
GetMaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/',
      getPages: [
        GetPage(name: '/', page: () => const MyHomePage()),
        GetPage(name: '/second', page: () => const Second(), transition: Transition.leftToRight)), // 애니메이션 적용 가능
      ],
    );
```

예제와 같이 GetMaterialApp의 속성인 getPages에 라우트를 정의할 수 있다.

`Get.toNamed('/second')`를 사용해서 이동 가능하다.

GetPage의 다른 속성들을 통해서 애니메이션을 더 세밀하게 제어 가능하다.

```dart
GetPage(
  name: "/second",
  page: () => SecondScreen(),
  transition: Transition.rightToLeft,
  transitionDuration: const Duration(milliseconds: 400),
  curve: Curves.fastOutSlowIn,
)
```