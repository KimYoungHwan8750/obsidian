#### DataSource
application.properties

#### AWS RDS 사용할 때 예제
```javascript
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver  
spring.datasource.url=jdbc:oracle:thin:@wearvillage.c38c15agkmuv.ap-northeast-2.rds.amazonaws.com:1521:VILLAGE  // public IPv4 DNS + DB이름 (VILLAGE)
spring.datasource.username=admin  // DB name
spring.datasource.password=admin // DB PW
```

#### Spring Boot Local 환경일 때 예제
```js
#spring.datasource.driver-class-name=oracle.jdbc.OracleDriver  
#spring.datasource.url=jdbc:oracle:thin:@localhost:1521:xe  
#spring.datasource.username=c##wearVillage  
#spring.datasource.password=wearVillage
```
