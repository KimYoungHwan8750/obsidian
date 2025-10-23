# MapUtils 클래스 기능 분석 보고서

## 개요

`MapUtils`는 **HTTP 요청과 세션 데이터를 CommonMap으로 변환**하는 유틸리티 클래스입니다. 주로 **레거시 웹 프레임워크**(전자정부 프레임워크 등)에서 사용되는 패턴입니다.

## 주요 메서드

### 1. `parseRequest(HttpServletRequest request)`

HTTP 요청 파라미터를 CommonMap으로 변환하는 핵심 메서드

### 2. `parseSession(HttpSession session)`

세션 속성을 CommonMap으로 변환

### 3. `parseList(List<CommonMap> list)`

리스트를 인덱스 기반 Map으로 변환

### 4. `reverse2CamelCase(String camel)`

camelCase → snake_case 변환

---

## 상세 기능 분석

### 1. parseRequest() - 복잡한 요청 파싱 로직

#### 1-1. 기본 구조

```java
CommonMap result = new CommonMap();  // 결과 맵
List<CommonMap> list = new ArrayList<>();  // 그리드 데이터용 리스트
String func = request.getParameter("func");  // 기능 구분자
```

#### 1-2. 파라미터 분류 처리

**단일 값 파라미터 (헤더 데이터)**

```java
if (values.length == 1 && !name.startsWith("grd_") && !name.endsWith("[]")) {
    result.put(name, values[0]);
}
```

- `userId=123` → `result.put("userId", "123")`
- `grd_`로 시작하지 않고, `[]`로 끝나지 않는 단일 값

**배열 파라미터 처리**

```java
// 예: status[]=active&status[]=pending
ArrayList<String> alist = new ArrayList<>();
for (int i=0; i < values.length; i++) {
    if(values[i] != null && !values[i].equals("")) 
        alist.add(values[i]);
}
result.put(reverse2CamelCase(name).replace("[]", ""), alist);
```

**그리드 데이터 (grd_ 접두사)**

```java
// grd_name[0]=홍길동&grd_name[1]=김철수&grd_age[0]=30&grd_age[1]=25
for (int i=0; i<values.length; i++){
    if (list.size() <= i){
        list.add(new CommonMap("index", i));
    }
    list.get(i).put(reverse2CamelCase(name).replace("[]", ""), values[i]);
}
```

#### 1-3. 특수 기능: func 기반 처리

```java
String func = request.getParameter("func");
String[] checkbox = request.getParameterValues("checkbox");

// IQ(조회), EX(엑셀), PR(출력) 기능에서 체크박스 선택 항목만 처리
if ((func.startsWith("IQ") || func.startsWith("EX") || func.startsWith("PR")) 
    && checkbox != null) {
    ArrayList<String> alist = new ArrayList<>();
    for (int i=0; i < checkbox.length; i++) {
        int chkNum = Integer.parseInt(checkbox[i]);
        if(values[chkNum] != null) 
            alist.add(values[chkNum]);
    }
    result.put(name, alist);
}
```

**의미:**

- 사용자가 체크박스로 선택한 항목만 처리
- `checkbox=0,2,5` → 0번, 2번, 5번 인덱스만 추출

#### 1-4. 세션 데이터 자동 병합

```java
HttpSession session = request.getSession();
Enumeration<String> attrNames = session.getAttributeNames();

while(attrNames.hasMoreElements()){
    String attrName = attrNames.nextElement();
    Object attrValue = session.getAttribute(attrName);
    result.put(attrName, attrValue);  // 세션 데이터 자동 추가
}
```

**의미:**

- 모든 세션 속성을 자동으로 CommonMap에 추가
- Service 레이어에서 세션 데이터 직접 접근 가능

#### 1-5. 리스트 데이터에 헤더 복사

```java
String _name = "_token,func,queryId,queryOrder,queryKey,keyCol,result,grid,baseData,dataType,objId,reqAction,";

if (list.size() > 0) {
    Iterator iter = result.keySet().iterator();
    while(iter.hasNext()){
        String keyname = (String)iter.next();
        if(_name.indexOf(keyname+",")>-1) continue;  // 제외할 필드
        
        // 모든 리스트 항목에 헤더 데이터 복사
        for(int i=0; i<list.size(); i++){
            list.get(i).put(keyname, result.get(keyname));
        }
    }
    result.put("list", list);
}
```

**의미:**

- 그리드 데이터의 각 행에 공통 헤더 정보 자동 복사
- 예: `userId`, `companyId` 등을 각 행에 추가

---

## 실무 사용 시나리오

### 시나리오 1: 단순 폼 제출

```http
POST /api/user/save
userId=123&userName=홍길동&age=30&email=test@example.com
```

