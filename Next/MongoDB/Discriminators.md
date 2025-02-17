## 스키마 상속을 구현
만약 `Parent`가 있고 `ChildA`, `ChildB`가 있다. `Parent`엔 `name`과 `age` 필드만 있으며 `ChildA` 필드는 `name`, `age`, `hobby`, `ChildB`는 `name`과 `age`, `job` 필드가 있다.

|        | name | age | hobby | job |
| ------ | ---- | --- | ----- | --- |
| Parent | o    | o   | x     | x   |
| ChildA | o    | o   | o     | x   |
| ChildB | o    | o   | x     | o   |

즉 `name`, `age`는 공통적으로 존재하는 필드다. 이때 당신은 위와 같이 공통 필드에 각각 `hobby`, `job`을 추가해서 `ChildA`, `ChildB`를 만들고 싶다. 당장 상속을 해달라고 울부짖는 듯한 저 스키마들을 보아라.



