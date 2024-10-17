# puppeteer

## 초기 설정

모듈로 사용할 것이 아니라 단일 프로젝트로 운용할 때는 package.json에 "type": "module"을 설정해주면 최상위 await 사용이 가능해져 개발이 편리하다.

```js
import puppeteer from "puppeteer";

const pt = await puppeteer.launch({headless: false});
const page = await pt.newPage();
await page.goto('http://127.0.0.1:5500/test.html');
```

코드 설명

DOM에 접근하기 위한 세 가지 방법이 있다.

newPage로 생성한 page 인스턴스의 메서드가 다음과 같이 있다.

1. waitForSelector
2. Locator
3. $

$는 정적인 리소스에만 접근 가능하며 `waitForSelector`와 `locator`는 요소가 나타날 때까지 대기할 수 있다.

둘의 차이점으론 `locator`가 더 고수준의 api이고, puppeteer 팀에선 locator 사용을 더 권장한다.

아래는 타임아웃을 3초로 제한하며 `.클래스이름`을 찾는 코드이다.

```js
//pt는 puppeteer.launch()로 만들어진 인스턴스임.
const page = await pt.newPage();
// waitForSelector(selector, option?)
await page.waitForSelector('.클래스이름', {timeout: 3000})
```

```js
//pt는 puppeteer.launch()로 만들어진 인스턴스임.
const page = await pt.newPage();
const locator = await page.locator('.클래스이름').setTimeout(3000).waitHandle();
```

locator는 아래와 같이 메서드 체이닝이 가능해 좀 더 권장되는 것 같다. 사용하기 더 편하고 문법이 트렌디하다. (개인적인 감상)

```js
page.locator('.test6')
    .setTimeout(6000)
    .waitHandle()
    .then(async (ele)=>console.log( await ele.evaluate(e=>e.textContent)))
    .catch(e=>{
        console.log('timeout 에러')
    })
    .finally(() => { console.log('무조건 실행') });
```