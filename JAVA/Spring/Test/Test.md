프로젝트 중에는 Junit을 통한 단위테스트를 진행했었다.
```gradle
tasks.named('test') {  
    useJUnitPlatform()  
}
```
그래들에 위와 같은 설정이 되어 있고, 디펜던시도 추가해주어야한다.