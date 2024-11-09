# Class

기본 문법

```kotlin
fun main(){
    val c1 = Child("테스트")
}

open class Parent(f1: String){
}

class Child(f1: String): Parent(f1){
    init{
        println("f1 = $f1")
    }
}
```

상속은 `:(콜론)`을 사용해 표현한다.
또한, 코틀린에서 class는 기본적으로 final로 생성되기에, 상속을 허용하고 싶으면 명시적으로 open을 class 앞에 적어줘야한다.

또한 코틀린에는 클래스를 정의하는 문법이 다양하게 존재한다.
그 예시로, 주 생성자 초기화, 생성자 초기화가 있다.

```kotlin
// 주 생성자 초기화
class A(val f1: String){
	init{
		println("객체가 생성되었습니다.")
	}
}
// 생성자 초기화
class A(){
	val f1: String
	constructor(f1: String){
		this.f1 = f1
		println("객체가 생성되었습니다.")
	}
}
```

두 방식의 동작은 같다.

이때 주 생성자에서 `A(val f1: String)`는 자동으로 객체의 프로퍼티가 되지만 `A(f1: String)`는 객체의 프로퍼티가 되지 않고, init 블록이나 constructor 내부에서만 접근 가능하다.

## 클래스 형변환

```kotlin
fun main(){
	val p1: Parent = Child1()
    val p2: Parent = Child1()
    p2 as Child1
    p1.childMethod() // Error!
    p2.childMethod() // OK!
}
open class Parent{}
class Child1: Parent() {
    fun childMethod(){
        println("자식에게만 있음")
    }
}
```

as 키워드를 사용해 형변환 가능하다.
p1과 p2 모두 Parent 타입으로 생성된 Child1의 인스턴스이기 때문에 childMethod를 호출할 수 없다. 그러나 p2를 `as Child1`을 통해 형변환을 시켜주면 childMethod()를 호출할 수 있다.