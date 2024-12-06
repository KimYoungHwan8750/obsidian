# My VS Code
내가 자주 사용하는 단축키나 VS Code 플러그인 등 VS Code 관련 유용한 팁들을 적을 노트이다.

## 설정
`Files: Auto Save` - `afterDelay`: 필수 기능. 자동 저장을 활성화한다.

`Editor: Tab Size` - `2`: 탭 칸수 2


## 커멘드
`Indent Using Spaces` - `2`: indent를 space로 처리하고 2칸 간격으로 설정
`Reindent Lines`: 탭으로 4칸 간격으로 들여쓰기 된 문서를 `Indent Using Spaces`를 이용해 바꿨을 때 문서 Indent를 다시 정렬해주는 커멘드

## 단축키

`CTRL+,`: VSCode 설정을 연다.

`CTRL+SHIFT+P`: VSCode Command를 연다.

`CTRL+K`: 한 줄을 통째로 삭제한다. `CTRL+X`를 사용했었는데 클립보드에 내용이 저장돼서 그런 동작을 원하지 않을 때가 다소 있었다. 이를 이용하면 된다.

`ALT+CTRL+LEFT` 또는 `ALT+CTRL+RIGHT`: 현재 탭을 이동시킨다. 만약 탭이 하나만 열려있으면 자동으로 스플릿 화면을 만들어준다.

