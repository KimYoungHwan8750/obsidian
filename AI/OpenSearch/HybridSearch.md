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

```json
PUT /rag_v1
{
  "settings": {
    "index": {
      "number_of_shards": 1,
      "number_of_replicas": 0,    // 싱글 노드일 땐 레플리카를 0으로 설정
      "knn": true                // KNN 검색 기능을 활성화
    },
    "analysis": {
      "analyzer": {
        "my_nori_analyzer": {    // 분석기 이름을 my_nori_analyzer로 설정
          "type": "custom",
          "tokenizer": "nori_tokenizer",
          "decompound_mode": "mixed", // '김치찌개'를 '김치', '찌개'로도 검색 가능하게 분리
          "discard_punctuation": "true"
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "content": {               // 1. 원본 텍스트 (BM25 + Nori 담당)
        "type": "text",
        "analyzer": "my_nori_analyzer"
      },
      "content_dense": {         // 2. BGE-M3 Dense 벡터 (의미 담당)
        "type": "knn_vector",
        "dimension": 1024,       // BGE-M3의 차원수
        "method": {
          "name": "hnsw",
          "space_type": "cosinesimil", // 코사인 유사도 사용
          "engine": "nmslib"
        }
      },
      "content_sparse": {        // 3. BGE-M3 Sparse (토큰 ID 담당)
        "type": "rank_features"  // Sparse 가중치를 저장하는 특수 타입
      },
      "metadata": {              // 4. 출처, 페이지 번호 등 부가 정보
        "type": "keyword"
      }
    }
  }
}
```