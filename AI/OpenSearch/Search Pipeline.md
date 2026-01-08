반환된 문서에 점수를 매기는 방식에는 주로 아래 두 가지 방식이 사용된다.

| **비교 항목**           | **Min-Max (Normalization)**        | **RRF (Rank Fusion)**               |
| ----------------------- | ---------------------------------- | ----------------------------------- |
| **핵심 철학**           | "점수의 격차는 중요하다"           | "순위만이 진실이다"                 |
| **계산 방식**           | $(점수 - 최소) / (최대 - 최소)$    | $1 / (순위 + K)$                    |
| **강점**                | 특정 엔진의 **확신도**를 반영 가능 | 서로 다른 엔진 간의 **안정적** 결합 |
| **약점**                | 이상치 점수에 취약함               | 1등과 2등의 미세한 점수 차이 무시   |
| **OpenSearch 프로세서** | `normalization-processor`          | `score-ranker-processor`            |

여기서 특정 엔진의 확신도를 반영 가능이라는 뜻은, 점수가 유독 높게 나오는 문서는 매우 신뢰도 있는 문서라는 특성을 보존하는 것을 말한다.

문서의 평균 점수가 50점이라고 가정했을 때 Min Max 정규화 방식은 100점이면 매우 신뢰성이 높은 문서이다. 그러나 RRF 방식은 해당 문서에 대한 점수를 기록하지 않고 오로지 순위로만 평가한다. 따라서 점수가 20점 짜리라도 1등이 될 수 있으며 20점 짜리 문서 아래로 19.9점 짜리 문서가 2등이 될수도 있고 1점 짜리 문서가 2등이 될 수도 있다.

이러한 특성을 잘 파악해서 점수 병합 메커니즘을 신중히 결정해야한다.

```
PUT /_search/pipeline/<rrf-pipeline>
{
  "description": "Post processor for hybrid RRF search",
  "phase_results_processors": [
    {
      "score-ranker-processor": {
        "combination": {
          "technique": "rrf",
		  "rank_constant": 40
        }
      }
    }
  ]
}
```
위와 같이 search pipeline 구성이 가능하며 `"rank_constant": 40` 옵션으로 순위 상수를 조정 가능하다. (설정 안 할시 기본값 60. 연구 결과 일정 성능을 보장하는 값)

## 파이프라인 구성
[공식 ](https://docs.opensearch.org/latest/search-plugins/search-pipelines/normalization-processor/)