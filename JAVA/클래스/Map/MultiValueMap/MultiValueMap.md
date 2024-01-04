
하나의 키가 여러 밸류값을 가질 수 있다.
```java
MultiValueMap<String,String> multiValueMap = new LinkedMultiValueMap<>();
Map<String,String> map = new HashMap<>();
map.put("k1","v1");
map.put("k1","v2");
multiValueMap.add("k1","v1");
multiValueMap.add("k1","v2");

System.out.println(map.toString()); // {k1:v2}
System.out.println(multiValueMap.toString()); // {k1:[v1,v2]}
```