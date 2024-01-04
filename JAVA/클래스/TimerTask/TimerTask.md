[[Timer]]과 함께 사용한다.
## 메서드 :
| 접근제한자 와 타입 | 메서드                                                                            |
| ------------------ | --------------------------------------------------------------------------------- |
| boolean            | **cancel()**<br><br>이 TimerTask 작업을 취소한다.                                 |
| abstract void      | **run()**<br><br>이 TimerTask가 실행할 작업                                       |
| long               | **scheduledExecutionTime()**<br><br>가장 최근에 이 작업이 실행된 시간을 리턴한다. |

TimerTask 클래스를 보면 추상 메소드인 run()이 있는데 개발자는 TimerTask클래스를 상속받은 후에 run()메소드를 알맞게 구현하면된다.

