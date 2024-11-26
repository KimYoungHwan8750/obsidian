# Jetpack Compose

Google에서 Android Native UI 개발에 Compose 사용을 권장하기 시작했다.
이로 인해 기존 명령형 UI에서 선언형 UI로 패러다임이 바뀌었고, `@Preview` 어노테이션을 지원하여 컴포넌트 단위로 UI를 확인할 수 있게 되면서 개발이 편리해졌다.

[공식 문서](https://developer.android.com/develop/ui/compose/documentation?hl=ko)

## 프로젝트 설정

우선 안드로이드 스튜디오 환경에서 `build.gradle.kts`가 동일한 Gradle Scripts 상에 있는 것처럼 표시되지만 실제 프로젝트 경로를 탐색기로 열어보면 각각 다른 폴더에 있다.

kts 기준으로 `build.gradle.kts(Module :app)`, `build.gradle.kts(Project: 프로젝트이름)`으로 나뉘는데, Root 폴더에 있는 gradle 파일이 `build.gradle.kts(Project: 프로젝트이름)`이고, 하위에 있는 app 디렉토리에 있는 gradle 파일이 `build.gradle.kts(Module :app)`이다.

지금부터 Jetpack Compose를 이용한 프로젝트 설정 방법을 설명한다.

API 버전은 26, Kotlin이며 빌드 시스템도 Kotlin DSL을 활용한다.

위에서 설명한 app 디렉토리에 있는 `build.gradle.kts`에 아래와 같은 내용을 기재한다.

```kotlin
android {
	/* {... 다른 설정들} */
	
    buildFeatures {
        compose = true
    }
	
	/* {... 다른 설정들} */
}
dependencies {
	// BOM은 Compose 라이브러리들의 버전을 일괄적으로 관리
	val composeBom = platform("androidx.compose:compose-bom:2024.10.01")  
	implementation(composeBom)  
	androidTestImplementation(composeBom) 
	
	// Material Design 3 컴포넌트들을 제공
	implementation("androidx.compose.material3:material3")




	/* {... 다른 설정들} */
}

```

이외에도 공식 문서에서 권장하는 함께 사용하면 좋은 라이브러리가 있다.

```kotlin
dependencies {
	// 머터리얼 아이콘(핵심)
	implementation("androidx.compose.material:material-icons-core")
	
	// 머터리얼 아이콘(풀세트)
	implementation("androidx.compose.material:material-icons-extended")
	
	// Compose UI 테스트를 위한 JUnit4 테스트 도구들을 제공
	androidTestImplementation("androidx.compose.ui:ui-test-junit4")

	// 디버그 빌드에서 UI 테스트를 실행하기 위한 설정을 제공
	// 테스트 환경에서 필요한 매니페스트 설정을 자동으로 처리
	// 디버그 모드에서만 포함되며, 릴리스 빌드에는 포함되지 않음
	debugImplementation("androidx.compose.ui:ui-test-manifest")

	// 화면 크기에 따른 적응형 레이아웃을 구현하는데 도움을 주는 유틸리티
	implementation("androidx.compose.material3.adaptive:adaptive")

	// Android Activity와 Compose의 통합을 위한 라이브러리
	// ComponentActivity를 확장한 ComponentActivity를 제공하여 Compose UI를 쉽게 설정할 수 있게 함
	implementation("androidx.activity:activity-compose:1.9.2")

	// viewModel() 컴포저블 함수를 제공하여 Compose에서 ViewModel을 쉽게 사용할 수 있게 함
	implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.5")

	// LiveData를 Compose에서 관찰 가능한 상태로 변환하는 기능 제공
	implementation("androidx.compose.runtime:runtime-livedata")

	// RxJava의 Observable들을 Compose의 상태로 변환하는 기능 제공
	implementation("androidx.compose.runtime:runtime-rxjava2")
	
	
}
```

- `implementation`: 실제 앱에서 사용되는 라이브러리
- `androidTestImplementation`: 안드로이드 테스트에서만 사용되는 라이브러리
- `debugImplementation`: 디버그 빌드에서만 사용되는 라이브러리

설명한 라이브러리중 특히 유용한 것은 Material Icon, Adaptive는 필수로 설치할 것을 추천한다.

마지막으로 App에 해당 내용을 추가한다.

```kotlin
dependencies {
	// 라이브러리들
}

// 어노테이션으로 생성된 코드에 대해 참조를 허용
kapt {  
    correctErrorTypes = true  
}
```

나의 경우 프로젝트를 생성할 때 부터 설정이 되어있었지만, App 범위의 `build.gradle`에 아래 내용이 없다면 추가한다.

```kotlin
android {
	/* ... */
	compileOptions {
		sourceCompatibility = JavaVersion.VERSION_1_8
		targetCompatibility = JavaVersion.VERSION_1_8
	}
}
```

```terminal
Dependency 'androidx.core:core:1.15.0' requires libraries and applications that depend on it to compile against version 35 or later of the Android APIs. :app is currently compiled against android-34. Also, the maximum recommended compile SDK version for Android Gradle plugin 8.3.0 is 34.
```

나 같은 경우 라이브러리가 34 이하와 호환이되지 않아 위와 같은 에러 메세지가 떴는데, 이럴 땐 다음과 같이 androidx.core.ktx의 버전을 다소 낮춤으로써 호환성을 해결했다.

```kotlin
implementation(libs.androidx.core.ktx){  
    version{  
        strictly("1.12.0")  
    }  
}
```

또한 hilt를 필수적으로 같이 사용하면 좋으므로 해당 [프로젝트 설정](Android/Hilt/Hilt.md#프로젝트%20설정)도 참고하자.