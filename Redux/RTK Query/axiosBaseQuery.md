## AxiosBaseQuery
RTK Query에서 기본으로 제공해주는 fetchBaseQuery는 대부분의 요구 사항을 처리할 수 있지만 axios 같은 경우 인터셉터나 기타 유용한 유틸리티 함수를 많이 제공하기 때문에 fetch보다 생산성 있게 코드를 작성할 수 있다.

아래는 fetchBaseQuery 대신 사용할 axiosBaseQuery를 정의하는 내용이다.

```ts
import { createApi } from '@reduxjs/toolkit/query'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import { EXPORT_MARKER } from 'next/dist/shared/lib/constants'

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }
export default axiosBaseQuery
```

```ts
// axiosBaseQuery 사용
export const insertUserApi = createApi({
    reducerPath: "postUserApi",
    baseQuery: axiosBaseQuery({baseUrl: "localhost:3000/api"}),
    endpoints: (build) => ({
        postUser: build.mutation<User, User>({
            query: (user: User) => ({
                url: "/user",
                method: "POST",
                body: user
            })
        })
    })
})
```