## apiVersion
`kubectl explain <kind 이름>`: 해당 kind의 apiVersion을 알려준다.
ex) `kubectl explain Deployment`

## kind
| 종류        | 목적             | 생명주기                   | 비고                                                                                                                                                                              |
| ----------- | ---------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Deployment  | 일반 앱 서비스   | 영원히 (죽으면 살림)       |                                                                                                                                                                                   |
| StatefulSet | 데이터베이스     | 영원히 (이름/저장소 고정)  | DB 접속하려면 이름이 일정해야함                                                                                                                                                   |
| DaemonSet   | 노드 관리/인프라 | 영원히                     | 로그 수집, 모니터링 등. 노드당 하나씩만 필요한 요소들. 일반적으로 파드 3개 설정하면 자원이 넉넉한 노드에 3개가 몰려서 뜰 수도 있는데 DaemonSet은 노드당 하나씩 뜨는 것을 보장해줌 |
| Job         | 단발성 작업      | 완료 후 종료               | 배치 작업 등 개발자가 임의로 실행시키고 싶을 때 사용                                                                                                                              |
| CronJob     | 주기적 작업      | 예약된 시간에 완료 후 종료 | 스케줄 작업                                                                                                                                                                       |

---

## metadata
### name
이름을 설정한다.
`name: fastapi-app`

나중에 특정 대상을 지칭할 때 이 이름을 사용한다.
`kubectl get deploment fastapi-app`

### labels
모두 선택적인 요소지만 app은 거의 필수로 취급받는다.
```yaml
labels:
	app: fastapi-app
	tier: backend # backend, frontend, db, cache, etc...
	env: dev # dev, prod, stg
```


