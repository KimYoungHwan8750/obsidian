```java
WebClient webClient = WebClient.create(); // 인스턴스 제공받기
WebClient webClient = WebClient.create("http://localhost:8750"); // 또는 기본 요청 생성
String str = webClient.post()
						.uri(uri->{
						return uri.queryParam("queryStringKey","Value").build();})
						.

```