
##  React Native 공부 로드맵

- [ ] 기본 컴포넌트 이해하기.
- [ ] StyleSheet 사용법 익히기
- [ ] Navigator 이해하기
- [ ] 상태 관리 공부하기
- [ ] AsyncStorage 사용법 익히기
- [ ] 애니메이션, 제스쳐 처리하기
- [ ] 네이티브 모듈 사용하기

### 기본 컴포넌트 이해하기
`View`, `Text`, `Image`, `ScrollView`, `TouchableOpacity`

### StyleSheet 사용법 익히기

>[!공부하기 전에]
RN에서 Flexbox는 CSS에서의 Flexbox와 다르다.
예를 들면 justify-content: center는 CSS는 flex에서만 동작하지만 RN은 flex가 아니어도 동작한다.
또한 CSS와 달리 flex-direction이 기본적으로 column이다.

- StyleSheed 사용법
- Flexbox 레이아웃

###  Navigator 이해하기

>[!공부하기 전에]
일반 navigator와 stack의 차이점 이해하기

- **React Navigation 설치 및 설정**
    - `npm install @react-navigation/native`
    - `npm install @react-navigation/stack`
- **Stack Navigator 설정**
    - 화면 간 전환 설정
    - 기본적인 화면 이동


### 상태 관리 공부하기

1. **Props와 State 사용법**
    
    - 컴포넌트 간 데이터 전달
    - React State and Lifecycle
2. **Context API 사용**
    
    - 글로벌 상태 관리
    - Using Context API
3. **Redux 설치 및 사용 (선택 사항)**
    
    - `npm install redux react-redux`
    - Redux in React Native


### AsyncStorage 사용법 익히기

- 로컬 데이터 저장 및 관리
- `npm install @react-native-async-storage/async-storage`
- AsyncStorage Documentation

### 애니메이션, 제스쳐 처리하기

- `react-native-reanimated` 및 `react-native-gesture-handler`
- Reanimated Documentation
- Gesture Handler Documentation

### 네이티브 모듈 사용하기

- 네이티브 기능 접근
- Native Modules

