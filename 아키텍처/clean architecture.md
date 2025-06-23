

domain,

application,

interface

infrastructure,

### Domain
도메인 로직. (담배는 19세 이상만 구매할 수 있다, 가격은 -가 될 수 없다)

#### Entity(Model)
* Model: 하위 개념으로 Entity, VO, DTO가 있다.
* 도메인 모델일 경우 Domain 레이어에 속하게 되지만 DTO 모델일 경우 Application 레이어에 속하게 된다. 또한 Entity의 필수조건으로, 고유식별자가 필드에 포함되어 있어야한다.
* VO의 조건: 불변성, 동등성(메모리 주소가 달라도 내부값이 같으면 같다고 할 수 있는 구현), 자가 유효성 검사



### Application

UseCase, 비즈니스 로직

그렇다면 도메인 로직과 다른 점?

도메인 로직은 소프트웨어가 다루는 문제 영역 그 자체. (담배는 19세 이상만 구매할 수 있다, 가격은 -가 될 수 없다)

도메인 로직은 Entity에 담긴다.(내가 변할 수 있는 상태, 가질 수 있는 상태를 정의)

이러한 도메인 로직을 조합하여 하나의 시나리오(담배는 19세 이상만 구매하며 가격은 4500원이다)가 완성된다.

UseCase는 Input Port, Output Port를 가진다.

Input Port는 외부에서 UseCase를 호출하기 위한 진입점이고 Output Port는 UseCase가 외부 시스템을 호출하기 위한 용도.

### interface

controller,
presenter,
viewmodel

### infrastructure

db,
api,
framework
