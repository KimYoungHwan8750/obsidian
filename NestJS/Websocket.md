## Nest에서 Websocket 사용하기
사용 방법이 너무 쉽다. 감격스러운 수준;

의존성 설치
`npm i --save @nestjs/websockets @nestjs/platform-socket.io`

`websocket.gateway.ts`, `websocket.module.ts` 생성 후 각각 내용 작성

```ts
// websocket.gateway.ts
import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { from, map, Observable } from "rxjs";
import { Server } from "socket.io";

@WebSocketGateway(80, { namespace: 'inputText', transports: ['websocket'] })
export class WebsocketGateway implements OnGatewayConnection{
  @WebSocketServer()
  server: Server

  @SubscribeMessage('inputText')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log(data);
    return from([1, 2, 3]).pipe(map(item => ({ event: 'inputText', data: item })));
  }
}
```

```ts
// websocket.module.ts
import { Module } from "@nestjs/common";
import { WebsocketGateway } from "./websocket.gateway";

@Module({
  providers: [WebsocketGateway],
})
export class WebsocketModule {}
```

`import` 문도 함께 적었는데, Server 객체 같은 경우는 인텔리센스에 노출되지 않아서 엉뚱한 것을 임포트하지 않게 조심해야한다. `socket.io`의 `Server` 객체다.

`@WebSocketGateway` 데코레이터는 2개의 인자를 받는다.

첫번째는 `port`, 웹소켓 포트를 지정하는 것이고 두번째는 객체를 인자로 받는데 각각 `namespace`, `transports`다.

`namespace`는 `path:port/namespace`로 사용된다. 가령 `localhost`에서 `80`번 포트를 사용하고 `namespace`를 `ws`로 설정하면 `localhost:80/ws`가 웹소켓 커넥션 주소가 된다.

`transports`는 `websocket`을 어떤식으로 구현할지를 정의하는데, 기본값은 `["polling", "websocket"]`이다. 즉 아무런 설정도 하지 않으면 `websocket`을 사용하되 지원이 되지 않는 경우 `polling` 방식을 시도한다. 이는 레거시 브라우저를 지원하기 위한 값이며, 오버헤드가 발생한다. 만약 최신 브라우저만을 상정한다면 `['websocket']`만을 사용해야한다. 트레이드 오프를 잘 생각해서 설정할 것.

### Decorator
파라미터를 간단하게 사용할 수 있는 데코레이터를 지원한다.
`@nestjs/websockets` 경로에서 Import 가능한 `@MessageBody()`, `@ConnectedSocket()`가 예제이다.

만약 데코레이터를 사용하지 않는다면 data에 접근하기 위해 Socket 객체를 사용하지 않더라도 파라미터에 표기를 해주어야한다. 그리고 첫 번째 파라미터는 반드시 Socket 타입, 두 번째 파라미터는 payload로 반드시 순서를 지켜주어야한다.

```ts
@SubscribeMessage('test')
test(_: Socket, data: string): void {
	// Socket 인스턴스를 사용하지 않더라도 data에 접근하기 위해 파라미터에 명시해야함
	// 1번째 파라미터는 Socket 인스턴스, 2번째 파라미터는 payload로 정해져음
	console.log(data.message)
}

// 1번째 파라미터는 data가 아니라 Socket의 인스턴스, 2번째는 payload가 됨. 유의.
@SubscribeMessage('test')
test(data: string, _: Socket): void {
	// Socket 인스턴스를 사용하지 않더라도 data에 접근하기 위해 파라미터에 명시해야함
	// 1번째 파라미터는 Socket 인스턴스, 2번째 파라미터는 payload로 정해져음
	console.log(data.message)
}
```

만약 데코레이터를 사용하지 않고 이 함수를 테스트하기 위해선 Socket 객체의 mock 인스턴스를 생성해야한다. Nest 공식문서에서도 이런 방법을 지양하고 데코레이터를 사용하라고 설명하고 있다.

또한 데이터 구조가 `{"field1": "data1"}`이고, 포맷이 JSON이라면 `data.field1`으로 해당 데이터에 접근 가능하다. 하지만 `@MessageBody` 데코레이터에 `field1` 문자열을 전달해줌으로써 `@MessageBody("field")`과 같이 사용할 수 있고 이것은 `data.field1`로 데이터에 접근하는 것과 같다.

```ts
@SubscribeMessage('test')
test(@MessageBody() data: string): void {
	console.log(data.message)
}
// 또는
@SubscribeMessage('test')
test(@MessageBody("message") data: string): void {
	console.log(data)
}
```

여기에 더해, 데코레이터를 사용하면 파라미터 순서나 갯수에 상관없이 내가 원하는 인스턴스를 사용 가능하다.

간단하게 말해, 순서, 갯수 상관 없이 `@MessageBody(param: string)`은 무조건 payload를 가져오고, `param`에 문자열이 전달되면 해당 `param`에 해당하는 프로퍼티를 읽어온다. `@ConnectedSocket()` 데코레이터도  Socket 인스턴스를 참조할 수 있게 돕는 역할을 한다.

### Server Side에서 메세지를 보내는 법

server 또는 client 객체를 통해서 응답이 가능한데, 다양한 유스케이스를 알아본다.

1. 정확히 받은 메세지에 대해서만 응답할 때 `return`
2. 메세지를 보낸 클라이언트에게만 원하는 채널로 응답할 때 `client.emit`
3. 메세지를 보낸 클라이언트를 제외한 사람들에게만 원하는 채널로 응답할 때 `client.broadcast.emit`
4. 웹소켓에 접속 중인 모든 클라이언트에게 메세지를 보낼 때 `server.emit`
5. 스트림을 생성하여 비동기 데이터를 응답하고 싶을 때 `from`


