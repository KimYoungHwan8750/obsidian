## ORM이란?
객체지향 모델을 의미한다. 모델(스키마)를 정의해서 테이블의 청사진을 제작하면 DB는 이 스키마를 토대로 실제 테이블을 만든다.

```SQL
SELECT user.id
FROM user;
```

이러한 쿼리를 마치 객체를 다루는 것처럼 작성할 수 있다.

```ts
const user = prisma.user.findOne({
	where: {
		id: 1,
	},
})
```

마치 객체에서 값을 가져오는 것처럼 보여진다. 이는 DB를 의식하지 않고 로직에 집중할 수 있게 도와준다.

```ts
model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  role    Role     @default(USER)
  posts   Post[]
  profile Profile?
}
```

이렇게 정의한 스키마도 역시 다음과 같이 변환된다.

```SQL
CREATE TABLE USER (
	id INT Primary Key
)
```