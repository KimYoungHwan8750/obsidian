이번장에선 초보자들이 헷갈릴 수 있는 개념인 객체지향 프로그래밍에 대해서 알아본다.


>필요한 데이터를 추상화하여 속성(Attributes)와 행위(methods)를 가진 객체를 만들고, 그 객체들 간의 유기적인 상호 작용을 통해 로직을 구성하는 프로그래밍 방법이다.

## 객체지향이란?

사전적 정의는 위와 같지만 객체 지향 프로그래밍을 입문하면서 해당 개념들이 잘 와닿지 않았다.

코드를 하나 살펴보자.

```java
class Car{
    String color;
    Wheel wheel;
    Window window;
    Engine engine;
    Handle handle;
    public void drive(){
        System.out.println("달리는 중")
	}
}
```

이렇게 자동차라는 하나의 큰 객체를 통해 람보르기니, 아반떼, 제네시스같은 하위 차종을 생산하고 객체지향에 대해 설명하는 예제들이 많았다. 더할나위 없는 좋은 예제이고 객체지향에 대해 공부하던 당시에도 개념적으로는 이해를 했지만 왜 이런식으로 프로그래밍해야하는지 이해가 되지 않았다.

그래서 해당 개념을 그대로 재현하되, 조금더 내 입맛에 맞게 객체지향을 이해할 수 있도록 코드를 살짝 개조해보았다.

### 프로젝트 구조

![프로젝트 구조](프로그래밍%20이론/image/Pasted%20image%2020240306042246.png)

Animal로부터 파생된 Bird와 Cat 클래스가 있고, Parts 디렉토리에는 Eye, Hand, Leg, Mouse, Wing까지 5개의 클래스가 존재한다.

이렇게 만들어진 객체가 Earth라는 클래스에서 활동한다.

### 객체란 무엇일까?

객체란건 하나의 단위 요소다.

나라는 객체는 머리, 가슴, 배, 팔, 다리, 눈처럼 객체가 모여 객체가 형성된 케이스이다. 다리라는 객체는 또 다시 단백질, 지방, 칼슘이라는 객체가 모여서 만들어진 상대적으로 거대한 객체고 단백질은 또 다시 해당 화학분자식을 이루는, 분자에 해당하는 객체들이 모여 이루어진 객체다.

이러한 현실의 관계식을 프로그래밍에도 도입한 것이 일종의 객체지향 프로그래밍이라고 볼 수 있다.

만약, 손을 이용해 물건을 던지는 프로그램을 만든다고 가정해본다.

이때 필요한 것은 손과 물건이라는 객체이다.

손이라는 객체는 현재의 시나리오에선 고정값이지만 당신은 사과를 던질수도 있고, 야구공을 던질수도 있다.

이를 객체를 활용하지 않고 코딩한다면 어떤 코드가 탄생할까?

```java
// 내가 사과를 던지고 싶다면?
String 물건 = "사과";
Hand hand = new Hand();
hand.throwing(물건); // 사과를 던진다

// 내가 야구공을 던지고 싶다면?
String 물건 = "야구공";
Hand hand = new Hand();
hand.throwing(물건); // 야구공을 던진다
```

이는 겉으로는 문제가 없어보일지도 모르나 상호작용하는 대상이 많아질수록 복잡도는 '심각하게' 상승한다. 예를 들면 물건을 던지는 `Hand`라는 객체는 또 다시 `People`이라는 객체에 속해있다. `People`객체의 몸무게와 근골격량이 높아지면 `Hand`가 처리할 수 있는 물건의 용량도 늘어날 것이며, 날아가는 속도도 달라질 수 있다.

이러한 변수와 예외적인 상황을 처리하기 위해선 객체를 설계하고 각 객체가 유기적으로 동작하도록 환경을 조성하는 것은 탁월한 선택이 될 수 있다.

하지만 현대 프로그래밍 스타일의 정석으로 군림하게된 객체 지향 문법 또한 장점만 있는 것은 아니다.

