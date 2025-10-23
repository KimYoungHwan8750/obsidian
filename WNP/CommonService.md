# CommonServiceImpl 클래스 기능 분석 보고서

## 개요

`CommonServiceImpl`은 **범용 데이터베이스 작업을 처리하는 제네릭 서비스**입니다. MyBatis를 사용하며, **동적 쿼리 실행**과 **다중 쿼리 연쇄 실행**을 지원하는 매우 독특한 패턴입니다.

---

## 핵심 설계 개념

### 1. **동적 쿼리 실행**

```java
// queryId를 파라미터로 받아서 실행
public List<CommonMap> select(CommonMap param) throws Exception {
    return commonRepository.selectList(
        NAMESPACE + param.getString("queryId"), 
        param
    );
}
```

**의미:**

- 컴파일 타임에 쿼리가 결정되지 않음
- **런타임에 queryId로 쿼리 선택**
- 하나의 메서드로 모든 조회 처리

### 2. **다중 쿼리 연쇄 실행 (핵심 기능)**

```java
private int insert(String prefix, CommonMap param) throws Exception {
    int result = 0;
    
    for (int i=1; i<=MAX_QUERY_COUNT; i++) {
        // queryId, queryId2, queryId3, ..., queryId10까지 순차 실행
        String queryId = NAMESPACE + prefix + param.getString("queryId") + (i==1?"":i);
        
        if (쿼리가 존재하면) {
            int rows = commonRepository.insert(queryId, param);
            result += i==1?rows:0;  // 첫 번째 쿼리 결과만 카운트
        }
        
        if (param.getBoolean("runOnce")) break;  // 단일 실행 모드
    }
    
    return result;
}
```

**동작 원리:**

1. `queryId="user_insert"` 요청
2. 자동으로 `user_insert`, `user_insert2`, `user_insert3`, ... `user_insert10` 순차 실행
3. 쿼리가 존재하는 것만 실행

---

## 주요 메서드 분석

### 1. 조회 메서드

#### select(String queryId, CommonMap param)

```java
public List<CommonMap> select(String queryId, CommonMap param) {
    return commonRepository.selectList(NAMESPACE + queryId, param);
}
```

**사용 예시:**

```java
CommonMap param = new CommonMap();
param.put("userId", "U001");

List<CommonMap> users = commonService.select("user.selectList", param);
// 실제 실행: kr.co.wnpsoft.core.mapper.user.selectList
```

#### select(CommonMap param)

```java
public List<CommonMap> select(CommonMap param) {
    return commonRepository.selectList(
        NAMESPACE + param.getString("queryId"), 
        param
    );
}
```

**사용 예시:**

```java
CommonMap param = new CommonMap();
param.put("queryId", "user.selectList");
param.put("userId", "U001");

List<CommonMap> users = commonService.select(param);
```

#### selectOne(CommonMap param)

```java
public CommonMap selectOne(CommonMap param) {
    return commonRepository.selectOne(
        NAMESPACE + param.getString("queryId"), 
        param
    );
}
```

**사용 예시:**

```java
CommonMap param = new CommonMap();
param.put("queryId", "user.selectOne");
param.put("userId", "U001");

CommonMap user = commonService.selectOne(param);
String userName = user.getString("userName");
```

---

### 2. 단일 CUD 메서드

```java
public int insert(CommonMap param) {
    return insert("", param);  // prefix 없음
}

public int update(CommonMap param) {
    return update("", param);
}

public int delete(CommonMap param) {
    return delete("", param);
}
```

**사용 예시:**

```java
CommonMap param = new CommonMap();
param.put("queryId", "user_save");
param.put("userId", "U001");
param.put("userName", "홍길동");

int result = commonService.insert(param);
```

**실행 시퀀스:**

1. `user_save` 실행
2. `user_save2` 존재 시 실행
3. `user_save3` 존재 시 실행
4. ... (최대 10개)

---

### 3. 그리드 CUD 메서드 (중요)

```java
public int gridInsert(CommonMap param) {
    return insert(param.getString("nameSpace") + "insert_", param);
}

public int gridUpdate(CommonMap param) {
    return update(param.getString("nameSpace") + "update_", param);
}

public int gridDelete(CommonMap param) {
    return delete(param.getString("nameSpace") + "delete_", param);
}
```

**사용 예시:**

```java
// 그리드에서 여러 행 저장
CommonMap param = new CommonMap();
param.put("nameSpace", "order_");
param.put("queryId", "save");
param.put("list", orderList);  // MapUtils에서 생성된 리스트

int result = commonService.gridInsert(param);
```

**실행되는 쿼리:**

1. `order_insert_save`
2. `order_insert_save2`
3. `order_insert_save3`
4. ...

---

