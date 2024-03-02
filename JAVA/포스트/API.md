## API

API 명세를 읽는 능력을 기르고 카카오와 네이버에서 제공해주는 API를 이용해 심플 로그인을 구현해본다.

### 프로젝트 구조

#### build.gradle
```gradle
implementation 'org.springframework.boot:spring-boot-starter-web' // spring web
implementation 'org.springframework.boot:spring-boot-starter-webflux' // web client 객체 사용을 위한 dependency
```

### 카카오 API

#### 흐름

1. 카카오 로그인 창을 호출해 인증 성공할 경우 인가 코드를  Redirect URL에 Redirection
2. 해당 인가 코드를 통해 사용자 정보에 접근하기 위한 access_token 발급
3. 발급 받은 access_token을 이용해 유저 정보 열람

#### 앱 생성

![로그인 창 호출](JAVA/포스트/image/Pasted%20image%2020240302174538.png)

![로그인 창 호출 파라미터](JAVA/포스트/image/Pasted%20image%2020240302174631.png)

명세에 의하면 해당 주소로 `Get` 요청을 보내면 로그인 창을 응답한다.

또한 해당 주소는 다양한 파라미터를 요구하고 있는데, 명세를 읽어보고 필요한 기능이 있다면 명세의 요구에 따라 파라미터를 추가하면 된다.

이번 장에서는 최소한의 기능만 사용해 로그인을 구현한다.

우선 그러기 위해선 카카오 API를 이용하기 위해 어플리케이션을 생성해야한다.

![어플리케이션 생성](JAVA/포스트/image/Pasted%20image%2020240302174924.png)

애플리케이션을 추가하고 나서 해당 앱을 클릭하면 아래와 같은 화면을 확인할 수 있다.

![API 앱키](JAVA/포스트/image/제목%20없음-1.png)

이 장에서는 RestAPI 방식을 이용해 구현하므로 RestAPI 키를 활용한다.

명세에서 요구하는 파라미터는 세 가지이지만, 우리가 구현해야 할 것은 `client_id`(RestAPI APP Key)와 `redirect_url`(Redirect URL)이다. client_id 파라미터엔 위에 보이는 Rest API키를 전달하면 되고 redirect_url 파라미터엔 로그인에 성공했을시 응답받고 싶은 내 서버의 EndPoint를 전달하면 된다.

그 전에 App 설정에 들어가 Redirect URL을 설정해야한다.

![플랫폼](JAVA/포스트/image/임시.png)

앱 메뉴에서 플랫폼을 선택한다.

![Web](JAVA/포스트/image/Pasted%20image%2020240302180014.png)

우리는 웹 개발을 할 것이므로 Web 항목의 Web 플랫폼 등록을 누른다.

![플랫폼 URL 등록](JAVA/포스트/image/Pasted%20image%2020240302180142.png)

필자는 로컬호스트 환경에서 진행했고 포트 번호 9000을 사용중이기 때문에 `http://localhost:9000`을 등록했다. 본인의 환경에 맞게 수정하면 된다.

![플랫폼 URL 등록 후](JAVA/포스트/image/Pasted%20image%2020240302180308.png)

이제 `카카오 로그인 사용 시 Redirect URI를 등록해야 합니다`라는 문구가 표시된다.

![카카오 로그인 활성화](JAVA/포스트/image/Pasted%20image%2020240302180416.png)

등록하러 가기를 누르면 위 화면이 표시된다.

로그인 API를 사용할 것이므로 활성화 설정을 토글해 상태를 On으로 변경해준다.

그리고 Redirect URI 등록 버튼을 눌러 로그인이 성공했을 때의 정보를 받을 EndPoint를 적는다.

필자는 `http://localhost:9000/kakako/oauth`로 설정했다.

![카카오 로그인 설정](JAVA/포스트/image/Pasted%20image%2020240302181531.png)

이제 모든 준비가 끝났다.

위 정보들을 카카오 로그인 명세에서 확인했던 요청에 대입하면 아래와 같은 주소가 완성된다.
client_id = 앱키
redirect_uri = 리다이렉트 주소

`https://kauth.kakao.com/oauth/authorize?client_id=앱키&redirect_uri=리다이렉트 주소&response_type=code`

본인의 앱키와 리다이렉트 주소를 위의 문자열과 치환하면 된다.

