이는 로컬 환경에서 쿠버네티스 클러스터를 구축하여 Round Robin 방식으로 로드밸런서를 통해 네트워크 트래픽을 적절히 각 서비스로 분배하는 인프라를 구축한 것을 토대로 작성한 문서이다.

기본적인 구현 흐름은 다음과 같다.

- 여러대의 노드(컴퓨터)를 모방하기 위해 docker를 사용
- 도커 환경에서의 kubernetes 관련 셋팅(방화벽이나 설정 파일 등)은 매우 어렵기 때문에 k3d를 사용해 이를 단순화
- 각 컨테이너의 Nest 백엔드에 요청이 고루 분산되는지 확인

우선 Nest 프로젝트를 담고 있는 이미지를 만들기 위해 아래와 같이 Dockerfile을 작성한 후 이미지를 빌드한다.

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package.json package.json
RUN npm i
COPY . .
CMD ["npm", "start"]
```

`docker buildx -t 이미지이름 .`

초보자들은 헷갈릴수도 있는데 이미지 이름 뒤에 .은 오타가 아니라 현재 경로를 의미하는 것이다. 만약 현재 `C:\abc`에서 터미널을 실행했다면 저 .은 `C:\abc\Dockerfile`로 build를 수행하겠다는 의미가 된다.

그 후 도커 컨테이너에서 kubernetes 클러스터를 구축하기 위해 k3d를 사용하는데, 다음과 같은 명령어로 필요한 이미지와 컨테이너를 자동으로 생성할 수 있다.

```
k3d cluster create 클러스터이름 --agents 4 -p 8080:80
```

위 명령어의 의미는 worker node를 4개 만들고 로컬의 포트와 도커 컨테이너에서 돌아가는 로드밸런서의 포트를 연결해주겠다는 의미이다.

포트를 매핑하는 것은 로컬에서 실행하기 때문에 그런 것이며, 실제 프로덕션 환경에서는 로드밸런서가 실행되고 있는 ip와 포트를 가리킬 것이므로 이를 인지하고 있어야한다.

```
k3d image import 이미지이름 -c 클러스터이름
```

그 후 위에서 만들었던 이미지를 사용해 클러스터 컨텍스트에 이미지를 인식시킨다. 만약 Dockerhub에 이미지를 업로드했다면 이 과정은 건너뛰어도 되지만 나는 간단하게 테스트만 할 거라서 직접 이미지를 임포트했다.

이제 docker container가 6개 생성된 것을 알 수 있는데, agents는 4인데 생성된 컨테이너는 6개인 이유는 로드밸런스를 맡아줄 컨테이너와 master node를 포함했기 때문이다.

그 후 쿠버네티스 설정을 적용해주면 되는데 내가 설정할 것은 배포, 로드밸런싱, 인그레스 설정으로 총 세가지이다.

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nest-server-deployment
spec:
  replicas: 4
  selector:
    matchLabels:
      app: nest-server
  template:
    metadata:
      labels:
        app: nest-server
    spec:
      containers:
      - name: nest-server-container
        image: temp_server  # <--- 방금 로드한 이미지 이름
        imagePullPolicy: Never # <--- 중요! 인터넷에서 찾지 말고 로컬에서 찾아라
        ports:
        - containerPort: 3000
```

```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: nest-server-service
spec:
  type: LoadBalancer # 로컬 k3d에서는 포트포워딩 역할을 해줌
  selector:
    app: nest-server
  ports:
    - protocol: TCP
      port: 80       # 밖에서 접속할 포트
      targetPort: 3000 # 컨테이너 내부 포트
```

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nest-server-ingress
  annotations:
    ingress.kubernetes.io/ssl-redirect: "false"
spec:
  rules:
  - http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nest-server-service
            port:
              number: 80
```

```shell
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
```

```shell
error: error validating "deployment.yaml": error validating data: failed to download openapi: Get "https://host.docker.internal:50454/openapi/v2?timeout=32s": dial tcp 192.168.0.2:50454: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.; if you choose to ignore these errors, turn validation off with --validate=false
```

위 명령어를 사용해서 kubernetes 설정을 해야하는데 간혹 위와 같이 오류가 뜨는 경우가 있다. 그럴 땐 `C:\Users\사용자이름\.kube`에 가면 config 파일이 있는데 메모장으로 열어서 
`server: https://docker.external...:6443` 같이 이상하게 적힌 경로를 `https://127.0.0.1:6443`와 같이 루프백으로 바꿔주면 된다.

