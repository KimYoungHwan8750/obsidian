# Dynamic Route

## \[slug]

\[]를 이용해 동적 경로를 가져올 수 있다.

`src/[tttt]/mypage/`와 같이 경로를 구성한 후 `mypage/page.tsx`에 다음과 같이 내용을 작성한다.

또한, 페이지를 구성하는 함수에 전달받는 객체엔 params와 searchParams가 있다.

```tsx
type MyPageProps = {
    params: {
        tttt:string
    },
	searchParams: {
		[key: string] : string | string[] | undefined
	}
}

export default function MyPage({params, searchParams} : MyPageProps){
    return(
        <div>
            <p>
                마이페이지에용 내용은 : {params.swag}
            </p>
            <p>
                파라미터는 : {searchParams.myname}
                파라미터는 : {searchParams.ㅋㅋ}
            </p>
        </div>
    )
}
```

`page.tsx`에 위와 같이 내용을 작성한 후 `localhost:3000/realgood/mypage?myname=abc&ㅋㅋ=웃음` 경로로 접속하면 `마이페이지에용 내용은 : realgood`, `파라미터는 : abc`, `파라미터는 : 웃음`이 출력된다.

## \[...slug]

`src/[...slug]/page.tsx` 같은 경우 `localhost:3000/page1/page2/page2`로 접속하면 `params.slug`에 `"page1", "page2", "page3"`가 담긴다. 폴더명이 `[....abcd]`면 `params.abcd`로 접근 가능.

이때 주의할 것이 `[...slug]`는 반드시 경로의 마지막에 와야한다.

`src/page/[...slug]`는 가능하지만 `src/[...slug]/page`는 에러가 발생한다.

나머지 값들을 가져오는 스프레드 연산자를 생각해보면 당연한 동작.