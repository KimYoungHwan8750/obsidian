## Supabase Realtime (Next.js)

Supabase Realtime은 3가지 기능을 제공한다.

1. **Postgres Changes** — DB의 INSERT/UPDATE/DELETE를 실시간 구독
2. **Broadcast** — 클라이언트 간 저지연 메시지 송수신 (커서 위치, 게임 이벤트 등)
3. **Presence** — 온라인 상태 추적 (접속자 목록, 타이핑 표시 등)

Broadcast와 Presence는 기본 활성화되어 있다. Postgres Changes는 별도 설정이 필요하다.

---

## Postgres Changes

### 사전 설정

테이블에 replication을 활성화해야 한다.

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE your_table_name;
```

테이블에 RLS도 활성화하고 적절한 정책을 설정해야 한다.

### 모든 변경 구독

```typescript
const channel = supabase
  .channel('db-changes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'todos' },
    (payload) => {
      console.log('변경:', payload)
      // payload.eventType: 'INSERT' | 'UPDATE' | 'DELETE'
      // payload.new: 새 행 (INSERT, UPDATE)
      // payload.old: 이전 행 (UPDATE, DELETE)
    }
  )
  .subscribe()
```

### 특정 이벤트만 구독

```typescript
// INSERT만
.on('postgres_changes',
  { event: 'INSERT', schema: 'public', table: 'todos' },
  (payload) => console.log('새 행:', payload.new)
)

// UPDATE만
.on('postgres_changes',
  { event: 'UPDATE', schema: 'public', table: 'todos' },
  (payload) => console.log('수정:', payload.old, '→', payload.new)
)

// DELETE만
.on('postgres_changes',
  { event: 'DELETE', schema: 'public', table: 'todos' },
  (payload) => console.log('삭제:', payload.old)
)
```

### 행 필터링

특정 조건에 맞는 행의 변경만 구독한다. 지원 연산자: `eq`, `neq`, `lt`, `lte`, `gt`, `gte`, `in` (최대 100개)

```typescript
.on('postgres_changes',
  {
    event: 'UPDATE',
    schema: 'public',
    table: 'todos',
    filter: 'status=eq.completed'
  },
  (payload) => console.log(payload)
)

// in 필터
.on('postgres_changes',
  {
    event: '*',
    schema: 'public',
    table: 'todos',
    filter: 'id=in.(1,2,3)'
  },
  (payload) => console.log(payload)
)
```

### 여러 리스너 등록

하나의 채널에 여러 리스너를 등록할 수 있다.

```typescript
const channel = supabase
  .channel('multi')
  .on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'todos' },
    handleInsert
  )
  .on('postgres_changes',
    { event: 'DELETE', schema: 'public', table: 'todos' },
    handleDelete
  )
  .subscribe()
```

### 이전 데이터 조회 (payload.old)

기본적으로 DELETE 이벤트는 PK 컬럼만 포함한다. 전체 이전 행을 받으려면 REPLICA IDENTITY를 설정한다.

```sql
ALTER TABLE todos REPLICA IDENTITY FULL;
```

### 구독 해제

```typescript
await supabase.removeChannel(channel)
```

---

## Broadcast

클라이언트 간 실시간 메시지 전송. DB를 거치지 않으므로 매우 빠르다.

### 수신

```typescript
const channel = supabase
  .channel('room-1')
  .on('broadcast', { event: 'cursor-pos' }, (payload) => {
    console.log('커서 위치:', payload.payload)
  })
  .subscribe()
```

### 송신

```typescript
channel.send({
  type: 'broadcast',
  event: 'cursor-pos',
  payload: { x: 100, y: 200 },
})
```

---

## Presence

접속자의 온라인 상태를 추적한다.

### 상태 동기화

```typescript
const channel = supabase.channel('room-1')

// 전체 상태 동기화
channel.on('presence', { event: 'sync' }, () => {
  const state = channel.presenceState()
  console.log('접속자:', state)
})

// 접속
channel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
  console.log('접속:', key, newPresences)
})

// 퇴장
channel.on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
  console.log('퇴장:', key, leftPresences)
})

channel.subscribe(async (status) => {
  if (status === 'SUBSCRIBED') {
    // 내 상태 등록
    await channel.track({
      user_id: '123',
      online_at: new Date().toISOString(),
    })
  }
})
```

---

## 구독 상태 확인

```typescript
channel.subscribe((status) => {
  // status: 'SUBSCRIBED' | 'CHANNEL_ERROR' | 'TIMED_OUT'
  if (status === 'SUBSCRIBED') {
    console.log('구독 성공')
  }
})
```

---

## 주의사항

- **DELETE 이벤트에 RLS가 적용되지 않는다** — 삭제 이벤트는 RLS 정책과 무관하게 모든 구독자에게 전송됨
- **DELETE 이벤트는 행 필터링이 안 된다** — `filter` 파라미터가 DELETE에서 동작하지 않음
- **REPLICA IDENTITY FULL + RLS 조합**: DELETE 이벤트에서는 여전히 PK만 포함됨
- **테이블 이름에 공백 사용 불가**
- **채널 이름으로 `'realtime'`은 사용 불가**
- 성능: 변경 이벤트는 구독자마다 RLS 체크를 하므로, 구독자가 많으면 부하가 커진다. 고볼륨 시나리오에서는 RLS 없는 별도 테이블 + Broadcast 재전송 패턴을 고려
