## 그래픽 작업이 가능한 엘리먼트
프론트, 풀스택을 지망한다면 반드시 익혀야한다. CSS나 JS로도 구현 가능한 애니메이션이나 그래픽은 많겠지만 특화되어있는 API를 사용하는 일은 여러모로 득이 된다.

### 시작하기
```ts
const canvas: HTMLCanvasElement = document.querySelector("canvas");
// 또는 document.createElement("canvas");
const ctx = canvas.getContext("2d");
const response = await fetch("some.png");
const blob = await response.blob();
const imageBitmap = window.createImageBitmap(blob);
canvas.width = imageBitmap.width;
canvas.height = imageBitmap.height;

ctx.drawImage(imageBitmap, 0, 0);
```

이미지 데이터를 받아와서 canvas로 렌더링하는 간단한 예제다. 이제부터 다양한 내용을 소개하겠지만 기본적으로 알아두면 좋은 것은, ctx 인스턴스를 사용해 이미지에 여러가지 작업을 할 거지만 imageBitmap은 원본을 유지한다. 해당 원본은 유지되고, 이에 ctx가 여러가지 그래픽 작업을 마친 후 drawImage로 렌더링한다.

#### 주요 기능 소개
먼저 여러가지 기능들이 많지만 그중에서 특히 자주 사용하게 될 메서드를 먼저 익혀두고 가보자.

##### drawImage(source, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
![](https://i.imgur.com/NJXVt6K.png)

파라미터가 많다고 무서워하지 말자. s와 d라는 prefix가 눈에 띄는데, source, destination을 의미한다. 예를 들면 `drawImage(source, 0, 0, source.width/2, source.height/2)`를 이용하면 1/2사이즈로 렌더링되지만 `drawImage(source, 0, 0, source.width/2, source.height/2, 0, 0, source.width, source.height)`를 하면 1/2 줄어든 사진을 다시 강제로 원본 사이즈로 복구함으로써 1/2로 잘려진 이미지가 원본 크기로 렌더링된다.

- **source**: Image를 의미한다. 위에 보이듯 imageBitmap이나 이미지가 렌더링된 img 엘리먼트를 참조해도 동작한다.

```html
<img
	id="source"
	src="https://mdn.github.io/shared-assets/images/examples/rhino.jpg"
/>
```
이렇게 이미지가 렌더링된 img 요소가 있다.

```ts
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const $img = document.querySelector("img");

ctx.drawImage($img, 0, 0);
</script>
```
해당 엘리먼트에 대한 참조를 drawImage에 전달함으로써 렌더링할 수 있다.

- **sx, sy**: canvas의 0, 0으로부터 얼마나 떨어질 것인지를 정의
- **sWidth, sHeight**: 소스에서의 크기를 지정한다

- **dx, dy**: destination canvas의 0, 0으로부터 얼마나 떨어질 것인지를 정의
- **dWidth, dHeight**: destination canvas의 크기를 지정한다.