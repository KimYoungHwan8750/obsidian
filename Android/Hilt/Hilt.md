# Hilt

DI를 위한 라이브러리이다.

Hilt는 현재 다음 Android 클래스를 지원한다.

- `Application`(`@HiltAndroidApp`)
- `ViewModel`(`@HiltViewModel`)
- `Activity`
- `Fragment`
- `View`
- `Service`
- `BroadcastReceiver`

## 프로젝트 설정

프로젝트(Root)의 `build.gradle`

```kotlin
plugins {
	// 다른 설정들이 있을 수 있음. 아래 내용 추가
	id("com.google.dagger.hilt.android") version "2.51.1" apply false
}
```

App의 `build.gradle`

```kotlin
plugins {
	// 다른 설정들이 있을 수 있음. 아래 내용 추가
    id("kotlin-kapt")  
    id("com.google.dagger.hilt.android")  
}
```

만약 Root와 App의 build.gradle 차이가 헷갈린다면 [프로젝트 설정](Android/Jetpack%20Compose/Jetpack%20Compose.md#프로젝트%20설정) 참조.

## 간단한 예제

Hilt를 공부하며 이틀 정도는 사용 방식이 생소하고 이해가 잘 안 갔다.

그러나 약간의 이해를 겸비하고 나니, 웹개발로 개발자로 입문한 나에게 익숙한 무언가가 느껴졌다.

Spring의 @Component, @Bean 등 다양한 어노테이션으로 이루어지는 의존성 주입.

그러고보니 Spring이 DI Framework라는 것을 새삼인지하며 다시 Hilt를 공부하니 제법 눈에 보이는 게 있었다. 간단한 예제 코드를 통해 익힌다면 조금 더 쉽게 이해할 수 있으리라 보고 우선 예제 코드를 보자.

```kotlin
// App.kt
@HiltAndroidApp
class ExampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        // 앱 초기화 코드
    }
}

// User.kt
object User @Inject constructor(){  
    val name: String = "홍길동"  
    val age: Int = 30  
}

// MainActivity.kt
@AndroidEntryPoint  
class MainActivity : ComponentActivity() {  
    @Inject  
    lateinit var user: User  
    override fun onCreate(savedInstanceState: Bundle?) {  
        super.onCreate(savedInstanceState)  
        setContent {  
            Text(text = user.name)  
        }  
    }  
}
```

위 코드를 보면 `MainAcitivy`의 user는 생성자를 호출하지 않았는데도 적절한 객체가 알아서 주입되어 Text() 컴포넌트에서 홍길동을 출력하고 있다.

`User`의 생성자에 사용된 `@Inject` 어노테이션이 이 객체를 만드는 방법을 어플리케이션에 알려준다.
`MainActivity`에 선언된 `lateinit var user: User`에 사용된 `@Inject`는 이 변수의 타입을 통해 어떤 객체가 필요한지 Hilt의 컨테이너에서 확인하고 해당 객체를 바인딩해준다.

해당 객체 타입이 컨테이너에서 유일한 타입이라면 위 코드로 충분하지만, 같은 타입이 여러개라면 별칭을 정해주어야한다. 이후 서술할 `@Qualifier` 어노테이션에서 확인할 수 있다.

참고로 User가 object로 선언된 이유는, kotlin에서 object 키워드는 싱글턴 class를 생성하는데 의존성을 Provide하는 클래스인 User 클래스가 여러개 생성될 필요 없이 하나만 존재하면 되기 때문이다.

내부적으로 count라는 변수를 선언하고 increment, decrement를 했을 때 변경된 값을 모두가 공유해야하는데 인스턴스를 생성할 때마다 count 변수가 초기화되면  의미가 없게 된다.

추가적으로, 해당 객체 타입이 컨테이너에서 유일한 경우에 대한 예제 코드도 설명한다.

```kotlin
@Module
@InstallIn(SingletonComponent::class)
object User @Inject constructor(){
    @Provides
    @Singleton
    fun provideName(): String{
        return "홍길동"
    }
}
```

현재 Hilt 컨테이너엔 User 모듈밖에 존재하지 않고, 해당 모듈은 String을 반환한다.
즉 Hilt 컨테이너 내에 String타입이 유일하게 존재하므로

```kotlin
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    @Inject
    lateinit var name: String
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Text(text = name)
        }
    }
}
```

위와 같이 `name: String`에 자동으로 값을 바인딩해준다.
참고로 원시타입은 의존성 주입이 안 되며 (~~애초에 할 필요가 있는지 의문~~) String이 되는 이유는 당연히 String이 참조타입(객체)이기 때문이다.


>[!info] 요약
>의존성을 Provide 해주는 객체는 싱글턴이어야하므로 object로 선언한다.
>@HiltAndroidApp 어노테이션을 통해 Hilt 컨테이너를 지정해주고, 해당 컨테이너는 Application 클래스를 상속받는다.
>@HiltEntryPoint 어노테이션을 통해 의존성 주입 엔트리포인트를 지정해준다.
>@Inject 어노테이션을 생성자 앞에 선언해줌으로써 이 객체의 생성 방법을 Hilt 컨테이너에 알려준다.



## 어노테이션

### @HiltAndroidApp

Application 수준의 Hilt 컨테이너 지정을 위한 어노테이션이다.

```kotlin
@HiltAndroidApp
class MainApp : Application() { ... }
```

Application을 상속받는 클래스에 지정해주면 된다.

어노테이션으로 정의된 의존성 주입 목록들이 이 클래스에 컴파일 타임에 변환되어 저장된다.

즉 의존성들이 모이는 컨테이너라고 보면 된다.

반드시 선언해주어야 Hilt의 기능을 이용할 수 있다.

Application은 MainActivity의 부모다.

```xml
<application
	android:allowBackup="true"
	android:dataExtractionRules="@xml/data_extraction_rules"
	android:fullBackupContent="@xml/backup_rules"
	android:icon="@mipmap/ic_launcher"
	android:label="@string/app_name"
	android:roundIcon="@mipmap/ic_launcher_round"
	android:supportsRtl="true"
	android:theme="@style/Theme.RoomExample"
	tools:targetApi="31">
	<activity
		android:name=".MainActivity"
		android:exported="true"
		android:label="@string/app_name"
		android:theme="@style/Theme.RoomExample">
		<intent-filter>
			<action android:name="android.intent.action.MAIN" />

			<category android:name="android.intent.category.LAUNCHER" />
		</intent-filter>
	</activity>
</application>
```

manifest 파일을 보면 위와 같은 구조를 가지는 것을 알 수 있다.
application 내에 activity가 있다.
따라서 hilt application을 선언했다면 manifest 파일도 다음과 같이 수정해야한다.

```xml

<application
	android:allowBackup="true"
	android:dataExtractionRules="@xml/data_extraction_rules"
	android:fullBackupContent="@xml/backup_rules"
	android:icon="@mipmap/ic_launcher"
	android:name=".앱이름" 
	android:label="@string/app_name"
	android:roundIcon="@mipmap/ic_launcher_round"
	android:supportsRtl="true"
	android:theme="@style/Theme.RoomExample"
	tools:targetApi="31">
	<activity
		android:name=".MainActivity"
		android:exported="true"
		android:label="@string/app_name"
		android:theme="@style/Theme.RoomExample">
		<intent-filter>
			<action android:name="android.intent.action.MAIN" />

			<category android:name="android.intent.category.LAUNCHER" />
		</intent-filter>
	</activity>
</application>
```

앱 이름은 HiltApplication 주석을 단 클래스의 이름을 적어주면 된다.
파일 경로에 `.`이 들어가는 것은 상대경로를 나타낸다. 앱의 패키지 `com.example.앱패키지`의 경로이다.
만약 `com.example.myapp.data`에 있다면 `.data.ExamApplication`같은 형태가 될 것이다.

### @AndroidEntryPoint

프로젝트 진입점을 명시해주는 어노테이션이다.

```kotlin
@AndroidEntryPoint
class MainActivity : AppCompatActivity() { ... }
```


### @Module

`@Module` 어노테이션은 이 클래스가 의존성을 제공해주는 Provider임을 알린다.
`@InstallIn` 어노테이션과 함께 쓰인다.

### @InstallIn

`@InstallIn` 어노테이션은 클래스의 스코프를 지정해준다.


| Hilt component            | Injector for                       | Created at             | Destroyed at            | Scope                   |
| ------------------------- | ---------------------------------- | ---------------------- | ----------------------- | ----------------------- |
| SingletonComponent        | Application                        | Application#onCreate() | Application#onDestroy() | @Singleton              |
| ActivityRetainedComponent | 해당 없음                          | Activity#onCreate()    | Activity#onDestroy()    | @ActivityRetainedScoped |
| ViewModelComponent        | ViewModel                          | ViewModel created      | ViewModel destroyed     | @ViewModelScoped        |
| ActivityComponent         | Activity                           | Activity#onCreate()    | Activity#onDestroy()    | @ActivityScoped         |
| FragmentComponent         | Fragment                           | Fragment#onAttach()    | Fragment#onDestroy()    | @FragmentScoped         |
| ViewComponent             | View                               | View#super()           | View destroyed          | @ViewScoped             |
| ViewWithFragmentComponent | @WithFragmentBindings 가 붙은 View | View#super()           | View destroyed          | @ViewScoped             |
| ServiceComponent          | Service                            | Service#onCreate()     | Service#onDestroy()     | @ServiceScoped          |


### @Provides

`@Provides`는 모듈 안에서 쓰이며 객체 생성 방법을 정의한다.

```kotlin
@Module
@InstallIn(SingletonComponent::class)
class User @Inject constructor(){
    @Provides
    fun provideName(): String{
        return "홍길동"
    }
}
```

해당 코드는 어플리케이션 스코프에 String 객체 생성 방법을 정의한다.

### @Singleton

class와 function에서 사용할 수 있으며, 인스턴스가 단 하나만 존재함을 보장한다.

```kotlin
@Module
@InstallIn(SingletonComponent::class)
class User @Inject constructor(){
    @Provides
	@Singleton // 단 하나의 인스턴스 보장
    fun provideName(): String{
        return "홍길동"
    }
}
```

### @Qualifier

의존성 컨테이너에 같은 타입 객체가 있을 경우 이를 구분하기 위해 별칭을 지어주는 역할
`@Retention` 어노테이션과 함께 쓰인다.

```kotlin
@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class Hong

@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class Chung

@Module
@InstallIn(SingletonComponent::class)
class User @Inject constructor(){
    @Provides
    @Hong
    fun provideName(): String{
        return "홍길동"
    }

    @Provides
    @Chung
    fun provideOtherName(): String{
        return "청길동"
    }
}
```

```kotlin
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    @Inject
    @Chung
    lateinit var name: String // 청길동
    @Inject
    @Hong
    lateinit var name2: String // 홍길동
}
```

### @Retention

어노테이션의 생명 주기를 관리한다.

AnnotationRetention.SOURCE // 컴파일 후 제거
AnnotationRetention.BINARY // 컴파일 후 코드에 남음
AnnotationRetention.RUNTIME // 컴파일 후 런타임에도 접근 가능(리플렉션을 이용하고 싶을 때)

대부분의 상황에서 BINARY가 쓰인다. 런타임 중에도 접근해야하는 경우 RUNTIME으로 설정하는데, 일반적인 상황에서 사용할 일이 없으므로 BINARY를 사용하다가 필요할 때 학습하면 될 듯하다.

