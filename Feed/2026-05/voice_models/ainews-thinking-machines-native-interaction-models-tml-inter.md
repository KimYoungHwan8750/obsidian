---
title: "[AINews] Thinking Machines' Native Interaction Models - TML-Interaction-Small 276B-A12B - advances SOTA Realtime Voice and kills standard VAD"
source: rss:latent_space
source_url: https://www.latent.space/p/ainews-thinking-machines-native-interaction
category: voice_models
score: 9
keywords: ["TML-Interaction-Small", "Thinking Machines", "realtime voice", "VAD"]
collected_at: 2026-05-13T18:27:07.081Z
approved_at: 2026-05-13T23:40:46.467Z
images_count: 4
videos_count: 2
---

# [AINews] Thinking Machines' Native Interaction Models - TML-Interaction-Small 276B-A12B - advances SOTA Realtime Voice and kills standard VAD

## 요약

Thinking Machines의 `TML-Interaction-Small 276B-A12B`가 실시간 음성 SOTA를 갱신했다고 소개합니다.
기존 `VAD`를 무력화할 정도로 자연스러운 상호작용 모델이라는 점이 핵심입니다.
새로운 realtime voice 모델 계열의 의미 있는 진전으로 보입니다.
음성 인터랙션, 저지연 합성, 실시간 처리에 관심 있다면 즉시 볼 만합니다.

## 이미지