```java
@PostMapping("/user/save")
public String save(HttpServletRequest request) {
    CommonMap params = MapUtils.parseRequest(request);
    
    // 결과:
    // {
    //   "userId": "123",
    //   "userName": "홍길동",
    //   "age": "30",
    //   "email": "test@example.com",
    //   "loginUser": {...}  // 세션 데이터 자동 포함
    // }
    
    userService.save(params);
}
```

### 시나리오 2: 배열 파라미터

```http
POST /api/user/delete
userIds[]=1&userIds[]=5&userIds[]=10
```

```java
CommonMap params = MapUtils.parseRequest(request);
List<String> userIds = params.getList("userIds");
// ["1", "5", "10"]
```

### 시나리오 3: 그리드 데이터 (핵심 기능)

```http
POST /api/order/save?func=IS&userId=123&companyId=ABC

grd_productId[]=P1&grd_productId[]=P2&grd_productId[]=P3
&grd_quantity[]=10&grd_quantity[]=20&grd_quantity[]=30
&grd_price[]=1000&grd_price[]=2000&grd_price[]=3000
```

```java
CommonMap params = MapUtils.parseRequest(request);

// 결과:
// {
//   "func": "IS",
//   "userId": "123",
//   "companyId": "ABC",
//   "list": [
//     {
//       "index": 0,
//       "productId": "P1",
//       "quantity": "10",
//       "price": "1000",
//       "userId": "123",      // 헤더에서 자동 복사
//       "companyId": "ABC"    // 헤더에서 자동 복사
//     },
//     {
//       "index": 1,
//       "productId": "P2",
//       "quantity": "20",
//       "price": "2000",
//       "userId": "123",
//       "companyId": "ABC"
//     },
//     ...
//   ]
// }

List<CommonMap> orders = params.getList("list");
for(CommonMap order : orders) {
    String productId = order.getString("productId");
    String userId = order.getString("userId");  // 자동 복사된 값
    orderService.insert(order);
}
```

### 시나리오 4: 체크박스 선택 처리

```http
POST /api/user/export?func=EX

checkbox=0&checkbox=2&checkbox=4
&userId[]=U1&userId[]=U2&userId[]=U3&userId[]=U4&userId[]=U5
&userName[]=홍길동&userName[]=김철수&userName[]=이영희&userName[]=박민수&userName[]=최지수
```

```java
CommonMap params = MapUtils.parseRequest(request);

// checkbox로 선택된 0, 2, 4번 인덱스만 추출
List<String> userIds = (List<String>) params.get("userId");
// ["U1", "U3", "U5"]  (0번, 2번, 4번만)

List<String> userNames = (List<String>) params.get("userName");
// ["홍길동", "이영희", "최지수"]
```

---

## reverse2CamelCase() 분석

```java
public static String reverse2CamelCase(String camel) {
    String regex = "([a-z])([A-Z]+)";
    String replacement = "$1_$2";
    return camel.replaceAll(regex, replacement).toLowerCase();
}
```

**변환 예시:**

```java
reverse2CamelCase("userId")      → "user_id"
reverse2CamelCase("userName")    → "user_name"
reverse2CamelCase("productName") → "product_name"
reverse2CamelCase("grd_userId")  → "grd_user_id"
```

**용도:**

- 프론트엔드: camelCase
- 백엔드/DB: snake_case
- 자동 변환으로 통일성 유지

---

## 설계 패턴 분석

### 1. **모든 데이터를 하나의 Map으로 통합**

```
HTTP Request
├─ 단일 파라미터 → result에 직접 저장
├─ 배열 파라미터 → result에 List로 저장
├─ 그리드 파라미터 → result의 "list"에 저장
└─ 세션 데이터 → result에 병합
```

### 2. **컨벤션 기반 처리**

|컨벤션|처리 방식|
|---|---|
|`grd_*`|그리드 데이터로 인식|
|`*[]`|배열 파라미터로 인식|
|`func=IQ/EX/PR`|조회/엑셀/출력 모드|
|`checkbox`|선택 항목 필터링|

### 3. **자동화 중심 설계**

- 세션 데이터 자동 병합
- 헤더→리스트 자동 복사
- 네이밍 자동 변환

---

## 장단점 분석

### ✅ 장점

1. **개발 생산성**
    
    ```java
    // 수동 파싱 불필요
    CommonMap params = MapUtils.parseRequest(request);
    // vs
    String userId = request.getParameter("userId");
    String userName = request.getParameter("userName");
    // ...
    ```
    
2. **그리드 데이터 처리 자동화**
    
    - 복잡한 배열 파싱 로직을 한 번에 처리
    - 프론트엔드 그리드 라이브러리와 통합 용이
3. **세션 데이터 투명성**
    
    - Service 레이어에서 세션 접근 불필요
    - 로그인 사용자 정보 자동 전달

### ❌ 단점

