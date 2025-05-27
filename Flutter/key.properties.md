## key.properties 파일
key.properties는 루트 디렉토리나 android 디렉토리에 `key.properties`를 생성해서 사용할 수 있다. `.gitignore`에 등록하는 걸 잊지 말자.

그리고 다음과 같이 내용을 작성한다.

```properties
storePassword=your_keystore_password
keyPassword=your_key_password
keyAlias=your_key_alias
storeFile=/Users/yourname/release-key.jks
```

## 사용법

app 디렉토리의 build.gradle에 다음과 같이 작성한다

```java
android {
    ...
    signingConfigs {
        release {
            storeFile file("~/release-key.jks")
            storePassword "your_keystore_password"
            keyAlias "your-key-alias"
            keyPassword "your_key_password"
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            shrinkResources false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```