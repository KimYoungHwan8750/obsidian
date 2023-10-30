- URL 객체보다 URLSearchParams 객체의 **활용도가 더 높다.**
- **searchParams 부분만 단독으로 조작할 때** 사용한다. (내장 메서드는 URL 객체의 searchParams와 동일)

```null
const searchParams = new URLSearchParams('hello=zerocho&hi=yena&hi=js');

searchParams.set('bye', 'C#');

// URLSearchParams 객체로 만들어진 주소는 문자열로 변환해줘야 한다.
searchParams.toString(); // 문자열로 변환된 값 (hello=zerocho&hi=yena&hi=js&bye=C%23)

// 'C#'의 '#'이 '%23'으로 변경되었다.
```