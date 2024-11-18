# Room
Room이란 안드로이드용 데이터베이스다.

## 사용법
우선 데이터베이스를 프로젝트에 도입하기 위한 기본 구조는 다음과 같다.

1. 앱 데이터베이스 선언
2. 해당 데이터베이스를 제공해주는 모듈(Hilt 사용)
3. 테이블을 생성할 수 있는 Entity (ORM이라 생성한 Entity가 테이블에 매칭된다.)
4. 테이블에 접근할 수 있는 Dao 정의

### @Entity
`data class`로 선언되며, 테이블과 매칭되는 클래스이다.
기본적으로 Entity의 클래스 이름이 테이블의 이름이 되며, 다르게 지정해주고 싶은 경우 `@Entity(tableName = "네임")`을 통해 지정해준다.

```kotlin
@Entity
data class User(
	@PrimaryKey
	val uid: Int,
	val firstName: String,
	val lastName: String,
	/**/
)
```

#### @ColumnInfo
`@ColumnInfo`는 컬럼 정보를 명시적으로 지정해줄 수 있다.
`@ColumnInfo(name = "", defaultValue = "")` 등 다양한 파라미터가 있다.
컬럼 이름은 변수명과 같도록 만들어지는데, name을 수정해서 원하는 컬럼 이름을 지정할 수 있다.

---

### @Database
데이터베이스를 정의한다.
entities 파라미터, version 파라미터가 필수로 요구된다.
autoMigration 파라미터 등 이외 파라미터도 시간 난다면 훑어보는 걸 추천.

우선 entities 파라미터엔 데이터베이스와 매칭할 Entity를 배열에 담아 전달한다.
version은 현재 스키마 버전을 지정하는 것으로, 데이터베이스에 변화가 있을 때 이를 명시적으로 버전을 올림으로써 문제 상황을 예방할 수 있다. 마이그레이션과 함께 해야한다고 하는데 이후 내용 추가가 필요하다.

데이터베이스 정의 클래스는 추상클래스가 되어야하며, 데이터베이스에 접근하는 Dao 객체를 반환하는 추상 메서드를 정의해야한다. 또한 `RoomDatabase` 클래스를 상속받아야한다.

```kotlin
@Database(entities = [UserEntity::class], version = 1)
abstract class AppDatabase: RoomDatabase() {
    abstract fun userDAO(): UserDAO
}
```

%%TODO%%

---

### @Module (Hilt 어노테이션)
@Module은 Hilt에서 사용되는 어노테이션이지만 의존성 관리는 DB와 함께 사용되는 경우가 잦아 같이 정리한다.
[Hilt 문서](Android/Hilt/Hilt.md)

주요 내용은 위 문서 참고.

```kotlin
@Module
@InstallIn(SingletonComponent::class)
object AppModule {
    @Provides
    @Singleton
    fun getDatabase(@ApplicationContext context: Context): AppDatabase{
        return Room.databaseBuilder(
            context,
            AppDatabase::class.java,
            "goingilish"
        ).build()
    }
}
```


### @Dao
데이터베이스에 액세스할 때 사용된다.

```kotlin
@Dao
interface UserDAO {
    @Insert
    suspend fun insert(user: UserEntity)
    @Update
    suspend fun update(user: UserEntity)
    @Delete
    suspend fun delete(user: UserEntity)
    @Query("SELECT * FROM UserEntity")
    suspend fun getAllUser(): List<UserEntity>
}
```

`suspend` 키워드는 일시중단 함수임을 컴파일러에게 알려준다. Room은 suspend 키워드가 명시된 함수를 백그라운드 스레드에서 실행하도록 자동으로 처리해준다.

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
    suspend fun insert(user: UserEntity)
    @Update
    suspend fun update(user: UserEntity)
    @Delete
    suspend fun delete(user: UserEntity)
	@Query ("SELECT * FROM UserEntity")
	suspend fun getAllUsers(): List<UserEntity>
}
```

PrimaryKey가 일치하는 컬럼을 찾아 쿼리를 실행한다.
delete의 경우 PrimaryKey만 일치한다면 나머지 값은 아마도 의미 없을 것이고, insert의 경우엔 NotNull같은 조건만 만족한다면 PrimaryKey와 컬럼 이름만 같다면 insert가 진행될 것이며 update는 PrimaryKey와 일치하는 컬럼이 있다면 해당 컬럼만 수정이 될 것이다.

즉 완전체 UserEntity를 전달해줄 필요가 없다는 말.

#### @Query

---

### ViewModel

