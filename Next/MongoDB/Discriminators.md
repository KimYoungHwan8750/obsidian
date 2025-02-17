## 스키마 상속을 구현
만약 `Parent`가 있고 `ChildA`, `ChildB`가 있다. `Parent`엔 `name`과 `age` 필드만 있으며 `ChildA` 필드는 `name`, `age`, `hobby`, `ChildB`는 `name`과 `age`, `job` 필드가 있다.

|        | name | age | hobby | job |
| ------ | ---- | --- | ----- | --- |
| Parent | o    | o   | x     | x   |
| ChildA | o    | o   | o     | x   |
| ChildB | o    | o   | x     | o   |

즉 `name`, `age`는 공통적으로 존재하는 필드다. 이때 당신은 위와 같이 공통 필드에 각각 `hobby`, `job`을 추가해서 `ChildA`, `ChildB`를 만들고 싶다. 당장 상속을 해달라고 어필하는 듯한 저 스키마들을 보아라.

```ts
// parent.schema.ts
export type UserDocument = HydratedDocument<Parent>;

@Schema({discriminatorKey: 'kind'})
export class Parent {
  @Prop()
  kind: string;
  @Prop()
  name: string;
  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(Parent);
```

`@Schema()` Decorator의 discriminatorKey 속성에 식별자로 사용할 필드를 지정해준다. 이는 `Parent` 또는 `Parent`를 상속받는 스키마를 식별하기 위해 사용한다. 그 값으로는 스키마의 이름, 즉 `Parent.name`인 `Parent`, `Child.name`인 `Child`가 식별자로 추가된다. 이를 보고 어떤 스키마를 통해 데이터가 입력되었는지를 식별할 수 있다.

```ts
// child.schema.ts
export type ChildDocument = HydratedDocument<Child>;

@Schema()
export class Child {
  kind: string;
  @Prop()
  phone: string;
}

export const ChildSchema = SchemaFactory.createForClass(Child);
```

```ts
// app.service.ts
@Injectable()
export class AppService {
  constructor(@InjectModel(Child.name) private child: Model<Child>) {}
  getHello(){
    const child = new this.child({ name: 'Hong Gildong', age: 27, phone: '010-1234-5678'});
    return child.save();
  }
}
```

![MongoDB Atlas Screenshot](https://i.imgur.com/EohuVZD.png)

데이터가 잘 등록된 모습이다.