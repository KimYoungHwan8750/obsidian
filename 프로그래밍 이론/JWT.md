## Json Web Token
인증된 사용자에게 기능을 인가할 때 사용하는 토큰 방식. 세션의 단점을 보완하기 위해 채택된 현대적인 방법이다. 그렇다면 세션의 단점이 무엇일까?

### Stateful
HTTP 통신은 기본적으로 Stateless한 특성을 가지고 있다. 세션을 사용해서 사용자의 정보를 유지하는 것은 이러한 특성에 위배된다.

### Cost
데이터베이스에 세션 정보를 저장하거나, 메모리에 적재할 경우 어떠한 방법을 사용하든 비효율적이고 과부하가 오기 쉽다. 특히, 메모리는 제한적인 자원인데다가 휘발성이라 혹여나 서버 장애가 발생했을 때 큰 피해가 발생할 수 있고 DB에 적재할 시, 데이터베이스 CRUD는 큰 비용이 들어가는 작업이라 매우 비효율적이다.

## JWT 구조
그렇다면 JWT에 무슨 내용을 담길래 인가라는 역할을 해낼 수 있는 걸까?

JWT는 `.` 세 개로 구분되어지는 세 섹션이 있다. `Header`, `Payload`, `Signature`

### Header
헤더는 JWT의 타입과 사용된 서명 알고리즘에 대한 메타 데이터가 담겨있다. 양식은 다음과 같으며 Base64로 인코딩되어 있다.

```json
{
	"alg": "HS256",
	"typ": "JWT"
}
```

### Payload
Payload는 말 그대로 주요 정보(Claims)가 담긴다. 표준은 아니지만 권장되는 클레임의 집합이 정의된 `Registreed claims`, JWT를 구현하는 개발자가 자유롭게 정의하는 `Public claims`, 공개되지 않고 당사자간에 사용하기로 협약한 `Private claims`가 있다. 대개 `Public claims`가 사용된다.

### Signature
Signature는 토근의 무결성을 보장하고 메세지가 변경되지 않았음을 확인하기 위한 섹션이다. 시그니처를 생성하려면 인코딩된 헤더, 페이로드, 비밀 키, 헤더에 지정된 알고리즘을 사용하여 서명해야한다.

이러한 정보들은 8KB 미만으로 작성되는 것이 권장된다. 어떠한 서버들은 8KB 이상의 토큰을 허용하지 않는 경우가 있다.

### JWT 전송 규칙
JWT는  클라이언트가 리소스에 액세스할 때마다 일반적으로 Bearer라는 스키마를 사용해 Authorization 헤더에 다음과 같이 정해진 규칙으로 전송되어야한다.

`Authorization: Bearer <Token>`

만약 토큰이 A라면 `Authorization: Bearer <A>`, `Authorization: Bearer "A"` 두 유형 모두 잘못된 형식이고 `Authorization: Bearer A`로 작성되어야한다.

### Refresh Token
Access Token이 탈취 당했을 때를 대비하기 위해 Refresh Token이라는 개념이 도입되었다. JWT는 기본적으로 클라이언트에서 관리되는 토큰이기 때문에 탈취 당하면 피해가 매우 커질 수가 있다. 이를 최소화하기 위해 Refresh Token을 도입해 Access  Token에 만료시간을 정하고 만료된 토큰으로 요청이 들어왔을 때 Refresh Token을 검증하고 새로운 Access Token을 발급할 수 있다.

플로우는 다음과 같다.

![JWT Flow Screenshot](https://i.imgur.com/32Rqoh9.png)
[이미지 출처: https://nomal-dev.tistory.com/14](https://nomal-dev.tistory.com/14)

이때 Access Token이 만료된 것을 확인하고 Access Token 재발급 요청을 하면서 절차가 늘어지는 경향으로 인해 Access Token 만료와 동시에 Refresh Token을 검증하고 새로운 Access Token을 보내면서 동시에 데이터도 함께 반환하면 안될까? 생각할 수 있지만, 그렇게 되면 만료된 Refresh Token이 리소스에 접근할 수 있어 Refresh Token의 의미가 퇴색된다.

---

## 🥽Deep Dive

이 장에서는 위 정리한 내용을 토대로 실제 JWT를 이용한 인증·인가를 구현하면서 좀 더 깊이 파고들어본다.

일단 JWT 플로우를 기획하는데, 생각해두어야할 것은 자동 로그인 처리이다. 모바일 어플리케이션 같은 경우 자동로그인이 옵션이 아니고 대부분 기본 동작인데, 모바일의 경우 웹에 비해 보안 수준이 높기 때문에 암호화된 저장소에 토큰을 저장하면 된다. 그러나 웹의 경우 자동 로그인을 따로 체크 박스 옵션으로 제공하는 경우가 많다. 이러한 경우는 처리를 또 다르게한다. 이를 이해하기 위한 선행 지식이 필요한데, 바로 아래에 설명하니 계속 읽어내려가자.

먼저 예시를 들겠다. access token은 만료 시간을 보통 짧게 설정(30분)하고, refresh token은 일주일, 한달, 90일까지도 비교적 길게 설정한다. 정상적인 이용을 한다는 가정하에, refresh token이 본체라서 로그인은 refresh token이 유효한 동안 계속 지속될 것이다.

> 어? 브라우저 껐다 키면 로그아웃되는 사이트들 개많은데? 네이버도 그런데?

이는 따로 보안 로직을 추가해서 그렇다. Session Cookie라고 해서 세션이 지속되는 동안 사용되는 쿠키가 있는데 마찬가지로 `httpOnly, secure` 옵션등을 활용해 쿠키와 동일하게 동작한다. 하지만 브라우저를 닫으면 소멸하기 때문에 유저가 브라우저를 켜놓고 이용하는 동안에는 refresh token을 활용해 재로그인 없이 계속 사이트를 이용할 수 있는 것이다.

따라서 자동 로그인 체크 박스에 체크를 하면 세션 쿠키로, 그게 아니라면 지속 쿠키로 저장하는 분기처리를 해준다면 자동로그인도 쉽게 구현할 수 있다.

### 로그인

일단 시나리오를 구상한다.

* 유효한 토큰 정상 발급된 토큰을 보내면 인증이 성공해야 한다.
* Expired Token을 보내면 인증이 실패해야 한다.
* 시크릿키를 통해 검증에 실패한 토큰은 인증에 실패해야한다.
* 토큰이 없는 요청은 인증이 실패해야 한다.
* Bearer 스킴 없이 오거나, 토큰 포맷이 깨진 경우 실패해야 한다.

#### 만료된 토큰

* 1차적으로 refresh토큰의 유효성을 검증한 뒤 access token을 재발급