#### 로그인 요청

이제 로그인을 해보자.

a태그를 사용하거나 script를 작성해도 상관없다.

여기서는 a태그를 이용한다.

`<a href="https://kauth.kakao.com/oauth/authorize?client_id=앱키&redirect_uri=리다이렉트 주소&response_type=code">카카오</a>`

![메인화면](JAVA/포스트/image/Pasted%20image%2020240302181837.png)

카카오 버튼이 생겼다.

![카카오 로그인 화면면](JAVA/포스트/image/Pasted%20image%2020240302181859.png)

로그인을 진행하면 이렇게 정보 수집 안내창이 뜬다. 최소한의 기능으로 구현하므로 설정한 것이 없는데, 유저의 닉네임이나 이메일, 프로필 사진등을 추가 설정하면 여기서 정보 제공 동의를 받을 수 있다.

![동의 항목](JAVA/포스트/image/임시3.png)

동의 항목은 메뉴의 동의 항목에서 선택 가능하다.

![동의 항목 화면](JAVA/포스트/image/Pasted%20image%2020240302182236.png)

닉네임과 프로필 사진을 필수 동의로 변경했다.

![카카오 로그인 정보 제공창](JAVA/포스트/image/Pasted%20image%2020240302182336.png)

사진과 닉네임에 대해 정보 제공 동의를 받을 수 있게 된다.

동의하고 계속하기를 누르면 로그인 성공 이벤트가 발생하고 설정해두었던 Redirect URL로 카카오의 응답이 도착한다.

```java
@RestController  
public class KakaoRestController {  
    @GetMapping("/kakao/oauth")  
    public void kakao(){  
        System.out.println("카카오 로그인 성공");  
    }  
}
```

아까 설정했던 Redirect URL을 기억하는가?

`/kakao/oauth` 요청을 처리하는 RestController에 요청이 오게 된다면 `카카오 로그인 성공`이 출력된다.

![콘솔 출력](JAVA/포스트/image/Pasted%20image%2020240302182622.png)

로그인 후 콘솔을 확인했더니 카카오 로그인 성공이 출력된다.

![응답](JAVA/포스트/image/Pasted%20image%2020240302183002.png)

해당 응답은 code라는 파라미터를 포함하고 있는데 토큰을 받기 위한 코드이다.

```java
@GetMapping("/kakao/oauth")  
public void kakao(@RequestParam("code") String code){  
    System.out.println("코드 : " + code);  
}
```

RestController의 내용을 조금 수정해 코드에 어떤 값이 담겨있는지 확인해보자.
##### 응답

![코드](JAVA/포스트/image/Pasted%20image%2020240302183252.png)

로그인을 두 번 시도했고, 그때마다 코드 값이 달라진다.

이렇게 인가코드를 난수화함으로써 부적절한 요청에 대한 유효성 체크가 이루어진다.

이제 이 코드를 통해 토큰을 발급 받아보자.

#### 토큰 발급 받기

![토근 받기](JAVA/포스트/image/Pasted%20image%2020240302183605.png)

![토큰 발급 헤더 본문](JAVA/포스트/image/Pasted%20image%2020240302183636.png)

이 명세를 해석해보자.

* `https://kauth.kakao.com/oauth/token`로 `Post` 요청을 보내라.
* `Content-type` 헤더를 `application/x-www-form-urlencoded;charset=utf-8`로 설정해라.
* `grant_type` 파라미터에 `authorization_code`라는 문자열을 전달해라.
* `client_id` 파라미터에 RestAPI 키를 전달해라.
* `redirect_uri` 파라미터에 Rediect URI를 전달해라.
* `code` 파라미터에 로그인 성공으로 응답받은 code를 전달해라.

해당 명세를 토대로 새로운 요청을 만들어보자.

```java
@GetMapping("/kakao/oauth")  
public void kakao(@RequestParam("code") String code){  
    WebClient webClient = WebClient.create("https://kauth.kakao.com/oauth/token");  
    @SuppressWarnings("unchecked")  
    Map<String, String> result = webClient.post()  
            .uri(uri -> uri  
                    .queryParam("grant_type", "authorization_code")  
                    .queryParam("client_id", 앱키)  
                    .queryParam("redirect_uri", 리다이렉트 주소)  
                    .queryParam("code", code).build())  
            .header("Content-type","application/x-www-form-urlencoded;charset=utf-8")  
            .retrieve()  
            .bodyToMono(Map.class)  
            .block();  
	System.out.println(result); // 응답 내용
}
```

