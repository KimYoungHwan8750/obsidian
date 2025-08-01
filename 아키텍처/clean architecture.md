3 Layer로 구현되는 경우, 4 Layer로 구현되는 경우가 있다. 3 Layer로 구현하는 경우 domain, data, presentation 레이어를 채택하며 4 Layer로 구현하는 경우 domain, application, interface, infrastructure 계층을 사용한다.

presentation과 interface는 같은 개념이며 infrastructure와 data 역시 그 역할이 비슷하다. 계층 수가 다른 만큼 4 layer에 비해 3 layer 계층의 레이어가 조금 더 포괄적인 의미를 지니게 되겠다.

### Domain

#### Entity(Model)
* Model: 하위 개념으로 Entity, VO, DTO가 있다.
* 도메인 모델일 경우 Domain 레이어에 속하게 되지만 DTO 모델일 경우 Application 레이어에 속하게 된다. 또한 Entity의 필수조건으로, 고유식별자가 필드에 포함되어 있어야한다, 이러한 조건을 만족하지 않으면 Model로 불린다.
* VO의 조건: 불변성, 동등성(메모리 주소가 달라도 내부값이 같으면 같다고 할 수 있는 구현), 자가 유효성 검사
* 도메인 로직. (담배는 19세 이상만 구매할 수 있다, 가격은 -가 될 수 없다 등의 내가 변할 수 있는 상태, 가질 수 있는 상태를 정의)

#### UseCase
* 순수한 도메인 로직 (Entity는 자기 자신의 상태만 알면 된다면 Service는 객체간의 관계에 대한 도메인 로직), 예를 들면 출금이 가능한가?라는 서비스 로직을 만들어 entity의 잔액이 0원 이상인지, 계좌 번호가 존재하는지 등의 복합적인 로직을 갖추게 된다. 또한 인터페이스로 정의하며 구현체는 application 레이어에서 UseCase를 통해 구현된다.

#### Repository
어? Repository는 Infrastructure 아닌가요? 여기서 말하는 Repository는 interface이다. findByUserId 같은 명세만 제공하는 목적이고, 실제 구현된  Repository는 Data 레이어(Infrastructure)에 속하게 된다.

### Application

UseCase의 구현체, 즉 input port인 Service가 이곳에 위치한다.

### interface
Domain 계층이 외부와 데이터를 주고 받을 수 있는 통로(interface) 역할을 한다.

controller, viewmodel, UseCase의 output port(presenter) 등이 위치한다.

### infrastructure

db, api, framework, UseCase의 output port(repository impl) 등이 위치한다.
