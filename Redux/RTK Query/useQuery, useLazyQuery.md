# 쿼리
useQuery, useLazyQuery가 반환하는 요소들(isError, data등 상태값)과 Query 옵션에 대한 내용을 기술한다.

## 기본 반환값

```typescript
const {
  data,
  error,
  isLoading,
  isFetching,
  isError,
  isSuccess,
  status,
  fetchStatus,
} = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
})
```

## 1. 데이터 관련

### `data`
```typescript
data: TData | undefined
```
- 성공적으로 가져온 데이터
- 초기값은 `undefined`
- 캐시에 데이터가 있으면 즉시 반환

### `error`
```typescript
error: TError | null
```
- 에러 발생 시 에러 객체
- 성공하면 `null`

## 2. 로딩 상태 (중요! 헷갈리기 쉬움)

### `isLoading`
```typescript
isLoading: boolean
```
- **첫 로딩** 중일 때만 `true`
- 캐시에 데이터가 **없고** + fetching 중

```typescript
// 예시
const { data, isLoading } = useQuery({
  queryKey: ['user', 1],
  queryFn: fetchUser,
})

// 첫 방문: isLoading = true (데이터 없음)
// 새로고침: isLoading = false (캐시된 데이터 있음)
```

### `isFetching`
```typescript
isFetching: boolean
```
- **모든 페칭** 중일 때 `true`
- 백그라운드 리페칭 포함

```typescript
// 예시
const { data, isFetching } = useQuery({
  queryKey: ['user', 1],
  queryFn: fetchUser,
  refetchInterval: 5000, // 5초마다 자동 리페칭
})

// 첫 방문: isFetching = true
// 백그라운드 리페칭: isFetching = true (data는 여전히 있음)
```

### 차이점 시각화

```typescript
// 시나리오 1: 첫 로딩
isLoading: true   ✅
isFetching: true  ✅
data: undefined

// 시나리오 2: 백그라운드 리페칭
isLoading: false  ✅ (이미 데이터 있음)
isFetching: true  ✅ (다시 가져오는 중)
data: { ... }     ✅ (이전 데이터 표시)

// 시나리오 3: 완료
isLoading: false
isFetching: false
data: { ... }
```

## 3. 상태 플래그

### `isSuccess`
```typescript
isSuccess: boolean
```
- 데이터를 성공적으로 가져왔을 때 `true`

### `isError`
```typescript
isError: boolean
```
- 에러 발생 시 `true`

### `isPending`
```typescript
isPending: boolean
```
- 아직 데이터가 없고 로딩 중일 때 `true`
- `isLoading`과 거의 동일 (v5부터 추가)

## 4. 상태 문자열

### `status`
```typescript
status: 'pending' | 'error' | 'success'
```
- **쿼리의 데이터 상태**

```typescript
switch (status) {
  case 'pending':
    return <Spinner />
  case 'error':
    return <Error message={error.message} />
  case 'success':
    return <UserProfile data={data} />
}
```

### `fetchStatus`
```typescript
fetchStatus: 'fetching' | 'paused' | 'idle'
```
- **쿼리의 페칭 상태**

```typescript
// 'fetching': 현재 fetch 중
// 'paused': 네트워크 없어서 일시정지
// 'idle': 아무것도 안하는 중
```

## 5. 추가 유용한 반환값

### `refetch`
```typescript
refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
```
- 수동으로 다시 가져오기

```typescript
const { data, refetch } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  enabled: false, // 자동 실행 방지
})

<button onClick={() => refetch()}>새로고침</button>
```

### `isStale`
```typescript
isStale: boolean
```
- 데이터가 오래되었는지 (stale) 여부
- `staleTime` 설정에 따라 결정

```typescript
const { isStale } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  staleTime: 5000, // 5초 동안은 fresh
})
```

### `dataUpdatedAt`
```typescript
dataUpdatedAt: number
```
- 데이터가 마지막으로 업데이트된 시간 (timestamp)

