C://user//사용자에 .android폴더가 있다.
해당 경로에 debug.keystore가 존재하니 그것을 이용해 생성

keytool -list -v -keystore "./.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android