#### Return
```ts
@SubscribeMessage("test")
test(client: Socket, data: string){
	return "Hello World!";
}

// 같은 기능
@SubscribeMessage("test")
test(client: Socket, data: string){
	client.emit("test", "Hello World!");
}
```

이 경우엔 웹소켓 메세지를 보낸 클라이언트에게 같은 (채널 이름 같은)메타정보를 보낸다. 즉 이 경우 `"test"` 타입 메세지에 `payload`로 `Hello World!`가 담긴 웹소켓 메세지를 전송한다. 웹소켓과 클라이언트간 1:1 통신을 할 때 사용하면 코드가 매우 간결하고 직관적으로 보인다.

#### client.emit
```ts
@SubscribeMessage("test")
test(client: Socket, data: string){
	client.emit("notTest", "This is not test");
	return "당신의 메세지는 잘 전달되었다.";
}
```

이 경우는 유저A로부터 `test` 타입의 메세지를 받았지만 해당 유저에게 응답을 할 땐 `notTest` 메세지로 보내고 싶은 경우다. 예를 들면 유저A로부터 `chat` 타입 메세지를 받았고, 어떤 로직 결과 채팅방이 닫히게 된다. 이를 처리하기 위해 `notice` 메세지를 보낼 수 있다. `notice`는 설명을 위해 임의로 생각한 메세지 타입으로, 채팅과 알림이라는 다른 기능은 당연히 독립적인 기능으로 디자인하는 것이 적절한 아키텍처일 것이다. 이렇게 같은 유저에 대해 다른 타입의 메세지를 보내고 싶을 때 유용하게 사용할 수 있다. return문과 함께 쓰면 `"test"`로도 메세지가 가고, `"notTest"`로도 메세지가 발송된다.

#### client.broadcast.emit
```ts
@SubscribeMessage("test")
test(client: Socket, data: string){
	client.broadcast.emit("notTest", "This is not test");
}
```

이 경우는 웹소켓 메세지를 보낸 당사자를 제외한 클라이언트들에게 메세지를 보낼 수 있다. 가령 텍스트 에디터를 만들어 거기에 작성되는 내용을 다른 사람들과 공유하고 싶을 때, 메세지를 보낸 본인에게도 회신해서 텍스트를 렌더링하게 되면 버퍼링 걸리는 것 같은 느낌이 들 것이다.

#### server.emit
```ts
@WebSocketServer()
server: Server
```

웹소켓 게이트웨이 클래스의 멤버 변수로 server가 있었다. 이것은 말 그대로 서버를 의미하며 `server.emit`을 사용해 웹소켓에 접속 중인 모든 클라이언트들에게 메세지를 전달할 수 있다.

#### from
```ts
@SubscribeMessage("test")
findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
	return from([1, 2, 3]).pipe(map(item => ({ event: "test", data: item })));
}
```

이는 비동기적인 웹소켓 메세지를 보낼 수 있다. from 메서드에 `number[]` 타입을 인자로 전달해 pipe를 형성할 수 있다. map은 from에 전달된 아이템을 순회하면서 각 아이템을 참조하는 변수를 callback에 전달해주는데, 이때 `event`와 `data` 속성을 가진 객체를 반환하게 해주면 비동기 메세지를 처리할 수 있다.

### Lifecycle
간단하다. `OnGatewayInit` 인터페이스에선 `afterInit()`, `OnGatewayConnection` 인터페이스에선 `handleConnection()`, `OnGatewayDisconnect` 인터페이스는 `handleDisconnect()`를 구현하면 된다.

```ts
@WebSocketGateway(80, { namespace: 'inputText', transports: ['websocket'] })
// 해당 인터페이스 구현
export class WebsocketGateway implements OnGatewayConnection{
	@SubscribeMessage('changeLanguage')
	test(_: Socket, data: number): void {
		console.log(data)
	}
	// 해당 메서드 구현
	handleConnection(client: any, ...args: any[]) {
	    console.log('client connected');
	}
}
```

### 모듈 Import
이렇게 만든 `websocket.gateway.ts` 파일을 모듈화한다.
```ts
@Module({
  providers: [WebsocketGateway],
})
export class WebsocketModule {}
```

사용하고자 하는 곳에서 import해서 사용하면 된다. 의존성 주입을 위해선 `exports` 프로퍼티에 export할 모듈을 명시해야하는 것으로 알고 있겠지만, 이것은 웹소켓 게이트웨이로, 앱이 실행되면서 초기화하는 전역 설정이기 때문에 export와는 상관없다.

```ts
@Module({
  imports: [WebsocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

해당 모듈이 어디에서든 import만 된다면 웹소켓 설정은 프로젝트에서 유지된다.

### Client 측 설정
`npm install socket.io-client`로 설치 진행.

`const socket = io("http://localhost/ws", {port: 80});`로 socket을 사용 가능하다. `socket.emit`등 기본 사용법은 서버와 유사하며 `socket.on`으로 메세지를 구독할 수 있다. 공식문서를 읽어보는 것이 베스트.

저 `io()`에 들어갈 path에 대해 여러가지 실험을 진행했는데, 우선 서버측에선(NestJS 기준) `@WebSocketGateway(80, { namespace: "ws", cors: "localhost:5173"})`으로 게이트웨이를 설정했다. 따라서 `localhost:80/ws`로 웹소켓을 연결해야한다.

1. `io("ws")`는 `http://ws`로 연결을 시도했다.
2. `io("/ws")`는 `http://localhost:5173`으로 연결을 시도. 문자열과 상관없었다.
3. `io("http://localhost:80/ws")`는 정상적으로 연결
4. `io("http://localhost/ws", {port: 80})`도 정상적으로 연결
5. `io("localhost/ws", {port: 80})`도 정상적으로 연결
