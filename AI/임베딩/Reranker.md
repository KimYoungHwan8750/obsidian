https://huggingface.co/BAAI/bge-reranker-v2-m3

```python
from FlagEmbedding import FlagReranker

class WnpReranker:
    # GPU를 사용할 경우 추론 가속을 위해 use_fp=True, CPU는 False
    _model = FlagReranker('BAAI/bge-reranker-v2-m3', use_fp16=True)

    @staticmethod
    def rerank(query: str, documents: list[str]):
        # [질문, 문서1], [질문, 문서2] 쌍을 만듭니다.
        pairs = [[query, doc] for doc in documents]
        scores = WnpReranker._model.compute_score(pairs)
        return scores
```

문자열A와 문자열B를 직접 비교한다.
rerank의 경우 ColBERT 벡터를 사용해 토큰 단위로 벡터를 비교한다.