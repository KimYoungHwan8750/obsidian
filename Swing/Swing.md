자바의 GUI 구현을 도와주는 라이브러리.

JDK를 설치하면 기본으로 내장되어있다.

코드를 통해 간단히 소개하자면 다음과 같다.

```java
public class SwingExample {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Hello Swing"); // 창 제목
        frame.setSize(400, 300); // 사이즈 설정
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // 닫기 버튼 클릭시 동작
        JButton okButton = new JButton("버튼"); // 버튼 생성
        frame.add(okButton); // 프레임에 버튼 추가
        okButton.addActionListener(e -> System.out.println("버튼 클릭됨!")); // 람다함수를 이용한 이벤트 리스너
        frame.setVisible(true);
    }
}
```

## 🪟 JFrame (창)

**기본 윈도우 창을 생성하는 컴포넌트.**

```java
JFrame frame = new JFrame("타이틀");
frame.setSize(400, 300);
frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
frame.setVisible(true);
```


**자주 쓰는 메서드**

- `setSize(int width, int height)` : 창 크기 설정
- `setTitle(String title)` : 창 제목 설정
- `setVisible(boolean b)` : 창 보이기/숨기기
- `setLayout(LayoutManager manager)` : 레이아웃 매니저 설정
- `setDefaultCloseOperation(int operation)` : 닫기 동작 설정

## 🔘 JButton (버튼)

**사용자 입력(클릭)을 받는 버튼.**


```java
JButton button = new JButton("클릭하세요");
button.addActionListener(e -> System.out.println("버튼 클릭됨"));
```

**자주 쓰는 메서드**

- `setText(String text)` : 버튼 텍스트 설정
- `addActionListener(ActionListener l)` : 클릭 이벤트 등록
- `setEnabled(boolean enabled)` : 버튼 활성/비활성화
- `setVisible(boolean b)` : 버튼 보이기/숨기기

## 🏷️ JLabel (텍스트 라벨)

**텍스트나 이미지를 표시하는 컴포넌트.**


```java
JLabel label = new JLabel("안녕하세요"); label.setHorizontalAlignment(SwingConstants.CENTER);
```

**자주 쓰는 메서드**

- `setText(String text)` : 표시할 텍스트 설정
- `setIcon(Icon icon)` : 이미지 아이콘 설정
- `setHorizontalAlignment(int alignment)` : 정렬 (CENTER, LEFT, RIGHT)
- `setForeground(Color color)` : 글자 색상 설정

## 🖊️ JTextField (한 줄 텍스트 입력)

**한 줄 입력을 받을 수 있는 컴포넌트.**

```java
JTextField textField = new JTextField(20);
String input = textField.getText();
```

**자주 쓰는 메서드**

- `getText()` : 입력값 가져오기
- `setText(String text)` : 입력값 설정
- `setColumns(int columns)` : 입력칸 크기 설정
- `setEditable(boolean b)` : 수정 가능 여부 설정

## 🔒 JPasswordField (비밀번호 입력)

**비밀번호 입력용 텍스트 필드. 글자가 가려진다.**

```java
JPasswordField passwordField = new JPasswordField(20);
String password = new String(passwordField.getPassword());
```

**자주 쓰는 메서드**

- `getPassword()` : 입력값(char[]) 가져오기
- `setEchoChar(char c)` : 입력 시 보이는 문자 변경
- `setText(String text)` : 텍스트 설정

## 📝 JTextArea (여러 줄 텍스트 입력)

**여러 줄 텍스트를 입력할 수 있는 컴포넌트.**

```java
JTextArea textArea = new JTextArea(5, 20);
textArea.setLineWrap(true);
```

**자주 쓰는 메서드**

- `getText()` : 텍스트 가져오기
- `setText(String text)` : 텍스트 설정
- `setLineWrap(boolean wrap)` : 자동 줄바꿈 설정
- `append(String str)` : 텍스트 추가하기

## ☑️ JCheckBox (체크박스)

**사용자가 선택하거나 해제할 수 있는 박스.**


```java
JCheckBox checkBox = new JCheckBox("동의합니다");
boolean checked = checkBox.isSelected();
```

**자주 쓰는 메서드**

- `isSelected()` : 체크 여부 확인
- `setSelected(boolean b)` : 체크 설정
- `setText(String text)` : 체크박스 라벨 설정

## 🔘 JRadioButton (라디오 버튼)

**여러 선택지 중 하나만 선택할 수 있는 버튼.**


```java
JRadioButton option1 = new JRadioButton("옵션 1");
JRadioButton option2 = new JRadioButton("옵션 2");
ButtonGroup group = new ButtonGroup();
group.add(option1);
group.add(option2);
```

**자주 쓰는 메서드**

- `isSelected()` : 선택 여부 확인
- `setSelected(boolean b)` : 선택 설정
- `setText(String text)` : 텍스트 설정

## 🔽 JComboBox (드롭다운 리스트)

**항목 중 하나를 선택할 수 있는 컴포넌트.**


```java
String[] items = {"사과", "바나나", "체리"};
JComboBox<String> comboBox = new JComboBox<>(items);
String selected = (String) comboBox.getSelectedItem();
```

**자주 쓰는 메서드**

- `getSelectedItem()` : 선택된 항목 가져오기
- `setSelectedItem(Object item)` : 선택 설정
- `addItem(Object item)` : 항목 추가

## 📦 JPanel (패널)

**여러 컴포넌트를 묶어 그룹화하는 컨테이너.**

```java
JPanel panel = new JPanel();
panel.add(new JButton("버튼"));
panel.add(new JLabel("라벨"));
```

**자주 쓰는 메서드**

- `add(Component comp)` : 컴포넌트 추가
- `setLayout(LayoutManager manager)` : 레이아웃 매니저 설정
- `setBorder(Border border)` : 테두리 설정