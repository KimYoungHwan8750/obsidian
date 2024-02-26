
## Content Type?

스프링 부트를 통해 웹 개발을 하다보면 의문이 하나 떠오릅니다.

Content Type에 왜 x-www-form-urlencoded나 application/json 같은 타입을 설정해야할까?

개발을 조금이라도 해봤다면 숨쉬듯이 자연스러운 거지만, 제가 갓 코딩을 시작했을 무렵엔 `Content-Type`를 적절하게 설정해야하는 이유가 크게 와닿지 않았습니다.

데이터를 수신하는 측에서 헤더를 참조해 올바른 처리를 할 수 있다는 얘기가 뭘 의미하는 걸까요?

바로 알아보겠습니다.

## MIME (Multipurpose Internet Mail Extensions)

발음은 마임입니다.
MIME은 종류가 너무 많기 때문에 그때그때 필요한 내용을 구글링을 통해 찾아서 쓰시면 됩니다.
팁을 하나 드리자면 `Spring boot` 프레임워크를 사용하시는 분은 `spring-web` 라이브러리에서 `org.springframework.http`경로에 들어가 `mime.types` 파일을 통해 1855줄 분량에 해당하는 MIME 타입을 확인할  수 있습니다.

자주 쓰이는 MIME 몇 가지를 소개해드리겠습니다.

| MIME                  | 용도                |
| --------------------- | ----------------- |
| x-www-form-urlencoded | 단순 텍스트로 이루어진 웹 요청 |
| multipart/form-data   | 파일이나 이진 데이터       |
| application/json      | JSON 파일           |
| image/확장자             | image             |
| video/확장자             | video             |
| audio/확장자             | audio             |
| text/plain            | 단순 텍스트            |
| text/html             | html              |

그 외에도 본인의 개발 환경에 따라 자주 쓰이는 MIME 타입은 언제든지 바뀝니다.

## 그래서, Content Type를 설정하고 말고 무슨 차이가 있을까

### 예제

#### 파일 구조

![](JAVA/Spring/HTTP/헤더/image/Pasted%20image%2020240226035120.png)

#### 개요

RestController에서 `templates/image.png` 경로에 있는 image.png를 응답해주는 간단한 예제입니다.

#### RestController

```java
@RestController
public class RestController {  
    @GetMapping("/image")  
    public ResponseEntity<byte[]> getImage(){  
        ClassPathResource classPathResource = new ClassPathResource("templates/image.png");  
        try (InputStream inputStream = new FileInputStream(classPathResource.getFile())){  
            byte[] data = inputStream.readAllBytes();  
            inputStream.close();  
            return new ResponseEntity<>(data, HttpStatus.OK);  
        } catch (IOException e){  
            e.printStackTrace();  
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);  
        }  
    }  
}
```
#### RestController (수정)

```java
@RestController
public class RestController {  
    @GetMapping("/image")  
    public ResponseEntity<byte[]> getImage(){  
    /* 여기서 */
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.IMAGE_PNG);  
    /* 여기까지 내용 추가 */
        ClassPathResource classPathResource = new ClassPathResource("templates/image.png");  
        try (InputStream inputStream = new FileInputStream(classPathResource.getFile())){  
            byte[] data = inputStream.readAllBytes();  
            inputStream.close();  
            // ResponseEntity로 설정한 헤더를 추가로 응답
            return new ResponseEntity<>(data, httpHeaders, HttpStatus.OK);  
        } catch (IOException e){  
            e.printStackTrace();  
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);  
        }  
    }  
}
```

Content Type 헤더를 `image/png`로 설정한 것만 빼면 똑같은 코드입니다.

![](JAVA/Spring/HTTP/헤더/image/Pasted%20image%2020240226040703.png)

위와 같은 주소로 요청을 보냈는데 이번엔 이미지가 표시됩니다.
Header의 `Content-Type`를 읽고 올바른 해석을 했기 때문에 사진이 정상적으로 표시됩니다.

눈치빠른 분들은 아셨겠지만 `<img src="주소">` 형태로 이미지를 표시할 때 이런 과정을 거치게 됩니다.
`<img>` 태그는 src에 적힌 주소로 요청을 보내고 해당 주소에서 응답받은 값을 이미지로 해석해 처리합니다.

정말 그런지 확인해보겠습니다.

#### Index.html

```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>Title</title>  
</head>  
<body>  
여기는 메인 화면입니다.  
<img src="/image" alt="이미지">  
</body>  
</html>
```

메인 화면을 위와 같이 구성한뒤 웹을 실행해보겠습니다.

![](JAVA/Spring/HTTP/헤더/image/Pasted%20image%2020240226041619.png)

이미지 태그에서 정상적으로 이미지가 출력됩니다.
이상으로 `Content Type`을 왜 설정해야하며 해당 헤더가 어떻게 활용되는지 알아보았습니다.