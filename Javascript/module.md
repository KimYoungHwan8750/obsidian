# module

## 동적 import

```js
const puppeteer = (await import('puppeteer')).default;
```

## CommonJS 방식 import

```js
const puppeteer = require('puppeteer');
```

## ES Module 방식 import

```js
import puppeteer from 'puppeteer';
```

