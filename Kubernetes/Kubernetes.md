## Kubernetes란?
보통 줄여서 k8s로 지칭한다.
**스왑(Swap) 비활성화:** 쿠버네티스는 스왑 메모리가 켜져 있으면 작동하지 않음. (`sudo swapoff -a`)


**Liveness Probe & Readiness Probe:** * 컨테이너가 살아있는지, 손님을 받을 준비가 됐는지 체크하는 기능입니다.