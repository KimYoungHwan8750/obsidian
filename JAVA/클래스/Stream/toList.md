Stream 객체를 List객체로 형변환할 때 사용한다.
#### 특이사항
이렇게 형변환된 List객체는 수정이 안 된다.
만약 수정을 하고 싶다면 collect메서드의 인자로 Collectors.toList()를 전달하면 된다.
![[collect]]