`CTRL+\`: 현재 탭을 복사하여 오른쪽으로 분할시킨다. 오른쪽에 탭이 있어도 반드시 하나의 탭을 더 만들어서 오른쪽으로 분할시킨다. 자주 쓰진 않지만 분명히 사용한 적은 있기에 적는다.

`CTRL+D`: 현재 커서를 단어로 확장시킨다. 단어로 확장한 뒤에 한 번 더 `CTRL+D`를 실행하면 같은 단어를 병렬 선택하게 된다. 코드를 복붙해서 특정 단어만 교체할 때 유용하다.

`F2`: 변수나 클래스등 특정 요소 이름을 바꿀 때 사용한다. `CTRL+D`와 비슷한 기능을 하지만, `CTRL+D`는 현재 선택된 커서 이후에 등장하는 단어를 순차적으로 선택할 수 있고, `F2`의 경우 현재 파일 뿐만 아니라 해당 변수를 임포트해서 사용하는 다른 파일에도 영향을 끼칠 수가 있다. `F2`로 파일명을 입력하고 엔터를 누르면 적용할 페이지(센스있게 현재 페이지만 선택되어 있다)를 선택해서 Rename을 수행할 수 있다.

`CTRL+SHIFT+\`: `()`나 `{}`등 현재 스코프가 속한 괄호의 시작점과 끝 점을 번갈아가며 이동할 수 있다.

`CTRL+[` 또는 `CTRL+]`: `[`로 들여쓰기를, `]`로 내어쓰기를 수행한다.

`TAB` 또는 `SHIFT+TAB`: `SHIFT+TAB`으로 들여쓰기를, `TAB`으로 내어쓰기를 수행한다. `CTRL+[`, `CTRL+]`와 다른점은, `SHIFT+TAB`은 `CTRL+[`과 같은 동작을 하지만 `TAB`은 현재 커서를 기준으로 내어쓰기를 진행하기 때문에 단어가 중간에 끊어지지만(아마 대부분 이런 동작을 원하지 않을 것이다), `CTRL+]`은 현재 라인을 통째로 내어쓰기하기 때문에 내가 자주 사용한다.

`CTRL+백틱`: 터미널 창을 연다.

`CTRL+SHIFT+백틱`: 새로운 터미널을 연다.

`CTRL+SHIFT+V`: 마크다운 문서를 Viewer로 연다. (md 파일에서만 작동, 일반 파일에선 서식 없는 붙여넣기로 동작한다.)

`CTRL+PAGE DOWN` 또는 `CTRL+PAGE UP`: `PAGE UP`은 왼쪽으로, `PAGE DOWN`은 오른쪽으로 탭을 전환한다. 분할탭도 포함해서 무조건 왼쪽 또는 오른쪽 탭으로 이동한다.

`CTRL+TAB`: 현재 그룹(분할된 그룹이 있다면 해당 그룹은 포함 안 된다.)에서 탭을 전환한다. 기본적으로 이전에 연 파일이 최상단에 올라와있어서 `CTRL+TAB`을 한번씩만 누르면서 같은 파일 두 개 간에 전환하면서 편집이 가능하다.

`CTRL+E`: 현재 폴더에서 파일을 선택해 실행한다. 한번만 누르면 패널이 열리고 조작을 일단 시작하면 `CTRL+E`키를 떼면 해당 파일이 실행된다. 따라서 일단 `CTRL+E`를 한번만 눌러서 패널을 열고 필요한 파일이 없으면 `ESC`를 눌러서 닫아주자. 또한 파일 위치에서 `RIGHT` 키를 입력하면 해당 창이 바로 열린다. 창을 열고도 패널이 닫히지 않아 여러파일을 골라 실행시켜놓고 작업을 마무리 할 수 있다.

`CTRL+G`: 라인 이동. 커맨드를 입력하면 창이 하나 열리는데 `:줄:오프셋`과 같이 첫번째 `:` 뒤에는 갈 Line을, 두번째 `:` 뒤에는 오프셋을 입력해 원하는 줄의 원하는 열로 이동 가능하다.

## 플러그인
내가 자주 사용하는 플러그인을 소개한다.
추천도로 표시할 건데, 추천도 5개는 나는 강추하지만 사용자에 따라 안 쓸수도 있는 플러그인이고, 필수는 그냥 일단 깔고 보라는 것임을 미리 명시한다.

[Surround](https://marketplace.visualstudio.com/items?itemName=yatki.vscode-surround): if, for, for in, for of, IIFE 등 다양한 보일러 플레이트코드를 작성해준다. 원하는 블럭을 선택하고 해당 명령을 수행하면 자동으로 해당 블럭을 선택한 보일러플레이트로 래핑한다. \[추천도: ★★ - 자주 쓰이는 기능은 아니지만 특정 상황에서 간혹 쓰인다. 편하다.]

```js
// 적용 전
console.log('Hello World')
```

마우스로 블럭을 지정하고 오른쪽 클릭을 하면 Surround With 패널이 나타난다. 블럭 없이 보일러 플레이트만 이용하고 싶다면 `CTRL` + `SHIFT` + `P`를 이용해 Command를 열어 Surround With라고 치면 해당 기능을 쓸 수 있다.

```js
// 적용 후
if(condition) {
  console.log('Hello World')
}
```

[Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner): C, C++, Java, Python, Javascript 등 다양한 언어를 지원한다. 나 같은 경우 코딩하다가 헷갈리는 부분을 한 두 줄만 작성해 테스트해보는 경우가 있다. (ex. "가 나 다 라 마 바 사".replace(' ', '')를 하면 모든 공백이 바뀌던가? 첫 공백만 바뀌던가?) 이럴 때 매우 유용하게 사용 가능하다. 한 두 줄 짜리 코드를 위해 일일히 프로젝트를 만들거나 실험용 프로젝트에 찾아가는 것도 일이다. 그냥 달랑 파일 하나 생성해서 코드 돌려보면 돼서 아주 편하다. 타입스크립트를 사용 중이라면 ts-node를 npm으로 설치해서 함께 사용하면 된다. \[추천도: 필수]

[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer): 말할 것도 없음. HTML로 장난질 할 때 코드 끄적이고 라이브 서버 켜서 작업물 바로 확인 가능하다. \[추천도: 필수]

[Book Marks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks): 써봤는데 아주 편리하다. 나 같은 경우 회사에서 작업 범위가 넓어서 (풀스택의 설움) 여기저기 왔다갔다하다보면 작업 내용을 까먹을 때도 많은데 바로바로 찾아가기 편리하다. \[추천도: ★★★★★]

[Inline Parameter](https://marketplace.visualstudio.com/items?itemName=liamhammett.inline-parameters): 함수에 쓰인 파라미터의 변수명을 표시해준다. 타입스크립트와 시너지가 좋다. 변수명과 타입 정보를 함께 보면서 해당 파라미터의 쓰임새를 파악하기 좋다. \[추천도: ★★★★]

[Paste Image](https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image): 깃허브 활동을 활발하게 하는 개발자들이 쓰면 편할 것 같다. README.md에 이미지를 붙여넣으면 자동으로 폴더를 생성하고 이미지를 복사해준다. 기본 폴더를 images로 설정하고 업로드하면 될 듯. 사용해보진 않았으므로 추천도 생략

[Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments): 주석의 종류를 추가해준다. `/** ! 주석 */`, `/** ? 주석 */`, `/** TODO 주석 */` 등으로 주석에 의미를 더 확실하게 부여할 수 있다. `!`는 경고 또는 강조 표시로, 빨간색으로 표시된다. `?`은 의문을 표기할 때 쓰며 파란색으로 표시된다. 협업할 때 쓰면 괜찮을듯. TODO주석과 `Book Marks` 플러그인을 함께 쓰면 좋을 것 같다. 마찬가지로 추천도 생략

[Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv): VSCode로 CSV 파일을 열어보면 단색이다. 여기에 코드 하이라이팅을 넣어서 보기 좋게 만들어준다. 언젠가 CSV 파일 자주 다룰 때 깔 예정. 추천도 생략

[Polacode](https://marketplace.visualstudio.com/items?itemName=mrrefactoring.polacode-fixed-edition): 코드를 예쁘게 사진으로 남길 수 있다. 내 블로그에 와서 이 글을 보고 있다는 것은 코드를 복붙하려는 목적이 다분할 텐데 그걸 사진으로 제공한다는 점에서 몹시 만족스러운 플러그인. 

[SVG Viewer](https://marketplace.visualstudio.com/items?itemName=Dheovani.svg-viewer): SVG 파일을 볼 수 있다. VSCode로 SVG 파일을 실행하면 텍스트로 표시되기 때문에 웹 개발자라면 있으면 편리한 툴. \[추천도: ★★★★]

[Explorer Exclude](https://marketplace.visualstudio.com/items?itemName=PeterSchmalfeldt.explorer-exclude): 파일을 숨김 처리할 수 있다. 프로젝트 폴더 내에서 영원히 다룰 일이 없는 파일이나 폴더들이 몇몇 있는데 그런 것들을 숨김 처리해놓으면 좀 더 시야가 탁 트인다. 프로젝트가 복잡해지면 여기저기 옮겨다니며 눈에 밟히는 파일들 때문에 신경에 거슬리는데 난 아주 유용하게 사용 중이다. 간단하게 toggle로 숨김 파일을 다시 보이게 할 수도 있다. \[추천도: ★★★★★]

[Random Everything](https://marketplace.visualstudio.com/items?itemName=helixquar.randomeverything): 랜덤값을 만들어준다. alt 이용해서 커서 여러군대에 두고 명령어 실행하면 다중으로 생성된다. \[추천도: 필수]

[Thunder Clinet](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client): Postman을 대용할 수 있는 플러그인이라고 한다. 사용하는 프로그램이 많아지면 집중력이 분산될 수밖에 없는데 그런 걸 별로 안 좋아한다. VSCode 하나의 프로그램에 여러 기능이 집약되는 것에 중점을 두고 사용해봄직하다. 나도 아직 안 써봤지만 기회가 되면 한 번 써볼 생각이다. 추천도 생략.

[Project Tree](https://marketplace.visualstudio.com/items?itemName=zhucy.project-tree): 블로그 운영하는 사람이라면 매우 유용하다. 프로젝트 구조를 텍스트 파일로 추출해준다. gitignore에 적힌 내용은 추출 안 한다고 한다. 이것도 마음에 드는 점이다. \[추천도: ★★★★★]

[Dot Log](https://marketplace.visualstudio.com/items?itemName=jaluik.dot-log): 자바스크립트 쓰는 사람 필수. `console.log()` 일일히 치기도 귀찮은데 변수에 `.log`를 입력하면 바로 완성해준다. \[추천도: ★★★]

[JS Quick Console](https://marketplace.visualstudio.com/items?itemName=AhadCove.js-quick-console): 위의 플러그인과 함께 쓰면 좋다. `Dot Log`는 변수가 있어야 콘솔을 찍어주는데 이건 `CTRL` + `SHIFT` + `L`로 빈 `console.log()`를 바로 만들어준다. \[추천도: ★★★]

[Json Helper](https://marketplace.visualstudio.com/items?itemName=zhoufeng.json-helper): 마우스를 올려놓으면 해당 Json 데이터의 객체 상속 트리를 한눈에 알기 쉽게 보여준다. 웹 개발자들이 쓰면 좋을 듯. 난 아직 중첩이 깊은 Json 데이터를 다룰 일이 없기 때문에 패스.

[Node Json Auto Complete](https://marketplace.visualstudio.com/items?itemName=bhshawon.node-json-autocomplete): Json을 import해서 사용할 때 하위 요소에 대한  자동 완성을 제공한다. Json 쓸 때마다 자동 요소가 표시가 안 돼서 일일히 파일에 가서 확인하면서 불편했는데 이를 쓰면 좋을 것 같다. \[추천도: ★★★★]

[AnnotationLens](https://marketplace.visualstudio.com/items?itemName=Al3xCubed.annotation-lens-cubed): 타입스크립트 전용 플러그인인 것 같다. override 메서드에 대해 부모 요소의 내용을 보여준다. 구현체를 많이 다루게 되는 경우 깔아서 사용해 볼 예정

[classdiagram-ts](https://marketplace.visualstudio.com/items?itemName=AlexShen.classdiagram-ts): 타입스크립트 클래스를 다이어그램으로 표시해준다는데, 실무용이라기보단 공부하거나 블로그에 참고 자료로 올릴 때 쓰면 좋을듯.