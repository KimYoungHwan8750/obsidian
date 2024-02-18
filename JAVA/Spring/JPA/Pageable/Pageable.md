### Pageable이란?
page, size, sort와 관련된 기능을 제공하는 객체이다.

임포트
`org.springframework.data.domain.Pageable`

### PageRequest
Pageable 객체를 구현한 객체이다.

### 사용법
```Java
@Repository
public interface OOO extends JpaRepository<OOOEntity,Id>{
	OOOEntity findById(OOO, Pageable pageable)
}
```

### Page
쿼리의 파라미터로 Pageable 인터페이스를 넘겨주면
Page<원하는 Entity> 의 형태로 반환해준다.
여러 로우라면 `Page<List<원하는Entity>>`의 형태로 반환된다.
