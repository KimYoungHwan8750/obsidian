javascript의 setTimeout 또는 setInterval과 같은 동작을 구현가능하다.
TimerTask와 함께 사용해 일정 주기마다 TimerTask에 정의된 동작을 수행한다.
```java
Timer timer = new Timer();
TimerTask timerTask = new TimerTask(){
	@Override
	public void run(){
	System.out.println("1초마다 실행");
	}
};
timer.schedule(timerTask,5000,1000); // 5초 뒤, 1초마다 timerTask 실행.
```

#### 메서드

| 접근제한자와 타입​ | 메서드 ​                                                                                                                                                  |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| void                | **schedule(TimerTask task, Date time)**<br><br> 지정한 시간(time)에 지정한 작업(task)을 수행                                                              |
| void                | **schedule(TimerTask task, Date firstTime, long period)**<br><br> 지정한 시간(firstTime) 부터 일정 간격(period)으로 지정한 작업(task)을 수행              |
| void​               | **schedule(TimerTask task, long delay)**<br><br> 일정 시간(delay)이 지난 후에 지정한 작업(task)을 수행                                                    |
| void​               | **schedule(TimerTask task, long delay, long period)**<br><br> 일정 시간(delay)이 지난 후에 일정 간격(period)으로 지정한 작업(task)을 수행                 |
| void​               | **scheduleAtFixedRate(TimerTask task, Date firstTime, long period)**<br><br> 지정한 시간(firstTime)부터 일정 간격(period)으로 지정한 작업(task)을 수행    |
| void                | **scheduleAtFixedRate(TimerTask task, long delay, long period)**<br><br> 일정한 시간(delay)이 지난후에 일정 간격(period)으로 지정한 작업(task)을 수행     |
| void                | **cancel()**<br><br> ​Timer를 중지시키면 , 실행될 예정인 모든 작업을 취소한다. 하지만 현재 실행되고 있는 TimerTask작업에 대해서는 영향을 미치지는 않는다. |

#### scheduleAtFixedRate와 schedule의 차이점 :
* schedule은 여러번 실행되다보면 0.001초의 오차가 생기는데 scheduleAtFixedRate는 이를 보정해준다.
* 정확한 시간에 실행될 필요가 없다면 schedule을 실행하는 것이 오버헤드가 발생하지 않는다.