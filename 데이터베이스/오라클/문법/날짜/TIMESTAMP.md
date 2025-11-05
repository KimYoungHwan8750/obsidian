#### 현재 시간을 밀리초 단위로

년 월 일 시 분 초 밀리초 그리고 그리니치 평균시간까지 알려준다
```sql
SELECT SYSTIMESTAMP FROM DUAL
-- 2023-10-05 16:45:20.123456 +09:00
```

LOCALTIMESTAMP = 클라이언트 세션의 현재 시간
SYSTIMESTAMP = 서버컴퓨터의 현재 시간

