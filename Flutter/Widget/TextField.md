## TextField
TextField 위젯은 유저에게 텍스트를 입력받을 때 사용한다.

```dart
TextField(
  decoration: InputDecoration(
	labelText: "닉네임을 입력하세요",
	hintText: "닉네임",
	border: OutlineInputBorder(
	  borderRadius: BorderRadius.all(Radius.circular(12)),
	  borderSide: BorderSide.none
	),
	fillColor: Colors.blue.shade100,
	filled: true,
	floatingLabelBehavior: FloatingLabelBehavior.never
  ),
  maxLength: 10,
  onChanged: (value) {
  },
  onSubmitted: (value) {
	// 여기에 닉네임 저장 로직을 추가하세요.
	// 예: AuthController.to.saveNickname(value);
	debugPrint("입력된 닉네임: $value");
  },
),
```

### 자주 사용되는 속성

#### decoration
Decoration은 TextField를 꾸밀 때 사용한다. InputDecoration 위젯이 제공하는 속성들을 이용해 간단하게 스타일링을 할  수 있다.

**label, hint**

label은 포커스 전에는 TextField에서 표시되다가 포커스되면 floatingLabelBehavior 속성에 정의한 내용에 따라 동작한다. hint는 포커스가 되었고 컨텐츠가 비어있을 때 표시되는 문구이다.

**textInputAction**

TextField에 Focus되었을 때 나타나는 키스크린에서 엔터에 해당하는 문구를 바꿔준다.

next로 설정하면 다음, send로 설정하면 보내기가 되는 식이다.

**border**

외곽선을 설정하는 속성으로 간편하게 OutlineInputBorder()와 UnderlineInputBorder()가 있다.

색깔이 채워진 예쁜 TextField를 만들고 싶을 텐데, OutlineInputBorder의 borderRadius 속성을 사용해 외곽을 둥글게, borderSide를 사용해 외곽선을 없앨 수 있다.

**fillColor**

배경색을 칠한다. filled속성이 true여야 배경색이 표시된다.

**filled**

fillColor를 적용하려면 true를 설정해야한다.

**floatingLabelBehavior**

라벨의 동작을 설정할 수 있다.

* always: 항상 떠있음
* never: 포커스가 되면(떠야하는 상태가 되면) 사라짐
* auto: 내용이 없으면 never처럼 동작하고 포커스 되거나 내용이 채워지면 always처럼 동작

**enabled**

false 설정으로 비활성화 가능

**상태**

errorBorder, enabledBorder등 상태에 따른 스타일링이 있다.

error, enabled, disabled, focused등이 있다.

**maxLength**

글자수를 제한한다. 실제 기능과 연동이 되어 글자수 이상의 입력을 차단하며 0/10과 같이 현재 글자수/최대 글자수를 우측하단에 표시해준다.

**helperText**

좌측하단에 표시되는 메세지로, 오류메세지나 입력 현황(이메일 발송이 완료되었습니다) 등을 표시할 수 있다.

#### Controller
텍스트 입/출력을 편하게 하기 위해 플러터에 내장된 컨트롤러를 사용한다. Stateless 위젯에서 사용하면 에러를 반환한다.

dispose를 override해서 명시적으로 호출해주어야 메모리에서 해제된다.

```dart

//위젯 안
final TextEditingController controller = TextEditingController();

@override
void dispose() {
	controller.dispose(); // 메모리를 잡아먹기 때문에 dispose 명시적 호출 필수.
	super.dispose();
}

@override
Widget build(BuildContext context) {
	return TextField(
		controller: controller
	);
}
```


#### 🧩 주요 `InputBorder` 관련 속성들

| 속성 이름            | 표시 조건            | 설명                                                                                          |
| -------------------- | -------------------- | --------------------------------------------------------------------------------------------- |
| `border`             | 기본 상태            | 아무 상태도 아닐 때 적용됨                                                                    |
| `enabledBorder`      | 사용 가능 & 비포커스 | `TextField`가 활성화되어 있지만 **포커스가 없는 상태**에서 사용됨                             |
| `focusedBorder`      | 포커스 중            | `TextField`에 **포커스가 있을 때** 사용됨                                                     |
| `errorBorder`        | 에러 발생            | `validator`에서 에러 메시지를 리턴했거나 `TextFormField`의 `errorText`가 설정되었을 때 사용됨 |
| `focusedErrorBorder` | 에러 + 포커스        | 위의 에러 상태인데 **포커스도 함께 있는 경우**                                                |
| `disabledBorder`     | 비활성화             | `enabled: false`일 때 적용됨                                                                  |

