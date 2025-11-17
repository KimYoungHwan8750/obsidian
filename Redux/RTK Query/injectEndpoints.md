보통 api를 하나만 정의해놓고 endpoints에 모든 내용을 추가하게 되는데 가독성이 저하된다. 그렇다고 나누자니 스토어에 등록해야되는 미들웨어가 많아지며 같은 옵션을 공유하는 객체가 많아지므로 중복 코드 처리에 대한 고민을 해야한다.

```ts
const store = configureStore({
    reducer: {
        user: UserReducer,
        ...apiReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
			.concat(userApi.middleware)
			.concat(accountApi.middleware)
			.concat(purchaseApi.middleware)
			.concat(testApi.middleware)
			.concat(externalApi.middleware)
			// 정의된 api 마다 미들웨어를 추가해줘야함
			// 미들웨어는 자동으로 캐시르 정리하는 등 메모리 관리를 해주기 때문에 반드시 등록 필요
})
```

이 경우 baseApi를 비워두고 injectEndpoints를 사용하여 확장하면 baseApi를 깔끔하게 재사용 가능하다.

```ts
// src/services/api.ts (베이스)
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['User', 'Post', 'Comment'],
  endpoints: () => ({}), // 비어있음
})
```

```ts
// src/services/user.ts
import { api } from './api'

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `users/${id}`,
    }),
  }),
})

export const { useGetUserQuery } = userApi
```

```ts
// src/services/post.ts
import { api } from './api'

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
    }),
  }),
})

export const { useGetPostsQuery } = postApi
```