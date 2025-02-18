## Theme를 지정해 디자인에 일관성 챙기기
디자인의 일관성을 챙기는 것은 나같이 개발만 하는 사람들에겐 다소 생소하고 어려운 과정일 수 있다. 하지만 요즘 개발 트렌드는 야? 너두 할 수 있어이기 때문에 조금만 신경쓰면 디자인에 문외한인 개발자라도 제법 일관적이고 깔끔한 UI를 뽑아낼 수 있다. 특히 플러터에서 유독 이러한 점을 많이 신경썼음을 느낄 수 있는데 함께 보도록 하자.

```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: const HomePage(),
    );
  }
}

```

앱 내에서 사용할 테마를 위와 같은 루트 위젯, 즉 `MaterialApp`에서 정의할 수 있다. 다음과 같다.

```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        textTheme: const TextTheme(
          displayLarge: TextStyle(
            fontSize: 70,
            fontWeight: FontWeight.bold,
          ),
          displaySmall: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w900,
          ),
        ),
      ),
      home: const HomePage(),
    );
  }
}
```

이렇게 정의한 일정한 style들을 어플리케이션 전역에서 사용할 수 있다.

```dart
Text("Example", style: Theme.of(context).textTheme.displayLarge)
```

이렇듯 Text에 대한 style을 `displayLarge`나 `displaySmall`같이 이미 정의된 상수를 사용해 UI를 만들면 일관성으로 인해 더욱 퀄리티 높은 UI/UX를 달성할 수 있다.

`textTheme`는 텍스트와 관련된 테마를 정의하고, 색상과 관련된 테마는 `colorScheme`에서 정의할 수 있다.

```dart
	theme: ThemeData(
        colorScheme: const ColorScheme(
          primary: Colors.blue,
          secondary: Colors.green,
          surface: Colors.white,
          error: Colors.red,
          onPrimary: Colors.white,
          onSecondary: Colors.white,
          onSurface: Colors.black,
          onError: Colors.white,
          brightness: Brightness.light,
        ),
	)
```

이 외에도 Material에서 미리 정의해둔 스킴들을 사용할 수 있다.

```dart
colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo)
```

또한 밝기도 조절할 수 있다.

```dart
colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo, brightness: Brightness.dark)
```

나 같은 경우 Material의 primary 색상인 누리끼리한 보라색을 별로 안 좋아하는 편인데, `indigo`나 `blue` 계열을 적용한 후 `Brightness.dark`를 적용했는데 생각보다 엄청 예뻤다.

![Screenshot](https://i.imgur.com/ijXmEo9.png)

seedColor를 적용한 후엔 `primary`, `secondary` 외 테마 색깔이 전체적으로 변경되는데, 이때 해당 컬러만 커스텀 테마를 적용하고 싶다면 `fromSeed()`의 `primary`, `secondary` 등 원하는 속성에 색상을 지정하면 된다.

```dart
colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo, primary: Colors.red, brightness: Brightness.dark)
```

만약 Theme를 집중적으로 관리하고 싶다면 별도의 class로 분리하는 것이 바람직한데, 다음과 같이 분리가 가능하다.

```dart
class CommonTheme {
  static ThemeData get lightTheme {
    return ThemeData.from(
      colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.red
        ),
      textTheme: const TextTheme(
        displayLarge: TextStyle(
          fontSize: 24.0,
          fontWeight: FontWeight.bold
        ),
      ),
    );
  }
}
```

```dart
@override
Widget build(BuildContext context) {
  return MaterialApp(
    theme: CommonTheme.lightTheme
  )
}
```

참고로 이외에 MaterialApp 프로퍼티엔 `dark`가 있고 이것은 theme의 속성과 1:1 매치되며 다크모드에서의 테마를 정의할 수 있다.