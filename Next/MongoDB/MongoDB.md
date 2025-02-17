## Nest에서 MongoDB 사용하기
Nest에서 MongoDB를 사용하는 방법은 여러가지가 있을 수 있겠지만, 공식 문서에서는 두 가지 선택지가 있으며 이 중에서 `mongoose` 패키지를 이용한다.

`npm i @nestjs/mongoose mongoose`로 패키지 설치

### Root 모듈에 MongoDB Connection 생성하기

```ts
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
```

`MongooseModule.forRoot(url?: string)` 함수에 url을 전달한다. 이는 MongoDB의 데이터베이스 URL이며 dotenv 패키지(`npm i --save @nestjs/config`)를 사용해 반드시 환경 변수를 사용한다.

### Schema
MongoDB를 이용하려면 우선 Schema를 정의해야한다. 주민등록증을 만든다면 이름과 주민등록번호, 발급일자, 라이센스의 고유 번호 같은 것이 있을 수 있겠다. 이번 예제에서는 User Schema를 생성하여 데이터베이스에 연결하고 실제 CRUD를 진행해본다.

```ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

`SchemaFactory.createForClass(class: Class)`는 TypeScript의 Class를 MongoDB의 Schema로 변환해준다. 예를 들면 위 함수는 다음과 같이 변환된다.

```ts
export const UserSchema = new Schema({
  name: { type: String },
  age: { type: Number }
});
```

이러한 번거로운 작업을 mongoose가 대신 해주는 것이다.

### Module
이제 사용하고 싶은 모듈에서 해당 스키마의 인스턴스(모델)를 등록해주면, 해당 모듈 스코프에서 모델을 주입받아 사용 가능하다.

```ts
@Module({
  imports: [
    MongooseModule.forFeature([{name: "example", schema: UserSchema}]),
  ],
  controllers: [MyController],
  providers: [MyService],
})
export class MyModule {}
```

이 작업은 컨트롤러와 모델, 서비스를 연결해주는 모듈을 생성한다. 이로써 독립된 세 레이어가 모여서 User를 다루는 완성된 기능을 하는 하나의 모듈이 되었다.

### Service
```ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './your/path';
@Injectable()
export class MyService {
  constructor(@InjectModel("example") private user: Model<User>) {}
  getHello(){
    const user = new this.user({ name: 'Hong GilDong', age: 27 });
    return user.save();
  }
}
```
이렇게 간단하게 MongoDB에 접속해서 스키마를 만들고, 데이터를 넣을 수 있다. 요즘은 쓰기편한게 트렌드인지 어떤 플랫폼, 어떤 언어를 써도 간단한 Configuration만으로도 DB를 사용 가능하다지만, 그 중에서도 독보적으로 편하다는 느낌을 받았다.

### DeepDive
딥다이브라고 하기엔 거창하지만, 추가적인 내용에 대해 정리를 해볼까 한다.

#### URL
우선 접속 URL인데, 다음과 같은 형태를 지녔다.

`mongodb+srv://아이디:비밀번호@cluster0.wzakk.mongodb.net/데이터베이스이름?retryWrites=true&w=majority&appName=앱이름`

여기에 MongoDB [Atlas](https://cloud.mongodb.com/)에서 DB의 아이디와 비밀번호를 확인하고 아이디, 비밀번호, 데이터베이스 이름을 위에 언급한 포맷에 맞게 적어넣으면 된다. 데이터베이스 이름에 해당하는 DB에 연결되는데 이때 해당 DB가 없으면 해당 이름으로 DB가 생성된다. 만약 아무것도 적지 않으면 기본적으로 test라는 DB를 가리키게 된다.

#### Hooks
Module에서 사용된 `MongooseModule.forFeature([{name: ?, schema: ?}])`가 아닌 `MongooseModule.forFeatureAsync([{name: ?, useFactory: ?}])`를 사용해서 미들웨어를 적용할 수 있다.
```ts
MongooseModule.forFeatureAsync([{name: "example", useFactory: () => {
  const schema = UserSchema;
  schema.pre("save", function() {
	console.log("save");
  });
  return schema;
}}]),
```

이것은 스키마에 save가 발생하기 전에 `"save"` 문자열을 콘솔에 출력하게 된다.

#### Connection 상태
RootModule 스코프에서 `MongooseModule.forRoot("url", {options})`으로 옵션 설정이 가능하다.

```ts
MongooseModule.forRoot('mongodb://localhost/test', {
  onConnectionCreate: (connection: Connection) => {
    connection.on('connected', () => console.log('connected'));
    connection.on('open', () => console.log('open'));
    connection.on('disconnected', () => console.log('disconnected'));
    connection.on('reconnected', () => console.log('reconnected'));
    connection.on('disconnecting', () => console.log('disconnecting'));

    return connection;
  },
}),
```
이 옵션에서 커넥션의 생명주기에 따라 event listener를 생성할 수 있다.