
@Query로 원하는 JPQL 날리기 가능.
Long타입과 Integer 타입은 엄연히 다름
```
@Query("select m from MyTable m where mytable_key in :item)
@Param("some") List\<Long\> item
```
mytable_key가 item에 해당하는 정보인지 판별하는 위 쿼리를 날렸을 때 key와 item의 타입이 일치해야했음.

```java
@Query("select new com.kyh.toyProject.templates.post.post.dto.PostLikeDTO(m,l.nickname) from PostEntity m left outer join LikeEntity l on m.postId = l.postId where l.nickname = :nickname and m.tagTop = :tagTop")
```
직접 생성자를 사용해 반환받을 객체를 지정 가능했음

finyByNickname등 메서드이름으로 원하는 동작이 가능한데, @Query를 사용할 땐 위처럼 기능이 있는 메서드명과 다르게 설정해야했다.

