```
HTMLAttributes<T>                    // 기본 HTML 속성
  ↓
HTMLAttributes<HTMLInputElement>     // input 요소용 기본 속성
  ↓
InputHTMLAttributes<HTMLInputElement> // + input 전용 속성 (value, type 등)
  ↓
ComponentPropsWithRef<"input">       // + ref
```