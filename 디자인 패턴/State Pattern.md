# 상태 패턴이란?
한 객체가 여러 상태를 가질 때, 이를 상태로 정의해 객체의 기능을 이용하는 방법이다.

객체가 여러 상태를 가지면서 동일한 함수가 상태에 따라 다른 기능을 가져야할 때 이를 깔끔하고 직관적으로 해결하는 방법이다. 코드를 보면 바로 이해가 갈 것이다.

예제는 Elevator를 구현한다. Elevator는 보통 위로 올라가는 중, 멈춰있는 중, 내려가는 중 세 가지 상태(비상 정지등 복잡해지는 구현은 생략)를 가진다.

Elevator가 가질 수 있는 상태를 표로 정리해보면 다음과 같아진다.

|           | 상태:Up | 상태:Stop | 상태:Down |
| --------- | ------- | --------- | --------- |
| 버튼:Up   | 동작X   | 올라감    | 동작X     |
| 버튼:Stop | 멈춤    | 동작X     | 멈춤      |
| 버튼:Down | 동작X   | 내려감    | 동작X     |

이를 토대로 다음과 같이 구현 할 수 있다.


```ts
interface ElevatorState {
  goUp(): void;
  goDown(): void;
  stop(): void;
}

class UpState implements ElevatorState {
  private static instance: UpState | undefined;
  
  private constructor() {}

  public static getInstance(): UpState {
    if (!UpState.instance) {
      UpState.instance = new UpState();
    }
    return UpState.instance;
  }

  goUp() {
    console.log('Already going up');
  }

  goDown() {
    console.log('Going down');
  }

  stop() {
    console.log('Stopping');
  }
}
class DownState implements ElevatorState {
  private static instance: DownState | undefined;
  
  private constructor() {}

  public static getInstance(): DownState {
    if (!DownState.instance) {
      DownState.instance = new DownState();
    }
    return DownState.instance;
  }

  goUp() {
    console.log('Going up');
  }

  goDown() {
    console.log('Already going down');
  }

  stop() {
    console.log('Stopping');
  }
}
class StopState implements ElevatorState {
  private static instance: StopState | undefined;
  
  private constructor() {}

  public static getInstance(): StopState {
    if (!StopState.instance) {
      StopState.instance = new StopState();
    }
    return StopState.instance;
  }
  goUp() {
    console.log('Going up');
  }

  goDown() {
    console.log('Going down');
  }

  stop() {
    console.log('Already stopped');
  }
}

class ElevatorAdapter {
  private state: ElevatorState = StopState.getInstance();

  goUp() {
    this.state.goUp();
    this.setState(UpState.getInstance());
  }

  goDown() {
    this.state.goDown();
    this.setState(DownState.getInstance());
  }

  stop() {
    this.state.stop();
    this.setState(StopState.getInstance());
  }

  setState(state: ElevatorState) {
    this.state = state;
  }
}

const elevator = new ElevatorAdapter();
elevator.goUp();
elevator.stop();
elevator.goDown();
```

Elevator에 위와 같은 코드를 탑재하게 된다면, 한 대의 Elevator만 제어하게 될 것이므로 메모리 관리를 위해 Singleton으로 구현했다. 이처럼 복잡하고 유기적인 기능을 if문으로 제어하려고 하면 실수가 잦아지고 여러모로 많이 힘들다.(경험담) 이때 각 상태에서 수행해야할 기능을 정의하고, 상태 변화만 시켜주면 상태 전이가 발생하고 또 다시 프로그램은 해당 상태에서 수행되어야할 올바른 작업을 수행한다.

코드는 Typescript로 작성되어있지만 그것은 외관일 뿐이니 겁먹지 말고 천천히 코드를 뜯어본다면 충분히 내용을 이해할 수 있다.