---
title: "langchain-ai/langgraph 1.2.0 — langgraph==1.2.0"
source: gh:langchain-ai/langgraph
source_url: https://github.com/langchain-ai/langgraph/releases/tag/1.2.0
category: rag_agents
score: 8
keywords: ["LangGraph", "StateGraph", "checkpoint", "durable resume", "delta channel"]
collected_at: 2026-05-13T18:27:07.109Z
approved_at: 2026-05-13T18:36:55.352Z
---

# langchain-ai/langgraph 1.2.0 — langgraph==1.2.0

langchain-ai/langgraph `1.2.0`가 릴리스되었습니다.
핵심 변경은 호스트 크래시가 나도 오류 핸들러를 이어서 재개할 수 있는 durable resume 지원입니다.
`StateGraph`에 `set_node_defaults()`가 추가되어 그래프 노드 기본값 설정이 쉬워졌습니다.
체크포인트 쪽에서는 delta channel 스냅샷과 종료 처리가 조정되었습니다.

## 참고

- 원문: https://github.com/langchain-ai/langgraph/releases/tag/1.2.0
