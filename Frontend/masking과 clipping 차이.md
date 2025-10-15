mask는 검정색 영역이 alpha 값 1, 하얀색 영역이 alpha 값 0이다.

따라서 왼쪽 검정 -> 오른쪽 하얀색인 이미지를 특정 이미지에 masking하면 해당 이미지가 왼쪽에서부터 오른쪽으로 불투명해진다.

![](https://i.imgur.com/MJf26RI.png)

위 이미지를 생각하면 쉽다.

반면 clipping은 반드시 닫힌 vector로 이루어진 path이다.