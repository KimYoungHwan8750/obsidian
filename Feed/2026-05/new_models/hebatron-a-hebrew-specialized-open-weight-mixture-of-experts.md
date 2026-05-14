---
title: "HEBATRON: A Hebrew-Specialized Open-Weight Mixture-of-Experts Language Model"
source: rss:arxiv_cl
source_url: https://arxiv.org/abs/2605.11255
category: new_models
score: 9
keywords: ["Hebatron", "Mixture-of-Experts", "open-weight LLM", "Hebrew", "NVIDIA Nemotron-3"]
collected_at: 2026-05-13T18:27:07.085Z
approved_at: 2026-05-14T03:28:33.458Z
images_count: 0
videos_count: 0
---

# HEBATRON: A Hebrew-Specialized Open-Weight Mixture-of-Experts Language Model

## 요약

Hebatron은 Hebrew에 특화된 오픈웨이트 Mixture-of-Experts LLM입니다.
NVIDIA Nemotron-3 sparse MoE 아키텍처를 기반으로, easy-to-hard 커리큘럼과 anti-forgetting 앵커링을 사용해 학습했습니다.
`30B` 파라미터 모델에서 `3B`만 활성화하면서도 Hebrew reasoning 벤치마크에서 기존 모델을 앞섭니다.
특정 언어에 대한 고성능 오픈 모델이라는 점과 MoE 효율성 측면에서 볼 가치가 큽니다.

## 본문 (번역)

# HEBATRON: Hebrew에 특화된 Open-Weight Mixture-of-Experts Language Model

Authors:[Noam Kayzer](https://arxiv.org/search/cs?searchtype=author&query=Kayzer,+N), [Dan Revital](https://arxiv.org/search/cs?searchtype=author&query=Revital,+D), [Ori Bar Joseph](https://arxiv.org/search/cs?searchtype=author&query=Joseph,+O+B), [Smadar Arvatz](https://arxiv.org/search/cs?searchtype=author&query=Arvatz,+S), [Or Levi](https://arxiv.org/search/cs?searchtype=author&query=Levi,+O), [Tal Geva](https://arxiv.org/search/cs?searchtype=author&query=Geva,+T), [Shaltiel Shmidman](https://arxiv.org/search/cs?searchtype=author&query=Shmidman,+S), [Amir DN Cohen](https://arxiv.org/search/cs?searchtype=author&query=Cohen,+A+D), [Noam Ordan](https://arxiv.org/search/cs?searchtype=author&query=Ordan,+N), [Omer Baruch](https://arxiv.org/search/cs?searchtype=author&query=Baruch,+O), [Kate Zinkovskaia](https://arxiv.org/search/cs?searchtype=author&query=Zinkovskaia,+K), [Zevi Apini](https://arxiv.org/search/cs?searchtype=author&query=Apini,+Z), [Sarel Weinberger](https://arxiv.org/search/cs?searchtype=author&query=Weinberger,+S)

[View PDF](https://arxiv.org/pdf/2605.11255) [HTML (experimental)](https://arxiv.org/html/2605.11255v1)

> 초록: 저희는 NVIDIA Nemotron-3 sparse Mixture-of-Experts architecture를 기반으로 구축한 Hebrew에 특화된 open-weight large language model인 Hebatron을 제시합니다. 학습은 continuous anti-forgetting anchoring을 포함한 three-phase easy-to-hard curriculum으로 진행되며, 이어서 200만 개의 bilingual Hebrew--English sample에 대한 supervised fine-tuning을 수행합니다. curriculum의 순서만으로도 반전된 구성보다 aggregate benchmark에서 3점의 향상을 얻습니다. Hebatron은 Hebrew reasoning 평균 73.8\\%를 달성하여 DictaLM-3.0-24B-Thinking(68.9\\%)을 능가하고, GSM8K-HE와 Israeli Trivia에서 Gemma-3-27B-IT와 경쟁 가능한 성능을 보입니다. 또한 30B-parameter model 전체에서 forward pass당 3B parameters만 활성화하면서, native context length 최대 65,536 tokens에서 약 9배 더 높은 inference throughput을 제공합니다. 저희가 아는 한, 이는 어떤 target language에 대해서도 Nemotron-3 architecture를 language-specific adaptation한 최초의 사례이며, native long-context support를 갖춘 최초의 open-weight Hebrew-specialized MoE model입니다. Model weights는 Hebrew 및 Semitic-language NLP의 추가 연구를 지원하기 위해 공개됩니다.

## 제출 이력

From: Sarel Weinberger \[[view email](https://arxiv.org/show-email/4b2aebcf/2605.11255)\]  
**\[v1\]** Mon, 11 May 2026 21:27:53 UTC (257 KB)

## 참고

- 원문: https://arxiv.org/abs/2605.11255
