application_properties에 해당 내용을 추가한다.
```properties
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy
# CamelCase => Snake_Case (UPPER CASE)
# example : myId = MY_ID

spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
# CamelCase => UPPER CASE
# example : myId = MYID
```