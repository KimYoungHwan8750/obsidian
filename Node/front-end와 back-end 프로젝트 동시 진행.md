보통 front-end와 back-end를 동시에 작업하게 되면 enum이나 상수, type이 공통으로 사용되는 경우가 많다. 이때 한쪽을 변경하면 다른 한쪽도 손수 변경해서 싱크를 맞추는 것보다 private package나 path alias를 사용해 한 파일로 관리하는 것이 좋다.


```ts
export enum SomeEnum {
	a = 1,
	b = 2
}

export type SomeType = {
	a: string
	b: number
} 
```

```json
{
	"A": "a",
	"B": "b"
}
```

이렇게 json 데이터나 타입, enum 같은 데이터들이 백엔드와 프론트엔드에서 함께 사용되는 포맷인 경우가 많다.

라이브러리화 시켜서 사용하는 방법이 있고, 파일 하나를 가리키게 하는 방법이 있는데 라이브러리화 시키는 것은 부적합하다고 생각했다. 엄연히 프론트와 백에 의존적인 코드를 라이브러리화 시켜서 마치 모듈처럼 사용하는 것은 취향이 아니었다.

따라서 내가 선택한 방법은 path alias를 사용하는 방법.

```
- project
	- shared
	- back-end
	- front-end
```

위와 같이 프로젝트의 루트인 `project` 폴더를 만들고 내부에 백엔드, 프론트엔드, 그리고 양쪽에서 모두 사용할 유틸리티 함수나 데이터를 shared에서 사용하려고 한다.

이를 사용하려면 양측의 tsconfig나 이외 해당 프레임워크 config를 설정해야한다.



