> 새가 오리처럼 행동하고, 꽥- 꽥- 운다면 나는 그것을 오리라고 부르겠다.

![Duck Typing Image](프로그래밍%20이론/동적언어/image/DuckTyping.png)

## Duck Typing

### 개념
정적인 언어 (Java, C, etc...)와 동적인 언어(Python, JavaScript, etc...) 중 동적인 언어의 유연한 타입 체크를 이용해 다형성을 구현하는 기법 중 하나

프로그래밍에서 말하는 다형성이란, 같은 자료형에 여러 데이터를 대입하여 다른 결과를 도출해내는 것을 뜻한다.

---

### 예제

정적인 언어인 자바에서 다형성을 구현하는 예제

#### Java
```java
interface Animal{  
	public String cry();  
}  
  
class Duck implements Animal{  
    @Override  
    public String cry(){  
        return "quack-quack";  
    }  
}  
  
class Chick implements Animal{  
    @Override  
    public String cry(){  
        return "wing-chicken";  
    }  
}  
  
class DuckTyping {  
    public static void howDoesACry(Animal animal){  
        String animalName = animal.getClass().getName();  
        System.out.println(animalName + "은 " + animal.cry());  
    }  
    
    public static void main(String[] args) {  
        Animal duck = new Duck();  
        Animal chick = new Chick();  
        howDoesACry(duck);  
        howDoesACry(chick);  
    }  
}
```

##### 실행 결과

```
Duck은 quack-quack
Chick은 wing-chicken
```

---


#### Python

```python
class Duck :
    def cry(self):
        return "quack-quack"

class Chick :
    def cry(self):
        return "wing-chicken"

def howDoesACry(animal):
    animalName = animal.__class__.__name__
    sound = animal.cry()
    print("{}은 {}".format(animalName,sound))

howDoesACry(Duck())
howDoesACry(Chick())
```

##### 실행 결과

```
Duck은 quack-quack
Chick은 wing-chicken
```

---

#### JavaScript

```js
class Duck{
    cry(){
        return 'quack-quack'
    }
}

class Chick{
    cry(){
        return 'wing-chicken';
    }
}

function howDoesACry(animal){
    console.log(animal.constructor.name + '은 ' + animal.cry())
}

howDoesACry(new Duck())
howDoesACry(new Chick())
```

##### 실행 결과

```
Duck은 quack-quack
Chick은 wing-chicken
```

오리와 병아리들이 제대로 울고 있다.

그렇다면 cry 메서드가 존재하지 않는 객체를 인자에 넣게 되면 무슨 일이 일어날까?

정적 언어인 자바에서는 컴파일 에러가 발생하고, 동적 언어에서는 런타임 에러가 발생한다.

개발을 하다보면 때로는 개발자의 실수를 알아서 잘 캐치해주는 자바가 듬직하기도 하고, 자바 스크립트나 파이썬의 유연함이 편하기도 하다.

Duck-Typing의 예시에서도 찾아볼 수 있듯이, 본인이 선호하는 코딩 스타일이나 실력에 따라 다양한 프로그래밍 언어를 접해보고 장단점을 파악하는 것도 개발자의 중요한 덕목이라고 생각한다.

링크 : [깃허브 예제](https://github.com/KimYoungHwan8750/duck-typing-example)


