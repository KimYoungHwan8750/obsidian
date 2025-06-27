Flutter에서 공식으로 권장하는 Provider의 개선 버전.

Code Generating 방식의 라이브러리 이용을 적극 권장하고 있다.

CLI에서 `flutter pub run build_runner build --delete-conflicting-outputs`를 입력해 수동으로 파일을 생성할 수 있고 `fluuter pub run build_runner watch`를 사용하면 자동으로 파일 내용을 추적해 코드 생성을 도와준다.

```dart
import 'package:freezed_annotation/freezed_annotation.dart';

part 'activity.freezed.dart';
part 'activity.g.dart';

@freezed
sealed class Activity with _$Activity {
  factory Activity({
    required String key,
    required String activity,
    required String type,
    required int participants,
    required double price,
  }) = _Activity;

  factory Activity.fromJson(Map<String, dynamic> json) => _$ActivityFromJson(json);
}
```

기본적으로 클래스 이름에 `_$`가 붙은 형태로 mixin이 생성된다. copyWith, toJson, toString, hashCode, \=\= 같은 경우 자동으로 override되며 fromJson은 개발자가 Json 직렬화를 원한다는 것을 명시적으로 표시하기 위해 수동 구현이 요구된다. 특별한 로직이 필요한 것이 아니라면 위와 같이 작성된다. 다음은 특별한 로직이 추가될 때인데, 단순히 json 데이터를 원하는 대로 가공하는 예제이다.

```dart
@freezed
class User with _$User {
  const factory User({required String name}) = _User;
  
  factory User.fromJson(Map<String, dynamic> json) {
    final processedJson = {
      ...json,
      'name': json['name']?.toString().trim() ?? 'Unknown'
    };
    return _$UserFromJson(processedJson);
  }
}
```

## RiverPod 사용법

공식 문서에서는 Code Generate가 적극 권장되고 있으며, 이를 사용하지 않고 작업할시 추후 문제가 발생할 수 있다고 언급했고 이후 마이그레이션 도구를 지원해준다고 말할 정도로 강력하게 코드 생성 도구 사용을 권하고 있기 때문에 이 문서에서는 Code Generate를 사용한 방법만을 논한다.

우선 RiverPod의 DI Container를 등록해줘야 하며 다음과 같이 수행한다.

```dart
void main() {
  runApp(
    ProviderScope(
      child: MyApp(),
    ),
  );
}
```

### 함수형? 클래스형?
Provider 생성 방법에는 함수형, 클래스 형이 있다.

#### 동기 데이터

```dart
/**
	함수형
*/
part 'example.g.dart';

@riverpod
int Counter(Ref ref) {
	return 0;
}
```


```dart
/**
	함수형
*/
part 'example.g.dart';

@riverpod
abstract class Counter extends _$Counter {

	@override
	int build() {
		return 0; // 초기값
	}

	void increment() => state++;
	void decrement() => state--;
}
```

### 비동기 데이터
반환 타입을 Future로 명시하면 반환타입을 자동으로 AsyncValue로 관리해준다.

>[!info] AsyncValue란?
>비동기 데이터에 대한 상태관리를 도와주는 wrapper 클래스이다.
>팩토리 메서드로 value, data, loading가 있다.

```dart
part 'example.g.dart';

@riverpod
abstract class Counter extends _$Counter {
	@override
	Future<int> build() async {
		await Future.delayed(const Duration(seconds: 1));
		return 0;
	}

	Future<void> increment() async {
		state = const AsyncValue.loading();
		final currentValue = state.valueOrNull ?? 0; // null safety check
		await Future.delayed(const Duration(seconds: 1));
		state = AsyncValue.data(currentValue + 1);
	}
}
```

이렇게 작성된 코드는 UI에서 다음과 같이 ConsumerWidget을 상속받거나 Consumer 위젯을 사용해 Provider에 접근 가능하며 AsyncValue의 data, loading, error에 대해 분기되는 렌더링 로직을 다음 코드와 같이 단순화 할 수 있다.

```dart
class SomeScreen extends ConsumerWidget{}
// 또는
class SomeScreen extends StatelessWidget{
	@override
	Widget build(BuildContext context) {
      home: Scaffold(
        body: Consumer(
		  child: const Text("카운터앱"),
          builder: (context, ref, child) {
            final counter = ref.watch(counterProvider);
            return Column(
              children: [
				child!, // 최적화
                counter.when( // counter의 상태에 따른 렌더링
                  data: (value) => Text('Value: $value'),
                  loading: () => const CircularProgressIndicator(),
                  error: (error, stack) => Text('Error: $error'),
                ),
                ElevatedButton(
                  onPressed: () {
                    ref.read(counterProvider.notifier).increment();
                  },
                  child: const Text('Increment'),
                ),
              ]
            );
          }
        )
      ),
}
```

Consumer를 사용하면 nesting이 한 단계 증가하지만 child를 사용해 최적화가 가능하다. 만약 위 코드에서 Column의 child에 `const Text("카운터앱")`이 있다면 ref.watch가 변경사항을 추적할 때마다 전체 위젯이 리렌더링되지만 Consumer의 child에 위젯을 전달하고 build의 매개변수로 전달된 child를 이용해 이 위젯을 재사용 가능하다.

