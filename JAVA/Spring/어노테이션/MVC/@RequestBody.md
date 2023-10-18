#### RequestBody

비동기 요청의 Body에 적힌 내용을 읽을 수 있다.
보통 클라이언트 측에서 JSON.stringify를 통해 JSON화 시킨 데이터를 처리하게 된다.
객체를 매핑할 때 @RequestBody 어노테이션을 쓰지 않으면 자바는 해당 객체가 어떤 타입인지 인지하지 못해서 null값이 매핑된다.


#### 해당 상황 예제
```java

@PostMapping("/snake")  
public Member_Snake snake(Member_Snake member_snake){  
    log.info("member_snake 값 : {}", member_snake.toString());  
    return member_snake;  
}

// null

@PostMapping("/snakebody")  
public Member_Snake snakebody(@RequestBody Member_Snake member_snake){  
    log.info("member_snake 값 : {}", member_snake.toString());  
    return member_snake;  
}

// 정상작

```
