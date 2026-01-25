`docker system prune`: image, volume, container, network 영역의 사용하지 않는 리소스를 정리한다. 여기서 사용하지 않는 것들이란 `<none>:<none>`나 빌드 중 에러가 생겨 좀비 리소스가 된 것들을 정리한다. 현재 사용하지 않는 상태인 것들을 제거하려면 `-a` 옵션을 주면 된다.
`docker images prune`: 사용하지 않는 이미지 제거
`docker ... prune`: 사용하지 않는 ...제거