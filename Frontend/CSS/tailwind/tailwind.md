# tailwind

class 이름으로 style을 적용하는 프레임워크다.

`npm i tailwindcss`로 설치한 후
`npx tailwindcss init`으로 config 파일을 생성 가능하다.

```js
/* tailwind.config.js */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

content에서 glob패턴을 사용해  해당 파일의 class에 적힌 테일윈드 문법을 실제 css로 치환해준다.