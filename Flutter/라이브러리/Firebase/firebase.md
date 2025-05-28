```dart
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';

class EntryPointController extends GetxController {
  static EntryPointController get to => Get.find<EntryPointController>();
  Rxn<User> firebaseUser = Rxn<User>();

  @override
  void onInit() {
    firebaseUser.bindStream(FirebaseAuth.instance.authStateChanges());
    super.onInit();
  }

  bool get isLoggedIn => firebaseUser.value != null;
}
```

getX를 사용할 때는 bindStream 메서드를 사용해서 User를 바로 바인딩 할 수 있다.

아니라면 StreamBuilder를 사용한다.

