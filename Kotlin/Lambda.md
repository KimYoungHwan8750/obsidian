# Lambda

자바스크립트의 화살표 함수, 자바의 람다식(함수형 인터페이스)와 같다.

```kotlin
fun main(){
    val _lambda = {x:Int ->
        println("람다 실행")
        x+10
    }
    println(_lambda(10))
	// 람다 실행
	// 20
}
```

매개변수의 마지막 인자가 람다식일 경우 호출할 때 괄호밖으로 람다를 빼낼 수 있다.

```kotlin
fun main(){
	test("Hello World") {() -> println("람다 실행")}
	// Hello World
	// 람다 실행
}

// ()->Unit : 매개변수가 없고 반환 값이 없는 함수
// (x: Int)->Int : 매개변수 x가 Int고 반환 값이 Int인 함수
fun test(a: String, b: ()->Unit){
	println(a)
	b()
}
```