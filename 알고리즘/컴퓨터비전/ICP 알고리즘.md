금일 ICP를 수행하면서 ICP에 대한 수학적 이해가 없으면 프로젝트 진행이 어려울 것이라고 판단해 좀 더 심화하여 공부할 것을 결심. 어려운 부분이 많았지만 단계적으로 해결해나가고자 함.

1. Source Point Cloud(이하 Source로 표기), Target Point Cloud(이하 Target으로 표기)의 평균값을 구함. Unity의 Vector3 자료형은 각 Vector간 연산을 쉽게 도와주는 메서드들이 내장되어 있음.
2. Source와 Target의 각 Point에 1번 과정에서 구한 평균값을 빼줌으로써 평균값이 0이 되도록 만듦. 이러한 처리를 거친 값들을 이후 CenteredSource, CenteredTarget으로 칭한다.
3. 각 Source 점들마다 최단거리의 Target 점들을 correspondence로 설정. 이때 가장 근접한 Target 점을 구할 때 Nearest Neighborhood 알고리즘을 사용하면 되는데 대표적으로는 K-D Tree가 있음. 다만 Nearest Neighborhood Search에 자주 등장하는 개념인 것 치고는 자료 조사가 수월하지 않았고, 파이썬으로 작성된 코드를 티스토리 https://kimyo-s.tistory.com/54 에서 찾아볼 수 있었음. 다만 파이썬 생태계의 다른 라이브러리를 추가적으로 필요로 하는 것 같아 이번 테스트에선 유니티 사용자가 만든 라이브러리 https://github.com/viliwonka/KDTree 를 사용할 예정.
4. 이렇게 Source, 그리고 Corresponcdene한 관계에 있는 Target. 이 두 가지 정보를 이용해 공분산 행렬을 구하면 된다는데, 공분산 행렬이 뭔지 궁금해서 알아보니 두 데이터간의 연관성을 유추할 수 있는 행렬이라는 설명을 볼 수 있었음. 공분산이 0이면 일체 관련성이 없음을 나타낸다고 하고, 공분산 행렬을 구하는 방법은 아래와 같은 3x3 행렬을 만드는 것임.

s는 source point cloud, t는 target point cloud의 point임.

(s.x * t.x) (s.x * t.y) (s.x * t.z) 
(s.y * t.x) (s.y * t.y) (s.y * t.z)
(s.z * t.x) (s.z * t.y) (s.z * t.z)

5. 이렇게 만들어진 공분산 행렬에 SVD(특이값 분해)를 적용해야함. 4번 절차를 거쳐 얻은 공분산 행렬에는 상관관계 정보가 들어있는데, 이때 SVD를 통해 최적 회전 행렬을 추출할 수 있다고 함. 이 최적 회전 행렬을 R로 정의.
6. 이제 이동 벡터를 구하면 되는데 이동 벡터 t는 CenteredTarget - R * CenteredSource 통해 구할 수 있음.
7. 이제 최적해만큼 Source Point를 이동시킴. 최적해는 R * Source Point + t을 계산한 값.
8. 두 점군의 거리가 충분히 가까워질 때까지 위 과정을 반복.

금일 진행 상황은 1번 과정, 2번 과정을 모두 마무리함. point cloud manager가 native slice로 관리하는 vector3 들과 3d 모델링(정육면체)의 mesh filter가 관리하는 vector3 정보를 통합하기 위해 상당히 많은 시간이 소요되었음. 3번 과정은 해당 라이브러리의 마지막 업데이트가 18년도인 만큼 적합한지 조금 더 테스트해볼 필요가 있어 주말 내로 마무리해볼 예정이었던 테스트가 다소 지연되었으나 4,5,6,7,8번 과정이 단순히 1~3과정에서 구한 벡터값들을 계산하는 것이므로 익일까지 테스트 결과를 확인할 수 있을 것으로 생각됨.