1. **과도한 자동화**
    
    ```java
    // 모든 세션 데이터가 자동으로 포함됨 (보안 위험)
    // 필요 없는 데이터도 전부 전달
    ```
    
2. **디버깅 어려움**
    
    ```java
    // 데이터 흐름 추적 불가
    // 어디서 세팅되었는지 알 수 없음
    params.get("userId")  // 파라미터? 세션? 헤더 복사?
    ```
    
3. **컨벤션 학습 비용**
    
    - `grd_`, `[]`, `func`, `checkbox` 규칙 숙지 필요
    - 신규 개발자에게 불친절
4. **타입 안전성 제로**
    
    ```java
    // 모든 것이 Object/String
    String age = params.getString("age");  // 숫자인데 문자열
    ```
    
5. **레거시 종속성**
    
    ```java
    import javax.servlet.http.HttpServletRequest;  // Servlet API
    // Spring WebFlux, 현대적 프레임워크와 호환 불가
    ```
    

---

## 보안 이슈

### 🚨 심각한 문제점

```java
// 모든 세션 데이터를 자동으로 CommonMap에 포함
while(attrNames.hasMoreElements()){
    String attrName = attrNames.nextElement();
    Object attrValue = session.getAttribute(attrName);
    result.put(attrName, attrValue);  // ⚠️ 위험
}
```

**위험 시나리오:**

```java
// 세션에 민감한 정보 저장
session.setAttribute("password", "secret123");
session.setAttribute("creditCard", "1234-5678-9012-3456");

// MapUtils.parseRequest() 호출 시
CommonMap params = MapUtils.parseRequest(request);

// 로그에 출력하면?
log.info("params: {}", params);  
// → 세션의 모든 데이터 노출!

// API 응답으로 반환하면?
return ResponseEntity.ok(params);
// → 클라이언트에 세션 데이터 전송!
```

---

## 현대적 대안

### Spring MVC 방식

```java
// DTO 사용
@PostMapping("/user/save")
public String save(@RequestBody UserRequest request,
                   @SessionAttribute("loginUser") User loginUser) {
    userService.save(request, loginUser);
}

// 그리드 데이터
@PostMapping("/order/save")
public String saveOrders(@RequestBody List<OrderRequest> orders,
                        @SessionAttribute("userId") String userId) {
    orders.forEach(order -> order.setUserId(userId));
    orderService.saveAll(orders);
}
```

### ArgumentResolver 패턴

```java
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface CurrentUser {}

@Component
public class CurrentUserArgumentResolver implements HandlerMethodArgumentResolver {
    @Override
    public Object resolveArgument(...) {
        HttpSession session = ((ServletRequestAttributes) 
            RequestContextHolder.currentRequestAttributes())
            .getRequest().getSession();
        return session.getAttribute("loginUser");
    }
}

// 사용
@PostMapping("/api/save")
public String save(@RequestBody SaveRequest request,
                   @CurrentUser User user) {  // 자동 주입
    // ...
}
```

---

## 개선 제안

### 1. 세션 데이터 자동 병합 제거

```java
// ❌ 현재
result.put(attrName, attrValue);  // 모든 세션 데이터

// ✅ 개선
public static CommonMap parseRequest(HttpServletRequest request, 
                                     String... sessionKeys) {
    for(String key : sessionKeys) {
        result.put(key, session.getAttribute(key));
    }
}
```

### 2. 타입 안전한 빌더 제공

```java
public class RequestParser {
    public static <T> T parse(HttpServletRequest request, Class<T> clazz) {
        // ObjectMapper를 이용한 타입 안전한 변환
    }
}
```

### 3. 명시적 변환 메서드

```java
// 현재: 자동 + 암묵적
CommonMap params = MapUtils.parseRequest(request);

// 개선: 명시적
RequestData data = RequestData.builder()
    .parameters(request.getParameterMap())
    .sessionAttribute("loginUser")
    .gridData("grd_", OrderItem.class)
    .build();
```

---

## 결론

**MapUtils는 2000년대 후반~2010년대 초반 전자정부 프레임워크 스타일의 전형적인 유틸리티입니다.**

### 사용 권장 여부

|상황|권장도|이유|
|---|---|---|
|**레거시 유지보수**|⭐⭐⭐⭐|기존 시스템과 일관성 유지|
|**신규 프로젝트**|⭐|현대적 방식 사용 권장|
|**그리드 데이터**|⭐⭐⭐|편리하지만 보안 주의|
|**보안 중요 시스템**|⭐|세션 자동 병합 위험|

### 핵심 요약

- **목적**: HTTP 요청을 CommonMap으로 일괄 변환
- **특징**: 그리드 데이터, 체크박스, 세션 자동 처리
- **문제**: 타입 안전성 부족, 보안 위험, 디버깅 어려움
- **대안**: DTO + ArgumentResolver + Spring 표준 방식