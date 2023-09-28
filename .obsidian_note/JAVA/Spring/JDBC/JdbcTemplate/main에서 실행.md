```java
package com.example.wearVillage.testArea;  
  
import org.springframework.jdbc.core.JdbcTemplate;  
import org.springframework.jdbc.datasource.DriverManagerDataSource;  
  
import javax.sql.DataSource;  
  
public class test1 {  
  
    private static JdbcTemplate jdbcTemplate;  
  
    public static void main(String[] args){  
        // create a data source  
        DriverManagerDataSource dataSource = new DriverManagerDataSource();  
        dataSource.setDriverClassName("oracle.jdbc.OracleDriver"); // 오라클을 사용할 때
        dataSource.setUrl("jdbc:oracle:thin:@wearvillage.c38c15agkmuv.ap-northeast-2.rds.amazonaws.com:1521:VILLAGE"); // 데이터베이스 주소  
        dataSource.setUsername("admin"); // 사용자 이름
        dataSource.setPassword("admin12345"); // 사용자 비밀번호  
  
        jdbcTemplate = new JdbcTemplate(dataSource);  
  
        jdbcTemplate.execute("UPDATE USER_INFO SET ID = '오라클' WHERE ID = 'qw9275'");  
    }  
}
```