```typescript
const { data, dataUpdatedAt } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
})

console.log(new Date(dataUpdatedAt)) // 2024-01-15 10:30:00
```

### `errorUpdatedAt`
```typescript
errorUpdatedAt: number
```
- 에러가 마지막으로 발생한 시간

### `failureCount`
```typescript
failureCount: number
```
- 현재까지 실패한 횟수
- 재시도(retry)에 유용

### `failureReason`
```typescript
failureReason: TError | null
```
- 마지막 실패 이유

## 실전 예시

### 예시 1: 로딩 UI 구분

```typescript
function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  })

  if (isLoading) {
    return <FullPageSpinner /> // 첫 로딩: 전체 로딩
  }

  if (error) {
    return <ErrorMessage error={error} />
  }

  return (
    <div>
      {isFetching && <TopBarSpinner />} {/* 백그라운드 리페칭: 작은 스피너 */}
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  )
}
```

### 예시 2: 상태별 처리

```typescript
function DataComponent() {
  const { status, fetchStatus, data, error } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  })

  // 조합으로 세밀한 제어
  if (status === 'pending' && fetchStatus === 'fetching') {
    return <div>처음 로딩 중...</div>
  }

  if (status === 'pending' && fetchStatus === 'paused') {
    return <div>네트워크 연결을 확인해주세요</div>
  }

  if (status === 'error') {
    return <div>에러: {error.message}</div>
  }

  if (status === 'success') {
    return (
      <div>
        {fetchStatus === 'fetching' && <span>업데이트 중...</span>}
        <DataList data={data} />
      </div>
    )
  }
}
```

### 예시 3: 재시도 정보 활용

```typescript
function RobustDataFetch() {
  const { data, error, failureCount, refetch } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
    retry: 3,
  })

  if (error) {
    return (
      <div>
        <p>에러 발생 (시도: {failureCount}/3)</p>
        <button onClick={() => refetch()}>다시 시도</button>
      </div>
    )
  }

  return <div>{data}</div>
}
```

## 핵심 정리

| 반환값 | 언제 사용? |
|--------|-----------|
| `isLoading` | 첫 로딩 스피너 표시 (데이터 없을 때만) |
| `isFetching` | 모든 로딩 상태 (백그라운드 리페칭 포함) |
| `isError` | 에러 UI 표시 |
| `data` | 실제 데이터 렌더링 |
| `error` | 에러 메시지 표시 |
| `refetch` | 수동 새로고침 버튼 |
| `status` | 전체 상태 기반 분기 처리 |

**가장 많이 쓰는 조합:**
```typescript
const { data, isLoading, error } = useQuery(...)

if (isLoading) return <Spinner />
if (error) return <Error />
return <Content data={data} />
```

---

## RTK Query 훅 옵션

### 1. useQuery (자동 실행)

```typescript
const { data, isLoading, error, refetch } = useGetUserQuery(userId, {
  // 옵션들
})
```

### 2. useLazyQuery (수동 실행)

```typescript
const [trigger, result] = useLazyGetUserQuery()

// 나중에 실행
const handleClick = () => {
  trigger(userId)
}
```

## useQuery / useLazyQuery 공통 옵션

### `skip`
```typescript
skip?: boolean
```
- `true`면 쿼리 실행 안함
- 조건부 페칭에 사용

```typescript
const { data } = useGetUserQuery(userId, {
  skip: !userId, // userId 없으면 실행 안함
})
```

### `pollingInterval`
```typescript
pollingInterval?: number
```
- 자동 리페칭 간격 (밀리초)
- 0이면 폴링 안함

```typescript
const { data } = useGetUserQuery(userId, {
  pollingInterval: 3000, // 3초마다 자동 리페칭
})
```

