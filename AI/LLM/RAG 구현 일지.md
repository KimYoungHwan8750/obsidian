## 임베딩 => 오픈서치
1. HNSW 설정 필수
2. Dense, Sparse 모두 저장

```json
{
  "query": {
    "hybrid": {
      "queries": [
        {
          "knn": {
            "my_dense_column": {  // 1. 여기서 dense 컬럼 이름을 지정!
              "vector": [0.1, 0.2, ...],
              "k": 100
            }
          }
        },
        {
          "script_score": {
            "query": { "match_all": {} },
            "script": {
              "source": "rank_feature(params.field)", // 2. 여기서 sparse 컬럼 지정!
              "params": { "field": "my_sparse_column" }
            }
          }
        }
      ]
    }
  }
}
```

인덱스 생성
```json
"method": {
  "name": "hnsw",
  "engine": "nmslib", // 또는 nmslib
  "space_type": "l2",  // 또는 "cosinesimil" (BGE-M3라면 코사인 유사도 권장)
  "parameters": {
    "m": 16,            // 16~32 정도면 충분합니다.
    "ef_construction": 128
  }
}
```