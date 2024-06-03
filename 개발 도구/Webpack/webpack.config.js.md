
## webpack.config.js 설정

### 기본 구조
```js
const path = require('path');

module.exports = {
  entry: './src/index.js', // 애플리케이션의 시작 파일
  output: {
    filename: 'bundle.js', // 번들된 파일 이름
    path: path.resolve(__dirname, 'dist'), // 출력 디렉토리
  },
  mode: 'development', // 모드 설정 (development, production, none)
};
```

### entry

```js
entry: './src/index.js', // 단일 진입점

entry: {
  app: './src/app.js',
  admin: './src/admin.js',
}, // 다중 진입점

```

### output

```js
output: {
  filename: '[name].[hashcontent].bundle.js', // 여러 엔트리 포인트에 대해 동적으로 파일 이름을 설정하고 hashcontent를 통해 캐싱 최적화
  path: path.resolve(__dirname, 'dist'),
},

```

#### hashcontent

브라우저 캐싱을 최적화 할 수 있다.

무슨 의미냐면, abc.js 파일을 컴파일 했을 때 abc.dzfsf.bundle.js형태로 파일이 만들어지는데 파일의 내용이 바뀌게 되면 abc.fdasfsz.bundle.js 형태로 바뀐다. 이를 통해 브라우저 캐시를 초기화함으로써 파일명이 변경되면 새로운 파일을 클라이언트에게 제공해주고, 아닌 경우엔 기존 캐시된 파일을 제공해줌으로써 브라우저 로딩 속도를 최적화할 수 있다.

###

```js
// 개발(development), 프로덕션(production), 또는 없음(none) 모드
mode: 'production', // 최적화된 빌드
```

### module

```js
module: {
  rules: [
    {
      test: /\.css$/, // 모든 .css 파일을 처리
      use: ['style-loader', 'css-loader'], // CSS 파일을 JS로 변환하여 DOM에 삽입
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i, // 이미지 파일 처리
      type: 'asset/resource', // 파일을 별도의 리소스로 처리
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader', // ES6+ 문법을 ES5로 변환
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader', // CSS를 DOM에 삽입
        'css-loader', // CSS를 JS로 변환
        'sass-loader', // SCSS를 CSS로 변환
      ],
    },
  ],
},

```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // ... (entry, output, module 설정)
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // HTML 템플릿을 사용하여 번들된 JS를 자동으로 삽입
    }),
    new CleanWebpackPlugin(), // 매 빌드 시 dist 폴더를 청소
  ],
};

```