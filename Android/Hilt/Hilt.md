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

## 간단한 예제

Hilt를 공부하며 이틀 정도는 사용 방식이 생소하고 이해가 잘 안 갔다.

그러나 약간의 이해를 겸비하고 나니, 웹개발로 개발자로 입문한 나에게 익숙한 무언가가 느껴졌다.

Spring의 @Component, @Bean 등 다양한 어노테이션으로 이루어지는 의존성 주입.

그러고보니 Spring이 DI Framework라는 것을 새삼인지하며 다시 Hilt를 공부하니 제법 눈에 보이는 게 있었다. 간단한 예제 코드를 통해 익힌다면 조금 더 쉽게 이해할 수 있으리라 보고 우선 예제 코드를 보자.

```kotlin
// App.kt
@HiltAndroidApp
class ExampleApplication : Application() {
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

내부적으로 count라는 변수를 선언하고 increment, decrement를 했을 때 변경된 값을 모두가 공유해야하는데 인스턴스를 생성할 때마다 count 변수가 초기화되면 의미가 없게 된다.

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


