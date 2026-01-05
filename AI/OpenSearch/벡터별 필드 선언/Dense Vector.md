해당 내용은 400페이지 문서 4만권을 기준으로 작성된 내용임.

```json
"my_dense_vector": {
  "type": "knn_vector", // 필드를 knn_vector 타입으로 설정
  "dimension": 1024, // 차원
  "method": {
    "name": "hnsw", // HNSW(Hierarchical Navigable Small World) 알고리즘 설정
    "engine": "nmslib",
    "space_type": "cosinesimil",
    "parameters": {
      "m": 16, // 연결될 엣지
      "ef_construction": 128
    }
  }
}
```

## name, engine
일반적으로 hnsw 알고리즘과 nmslib 엔진을 사용한다. 다른 선택지로는 faiss 엔진을 사용하여 hnsw를 쓰거나 ivf를 쓰는 방법이 있다. faiss는 Meta(Facebook)에서 개발한 알고리즘으로, 대량의 데이터를 압축하여 처리하는 기능에 특화되어있다. 메모리가 절약되지만 속도가 느리다.

| 엔진 이름 | nmslib | faiss     |
| --------- | ------ | --------- |
| 알고리즘  | hnsw   | hnsw, ivf |

nmslib은 hnsw를 돌리기에 최적화되어있다. 대기업의 시스템을 구축하는 게 아니라면 nmslib, hnsw 스택을 채용하는 것이 무난하다.

## space_type

`l2`, `cosinesimil`, `innerproduct`가 있다.

`l2`: [유클리디안 거리](수학/유클리디안%20거리.md)를 통해 직선 거리 중 가장 가까운 순으로 검색한다.
`cosinesimil`: 벡터의 각도에 기반해 유사도를 통해 검색한다.
`innerproduct`: 길이와 각도를 모두 따진다. 두 값을 내적한 값을 반환한다.

`BGE-M3` 모델은 `cosinesimil` 방식의 검색을 권장한다.

## parameters
`m`: 연결될 엣지 갯수를 선택한다. 권장값 16~32

`ef_construction`: A라는 요소에 대한 벡터값을 저장한다고 가정할 때, A를 인덱스에 저장할 때 A의 각 노드의 이웃을 결정하기 위해 탐색하는 후보 리스트의 크기. 값이 높으면 벡터 지도가 매우 정교하게 그려진다. 권장값 128~256.