`kubectl get all`를 사용하면 현재 올라가있는 pod들의 상태를 확인할 수 있다.
`kubectl logs -f -l app=nest-server --max-log-requests 4 --prefix`를 사용해 각 node에서 실행되고 있는 nest-server에 대한 로그를 볼 수 있다. nest 서버의 `/` 엔드포인트에 `console.log("들어옴")`을 찍어보고 상태를 보자. 여기서 amx-log-requests는 위에서 생성한 replicas 갯수와 맞춰주면 된다.

만약 코드를 수정해 이미지를 재빌드했다면
`k3d image import 이미지이름 -c 클러스터이름`
`kubectl rollout restart deployment 디플로이먼트이름`을 실행하면 된다.

여기서 말하는 디플로이먼트 이름은 위 deployment.yaml에 작성한 내용 중 metadata의 name항목을 의미한다.

이제 `localhost:8080`으로 접속하게 되면 도커의 80번 포트를 향할 것이며, 여기서 동작하는 ServiceLB(로드밸런서)가 내 요청을 적절하게 분산해줄 것이다.

총 10번의 요청을 보낸 결과 아래와 같이 5개 컨테이너(나는 master worker를 포함해 5개를 돌리고 있다.)가 순차적으로 요청을 받는 것을 확인할 수 있다. 로컬에서 구동하고 있다 보니 로드밸런싱 점수가 모두 동일하여 Round Robin과 같이 동작한다. kubernetes의 고가용성을 테스트하기 위해 서비스에 장애를 일으켜보겠다.

서비스에 생기는 장애는 다음과 같이 두 가지를 상정한다.

1. pod에만 문제가 생긴 경우
2. 서비스를 실행 중인 컴퓨터 자체에 문제가 생긴 경우

만약 pod에만 문제가 생긴 경우 kubernetes는 클러스터에 소속된 worker node 중 가장 여유있는 요소를 찾아 새로운 pod를 실행한다. 이 경우 pod에 문제가 생기며 pod가 종료되고 모든 리소스를 돌려받을테니 pod가 종료된 컴퓨터(컨테이너)에서 같은 pod가 재실행될 가능성이 높다.

하지만 서비스를 실행 중인 컴퓨터 자체가 다운된 경우는 실행되고 있는 나머지 3개의 agent 컨테이너들이 replicas에 정의해두었던 갯수를 충족하기 위해 일을 하게 될 것이다. 이도 마찬가지로 kubernetes에 의해 가장 여유가 있는 컨테이너에 작업이 할당될 것이다.

예상되는 동작은 replicas에 명시한 5개의 pod를 유지하기 위해 한 컨테이너에서 백엔드 서비스 2개가 돌아갈 것이다.

```shell
[pod/nest-server-deployment-68d8dfbb66-d5g64/nest-server-container] 들어옴
[pod/nest-server-deployment-68d8dfbb66-frkj5/nest-server-container] 들어옴
[pod/nest-server-deployment-68d8dfbb66-s6z6g/nest-server-container] 들어옴
[pod/nest-server-deployment-68d8dfbb66-psvx2/nest-server-container] 들어옴
[pod/nest-server-deployment-68d8dfbb66-7gkbj/nest-server-container] 들어옴
[pod/nest-server-deployment-68d8dfbb66-d5g64/nest-server-container] 들어옴
[pod/nest-server-deployment-68d8dfbb66-frkj5/nest-server-container] 들어옴
[pod/nest-server-deployment-68d8dfbb66-s6z6g/nest-server-container] 들어옴
[pod/nest-server-deployment-68d8dfbb66-psvx2/nest-server-container] 들어옴
[pod/nest-server-deployment-68d8dfbb66-7gkbj/nest-server-container] 들어옴
```

강제로 s6z6g를 내려본다. 아래 로그를 보자.

