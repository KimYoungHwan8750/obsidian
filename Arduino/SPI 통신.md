SCK, MOSI, MISO, SS
최소 4개로 이루어진 선으로 통신한다.

[네이버 블로그](https://m.blog.naver.com/emperonics/221714005614)

기존에는 데이터에 시작 비트와 종료 비트를 덧붙여 데이터를 인지하고 통신하는데 SCK를 이용하면 그럴 필요가 없다. 클럭을 일치시키기 때문.

MOSI(Master Output Slave Input)은 말 그대로 마스터에서 출력되어 슬레이브로 입력되는 것이므로, 마스터에서 슬레이브로 데이터를 보낼 때 사용하는 선이다.

MISO(Master Input Slave Output) 역시 슬레이브에서 출력되어 마스터로 입력되는 것으로, 슬레이브에서 마스터로 데이터를 보낼 때 사용하는 선이다.

SPI 통신은 1:N 구조가 될 수 있는데, 이 때 통신할 슬레이브를 선택하는 선이 SS이다. 일반적으로 회로가 동작할 때 HIGH 신호, Disable 될 때 LOW 신호인데, SS는 반대로 LOW일 때 해당 슬레이브와 통신하겠다는 의미가 된다.