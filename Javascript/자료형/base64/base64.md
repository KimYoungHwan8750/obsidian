말 그대로 64진법을 이용해 데이터를 주고 받는다.
6비트당 2비트의 오버헤드가 발생해서 데이터 용량이 33% 증가하게 되는데
사이트 내에서 바이너리 데이터 자체를 주고 받을 때 데이터 손실이 발생하는데
base64는 이러한 손실을 막아준다.

```Base64
"data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUg...생략"
```

[자세한 내용은 티스토리 참조](https://devuna.tistory.com/41)