#### 객체 지향 프로그래밍의 장점
* 인간 친화적인 문법 구조
* 유지 보수의 편리함
* 코드 재사용성 증가

#### 객체 지향 프로그래밍의 단점
* 절차 지향 프로그래밍에 비해 속도가 느림
* 모델링에 많은 비용이 소모됨

코드가 자주 재사용되고 유지 보수가 중요하게 작용하는 비지니스 사업 같은 경우 객체 지향이 탁월한 판단이 될 수 있다. 실제로 대부분 IT 서비스를 운영하는 비지니스 회사들은 객체 지향 프로그래밍을 채택했다.

그렇다면, 단순한 수식을 계산하고 원하는 결과값만 내놓으면 되는 대학 Lab실의 연산 프로그램 같은 경우는 어떨까? 이런 프로그램은 당장에 주어진 매개변수를 연산해 결과값을 내놓는 독립적인 프로세스이므로 굳이 객체로 모델링해 다른 객체와 유기적인 동작을 기대할 필요가 없다.

그럼에도 불구하고 객체 지향은 일반적인 개발 목적에 절대 다수의 형태로 채택되고 있다.

이렇게 중요한 객체 지향, 코드를 통해 숙달해보자.

### 객체 설계

```java
public class Animal {  
    float height;  
    float weight;  
    public Animal(){}  
    public Animal(int height, int weight){  
        this.height = height;  
        this.weight = weight;  
    }  
}
```

우선 객체를 설계해야한다.

나는 고양이나 새가 활동하는 것을 객체로 모델링하여 그들의 행동을 정의하고 코드로 실행하려한다.

이때, 동물계는 문으로, 문은 강이나 계통군으로 나눠지면서 계층 구조를 이룬다. 위 `Animal` 클래스는 이러한 계층 구조를 단순화하여 동물 - 고양이과, 동물 - 조강(조류)으로 표현하기 위해 정의한 최상위 클래스이다. 최상위 클래스는 하위 클래스의 모든 공통적인 특징이 나타난다. `Animal`의 하위 요소 중 무게와 높이를 가지지 않은 요소는 단 하나도 존재하지 않는다.

```java
public class Bird extends Animal{  
    String name = "새";  
    Eye eye = new Eye(name);  
    Mouse mouse = new Mouse(name);  
    Leg leg = new Leg(name);  
    Wing wing = new Wing(name);  
  
    public Bird(int height, int weight){  
        super(height,weight);  
    }  
}
```

새는 동물을 상속받고 있다. 따라서  클래스에서 height와 weight를 정의하지 않고도 상위 클래스인 Animal을 통해 높이와 무게 요소를 가지게 된다.

```java
public class Earth {  
    public static void main(String[] args) {  
        Bird bird = new Bird(15,300);  
        System.out.println(bird.getHeight()); // 15.0 출력
        System.out.println(bird.getWeight()); // 300.0 출력
    }  
}
```

동물 객체 설계가 끝났다.

신체 객체 설계를 해보자.

```java
public class Eye {  
    String name;  
    public Eye(String name){  
        this.name = name;  
    }  

    public void see(String something){  
        System.out.printf("%s가 %s을(를) 보는 중\n",name,something);  
    }  
}
```

```java
public class Wing {  
    String name;  
    public Wing(String name){  
        this.name = name;  
    }  

    public void fly(){  
        System.out.printf("%s가 나는 중\n",name);  
    }  
}
```

이하 Leg, Mouse, Hand 객체 코드는 생략한다.

먼저 Eye는 Bird와 Cat 모두 공통으로 지닌 객체다. 그러나 Cat 객체엔 Wing 객체가 포함되어 있지 않아 날 수 없고, 반대로 Bird 객체엔 Hand 객체가 포함되지 않아 물건을 밀치거나 잡지 못한다. 예제 코드를 보자.

