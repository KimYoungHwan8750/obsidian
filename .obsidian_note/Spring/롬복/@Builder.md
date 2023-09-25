#### Builder
빌더 패턴을 자동으로 만들어준다.
빌더 패턴이란 필드의 일부에만 값을 대입하고 싶을 때 사용한다.

####  예제
```java
@Builder
public class Test{
String data1;
String data2;
String data3;
String data4;
}
// 위 객체가 존재할 때
Test test = Test().builder().data1("data1").build();


// 어노테이션을 사용하지 않고 직접 코드를 작성하게 되면 아래와 같이 내용이 다소 바뀔 수 있다.
Test().Builder().withData1
```


빌더 어노테이션을 사용하지 않으면 다음과 같은 코드를 직접 작성해야한다.
#### Builder 코드

```java
public class Test {
    private String data1;
    private String data2;
    private String data3;
    private String data4;

    private Test(Builder builder) {
        this.data1 = builder.data1;
        this.data2 = builder.data2;
        this.data3 = builder.data3;
        this.data4 = builder.data4;
    }

    public static class Builder {
        private String data1;
        private String data2;
        private String data3;
        private String data4;

        public Builder() {}

        public Builder withData1(String data1) {
            this.data1 = data1;
            return this; 
        }

       public Builder withData2(String data2) {
            this.data2 = data2; 
            return this; 
       }

       public Builder withData3(String  date3) { 
           this.date3= date3; 
           return this; 
       }

       public Builder withData4(String  date4) { 
           this.date4= date4;  
           return this;  
      }
      
      // Build method to deal with outer class to return instance of outer class
      public Test build() {  
          return new Test(this);   
     }
   }
}
```

## 같이 사용하면 유용한 어노테이션
[[@Singular]]