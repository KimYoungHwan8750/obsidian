#### 사용법 :
Id생성 전략을 설정할 수 있다.
```java
@Id
@GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "CONNECT_INFO_SEQUENCE")
private Long id;
```

![[@SequenceGenerator]]SequenceGenerator와 함께 사용해야한다.

# 추후 내용 추가(strategy 종류)