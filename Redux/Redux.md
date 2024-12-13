## Redux

index

<a href="#Redux Toolkit">zz</a>

Redux란 상태관리를 위해 출시된 라이브러리이다. React만으로는 컴포넌트간에 상태를 공유함에 있어서 제한 사항이 많다. 보일러 플레이트 코드가 많아지는 것은 물론이고 자칫 관리가 복잡해져 프로젝트가 소생 불가 상태에 빠질 수 있다. (~~내 얘기임, 진짜다~~)

<center><img src="https://i.imgur.com/z7yCFhr.png"/></center>
<center><p>그러나 리덕스를 쓰고 난 뒤... </p></center>

학습곡선이 있음에도 사람들이 공부하는데에는 항상 이유가 있다는 점을 명시하자. 리덕스는 배우기 위해 소비한 시간의 수십 배를 벌어다줄 유용한 라이브러리다.

### 프로젝트 시작하기

`npm i redux react-redux @reduxjs/toolkit`

위 세 가지 패키지를 설치해준다. 순서대로 Redux, React에서 Redux를 사용할 수 있게 만들어주는 React Redux, Redux를 간편하게 사용할 수 있게 도와주는 Redux Toolkit이다.

> 엥? Redux는 원래 React에서 쓰는 거 아니에요?

사람들이 잘 모르는 사실이 있는데, Redux는 React에 종속된 라이브러리가 아니다. 다만 React와 궁합이 너무 잘 맞아서 항상 같이 언급되다보니 그런 오해가 생기곤 한다. 마찬가지로 Redux는 Redux Toolkit과 함께 사용한다. 공식 문서에서도 권장하는 라이브러리이니 이렇게 세 가지 패키지를 설치하자.

<h3 id="Redux Toolkit">Redux Toolkit</h3>