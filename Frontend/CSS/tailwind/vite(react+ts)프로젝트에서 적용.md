```ts
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

테일윈드 작업 중 자꾸 스타일이 적용되지 않는 문제가 발생하는데, 공식문서에는 없는 `css` 항목을 작성해주면 해결된다.