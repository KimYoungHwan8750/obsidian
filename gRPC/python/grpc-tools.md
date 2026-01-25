실사용 예제
`python -m grpc_tools.protoc -I. --python_out=kyh --grpc_python_out=kyh service.proto`

옵션 설명
`-I.`: 현재 디렉토리를 기준점으로 잡음

`--python_out`: 데이터 구조 파일 위치
`--grpc_python_out`: gRPC 통신 파일 위치
마지막 인자: proto 파일 위치