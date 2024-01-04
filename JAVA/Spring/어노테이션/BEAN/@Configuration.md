BEAN으로 등록한다. [[@Bean]] 어노테이션을  메서드에 붙임으로써 외부클래스를 빈으로 등록가능해진다.

기본적으로 싱글톤으로 동작하지만 proxyBeanMethods에 false값을 할당함으로써
여러 객체를 반환되도록 만들 수 있다.
일반적인 경우는 아니므로 잘 생각해보고 사용할 것
```java
@Configuration(proxyBeanMethods = false) 

출처: [https://mangkyu.tistory.com/234](https://mangkyu.tistory.com/234) [MangKyu's Diary:티스토리]
```