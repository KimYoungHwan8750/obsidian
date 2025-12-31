쿼리 알고리즘을 복합적으로 실행할 때 사용하며 knn, term, rank_feature, match, rank_feature, filter 등이 있다.
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

기본 형태는 위와 같다.
