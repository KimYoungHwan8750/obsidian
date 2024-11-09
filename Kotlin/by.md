# by

delegate pattern을 언어 차원에서 지원해준다.

```kotlin
fun main(){
    val car: Car = Hyndai()
    val sayModel: SayModel = SayModel(car)
    println(sayModel.model())
}

interface Car {
    fun drive(){
        println("dd")
    }

    fun model(): String
}

class Hyndai: Car{
    override fun model(): String{
        return "Avante"
    }
}

class SayModel(car: Car): Car by car{}
```

Hyndai 클래스는 Car 인터페이스를 구현한다.
이때 SayModal은 Car 인터페이스 구현체를 생성자로 전달받는데, 클래스 내부엔 어떠한 내용도 작성되어 있지 않다.

그러나 `sayModel.model()`을 출력해보면 `Avante`가 출력된다.
이는 `SayModel(car: Car): Car by car` 구문으로 인해 car에 구현된 Car 인터페이스 함수들을 사용할 수 있게 된다.