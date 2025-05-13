간혹 플러터로 모바일 앱을 개발할 때 최신 네이티브 기능이나 플러터가 지원하지 않는 기능에 한해서 직접 네이티브 코드를 통해 구현해야한다는 이야기를 들어보았을 것이다. 만약 그런 상황을 맞닥뜨리게 된다면 플로우가 어떻게 되는 걸까? 하는 궁금증으로부터 이 포스트를 작성한다.

먼저 기존에 다트로 작성하던 페이지와, 신 기능이 추가될 NewFeature 화면이 있다고 가정해보자. NewFeature에 사용될 기능은 최신 네이티브 기능으로 아직 flutter에서 지원하지 않는다.

그럼 기존 페이지들은 dart로 작성하고, NewFeature 화면만 kt(또는 java)로 작성할까? 아니다.

브릿지라는 개념을 사용하게 되는데, 브릿지란 말 그대로 다리란 의미이다. dart 코드와 native 코드 사이에 다리를 놓아 통신하여 데이터를 주고 받을 수 있다. 더 간결하게 설명하자면, native 측이 dart 측에 대해 서버가 되어 API를 제공해주는 것이라고 생각하면 쉽다.

![](https://i.imgur.com/MH2vZA5.png)

위 그림과 같이 NewFeature는 클라이언트로써 native에 gyroscope 센서에 대한 값을 요구하고, native는 마찬가지로 gyroscope 센서에 대해 클라이언트로써 요청한다. 그렇게 응답받은 값을 다시 NewFeature에 응답해준다.

구현을 보면 어떤 느낌인지 알 것이다. 코딩을 하다 보면 만나는 다양한 패턴들이 있는데 마치 일렉트론의 IPC나 모바일 진영의 WebView처럼 채널을 구독하고 메세지를 주고 받는 옵저버 패턴을 떠올리게 한다. 즉 IPC, Channel, Bridge 등 개념에 따라 좀 더 구체적인 이름을 갖추었지만 옵저버 패턴을 알고 있으면 이러한 동작들이 크게 낯선 개념은 아니라고 본다. 코드와 함께 해보자.

```dart
import 'package:flutter/services.dart';

class NativeBridge {
  static const platform = MethodChannel('com.example.native/bridge');

  Future<String> getNativeData() async {
    try {
      final String result = await platform.invokeMethod('getNativeData');
      return result;
    } catch (e) {
      return 'Failed to get native data: $e';
    }
  }
}
```

다트 측 코드이다.

`invokeMethod` 메서드에 `getNativeData`를 매개변수로 전달하고 있다.

> 🔥짤막 상식  
> invoke는 들먹거리다, 부르다라는 뜻인데 왜 부르다는 뜻인 call을 사용하지 않고 invoke를 사용했을까? 이는 들먹거리다는 뜻에 비중을 두면 금방 이해 된다.  
> dart는 현재 gyroscope의 값을 가져오고 싶어서 함수를 사용한건데, 실제 gyroscope와 통신하여 데이터를 가지고 오는 건 native 측에서 한다.  
> 즉 dart에서 실행하고 싶은 메서드를 native에서 실행하는 느낌이니 메서드를 들먹거리는(간접적인) 경향이 강하다.  
> 개발자의 디테일하면서도 재미있는 작명 센스가 엿보이는 대목.



```java
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity: FlutterActivity() {
    private val CHANNEL = "com.example.native/bridge"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
            call, result ->
            if (call.method == "getNativeData") {
                result.success("Hello from Android Native!")
            } else {
                result.notImplemented()
            }
        }
    }
}
```

그리고 자바 코드이다.

call의 method 필드를 확인해서 `"getNativeData"`이면 `result.success` 필드에 데이터를 전달한다.