### `refetchOnMountOrArgChange`
```typescript
refetchOnMountOrArgChange?: boolean | number
```
- `true`: 컴포넌트 마운트시 항상 리페칭
- `false`: 캐시된 데이터만 사용
- `number`: N초 후에 리페칭

```typescript
const { data } = useGetUserQuery(userId, {
  refetchOnMountOrArgChange: true, // 항상 최신 데이터
})

const { data } = useGetPostsQuery(undefined, {
  refetchOnMountOrArgChange: 30, // 30초 지났으면 리페칭
})
```

### `refetchOnFocus`
```typescript
refetchOnFocus?: boolean
```
- 윈도우 포커스 돌아올 때 리페칭

```typescript
const { data } = useGetNotificationsQuery(undefined, {
  refetchOnFocus: true, // 탭 돌아오면 새로고침
})
```

### `refetchOnReconnect`
```typescript
refetchOnReconnect?: boolean
```
- 네트워크 재연결시 리페칭

```typescript
const { data } = useGetUserQuery(userId, {
  refetchOnReconnect: true,
})
```

### `selectFromResult`
```typescript
selectFromResult?: (result: UseQueryResult) => any
```
- 반환값 변형 및 최적화
- 특정 필드만 선택 가능

```typescript
// 전체 데이터
const { data } = useGetUserQuery(userId)
// data = { id, name, email, address, ... }

// 필요한 것만 선택
const { userName } = useGetUserQuery(userId, {
  selectFromResult: ({ data }) => ({
    userName: data?.name,
  }),
})
// userName만 변경되면 리렌더링
```

**성능 최적화 예시:**
```typescript
// ❌ 나쁜 예: 매번 리렌더링
function Component() {
  const { data } = useGetUsersQuery()
  const userCount = data?.length // data 변경시마다 리렌더링
}

// ✅ 좋은 예: userCount만 변경시 리렌더링
function Component() {
  const { userCount } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      userCount: data?.length ?? 0,
    }),
  })
}
```

## createApi 전역 옵션

엔드포인트 정의시 설정:

```typescript
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  
  // 전역 옵션
  refetchOnMountOrArgChange: 30, // 기본값 설정
  refetchOnFocus: true,
  refetchOnReconnect: true,
  
  // 캐시 유지 시간 (초)
  keepUnusedDataFor: 60, // 60초 동안 캐시 유지
  
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `users/${id}`,
      
      // 엔드포인트별 옵션 (전역 옵션 오버라이드)
      keepUnusedDataFor: 300, // 이 쿼리만 5분
    }),
  }),
})
```

### `keepUnusedDataFor`
```typescript
keepUnusedDataFor?: number
```
- 구독자가 없을 때 캐시 유지 시간 (초)
- 기본값: 60초

```typescript
getUser: builder.query({
  query: (id) => `users/${id}`,
  keepUnusedDataFor: 300, // 5분간 캐시 유지
})

// 사용 예:
// 1. 컴포넌트 마운트 → API 호출 → 캐시 저장
// 2. 컴포넌트 언마운트 → 5분간 캐시 유지
// 3. 5분 내 재마운트 → 캐시에서 즉시 로드 (네트워크 요청 안함)
// 4. 5분 후 재마운트 → 새로 API 호출
```

## 캐싱 및 무효화 옵션

### `providesTags`
```typescript
providesTags?: TagDescription[]
```
- 이 쿼리가 제공하는 캐시 태그

### `invalidatesTags`
```typescript
invalidatesTags?: TagDescription[]
```
- mutation 성공시 무효화할 태그

```typescript
export const api = createApi({
  tagTypes: ['User', 'Post'],
  endpoints: (builder) => ({
    // Query: 태그 제공
    getUsers: builder.query({
      query: () => 'users',
      providesTags: ['User'],
    }),
    
    getUser: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    
    // Mutation: 태그 무효화
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        'User', // 전체 User 목록도 무효화
      ],
    }),
  }),
})
```