```shell
kubectl get pods -l app=nest-server -w
NAME                                      READY   STATUS    RESTARTS   AGE
nest-server-deployment-68d8dfbb66-7gkbj   1/1     Running   0          14m
nest-server-deployment-68d8dfbb66-d5g64   1/1     Running   0          14m
nest-server-deployment-68d8dfbb66-frkj5   1/1     Running   0          9m55s
nest-server-deployment-68d8dfbb66-psvx2   1/1     Running   0          14m
nest-server-deployment-68d8dfbb66-s6z6g   1/1     Running   0          9m55s
nest-server-deployment-68d8dfbb66-s6z6g   1/1     Terminating   0          10m
nest-server-deployment-68d8dfbb66-s6czt   0/1     Pending       0          0s
nest-server-deployment-68d8dfbb66-s6czt   0/1     Pending       0          0s
nest-server-deployment-68d8dfbb66-s6czt   0/1     ContainerCreating   0          0s
nest-server-deployment-68d8dfbb66-s6z6g   0/1     Error               0          10m
nest-server-deployment-68d8dfbb66-s6z6g   0/1     Error               0          10m
nest-server-deployment-68d8dfbb66-s6z6g   0/1     Error               0          10m
nest-server-deployment-68d8dfbb66-s6czt   1/1     Running             0          2s
```

`nest-server-deployment-68d8dfbb66-s6z6g   1/1     Terminating`이 Terminating 상태로 접어들고 s6czt가 새로 실행되었다. ContainerCreating 이후에 s6z6g의 헬시체크가 몇 번 더 이루어졌는지 Error가 3번 표시된 후 s6czt가 최종적으로 Running 상태로 돌입했다.

위에서 언급한대로 pod에만 문제가 생긴 경우 새로운 pod를 할당하여 replicas에 정의한 숫자가 유지되고 있다.

```shell
kubectl get pods -o wide
NAME                                      READY   STATUS    RESTARTS   AGE   IP          NODE                    NOMINATED NODE   READINESS GATES
nest-server-deployment-68d8dfbb66-7gkbj   1/1     Running   0          26m   10.42.3.4   k3d-kyh-demo-server-0   <none>           <none>
nest-server-deployment-68d8dfbb66-d5g64   1/1     Running   0          26m   10.42.2.4   k3d-kyh-demo-agent-3    <none>           <none>
nest-server-deployment-68d8dfbb66-frkj5   1/1     Running   0          21m   10.42.0.4   k3d-kyh-demo-agent-0    <none>           <none>
nest-server-deployment-68d8dfbb66-psvx2   1/1     Running   0          26m   10.42.1.5   k3d-kyh-demo-agent-2    <none>           <none>
nest-server-deployment-68d8dfbb66-s6czt   1/1     Running   0          11m   10.42.4.5   k3d-kyh-demo-agent-1    <none>           <none>
PS C:\Users\younghwan>
```

각 컨테이너에 pod가 1개씩 적절히 배분된 걸 볼 수 있다.

그럼 이번엔 컨테이너를 종료시켜보자. agent-3을 종료해보겠다.

```shell
kubectl get pods -o wide
NAME                                      READY   STATUS    RESTARTS   AGE   IP          NODE                    NOMINATED NODE   READINESS GATES
nest-server-deployment-68d8dfbb66-7gkbj   1/1     Running   0          32m   10.42.3.4   k3d-kyh-demo-server-0   <none>           <none>
nest-server-deployment-68d8dfbb66-cg68h   1/1     Running   0          19s   10.42.3.5   k3d-kyh-demo-server-0   <none>           <none>
nest-server-deployment-68d8dfbb66-frkj5   1/1     Running   0          28m   10.42.0.4   k3d-kyh-demo-agent-0    <none>           <none>
nest-server-deployment-68d8dfbb66-psvx2   1/1     Running   0          32m   10.42.1.5   k3d-kyh-demo-agent-2    <none>           <none>
nest-server-deployment-68d8dfbb66-s6czt   1/1     Running   0          17m   10.42.4.5   k3d-kyh-demo-agent-1    <none>           <none>
```

예상했던 대로 다른 컨테이너에서 2개의 pod를 실행하고 있다. 나의 경우 master node의 Traint를 None으로 설정해 worker node로서도 기능하게 만들어서 pod가 돌아가고 있는데 보통 pod는 worker node에서만 실행되게 하는 편이 좋다. master node는 관제탑의 역할을 해야하며 master node가 먹통이 되면 worker node에서 돌아가는 서비스들이 모두 사용 불가 상태가 된다. 따라서 서비스를 master node에 배포해서 굳이 전체 서비스를 불안정하게 만들 필요는 없는 것이다.