```java
public class Earth {  
    public static void main(String[] args) {  
        Bird bird = new Bird(15,300);  
        Cat cat = new Cat(40,4500);  
        bird.getHand(); // Hand 객체가 없음, Compile Error  
        cat.getWing(); // Wing 객체가 없음, Compile Error  
    }  
}
```

이처럼 객체를 모델링하여 유기적으로 관계를 연관시키면 Cat이라는 객체에 `if(canWing)` 같은 분기문을 작성하지 않더라도 고양이는 하늘을 날 수 없게 된다. 왜냐면 고양이는 날개(객체)가 없기 때문이다.

```java
public class Earth {  
    public static void main(String[] args) {  
        Bird bird = new Bird(15,300);  
        Cat cat = new Cat(40,4500);  
        cat.getEye().see("사람");  
        bird.getEye().see("비트코인 차트");  
        bird.getMouse().cry();  
    }  
}

/*
고양이가 사람을(를) 보는 중
새가 비트코인 차트을(를) 보는 중
새가 우는 중
*/
```

이렇게 `Earth`에서 활동하는 `Animal`객체들이 `Part` 객체를 통해 의사표현을 하고 행동하며 프로그램이라는 생태계를 이루며 동작하게 된다.

## 다형성

객체 지향 프로그래밍(OOP)를 다룰 때 항상 같이 언급되는 용어가 있다.

캡슐화, 추상화, 상속, 다형성이다. 캡슐화와 추상화는 객체 지향 프로그래밍에서 꾸준히 언급되는 특징이다. 두 가지는 다른 포스트에서 비중있게 다룰 예정이므로 이번 장에서는 다형성에 대해 설명한다.

### 다형성의 정의

>객체가 상속을 통해 기능을 확장하거나 변경하여 여러 형태로 재구성될 수 있는 특성

요약하자면 객체를 정의함으로써 해당 객체가 가지는 일반적인 특성이 객체안의 메서드나 필드로 존재하게 되며 해당 객체의 아이덴티티를 정의하게 된다. 그러나 간혹 같은 객체를 사용하면서 다른 기능을 하는 경우가 있다.

예를 들면 말미잘이 그러한데, 말미은 입으로 섭취하고 입으로 배설한다.

객체 지향의 다형성을 이용하면 이러한 예외적 특성에 대한 대응이 몹시 쉬워진다. 자바에선 Override와 Overloading을 통해 이러한 문제에 쉽게 대처할 수 있다.

```java
interface Do{
    public eat();
}

class Mouse extends Do{
    @Override
    public eat(){
        // 무언가를 먹는다.
	}
}

class StarfishMouse extends Do{
    @Override
    public eat(){
        // 무언가를 먹는다.
        // 무언가를 싼다.
	}
}
```

Override를 활용하면 먹는 동작만을 수행하는 eat메서드가 99.9%의 비율로 보편적으로 사용될 때, 무언가를 배설하는 단 하나의 eat 메서드로 인해 대규모 수정을 필요로하는 불상사를 미연에 방지할 수 있다.

## 정리

위에서도 언급했듯이 객체 지향은 실생활과 1:1로 모델링 할 수 있어 인간 친화적이며 구조적인 언어이다. 재사용이 쉽고 유지 보수에 용이하다. 하지만 그만큼 뛰어난 설계 능력을 필요로하며 초기 비용이 많이 발생한다.

럭셔리한 기술이 반드시 채택될 근거는 어디에도 없으며 클린 코드가 모든 상황에서 이익을 가져다주진 않는다. 본인이 진행중인 프로젝트의 니즈에 객체 지향적 설계가 정말로 필요한지 잘 선택해야하며, 객체 지향적 프로그래밍을 고수하더라도 부분적으로 절차적 프로그래밍을 도입하지 않을 이유 또한 없다.

본인의 프로젝트를 진행하기에, 또한 현재 닥친 시나리오에 최소 비용으로 최대 효율을 내는 것이 최고의 시나리오라고 생각한다.

링크 : [깃허브](https://github.com/KimYoungHwan8750/oop-example-java)