---
title: "vllm-project/vllm v0.19.0"
original_title: "vllm-project/vllm v0.19.0"
source: gh:vllm-project/vllm
source_url: https://github.com/vllm-project/vllm/releases/tag/v0.19.0
category: homelab
score: 9
keywords: ["vLLM", "v0.19.0", "Gemma 4", "speculative decoding", "async scheduling"]
collected_at: 2026-05-13T18:27:07.109Z
approved_at: 2026-05-14T16:31:01.529Z
images_count: 0
videos_count: 0
---

# vllm-project/vllm v0.19.0

## 요약

vLLM `v0.19.0`가 공개되었습니다.
`Gemma 4`의 MoE, 멀티모달, reasoning, tool-use 지원이 포함된 큰 업데이트입니다.
또한 zero-bubble async scheduling과 speculative decoding으로 처리량을 높였습니다.
서빙 엔진의 기능 확장과 성능 개선이 함께 들어간 중요한 릴리스입니다.

## 본문 (번역)

## vLLM v0.19.0 주요 내용 요약

### 🌟 핵심 하이라이트

| 기능 | 설명 |
|------|------|
| **Gemma 4 지원** | MoE, 멀티모달, 추론, 툴 사용 포함 전체 아키텍처 지원 (`transformers>=5.5.0` 필요) |
| **제로-버블 비동기 스케줄링** | 스펙 디코딩과 결합해 처리량 대폭 향상 |
| **Model Runner V2 성숙화** | 파이프라인 병렬화용 piecewise CUDA 그래프, 스펙 디코드 rejection sampler 등 |
| **ViT 전체 CUDA 그래프** | 비전 인코더(ViT) 오버헤드 감소 |
| **CPU KV 캐시 오프로딩** | V1용 범용 CPU KV 캐시 오프로딩, 플러그인형 캐시 정책 지원 |
| **DBO 일반화** | 마이크로배치 최적화가 특정 아키텍처 외 일반 모델로 확대 |
| **NVIDIA B300/GB300 지원** | SM 10.3, Allreduce 퓨전 기본 활성화 |
| **Transformers v5 호환성** | HuggingFace Transformers v5 전반 호환성 수정 |

### 🆕 신규 모델 아키텍처
- **Gemma 4**, Cohere ASR/Transcribe, ColQwen3.5 4.5B
- LFM2-ColBERT-350M, Granite 4.0 1B Speech, Qwen3-ForcedAligner

### 🔑 주목 포인트
- **197명** 기여자, **448개** 커밋 (신규 기여자 54명)
- Gemma 4는 `vllm/vllm-openai:gemma4` 도커 이미지 사용 권장
- LoRA 확장 지원도 계속 강화 중

특정 기능에 대해 더 자세히 알아보고 싶으신 부분이 있으신가요?

## 참고

- 원문: https://github.com/vllm-project/vllm/releases/tag/v0.19.0
