---
title: "[AINews] GPT-Realtime-2, -Translate, and -Whisper: new SOTA realtime voice APIs"
original_title: "[AINews] GPT-Realtime-2, -Translate, and -Whisper: new SOTA realtime voice APIs"
source: rss:latent_space
source_url: https://www.latent.space/p/ainews-gpt-realtime-2-translate-and
category: voice_models
score: 10
keywords: ["GPT-Realtime-2", "GPT-Translate", "GPT-Whisper", "OpenAI", "realtime voice"]
collected_at: 2026-05-13T18:27:07.081Z
approved_at: 2026-05-14T14:41:29.901Z
images_count: 2
videos_count: 1
---

# [AINews] GPT-Realtime-2, -Translate, and -Whisper: new SOTA realtime voice APIs

## 요약

OpenAI가 `GPT-Realtime-2`, `GPT-Translate`, `GPT-Whisper`라는 새로운 실시간 음성 API를 공개했습니다.
실시간 음성 처리와 번역, STT 계열에서 모두 중요한 업데이트입니다.
realtime voice API라는 점에서 지연 시간과 실사용성 측면의 의미가 큽니다.
음성 모델/음성 인터페이스를 다루는 사람이라면 반드시 확인할 만합니다.

## 이미지

![](https://substackcdn.com/image/fetch/$s_!A0Wm!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9c9ffc6c-3f36-4f23-a2c3-34d5e64955aa_1014x918.png)

![](https://substackcdn.com/image/fetch/$s_!YiiK!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F81d9ff0f-63ea-4b44-85a9-7fcc0d659f75_1716x772.png)

## 동영상

- [https://www.youtube-nocookie.com/embed/JOu8v6CBjkE?rel=0&autoplay=0&showinfo=0&enablejsapi=0](https://www.youtube-nocookie.com/embed/JOu8v6CBjkE?rel=0&autoplay=0&showinfo=0&enablejsapi=0)

## 본문 (번역)

## OpenAI 새 실시간 음성 API 요약

### 출시된 3가지 모델

| 모델 | 역할 |
|------|------|
| **GPT-Realtime-2** | 음성→음성 (S2S), 추론 가능한 실시간 대화 |
| **GPT-Realtime-Translate** | 실시간 음성 번역 (70개 입력 → 13개 출력 언어) |
| **GPT-Realtime-Whisper** | 실시간 음성 전사(캡션/노트) |

---

### GPT-Realtime-2 핵심 스펙

- **컨텍스트**: 32K → **128K** 토큰으로 확대
- **추론 레벨**: minimal / low / medium / high / xhigh (기본값: low)
- **응답 지연**:
  - minimal 추론: **1.12초**
  - high 추론: **2.33초**
- **가격**: 입력 $1.15/시간, 출력 $4.61/시간 (이전과 동일)
- **입력 타입**: 텍스트 + 오디오 + **이미지**

---

### 주요 기능 개선

- **Preamble 지원**: 응답 전 "잠깐 확인해볼게요" 같은 짧은 선행 발화
- **병렬 툴 호출**: 여러 도구를 동시에 호출하면서 "캘린더 확인 중입니다" 처럼 상태를 음성으로 알림
- **인터럽션 복구**: 사용자가 말 도중 수정하거나 끊어도 자연스럽게 대응
- **전문 어휘 강화**: 의료 용어, 고유명사 등 도메인 특화 단어 보존 향상

---

### 성능 벤치마크

- **Big Bench Audio S2S**: 96.6% (이전 대비 +15.2%)
- **Scale AI 지시 보존율**: 36.7% → **70.8%** APR
- **Glean 내부 평가**: 유용성 **+42.9%** 향상
- **Genspark 통화 성공률**: **+26%** 개선

---

### 주목할 점

> **ChatGPT 앱의 음성 모드는 아직 업그레이드되지 않았습니다.** 이번 출시는 API 한정이며, ChatGPT Voice 업데이트는 별도로 예정("Stay tuned, we're cooking").

실시간 추론 + 툴 호출 + 라이브 번역 조합이 드디어 실용적인 수준에 도달했다는 평가가 많으며, 특히 고객 지원·의료·통역 분야 음성 에이전트에서 빠르게 채택될 것으로 보입니다.

## 참고

- 원문: https://www.latent.space/p/ainews-gpt-realtime-2-translate-and
