제약조건을 설정할 때 사용한다

테이블을 생성할 때 제약조건을 설정할 수도 있고 생성한 이후에도 변경 가능하다.
기본키를 복합키로 만들고 싶을 떄에는 괄호로 묶어주면 된다.


#### 테이블 생성시
Foreign Key 설정 예제
```SQL
CREATE TABLE TEST_TABLE(  
    TEST_PK varchar2(40),  
    TEST_FK varchar2(20),  
    CONSTRAINT FK_TEST_FK FOREIGN KEY (TEST_FK) REFERENCES USER_INFO (ID)  
)
```

#### 테이블 생성 후
```SQL
ALTER TABLE TEST_TABLE MODIFY CONSTRAINT FK_TEST_FK FOREIGN KEY (TEST_FK) REFERENCES USER_INFO (ID);
```

ALTER로 제약조건을 수정할 때는
CONSTRAINT 앞에 ADD나 MODIFY를 사용해야한다.