**동작 방식:**
```typescript
// 1. 유저 목록 가져오기
const { data: users } = useGetUsersQuery() // 태그: ['User']

// 2. 특정 유저 가져오기
const { data: user } = useGetUserQuery(1) // 태그: [{ type: 'User', id: 1 }]

// 3. 유저 수정
const [updateUser] = useUpdateUserMutation()
updateUser({ id: 1, name: 'New Name' })
// → invalidatesTags: [{ type: 'User', id: 1 }, 'User']
// → useGetUserQuery(1) 자동 리페칭
// → useGetUsersQuery() 자동 리페칭
```

## 실전 예시

### 예시 1: 조건부 쿼리
```typescript
function UserProfile({ userId }: { userId?: string }) {
  const { data, isLoading } = useGetUserQuery(userId!, {
    skip: !userId, // userId 없으면 실행 안함
  })

  if (!userId) return <div>유저를 선택하세요</div>
  if (isLoading) return <Spinner />
  return <div>{data.name}</div>
}
```

### 예시 2: 실시간 대시보드
```typescript
function Dashboard() {
  const { data } = useGetStatsQuery(undefined, {
    pollingInterval: 5000, // 5초마다 자동 업데이트
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  return <StatsDisplay data={data} />
}
```

### 예시 3: 성능 최적화
```typescript
function UserList() {
  // ❌ 나쁜 예: 전체 데이터 구독
  const { data: users } = useGetUsersQuery()
  const userCount = users?.length

  // ✅ 좋은 예: 필요한 것만
  const { userCount, hasUsers } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data, isSuccess }) => ({
      userCount: data?.length ?? 0,
      hasUsers: !!data?.length,
    }),
  })
  
  return <div>총 {userCount}명</div>
}
```

### 예시 4: useLazyQuery 활용
```typescript
function SearchUser() {
  const [searchTerm, setSearchTerm] = useState('')
  const [trigger, { data, isLoading, isFetching }] = useLazyGetUserQuery()

  const handleSearch = () => {
    trigger(searchTerm)
  }

  return (
    <div>
      <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch} disabled={isLoading}>
        검색
      </button>
      {isFetching && <Spinner />}
      {data && <UserCard user={data} />}
    </div>
  )
}
```

### 예시 5: 캐시 전략
```typescript
export const api = createApi({
  endpoints: (builder) => ({
    // 자주 바뀌는 데이터: 짧은 캐시
    getNotifications: builder.query({
      query: () => 'notifications',
      keepUnusedDataFor: 10, // 10초만 캐시
      refetchOnMountOrArgChange: true,
    }),
    
    // 거의 안 바뀌는 데이터: 긴 캐시
    getCountries: builder.query({
      query: () => 'countries',
      keepUnusedDataFor: 3600, // 1시간 캐시
      refetchOnMountOrArgChange: false,
    }),
  }),
})
```

## useLazyQuery 특별 기능

### trigger 함수 옵션
```typescript
const [trigger, result] = useLazyGetUserQuery()

// preferCacheValue: 캐시 우선
trigger(userId, { preferCacheValue: true })

// 항상 새로 가져오기
trigger(userId, { preferCacheValue: false })
```

### result 객체
```typescript
const [trigger, { data, isLoading, isSuccess, isError }] = useLazyGetUserQuery()

// useQuery와 동일한 반환값
```

## 핵심 정리

| 옵션 | 용도 |
|------|------|
| `skip` | 조건부 실행 |
| `pollingInterval` | 자동 리페칭 |
| `refetchOnMountOrArgChange` | 마운트시 리페칭 |
| `refetchOnFocus` | 포커스시 리페칭 |
| `selectFromResult` | 성능 최적화 |
| `keepUnusedDataFor` | 캐시 유지 시간 |
| `providesTags` | 캐시 태그 제공 |
| `invalidatesTags` | 캐시 무효화 |

더 궁금한 옵션이나 사용 사례 있으면 말씀해주세요!