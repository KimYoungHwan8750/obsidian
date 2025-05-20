build 중 setState를 호출하면 `setState() or markNeedsBuild() called during build` 에러가 발생한다. 이는 빌드 중 상태가 변경되어 위젯 트리의 안정성이 깨질 염려가 있어 발생하는 오류로, 타이머처럼 시작과 동시에 상태 변화가 발생하는 경우 종종 맞닥뜨리는 에러이다.

```dart
WidgetsBinding.instance.addPostFrameCallback((_) {
  setState(() {
    // 안전하게 상태 변경
  });
});
```

이때 addPostFrameCallback을 사용하면 위젯이 렌더링 된 이후에 안전하게 상태를 변경하는 코드를 작성할 수 있다.