##### 응답

```
{access_token=zp_xAqvbQX0Cn3TYFA806JzkzgAJq8VutlQKKiWPAAABjf6NYsfdCc_9be4aqQ, token_type=bearer, refresh_token=KkTwElTsOR7lV0me6JsopZvhqpAn1ekxiMEKKiWPAAABjf6NYsTdCc_9be4aqQ, expires_in=21599, scope=profile_image profile_nickname, refresh_token_expires_in=5183999}
```

액세스 토큰이 응답되었다.

이 액세스 토큰을 통해 사용자 정보에 접근 가능하다.

#### 사용자 정보 가져오기

![사용자 정보 가져오기](JAVA/포스트/image/Pasted%20image%2020240302184819.png)

![사용자 정보 가져오기 헤더](JAVA/포스트/image/Pasted%20image%2020240302184835.png)

마찬가지로 명세를 해석해보자.

* `Get` 요청과 `Post` 요청을 구분하지 않는다.
* `Authorization` 헤더를 `Bearer 액세스 토큰`으로 설정해라.
* `Content-type` 헤더를 `application/x-www-form-urlencoded;charset=utf-8`

요청을 만들어보자.

```java
String userInfo = WebClient.create("https://kapi.kakao.com/v2/user/me")  
	.post()  
	.header("Authorization","Bearer "+ result.get("access_token"))  
	.header("Content-Type","application/json")  
	.retrieve()  
	.bodyToMono(String.class)  
	.block();
System.out.println(userInfo);
```

##### 응답

```
{"id":필터링,"connected_at":"2024-03-02T09:44:55Z","properties":{"nickname":"필터링","profile_image":"필터링","thumbnail_image":"필터링"},"kakao_account":{"profile_nickname_needs_agreement":false,"profile_image_needs_agreement":false,"profile":{"nickname":"필터링","thumbnail_image_url":"필터링","profile_image_url":"필터링","is_default_image":false}}}
```

개인 정보는 필터링 텍스트로 대체했다.

동의 항목에서 수락했던 프로필 이미지와 닉네임도 출력되고 있다.

##### 전체 코드
```java
@RestController  
public class KakaoRestController {  
    @GetMapping("/kakao/oauth")  
    public void kakao(@RequestParam("code") String code){  
        WebClient webClient = WebClient.create("https://kauth.kakao.com/oauth/token");  
        @SuppressWarnings("unchecked")  
        Map<String, String> result = webClient.post()  
                .uri(uri -> uri  
                        .queryParam("grant_type", "authorization_code")  
                        .queryParam("client_id", 앱키)  
                        .queryParam("redirect_uri", 리다이렉트 주소)  
                        .queryParam("code", code).build())  
                .header("Content-type","application/x-www-form-urlencoded;charset=utf-8")  
                .retrieve()  
                .bodyToMono(Map.class)  
                .block();  
        System.out.println(result);  
  
        String userInfo = WebClient.create("https://kapi.kakao.com/v2/user/me")  
                .post()  
                .header("Authorization","Bearer "+ result.get("access_token"))  
                .header("Content-Type","application/json")  
                .retrieve()  
                .bodyToMono(String.class)  
                .block();  
        System.out.println(userInfo);  
    }  
}
```

해당 예제는 깃허브에서 다운 받아 바로 사용할 수 있다. 

위의 코드에서 앱키와 리다이렉트 주소를 본인 앱의 설정으로 변경해주면 된다.

```HTML
<a href="https://kauth.kakao.com/oauth/authorize?client_id=앱키&redirect_uri=리다이렉트 주소&response_type=code">카카오</a>
```

index의 a태그도 본인 앱의 설정에 맞게 바꾼 후 바로 테스트 가능하다.

또한 본인의 서비스에 도입하게 될 경우 추가적으로 예외 처리가 필요할 수 있다.

카카오 명세에 에러에 따른 redirect code가 정리되어 있다.

링크 : [깃허브](https://github.com/KimYoungHwan8750/kakao-login-example)