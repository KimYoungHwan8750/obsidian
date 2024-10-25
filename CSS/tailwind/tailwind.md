# tailwind

class 이름으로 style을 적용하는 프레임워크다.

`npm i tailwindcss`로 설치한 후
`npx tailwindcss init`으로 config 파일을 생성 가능하다.

```js
/* tailwind.config.js */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

content에 