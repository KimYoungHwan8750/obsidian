---
title: "vllm-project/vllm v0.20.0"
source: gh:vllm-project/vllm
source_url: https://github.com/vllm-project/vllm/releases/tag/v0.20.0
category: homelab
score: 9
keywords: ["vLLM", "v0.20.0", "DeepSeek V4", "CUDA 13.0", "PyTorch 2.11"]
collected_at: 2026-05-13T18:27:07.109Z
approved_at: 2026-05-13T23:38:25.668Z
images_count: 0
videos_count: 0
---

# vllm-project/vllm v0.20.0

## 요약

vLLM `v0.20.0`가 대형 릴리스로 공개되었습니다.
`DeepSeek V4` 초기 지원이 들어갔고, 기본 CUDA 휠이 `CUDA 13.0`으로 전환되었습니다.
또한 `PyTorch 2.11` 업그레이드와 `uv` 기반 설치 권장 등 배포/빌드 환경 변화가 큽니다.
대규모 서빙 스택을 운영하거나 최신 GPU 환경을 맞추는 경우 즉시 가치가 있습니다.

## 본문 (번역)

# vllm-project/vllm v0.20.0

vllm-project/vllm 새 릴리스: v0.20.0. # vLLM v0.20.0

## Highlights
이번 릴리스에는 320명의 기여자(그중 123명은 신규)로부터 752개의 커밋이 포함되어 있습니다!

* **DeepSeek V4**: DeepSeek V4의 초기 지원이 반영되었습니다 (#40860). 또한 DSML token-leakage 수정이 DSV4/3.2에 적용되었고 (#40806), DSA + MTP IMA 수정 (#40772), shared expert에 대한 silu clamp limit 추가 (#40950)가 포함되었습니다.
* **CUDA 13.0 default**: PyPI의 기본 CUDA wheel과 `vllm/vllm-openai:v0.20.0` 이미지가 CUDA 13.0으로 전환되었습니다. architecture 목록과 build-args가 정리되었고 (#39878), PyTorch 2.11.0에 맞추기 위해 CUDA가 13.0.2로 업데이트되었습니다 (#40669). 일반적으로 우리의 CUDA 버전 정책은 PyTorch의 정책을 따릅니다. CUDA 12.9를 사용 중이라면 `uv`로 vLLM을 설치하고 `--torch-backend=cu129`를 사용하는 것을 강력히 권장합니다.
* **PyTorch 2.11 upgrade** (#34644): CUDA용 vLLM은 torch 2.11로 제공되며, XPU도 이제 torch 2.11을 사용합니다 (#37947) — XPU는 더 이상 2.10에 고정되지 않습니다. 이는 환경 의존성에 대한 breaking change입니다.
* **Python 3.14**: 지원되는 Python 버전 목록에 추가되었습니다 (#34770).
* **Transformers v5**: 이제 vLLM이 HuggingFace `transformers>=5`에서 동작합니다 (#30566). vision-encoder torch.compile 우회 처리 (#30518)와 함께, PaddleOCR-VL image processor의 `max_pixels` (#38629), Mistral YaRN 경고 (#37292), Jina ColBERT rotary inv_freq 재계산 (#39176) 등 v4/v5 호환성 수정도 계속 반영되었습니다.
* **New large models**: Hunyuan v3 (Hy3) 미리보기 지원 (#40681)과 HYV3 reasoning parser (#40713), 그리고 Granite 4.1 Vision을 내장 multimodal 모델로 지원 (#40282)합니다.
* **FlashAttention 4 as default MLA prefill**: FA4가 기본 MLA prefill backend로 다시 활성화되었습니다 (#38819). head-dim 512 및 SM90+에서의 paged-KV 지원(#38835)과 함께, upstream FA4 동기화(#38690)도 포함됩니다.
* **TurboQuant 2-bit KV cache**: 2-bit KV cache 압축과 4× 용량을 제공하는 새로운 attention backend가 추가되었습니다 (#38479). 이제 FA3/FA4 prefill 지원도 포함됩니다 (#40092).
* **Online quantization frontend**: end-to-end online quantization frontend가 새로 추가되었습니다 (#38138). 관련 문서도 포함됩니다 (#39736). experts_int8는 FP8 online 경로로 통합되었고 (#38463), MXFP8 online quant

## 참고

- 원문: https://github.com/vllm-project/vllm/releases/tag/v0.20.0
