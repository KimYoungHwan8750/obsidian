## Supabase Database (Next.js)

Supabase는 PostgreSQL 데이터베이스를 제공하고, JavaScript 클라이언트로 CRUD 및 필터링, RPC 호출이 가능하다.

---

## SELECT (조회)

### 전체 조회

```typescript
const { data, error } = await supabase
  .from('countries')
  .select()
```

기본적으로 최대 1,000행이 반환된다. 프로젝트 API 설정에서 변경 가능.

### 특정 컬럼만 조회

```typescript
const { data, error } = await supabase
  .from('countries')
  .select('name, id')
```

### 카운트만 조회 (데이터 없이)

```typescript
const { count, error } = await supabase
  .from('countries')
  .select('*', { count: 'exact', head: true })
```

### 관계 테이블 조인

외래키가 설정된 경우 자동으로 조인할 수 있다.

```typescript
// countries 테이블의 cities 관계 조회
const { data, error } = await supabase
  .from('countries')
  .select('name, cities(name, population)')
```

### Inner Join

관계 테이블에 데이터가 있는 행만 조회한다.

```typescript
const { data, error } = await supabase
  .from('countries')
  .select('name, cities!inner(name)')
```

### JSON 컬럼 접근

```typescript
const { data, error } = await supabase
  .from('users')
  .select('address->city')
```

---

## INSERT (삽입)

### 단건 삽입

```typescript
const { error } = await supabase
  .from('countries')
  .insert({ id: 1, name: 'Denmark' })
```

삽입된 행은 기본적으로 반환되지 않는다. `.select()`를 체이닝하면 반환된다.

```typescript
const { data, error } = await supabase
  .from('countries')
  .insert({ id: 1, name: 'Denmark' })
  .select()
```

### 다건 삽입

```typescript
const { error } = await supabase
  .from('countries')
  .insert([
    { id: 1, name: 'Denmark' },
    { id: 2, name: 'Sweden' },
  ])
```

---

## UPDATE (수정)

**반드시 필터와 함께 사용해야 한다.** 필터 없이 호출하면 모든 행이 수정된다.

```typescript
const { error } = await supabase
  .from('instruments')
  .update({ name: 'piano' })
  .eq('id', 1)
```

수정된 행 반환:

```typescript
const { data, error } = await supabase
  .from('instruments')
  .update({ name: 'piano' })
  .eq('id', 1)
  .select()
```

### JSON 컬럼 수정

```typescript
const { data, error } = await supabase
  .from('users')
  .update({
    address: { street: 'Melrose Place', postcode: 90210 }
  })
  .eq('address->postcode', 90210)
  .select()
```

---

## DELETE (삭제)

**반드시 필터와 함께 사용해야 한다.**

```typescript
const { error } = await supabase
  .from('countries')
  .delete()
  .eq('id', 1)
```

여러 행 삭제:

```typescript
const { error } = await supabase
  .from('countries')
  .delete()
  .in('id', [1, 2, 3])
```

삭제된 행 반환:

```typescript
const { data, error } = await supabase
  .from('countries')
  .delete()
  .eq('id', 1)
  .select()
```

---

## UPSERT (삽입 또는 수정)

Primary Key가 같은 행이 있으면 UPDATE, 없으면 INSERT한다. **Primary Key를 반드시 포함해야 한다.**

```typescript
const { data, error } = await supabase
  .from('instruments')
  .upsert({ id: 1, name: 'piano' })
  .select()
```

### 충돌 컬럼 지정

PK가 아닌 다른 유니크 컬럼으로 충돌 판단:

```typescript
const { data, error } = await supabase
  .from('users')
  .upsert(
    { id: 42, handle: 'saoirse', display_name: 'Saoirse' },
    { onConflict: 'handle' }
  )
  .select()
```

---

## RPC (서버 함수 호출)

PostgreSQL 함수를 JavaScript에서 호출한다.

```typescript
const { data, error } = await supabase.rpc('hello_world')
```

### 인자 전달

```typescript
const { data, error } = await supabase.rpc('echo', { say: 'hello' })
```

### 필터 체이닝

```typescript
const { data, error } = await supabase
  .rpc('list_stored_countries')
  .eq('id', 1)
  .single()
```

### 읽기 전용 (HTTP GET으로 호출, 캐싱 가능)

