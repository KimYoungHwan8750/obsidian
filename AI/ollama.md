모델 저장 위치 바꾸는 법:

사용자 환경변수: OLLAMA_MODELS
환경 변수 이름을 위로 설정한 후 원하는 경로 지정하기

## HuggingFace에서 모델 다운받아서 등록하기

메모장을 열어서 아래 내용을 작성하고 파일명을 Modelfile로 저장한다.
```Modelfile
# 메모장에 복사 후 'Modelfile'이라는 이름으로 저장 (확장자 없음)
FROM "D:/OllamaModels/custom/qwen3-7b-instruct-q4_k_m.gguf"

# 모델의 성격을 정의하는 파라미터 (7B 모델에 최적화)
PARAMETER temperature 0.7
PARAMETER top_p 0.9

# 한국어 RAG 답변을 위한 시스템 프롬프트 설정
SYSTEM """
당신은 사원님의 4만 권 문서를 분석하는 유능한 AI 조수입니다. 
제공된 문서 내용을 바탕으로 정확하고 친절하게 한국어로 답변하세요.
"""
```

```shell
# 'my-qwen3'라는 이름으로 모델을 등록
ollama create my-qwen3 -f Modelfile
```

```shell
ollama run my-qwen3
```