### 4. 다중 쿼리 실행 로직 (핵심)

```java
private int insert(String prefix, CommonMap param) throws Exception {
    int result = 0;

    try {
        for (int i=1; i<=MAX_QUERY_COUNT; i++) {
            // queryId 생성: user_insert, user_insert2, ...
            String queryId = NAMESPACE + prefix + param.getString("queryId") + (i==1?"":i);
            
            // MyBatis에 해당 쿼리가 존재하는지 확인
            if (commonRepository.getSqlSession()
                    .getConfiguration()
                    .getMappedStatement(queryId) != null) {
                
                int rows = commonRepository.insert(queryId, param);
                result += i==1?rows:0;  // 첫 번째 결과만 카운트
            }
            
            // runOnce=true면 첫 번째만 실행
            if (param.getBoolean("runOnce")) break;
        }
    } catch (Exception e) {
        // 예외 무시 (!)
    }

    return result;
}
```

---

## 실무 사용 시나리오

### 시나리오 1: 단순 조회

**Controller:**

```java
@PostMapping("/api/user/list")
public List<CommonMap> getUserList(HttpServletRequest request) {
    CommonMap param = MapUtils.parseRequest(request);
    param.put("queryId", "user.selectList");
    return commonService.select(param);
}
```

**MyBatis Mapper (user.xml):**

```xml
<mapper namespace="kr.co.wnpsoft.core.mapper">
    <select id="user.selectList" resultType="CommonMap">
        SELECT user_id, user_name, email
        FROM users
        WHERE company_id = #{companyId}
    </select>
</mapper>
```

---

### 시나리오 2: 복잡한 저장 (다중 쿼리)

**요구사항:** 회원 등록 시:

1. 사용자 기본정보 저장
2. 권한 정보 저장
3. 로그 기록

**Controller:**

```java
@PostMapping("/api/user/save")
public int saveUser(HttpServletRequest request) {
    CommonMap param = MapUtils.parseRequest(request);
    param.put("queryId", "user_save");
    return commonService.insert(param);
}
```

**MyBatis Mapper:**

```xml
<mapper namespace="kr.co.wnpsoft.core.mapper">
    <!-- 1. 사용자 저장 -->
    <insert id="user_save">
        INSERT INTO users (user_id, user_name, email)
        VALUES (#{userId}, #{userName}, #{email})
    </insert>
    
    <!-- 2. 권한 저장 (자동 실행) -->
    <insert id="user_save2">
        INSERT INTO user_roles (user_id, role_id)
        VALUES (#{userId}, #{roleId})
    </insert>
    
    <!-- 3. 로그 저장 (자동 실행) -->
    <insert id="user_save3">
        INSERT INTO user_logs (user_id, action, created_at)
        VALUES (#{userId}, 'CREATE', NOW())
    </insert>
</mapper>
```

**실행 흐름:**

```
commonService.insert(param)
  → user_save 실행 (사용자 저장)
  → user_save2 실행 (권한 저장)
  → user_save3 실행 (로그 저장)
  → return (첫 번째 쿼리의 affected rows)
```

---

### 시나리오 3: 그리드 일괄 저장

**요청:**

```http
POST /api/order/save?nameSpace=order_&queryId=save

grd_productId[]=P1&grd_productId[]=P2
&grd_quantity[]=10&grd_quantity[]=20
&userId=U001  (헤더, 각 행에 자동 복사됨)
```

**Controller:**

```java
@PostMapping("/api/order/save")
public int saveOrders(HttpServletRequest request) {
    CommonMap param = MapUtils.parseRequest(request);
    // param.get("list"): [{productId:P1, quantity:10, userId:U001}, ...]
    
    return commonService.gridInsert(param);
}
```

**MyBatis Mapper:**

```xml
<mapper namespace="kr.co.wnpsoft.core.mapper">
    <!-- 1. 주문 헤더 저장 -->
    <insert id="order_insert_save">
        INSERT INTO orders (order_id, user_id, order_date)
        VALUES (#{orderId}, #{userId}, NOW())
    </insert>
    
    <!-- 2. 주문 상세 일괄 저장 (자동 실행) -->
    <insert id="order_insert_save2">
        INSERT INTO order_items (order_id, product_id, quantity, user_id)
        VALUES
        <foreach collection="list" item="item" separator=",">
            (#{orderId}, #{item.productId}, #{item.quantity}, #{item.userId})
        </foreach>
    </insert>
    
    <!-- 3. 재고 차감 (자동 실행) -->
    <update id="order_insert_save3">
        <foreach collection="list" item="item" separator=";">
            UPDATE products 
            SET stock = stock - #{item.quantity}
            WHERE product_id = #{item.productId}
        </foreach>
    </update>
</mapper>
```

---

### 시나리오 4: runOnce 옵션

