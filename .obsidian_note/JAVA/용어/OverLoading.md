#### 오버로딩

같은 메서드를 변수의 타입이나 갯수를 달리해서 여러개 정의하는 것

```java

public void Test(){
sout("아무것도 입력 안 했습니다!");
}

public void Test(int a){
sout("숫자가 입력되었습니다.");
}

public void Test(String a){
sout("글자가 입력되었습니다.");
}

```