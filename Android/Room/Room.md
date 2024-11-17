# Room
Room이란 안드로이드용 데이터베이스다.

## 사용법
Entity와 DAO를 작성한다.

### Entity
`data class`로 선언되며, 테이블과 매칭되는 클래스이다.
기본적으로 Entity의 클래스 이름이 테이블의 이름이 되며, 다르게 지정해주고 싶은 경우 `@Entity(tableName = "네임")`을 통해 지정해준다.

```kotlin
data class User(
	@PrimaryKey
	val uid: Int,
	val firstName: String,
	val lastName: String,
)
```

### Dao
데이터베이스에 액세스할 때 사용된다.

#### @Insert
자동으로 데이터베이스에 추가하는 쿼리를 작성해준다.

#### @Update
자동으로 데이터베이스에 업데이트하는 쿼리를 작성해준다.

#### @Delete
자동으로 데이터베이스에서 삭제하는 쿼리를 작성해준다.

#### @Insert, @Update, @Delete 예제
```kotlin
@Dao
interface UserDAO {
    @Insert
    fun insert(user: UserEntity)
    @Update
    fun update(user: UserEntity)
    @Delete
    fun delete(user: UserEntity)
}
```

PrimaryKey가 일치하는 컬럼을 찾아 쿼리를 실행한다.
delete의 경우 PrimaryKey만 일치한다면 나머지 값은 아마도 의미 없을 것이고, insert의 경우엔 NotNull같은 조건만 만족한다면 PrimaryKey와 컬럼 이름만 같다면 insert가 진행될 것이며 update는 PrimaryKey와 일치하는 컬럼이 있다면 해당 컬럼만 수정이 될 것이다.

즉 완전체 UserEntity를 전달해줄 필요가 없다는 말.

#### @Query