```java
// 단일 쿼리만 실행 (연쇄 실행 방지)
CommonMap param = new CommonMap();
param.put("queryId", "user_delete");
param.put("userId", "U001");
param.put("runOnce", true);  // user_delete2, user_delete3 실행 안 함

commonService.delete(param);
```

---

## 설계 패턴 분석

### 1. **제네릭 서비스 패턴**

**전통적인 방식:**

```java
@Service
public class UserService {
    public List<User> selectUsers() { ... }
    public User selectUser(String id) { ... }
    public int insertUser(User user) { ... }
}

@Service
public class OrderService {
    public List<Order> selectOrders() { ... }
    public Order selectOrder(String id) { ... }
    public int insertOrder(Order order) { ... }
}
```

**CommonService 방식:**

```java
@Service
public class CommonService {
    public List<CommonMap> select(CommonMap param) { ... }
    public CommonMap selectOne(CommonMap param) { ... }
    public int insert(CommonMap param) { ... }
}

// 모든 엔티티를 queryId로 구분
```

### 2. **컨벤션 기반 다중 쿼리 실행**

|쿼리 ID|목적|실행 순서|
|---|---|---|
|`user_save`|메인 로직|1번|
|`user_save2`|서브 로직 1|2번|
|`user_save3`|서브 로직 2|3번|
|...|...|...|
|`user_save10`|서브 로직 9|10번|

**규칙:**

- 숫자 없음 = 메인 쿼리
- 2~10 = 서브 쿼리 (선택적)

### 3. **네임스페이스 규칙**

```java
private final String NAMESPACE = "kr.co.wnpsoft.core.mapper.";

// 조합 예시:
NAMESPACE + "user.selectList"
→ "kr.co.wnpsoft.core.mapper.user.selectList"

NAMESPACE + "order_" + "insert_" + "save"
→ "kr.co.wnpsoft.core.mapper.order_insert_save"
```

---

## 장단점 분석

### ✅ 장점

#### 1. **코드 재사용성**

```java
// 하나의 메서드로 모든 조회 처리
commonService.select(param);  // 사용자 조회
commonService.select(param);  // 주문 조회
commonService.select(param);  // 상품 조회
// queryId만 다름
```

#### 2. **복잡한 트랜잭션 간소화**

```java
// 여러 테이블 저장을 하나의 호출로
commonService.insert(param);
// → user 저장 + role 저장 + log 저장 (자동)
```

#### 3. **동적 기능 추가 용이**

```xml
<!-- 기존 -->
<insert id="user_save">...</insert>

<!-- 새 기능 추가 (코드 수정 없음) -->
<insert id="user_save4">
    INSERT INTO user_history ...
</insert>
```

#### 4. **Service 레이어 단순화**

```java
// Service 클래스 불필요
// Controller → CommonService → MyBatis
```

---

### ❌ 단점

#### 1. **실행 흐름 파악 불가**

```java
// 이 코드가 몇 개의 쿼리를 실행하는지 알 수 없음
commonService.insert(param);

// user_save?
// user_save + user_save2?
// user_save + user_save2 + user_save3?
// → MyBatis XML을 봐야만 알 수 있음
```

#### 2. **예외 처리 부재**

```java
private int insert(String prefix, CommonMap param) {
    try {
        // ...
    } catch (Exception e) {
        // 예외를 무시! (로그도 없음)
    }
    return result;
}
```

**문제:**

- user_save 성공, user_save2 실패해도 모름
- 부분 성공 상태 발생 가능
- 트랜잭션 롤백 여부 불명확

#### 3. **트랜잭션 관리 문제**

```java
// @Transactional이 없음!
public int insert(CommonMap param) throws Exception {
    return insert("", param);
}
```

**위험:**

```
user_save 성공 (COMMIT)
user_save2 실패 → 예외 무시
→ 데이터 불일치 발생
```

#### 4. **디버깅 지옥**

```java
// 에러 발생 시
commonService.insert(param);
// ❓ 어느 쿼리에서 에러?
// ❓ user_save? user_save2? user_save7?
// → 스택트레이스만으로 알 수 없음
```

#### 5. **성능 문제**

```java
for (int i=1; i<=MAX_QUERY_COUNT; i++) {
    // MyBatis Configuration에서 쿼리 존재 여부 체크 (비용 발생)
    if (getSqlSession().getConfiguration()
            .getMappedStatement(queryId) != null) {
        // ...
    }
}
```

**문제:**

- 매번 10번 체크
- 불필요한 오버헤드

#### 6. **타입 안전성 제로**

```java
// 모든 것이 CommonMap
public List<CommonMap> select(CommonMap param) { ... }

// vs 타입 안전한 방식
public List<User> selectUsers(UserSearchCriteria criteria) { ... }
```

