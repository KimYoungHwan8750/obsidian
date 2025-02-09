## 환경 변수를 사용하게 해주는 라이브러리
`flutter pub add flutter_dotenv`

.env파일을 생성한 뒤 `pubspec.yaml` 파일에서
```yaml
flutter:
  assets: .env
```

```.env
KAKAO_NATIVE_APP_KEY="abc"
KAKAO_JAVA_SCRIPT_APP_KEY="def"
```

```dart
dotenv.get("KAKAO_NATIVE_APP_KEY");
dotenv.get("KAKAO_JAVASCRIPT_APP_KEY");
```