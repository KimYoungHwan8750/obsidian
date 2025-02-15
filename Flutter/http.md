## http 다루기
`flutter pub add http`로 추가
`import 'package:http/http.dart' as http;`로 임포트

**Android 권한**
```xml
<!--Manifest.xml-->
<uses-permission android:name="android.permission.INTERNET" />
```

**MacOS 권한**
```xml
<!--Release.entitlements-->
<!-- Or -->
<!--Debug.entitlements-->
<key>com.apple.security.network.client</key>
<true/>
```****