#### 7. **테스트 불가능**

```java
// 단위 테스트?
@Test
public void testInsert() {
    CommonMap param = new CommonMap();
    param.put("queryId", "user_save");
    // ... 뭘 테스트하지? 🤔
    // user_save2, user_save3도 실행되는데?
}
```

---

## 심각한 보안/안정성 이슈

### 🚨 Issue 1: 예외 무시

```java
try {
    // ...
} catch (Exception e) {
    // 예외를 완전히 무시!
}
```

**위험:**

- SQL 에러 발생해도 조용히 무시
- 데이터 정합성 보장 불가

### 🚨 Issue 2: @Transactional 부재

```java
// @Transactional 없음
public int insert(CommonMap param) throws Exception {
    // 여러 쿼리 실행
}
```

**위험:**

- 각 쿼리가 별도 트랜잭션
- 부분 성공 가능
- 롤백 불가능

### 🚨 Issue 3: 암묵적 동작

```java
// 개발자: "user_save만 실행될 거야"
commonService.insert(param);

// 실제: user_save, user_save2, ..., user_save10 모두 실행 시도
// → 의도하지 않은 부작용
```

---

## 개선 제안

### 1. @Transactional 추가

```java
@Transactional
public int insert(CommonMap param) throws Exception {
    return insert("", param);
}
```

### 2. 예외 처리 개선

```java
private int insert(String prefix, CommonMap param) throws Exception {
    int result = 0;
    List<String> executedQueries = new ArrayList<>();
    
    for (int i=1; i<=MAX_QUERY_COUNT; i++) {
        String queryId = NAMESPACE + prefix + param.getString("queryId") + (i==1?"":i);
        
        try {
            if (mappedStatementExists(queryId)) {
                executedQueries.add(queryId);
                int rows = commonRepository.insert(queryId, param);
                result += i==1?rows:0;
            }
        } catch (Exception e) {
            log.error("Query execution failed: {}, executed: {}", 
                     queryId, executedQueries, e);
            throw e;  // 재발생
        }
        
        if (param.getBoolean("runOnce")) break;
    }
    
    return result;
}
```

### 3. 명시적 쿼리 목록

```java
// 암묵적 규칙 대신 명시적 선언
param.put("queryId", "user_save");
param.put("subQueries", Arrays.asList("user_save2", "user_save3"));

// 또는 어노테이션
@QuerySequence({"user_save", "user_save2", "user_save3"})
public int saveUser(CommonMap param) { ... }
```

### 4. 타입 안전한 래퍼

```java
public class QueryRequest {
    private String queryId;
    private CommonMap params;
    private boolean runOnce;
    private TransactionMode mode;
    
    // 빌더 패턴
}

commonService.insert(
    QueryRequest.builder()
        .queryId("user_save")
        .runOnce(false)
        .build()
);
```

---

## 현대적 대안

### Spring Data JPA

```java
@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    public User saveUser(User user) {
        // 명확한 타입
        // 자동 트랜잭션
        // 쉬운 테스트
        return userRepository.save(user);
    }
}
```

### MyBatis with Type-Safe

```java
@Mapper
public interface UserMapper {
    @Insert("INSERT INTO users ...")
    int insert(User user);
    
    @Select("SELECT * FROM users WHERE ...")
    List<User> selectList(UserSearchCriteria criteria);
}

@Service
@Transactional
public class UserService {
    @Autowired
    private UserMapper userMapper;
    
    public int saveUser(User user) {
        int result = userMapper.insert(user);
        userMapper.insertRoles(user.getRoles());
        userMapper.insertLog(user.getUserId());
        return result;
    }
}
```

---

## 결론

**CommonServiceImpl은 극단적인 "DRY" 원칙 추구의 산물이지만, 실무에서는 많은 문제를 야기합니다.**

### 평가 요약

|항목|점수|평가|
|---|---|---|
|**재사용성**|⭐⭐⭐⭐⭐|매우 우수|
|**유지보수성**|⭐|매우 나쁨|
|**안정성**|⭐|매우 나쁨|
|**가독성**|⭐|매우 나쁨|
|**테스트 용이성**|⭐|매우 나쁨|

### 사용 권장 여부

- **레거시 유지보수**: ⚠️ 주의하며 사용
- **신규 프로젝트**: ❌ 절대 비추천
- **프로토타입**: △ 제한적 사용

### 핵심 문제

1. **암묵적 동작** (가장 큰 문제)
2. **예외 처리 부재**
3. **트랜잭션 관리 부재**
4. **타입 안전성 부재**
5. **디버깅 어려움**

**이 패턴은 "영리한 코드"가 "나쁜 코드"가 될 수 있음을 보여주는 좋은 사례입니다.**