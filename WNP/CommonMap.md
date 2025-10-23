# CommonMap 클래스 기능 분석 보고서

## 개요

`CommonMap`은 Apache Commons의 `ListOrderedMap`을 상속받아 확장한 유틸리티 클래스로, 주로 **DB 조회 결과나 API 응답 데이터를 처리**하는 용도로 설계되었습니다.

## 핵심 특징

### 1. **ListOrderedMap 기반**

- 삽입 순서를 유지하는 Map 구조
- 인덱스 기반 접근 가능 (Map + List 특성)

### 2. **자동 CamelCase 변환**

```java
@Override
public Object put(Object key, Object value) {
    return super.put(CamelUtil.convert2CamelCase((String) key), value);
}
```

- DB의 snake_case → Java의 camelCase 자동 변환
- 예: `user_name` → `userName`
- 예외: `state_col` 같은 특정 컬럼은 변환 제외

### 3. **타입 안전 Getter 메서드**

|메서드|반환 타입|설명|
|---|---|---|
|`getString(name)`|String|null 안전, 기본값 ""|
|`getInt(name)`|int|타입 변환 지원, 기본값 0|
|`getDouble(name)`|double|BigDecimal 변환 지원|
|`getBoolean(name)`|boolean|문자열 파싱 지원|
|`getMap(name)`|CommonMap|중첩 객체 처리|
|`getList(name)`|List<CommonMap>|배열 데이터 처리|

## 주요 기능 상세

### 1. **안전한 데이터 접근**

```java
// null 체크 자동 처리
public String getString(String name) {
    Object obj = get(name);
    if (obj == null) return "";
    // String[] 처리 (HTTP 파라미터 배열 대응)
    if(obj instanceof String[]) {
        return ((String[]) obj)[0];
    }
    return obj.toString();
}
```

**특징:**

- null 반환 대신 기본값 제공
- NullPointerException 방지
- HTTP 파라미터 배열 자동 처리

### 2. **유연한 타입 변환**

```java
public int getInt(String name, int def) {
    Object obj = get(name);
    if (obj instanceof Integer) return (int) obj;
    if (obj instanceof String) return Integer.parseInt(obj.toString());
    if (obj instanceof BigDecimal) return ((BigDecimal) obj).intValue();
    return def;
}
```

**지원 변환:**

- `Integer` → int
- `String` → int (파싱)
- `BigDecimal` → int (DB 숫자 타입 대응)
- 실패 시 기본값 반환

### 3. **중첩 구조 처리**

```java
public CommonMap getMap(String name) {
    Object obj = get(name);
    if (obj instanceof LinkedHashMap) {
        return CommonMap.parse((LinkedHashMap<String, Object>) obj);
    }
    return (CommonMap) obj;
}
```

**용도:**

- JSON 파싱 결과의 중첩 객체 처리
- Jackson ObjectMapper 결과 변환

### 4. **리스트 데이터 처리**

```java
public List<CommonMap> getList(String name) {
    List<LinkedHashMap<String, Object>> temp = (List<LinkedHashMap<String, Object>>) obj;
    List<CommonMap> result = new ArrayList<>();
    for(int i=0; i<temp.size(); i++) {
        result.add(CommonMap.parse(temp.get(i)));
    }
    return result;
}
```

**특징:**

- LinkedHashMap 리스트 → CommonMap 리스트 자동 변환
- 빈 리스트 기본 반환 (null 안전)

### 5. **JSON 파싱**

```java
public static CommonMap parseJSON(String json) {
    ObjectMapper mapper = new ObjectMapper();
    return mapper.readValue(json, CommonMap.class);
}
```

## 실무 사용 시나리오

### 시나리오 1: MyBatis 조회 결과 처리

```java
// MyBatis Mapper
List<CommonMap> selectUsers();

// Service
List<CommonMap> users = userMapper.selectUsers();
for(CommonMap user : users) {
    String userName = user.getString("userName");  // DB: user_name
    int age = user.getInt("age");
    boolean active = user.getBoolean("isActive");
}
```

### 시나리오 2: REST API 응답 파싱

```java
// JSON 응답
String json = """
{
    "user_id": 123,
    "user_name": "홍길동",
    "address": {
        "city": "서울",
        "zipCode": "12345"
    },
    "orders": [
        {"order_id": 1, "amount": 50000},
        {"order_id": 2, "amount": 30000}
    ]
}
""";

CommonMap data = CommonMap.parseJSON(json);
int userId = data.getInt("userId");  // 자동 camelCase
CommonMap address = data.getMap("address");
String city = address.getString("city");
List<CommonMap> orders = data.getList("orders");
```

### 시나리오 3: HTTP 요청 파라미터 처리

```java
// Controller
@PostMapping("/api/save")
public ResponseEntity<?> save(@RequestBody CommonMap params) {
    String name = params.getString("name");
    int age = params.getInt("age", 18);  // 기본값 18
    
    if(params.isEmpty("email")) {
        return ResponseEntity.badRequest().body("이메일 필수");
    }
    
    // 중첩 데이터
    CommonMap address = params.getMap("address");
    List<CommonMap> hobbies = params.getList("hobbies");
    
    return ResponseEntity.ok().build();
}
```

## 장단점 분석

### ✅ 장점

1. **개발 생산성 향상**
    
    - null 체크 불필요
    - 타입 변환 자동화
    - snake_case ↔ camelCase 자동 처리
2. **유연성**
    
    - 동적 데이터 구조 처리 용이
    - 스키마 변경에 강함
3. **안정성**
    
    - Exception 발생 시 기본값 반환
    - 런타임 에러 최소화

### ❌ 단점

1. **타입 안전성 부족**
    
    ```java
    // 컴파일 타임 체크 불가
    int age = map.getInt("ageee");  // 오타 발견 안 됨
    ```
    
2. **IDE 지원 제한**
    
    - 자동완성 불가
    - 리팩토링 어려움
3. **성능 오버헤드**
    
    - 리플렉션 사용 (CamelUtil)
    - 타입 체크 및 변환 비용
4. **디버깅 어려움**
    
    - 런타임에 데이터 구조 파악
    - 잘못된 키 사용 시 조용한 실패

## 대안 비교

### vs DTO 클래스

```java
// CommonMap 방식
CommonMap user = userMapper.selectUser(id);
String name = user.getString("userName");

// DTO 방식
UserDto user = userMapper.selectUser(id);
String name = user.getUserName();  // 타입 안전, 자동완성
```

### vs Record (Java 14+)

```java
// Record 방식 (불변성 + 타입 안전)
record User(String userName, int age, boolean active) {}
```

## 개선 제안

### 1. **제네릭 타입 추가**

```java
public <T> T get(String name, Class<T> clazz) {
    // 타입 안전한 조회
}
```

### 2. **Null 처리 개선**

```java
public Optional<String> getStringOpt(String name) {
    return Optional.ofNullable(getString(name));
}
```

### 3. **Validation 추가**

```java
public String getRequiredString(String name) {
    if(isEmpty(name)) {
        throw new IllegalArgumentException(name + " is required");
    }
    return getString(name);
}
```

## 결론

**CommonMap은 전형적인 레거시 프레임워크 유틸리티 클래스**로:

- **적합한 경우**: 동적 데이터 처리, 프로토타이핑, MyBatis 기반 레거시 시스템
- **부적합한 경우**: 신규 프로젝트, 타입 안전성이 중요한 도메인, 대규모 팀 개발

현대적인 접근법(DTO, Record, Lombok)을 우선 고려하되, 레거시 시스템 유지보수나 특수한 상황에서 제한적으로 사용하는 것을 권장합니다.