```typescript
const { data, error } = await supabase.rpc('hello_world', undefined, { get: true })
```

---

## 필터

모든 필터는 `.select()`, `.update()`, `.delete()`, `.rpc()` 뒤에 체이닝할 수 있다.

### 비교 필터

| 메서드 | 연산자 | 예시 |
|--------|--------|------|
| `.eq(col, val)` | `=` | `.eq('name', 'Leia')` |
| `.neq(col, val)` | `!=` | `.neq('name', 'Leia')` |
| `.gt(col, val)` | `>` | `.gt('age', 18)` |
| `.gte(col, val)` | `>=` | `.gte('population', 1000)` |
| `.lt(col, val)` | `<` | `.lt('population', 10000)` |
| `.lte(col, val)` | `<=` | `.lte('age', 65)` |

NULL 체크는 `.eq()`가 아닌 `.is()`를 사용한다.

```typescript
.is('deleted_at', null)
```

### 패턴 매칭

```typescript
.like('name', '%eia%')    // 대소문자 구분
.ilike('name', '%eia%')   // 대소문자 무시
```

### 배열/집합 필터

```typescript
.in('id', [1, 2, 3])                  // id가 1, 2, 3 중 하나
.contains('tags', ['react', 'next'])   // tags가 두 값을 모두 포함
.containedBy('tags', ['react', 'next', 'vue'])  // tags가 주어진 집합의 부분집합
.overlaps('tags', ['react'])           // 공통 요소가 있음
```

### OR 조건

```typescript
// PostgREST 문법 사용
.or('id.eq.2,name.eq.Han')

// AND와 결합
.or('id.gt.3,and(id.eq.1,name.eq.Luke)')
```

### NOT

```typescript
.not('name', 'eq', 'Leia')
```

### Full-Text Search

```typescript
.textSearch('content', `'eggs' & 'ham'`, { config: 'english' })

// 웹 스타일 검색
.textSearch('catchphrase', `'fat or cat'`, { type: 'websearch', config: 'english' })
```

---

## 모디파이어

### 정렬

```typescript
.order('id', { ascending: false })

// 관계 테이블 정렬
.order('name', { referencedTable: 'instruments', ascending: false })
```

### 제한

```typescript
.limit(10)
```

### 페이지네이션 (range)

0-indexed, 양쪽 포함.

```typescript
.range(0, 9)    // 첫 10개 (0~9)
.range(10, 19)  // 다음 10개 (10~19)
```

### 단일 행 반환

```typescript
// 정확히 1행이 아니면 에러
.select('name').limit(1).single()

// 0행이면 null, 1행이면 객체 (에러 없음)
.select('name').limit(1).maybeSingle()
```

---

## RLS (Row Level Security)

### 활성화

```sql
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
```

RLS를 활성화하면 정책이 없는 경우 API에서 0행이 반환된다. 반드시 정책을 생성해야 한다.

### SELECT 정책

```sql
-- 모든 사용자 조회 가능
CREATE POLICY "공개_조회" ON posts
  FOR SELECT TO anon, authenticated
  USING (true);

-- 본인 데이터만 조회
CREATE POLICY "본인_조회" ON posts
  FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);
```

### INSERT 정책

```sql
CREATE POLICY "본인_삽입" ON posts
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);
```

### UPDATE 정책

UPDATE는 `USING`(기존 행 조건)과 `WITH CHECK`(수정 후 행 조건) 모두 필요하다. UPDATE 실행에는 SELECT 정책도 필요하다.

```sql
CREATE POLICY "본인_수정" ON posts
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);
```

### DELETE 정책

```sql
CREATE POLICY "본인_삭제" ON posts
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) = user_id);
```

### 성능 팁

1. 정책에서 사용하는 컬럼에 인덱스를 추가한다
2. `auth.uid()`를 `(SELECT auth.uid())`로 감싸면 쿼리 플래너가 결과를 캐시한다
3. `TO authenticated` 또는 `TO anon`을 명시한다
4. 쿼리에도 정책 조건과 같은 WHERE를 추가하면 옵티마이저가 활용할 수 있다

### 주의사항

- `service_role` 키는 **모든 RLS를 우회**한다. 절대 클라이언트에 노출하지 말 것
- View는 기본적으로 RLS를 우회한다. Postgres 15+에서는 `WITH (security_invoker = true)` 옵션으로 방지