![](https://substackcdn.com/image/fetch/$s_!LR03!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F02190942-3f50-4067-ae03-97c6b504b3a3_1490x1592.png)

![](https://substackcdn.com/image/fetch/$s_!S2rk!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F68576e99-b00a-4069-b93f-bbe906ddd810_1336x1602.png)

![](https://substackcdn.com/image/fetch/$s_!V7pE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0bfcadcb-b746-4873-aed4-6095f19f5897_1478x1676.png)

![](https://substackcdn.com/image/fetch/$s_!PeGT!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fef289b1c-4613-4835-98e6-475906d494da_1394x588.png)

## 동영상

- [https://www.youtube-nocookie.com/embed/2ky5MXBvZP8?rel=0&autoplay=0&showinfo=0&enablejsapi=0](https://www.youtube-nocookie.com/embed/2ky5MXBvZP8?rel=0&autoplay=0&showinfo=0&enablejsapi=0)
- [https://www.youtube.com/watch?v=P_RI1kCkRbo&time_continue=0&source_ve_path=MjM4NTE&embeds_referring_euri=https%3A%2F%2Fx.com%2F](https://www.youtube.com/watch?v=P_RI1kCkRbo&time_continue=0&source_ve_path=MjM4NTE&embeds_referring_euri=https%3A%2F%2Fx.com%2F)

## 본문 (번역)

# [AINews] Thinking Machines의 Native Interaction Models - TML-Interaction-Small 276B-A12B - SOTA Realtime Voice를 끌어올리고 표준 VAD를 무력화합니다

우연의 일치로, 우리가 [공개한](https://x.com/neilzegh/status/2053945753073074484?s=20) 바로 그날, 실시간 음성에 아직 무엇이 더 구축되어야 하는지에 대한 Neil Zeghidour(존경받는 [Kyutai Moshi](https://kyutai.org/)의 for-profit 스핀오프인 Gradium의 CEO)의 [발표](https://www.youtube.com/watch?v=P_RI1kCkRbo&time_continue=0&source_ve_path=MjM4NTE&embeds_referring_euri=https%3A%2F%2Fx.com%2F)와 정확히 같은 날, **Thinking Machines**가 ~1년 동안(드라마는 많았지만) [세 번째](https://news.smol.ai/issues/25-10-01-thinky)[번째](https://news.smol.ai/issues/25-02-18-ainews-xai-grok-3-and-mira-muratis-thinking-machines)로 등장해 [Interaction Models: A Scalable Approach to Human-AI Collaboration](https://thinkingmachines.ai/blog/interaction-models/)을 내놓았습니다. **TML-Interaction-Small**은 활성 파라미터 12B의 276B 파라미터 MoE로, Neil이 설명한 바와 같이 실시간 음성 모델의 최신 수준을 즉시 끌어올리며, [악명 높은 죽은 GPT 4o “her” 데모](https://openai.com/index/hello-gpt-4o/)를 훨씬 더 세밀하고 실제 사용에 더 가까운 데모들로 업데이트합니다:

<iframe src="https://www.youtube-nocookie.com/embed/2ky5MXBvZP8?rel=0&amp;autoplay=0&amp;showinfo=0&amp;enablejsapi=0" frameborder="0" loading="lazy" gesture="media" allow="autoplay; fullscreen" allowautoplay="true" allowfullscreen="true" width="728" height="409"></iframe>

[전체 블로그 पोस्ट](https://thinkingmachines.ai/blog/interaction-models/)에는 200ms씩의 “time-aligned microturns” 스트림에 초점을 맞춘, 연속적 상호작용 수준을 보여주는 데모가 많이 있습니다:

[

![](https://substackcdn.com/image/fetch/$s_!LR03!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F02190942-3f50-4067-ae03-97c6b504b3a3_1490x1592.png)

](https://substackcdn.com/image/fetch/$s_!LR03!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F02190942-3f50-4067-ae03-97c6b504b3a3_1490x1592.png)

encoder-free early fusion을 사용해, 이미지와 오디오를 모두 <200ms 안에 처리합니다. Meta의 [Chameleon](https://arxiv.org/abs/2405.09818)과 유사합니다:

[

![](https://substackcdn.com/image/fetch/$s_!S2rk!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F68576e99-b00a-4069-b93f-bbe906ddd810_1336x1602.png)

](https://substackcdn.com/image/fetch/$s_!S2rk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F68576e99-b00a-4069-b93f-bbe906ddd810_1336x1602.png)

팀은 [GPT-Realtime-2](https://www.latent.space/p/ainews-gpt-realtime-2-translate-and)와 [Gemini 3.1-Flash](https://www.latent.space/p/ainews-nano-banana-2-aka-gemini-31)보다 BigBench Audio, IFEval, FD-bench 같은 기본 항목에서 우위를 보이는 여러 공식 벤치마크를 제시하지만, 목표로 하는 상호작용 수준 때문에 시간 인식, 동시 번역, 시각적 proactive 동작을 위해 내부 벤치마크 2개를 새로 만들어야 했습니다:

-   **TimeSpeak:** 모델이 사용자 지정 시간에 **말을 시작**할 수 있는가?
    
    -   예시: “호흡 연습을 하고 싶어요. 제가 멈추라고 할 때까지 4초마다 숨을 들이마시고 내쉬라고 알려주세요.”
        
-   **CueSpeak:** 모델이 **적절한 순간**에 말할 수 있는가?
    
    -   예시: “제가 코드를 섞어 다른 언어를 사용할 때마다, 원래 언어의 올바른 단어를 알려주세요.”
        
-   **[RepCount-A](https://arxiv.org/abs/2204.01018)**는 반복 동작 영상들로 구성되어 있으며 온라인 카운팅 작업으로 변형됩니다. **연속적인 시각 추적과 적시 카운팅**을 측정합니다.
    
-   **[ProactiveVideoQA](https://arxiv.org/abs/2507.09313)**는 질문이 포함된 비디오들로 구성되며, 답은 특정 시점에만 이용 가능해집니다. 점수를 높이려면 올바른 시점에 올바른 답변을 해야 하며, 침묵은 부분 점수, 오답은 감점됩니다.
    
-   **[Charades](https://arxiv.org/abs/1604.01753)**는 표준 temporal action-localization 벤치마크입니다.
    
    -   사용자 음성 지시를 스트리밍합니다: “사람이 {action}을 시작하면 ‘start’라고 말하고, 멈추면 ‘Stop’이라고 말하세요.”
        

하지만 숫자보다 더 중요한 것은, 맨 아래에 묻혀 있는 이 데모 하나입니다. 샘플을 재생하고 AGI를 느껴보세요:

[

![](https://substackcdn.com/image/fetch/$s_!V7pE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0bfcadcb-b746-4873-aed4-6095f19f5897_1478x1676.png)

](https://substackcdn.com/image/fetch/$s_!V7pE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0bfcadcb-b746-4873-aed4-6095f19f5897_1478x1676.png)

마지막 노트는 Thinky의 로드맵에 대한 흥미로운 힌트를 남기는데, 백그라운드 에이전트와 인터랙티브 모델의 조합이 특히 인상적이며, 우리는 이 방향을 매우 좋게 봅니다.

[

![](https://substackcdn.com/image/fetch/$s_!PeGT!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fef289b1c-4613-4835-98e6-475906d494da_1394x588.png)

](https://substackcdn.com/image/fetch/$s_!PeGT!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fef289b1c-4613-4835-98e6-475906d494da_1394x588.png)

> 2026/5/9-2026/5/11의 AI News입니다. 12개 subreddit, [544개의 Twitter](https://twitter.com/i/lists/1585430245762441216)를 확인했으며 추가 Discord는 없었습니다. [AINews 웹사이트](https://news.smol.ai/)에서는 과거 모든 이슈를 검색할 수 있습니다. 참고로, [AINews는 이제 Latent Space의 한 섹션입니다](https://www.latent.space/p/2026). 이메일 수신 빈도는 [선택/해제](https://support.substack.com/hc/en-us/articles/8914938285204-How-do-I-subscribe-to-or-unsubscribe-from-a-section-on-Substack)할 수 있습니다!

**Thinking Machines의 Native Interaction Models와 턴 기반 AI를 넘어서는 변화**

-   **풀듀플렉스 멀티모달 상호작용을 1급 모델 능력으로**: 이날 가장 분명한 기술적 주제는 [Thinking Machines의 “interaction models” 미리보기](https://x.com/miramurati/status/2053939069890298321)였습니다. 이는 턴 기반 LLM 위에 음성, 턴 테이킹, 도구 사용을 덧붙이는 것이 아니라, 실시간 상호작용을 위해 **처음부터** 학습된 모델로 설명되었습니다. 함께 공개된 [기술 글](https://x.com/thinkymachines/status/2053938892152435174)과 [@johnschulman2](https://x.com/johnschulman2/status/2053940452789981426), [@soumithchintala](https://x.com/soumithchintala/status/2053940215505645938), [@cHHillee](https://x.com/cHHillee/status/2053940218747842619)의 팀 코멘터리는 이를 **human↔AI bandwidth** 문제로 규정합니다. 모델은 동시에 듣고, 말하고, 보고, 생각하고, 검색하고, 반응할 수 있어야 합니다. 데모는 연속적인 시간 인식, 끼어들기 처리, 동시 발화, 시각적 proactive 동작, 그리고 “지금 생각 중입니다 / 지금 검색 중입니다” 같은 명시적 경계 없이 배경 도구 사용을 강조했습니다. 팀원들은 또한 이전에는 특수 목적 시스템이 필요했던 많은 작업들이 타입 시그니처가 사실상 연속적인 **audio+video+text → audio+text**가 되면 zero-shot으로 가능해진다고 강조했습니다([@johnschulman2](https://x.com/johnschulman2/status/2053940940885332028)).
    
-   **기술적으로 왜 중요한가**: 여러 반응이 같은 지점으로 수렴했습니다. 이것은 “또 하나의 챗봇 데모”가 아니라 인터페이스 가정의 변화라는 것입니다. [@liliyu\_lili](https://x.com/liliyu_lili/status/2053942465477197891)는 **시각적 proactive 동작**(“제가 구부정해지기 시작하면 알려줘”, “푸시업 횟수를 세어줘”)이 현재 시스템에 없는 원시적 기능이라고 지적했습니다. [@rown](https://x.com/rown/status/2053950123139575863)은 이것을 시각적으로 proactive한 첫 일반적인 **video+speech** 모델이라고 불렀습니다. [@kimmonismus](https://x.com/kimmonismus/status/2053952846064767384)와 [@giffmana](https://x.com/giffmana/status/2053953584300003405) 모두 원시 벤치마크 주장보다 native interactivity가 더 깊은 혁신이라고 강조했습니다. 또한 이번 출시는 “realtime” 멀티모달 시스템에 대한 기준을 사실상 끌어올렸다고 [@swyx](https://x.com/swyx/status/2053960011748098462)가 언급했습니다. 구현 세부사항 하나는 [@eliebakouch](https://x.com/eliebakouch/status/2053982248253190180)를 통해 드러났는데, 스택이 **SGLang**을 사용하고 있습니다.
    

**OpenAI의 엔터프라이즈 및 보안 공세: Deployment Company와 Daybreak**

-   **OpenAI가 서비스와 배포 영역으로 더 내려오고 있습니다**: OpenAI는 [OpenAI Deployment Company](https://x.com/OpenAI/status/2053824997777457651)를 발표했습니다. 이는 프런티어 모델을 엔터프라이즈의 실제 업무 흐름에 배포하도록 돕기 위한 과반 지분 자회사입니다. 핵심 운영 세부사항은 [Tomoro](https://x.com/OpenAI/status/2053824999736410415) 인수를 통해 유입되는 **150명의 Forward Deployed Engineer와 Deployment Specialist**이며, [@gdb](https://x.com/gdb/status/2053884619695730745)는 **19개 파트너로부터 초기 투자금 40억 달러**를 언급했습니다. 여러 관찰자들은 이를 OpenAI가 Palantir-/Microsoft 스타일의 현장 엔지니어링 모델을 채택하는 것으로 해석했습니다. [@kimmonismus](https://x.com/kimmonismus/status/2053844403488194827)는 OpenAI가 AI 경제의 **deployment layer**를 장악하고 싶어한다고 주장했고, [@matvelloso](https://x.com/matvelloso/status/2053881988529139765)는 이를 기술 인력을 고객 운영에 가깝게 배치하는 역사적 엔터프라이즈 성공 패턴과 연결했습니다.
    
-   **Daybreak: 보안 특화 모델 배포, 워크플로, 신뢰 티어**: OpenAI는 또한 방어적 사이버 운영과 소프트웨어의 지속적 보안을 둘러싼 우산형 이니셔티브인 [Daybreak](https://x.com/OpenAI/status/2053939702110269822)를 출시했습니다. [@sama](https://x.com/sama/status/2053951874408276193)는 이를 빠르게 향상되는 AI 사이버 역량에 대한 실용적 대응으로 위치시켰습니다. [@TheRundownAI](https://x.com/TheRundownAI/status/2053945340592631843)가 요약한 제품 피치는 **GPT-5.5**, **Codex**, 저장소 위협 모델링, 취약점 발견, 패치 생성, 대응 자동화를 결합하며, **Trusted Access for Cyber**와 더 전문화된 **GPT-5.5-Cyber**를 포함한 차별화된 접근 계층을 제공합니다. 이는 Anthropic의 더 제한적인 사이버 태도와 대조되며, 이 긴장은 [@kimmonismus](https://x.com/kimmonismus/status/2053941490490265661)가 포착했습니다. 보안 agent 시스템을 구축하는 팀에게는 [@lukOlejnik](https://x.com/lukOlejnik/status/2053758553723211988)의 별도 경고가 중요합니다. **“Your LLM is not a security boundary”**—Microsoft Semantic Kernel은 모델 자체가 실패해서가 아니라, 프레임워크가 모델 출력을 과도하게 신뢰했기 때문에 prompt injection이 host-level RCE로 이어질 수 있었다고 합니다.
    

**Agent Harness, Local-First 도구, 그리고 제어 표면**

-   **더 나은 agent control plane이 하나의 제품 범주가 되고 있습니다**: 반복되는 불만은 유용한 agent에는 자율성이 필요하지만, 엔지니어는 여전히 되돌릴 수 있고 검사 가능한 제어를 원한다는 점입니다. [@itsclelia](https://x.com/itsclelia/status/2053716807748567329)는 이것을 **aggit**으로 다뤘습니다. 이는 agent artifact를 로컬/원격, S3-backed storage로 저장하는 Rust CLI로, 메인 Git 히스토리 밖에서 stash/branch/restore 의미론을 가능하게 합니다. 같은 맥락에서 [@\_catwu](https://x.com/_catwu/status/2053999857799672111)는 여러 Claude Code agent를 관리하는 새로운 `claude agents` 터미널 control plane을 강조했고, [@cursor\_ai](https://x.com/cursor_ai/status/2053939390410612988)는 Cursor를 **Microsoft Teams**로 밀어 넣어, agent가 전체 스레드를 읽고 PR을 여는 기능을 선보였습니다. 이 모든 것은 “agent orchestration”이 프롬프트 트릭만이 아니라 구체적인 UX 패턴으로 수렴하고 있음을 보여줍니다.
    
-   **Deep Agents / Hermes / local agents가 빠르게 성숙하고 있습니다**: [@masondrxy](https://x.com/masondrxy/status/2053717333433340034)는 **Deep Agents CLI**가 컨텍스트를 잃지 않고 대화 도중에 underlying model provider를 **hot-swap**할 수 있다고 언급했습니다. 이는 많은 agent 스택이 아직 놓치고 있는, 결코 사소하지 않은 시스템 기능입니다. LangChain도 provider/model별 튜닝을 위한 **harness profiles**를 강조했습니다([tweet](https://x.com/masondrxy/status/20538821888

## 참고

- 원문: https://www.latent.space/p/ainews-thinking-machines-native-interaction
