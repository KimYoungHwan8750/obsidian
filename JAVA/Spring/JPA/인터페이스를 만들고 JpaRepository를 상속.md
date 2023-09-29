JPA를 이용하는 Dao는 JpaRepository 인터페이스를 상속해야 한다.
제네릭 타입은 관리하는 Entity와 그 Entity의 기본키 타입이다.

#### 예제)
```
USER_INFO라는 테이블의 PRIMARY_KEY가 String id라면 관리하기 위한 인터페이스는 JpaRepository<USER_INFO,String>을 상속받아야 한다.
```