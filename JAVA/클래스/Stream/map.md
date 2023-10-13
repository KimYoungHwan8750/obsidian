객체를 순회하면서 원하는 동작을 한다.
예를 들면 데이터베이스를 조회해서 n개의 로우가 조회가 되었고 이를 List에 담는다. 이때 값을 순회하면서 정보에 대해 조건문을 달아 반환값을 달리하고 싶다면 아래와 같이 하면 된다.

```java
List<Map<String, Object>> test = jdbcTemplate.query("SELECT * FROM USER_INFO",new RowMapper<Map<String,Object>>(){  
    @Override  
    public Map<String,Object> mapRow(ResultSet rs, int rowNum) throws SQLException{  
        Map<String,Object> testMap = new HashMap<>();  
        testMap.put("ID",rs.getString("ID"));  
        testMap.put("PW",rs.getString("PW"));  
        testMap.put("EMAIL",rs.getString("EMAIL"));  
        return testMap;  
    }  
});  
List<Map<String,Object>> testCopy = test.stream().map(  
        str->{  
            Map<String,Object> mapTest = new HashMap<>();  
            if(str.get("ID").equals("testid")){  
                mapTest.put("ID", "테스트 아이디는 이거에용!");  
            }else{  
                mapTest.put("ID",str.get("ID")+"는 테스트 아이디가 아니에용!");  
            }  
        return mapTest;}  
).toList();  
  
System.out.println(testCopy.toString());
```

위 코드는 ID가 testid일 경우 테스트 아이디는 이거에용!으로 치환되어 리스트 복사본으로 만들어진다.