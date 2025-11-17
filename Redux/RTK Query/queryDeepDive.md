## Query, Mutation
이 둘의 차이는 캐싱에 있다. Query는 캐싱 데이터를 확인하여 리패칭을 할지 안 할지 결정하여 리소스를 아낀다. 

```ts
// fruitApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const fruitApi = createApi({
  reducerPath: 'fruitApi', // Redux 스토어에서 사용할 키
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Fruit'], // 캐시 태그 타입 정의
  
  endpoints: (builder) => ({
    // Query: 모든 과일 목록 가져오기
    getFruits: builder.query<Fruit[], void>({
      query: () => 'fruits',
      providesTags: ['Fruit'], // 이 쿼리는 'Fruit' 태그를 제공
    }),
    
    // Query: 특정 과일 하나 가져오기
    getFruit: builder.query<Fruit, number>({
      query: (fruitId) => `fruits/${fruitId}`, // fruitId는 과일의 id
      providesTags: (result, error, fruitId) => [
        { type: 'Fruit', id: fruitId } // 특정 과일 태그
      ],
    }),
    
    // Mutation: 새 과일 추가
    addFruit: builder.mutation<Fruit, Omit<Fruit, 'id'>>({
      query: (newFruit) => ({
        url: 'fruits',
        method: 'POST',
        body: newFruit, // { name: '사과', price: 1000, stock: 50 }
      }),
      invalidatesTags: ['Fruit'], // 'Fruit' 태그 무효화 → 목록 리페칭
    }),
    
    // Mutation: 과일 정보 수정
    updateFruit: builder.mutation<Fruit, Partial<Fruit> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `fruits/${id}`, // id는 과일의 id
        method: 'PATCH',
        body: patch, // { price: 1200 }
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Fruit', id }, // 수정한 과일만 리페칭
        'Fruit',               // 전체 목록도 리페칭 (선택사항)
      ],
    }),
    
    // Mutation: 과일 삭제
    deleteFruit: builder.mutation<void, number>({
      query: (fruitId) => ({
        url: `fruits/${fruitId}`, // fruitId는 과일의 id
        method: 'DELETE',
      }),
      invalidatesTags: ['Fruit'], // 전체 목록 리페칭
    }),
  }),
})

export const {
  useGetFruitsQuery,
  useGetFruitQuery,
  useAddFruitMutation,
  useUpdateFruitMutation,
  useDeleteFruitMutation,
} = fruitApi
```

### Tag
태그는 데이터 캐싱에서 아주 중요한 역할을 담당한다.

```ts
getFruits: builder.query<Fruit[], void>({
  query: () => 'fruits',
  providesTags: ['Fruit'], // 이 쿼리는 'Fruit' 태그를 제공
}),
```

RTK Query는 내부적으로 getFruits라는 함수명과 사용된 파라미터등을 직렬화하여 캐싱을 관리한다. 따라서 태그명이 같더라도 getFruits와 getUser가 같은 캐싱을 공유하지 않는다.

태그는 오직 캐싱 무효화에만 사용된다.

mutation은 CRUD에서 CUD를 담당하는데 이때 `invalidatesTags: ['Fruit']`를 사용해 `'Fruit'`에 대한 