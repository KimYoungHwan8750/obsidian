AI 도구 오케스트레이션 도구이다.

| 역할           | 선택지                                       |
| -------------- | -------------------------------------------- |
| 텍스트 추출    | Apache Tika, PyMuPDF 등                      |
| 청크 분리      | LangChain, LlamaIndex                        |
| 임베딩 모델    | multilingual-e5-large, OpenAI ada-002        |
| 벡터 DB        | Chroma (가벼움), Milvus, Pinecone (클라우드) |
| LLM            | GPT-4, Claude, 로컬이면 Llama 등             |
| 오케스트레이션 | LangChain, LlamaIndex                        |

```python
# 임베딩 모델
from langchain_ollama import OllamaEmbeddings
from langchain_openai import OpenAIEmbeddings

# 로컬 Ollama 사용
embeddings = OllamaEmbeddings(model="nomic-embed-text")

# 또는 OpenAI 사용
embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")

# 텍스트 → 벡터
vector = embeddings.embed_query("스프링부트 초기 설정 방법")
```

```python
# 청크 분리
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,      # 청크당 최대 글자수
    chunk_overlap=50     # 앞뒤 겹치는 글자수
)

text = "긴 문서 내용..."
chunks = splitter.split_text(text)
```

```python
# 전체 연결 예시
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import PDFLoader

# 문서 로드 → 청크 분리 → 임베딩 → 벡터 DB 저장
loader = PDFLoader("사내문서.pdf")
docs = loader.load()
chunks = splitter.split_documents(docs)
vectorstore = Chroma.from_documents(chunks, embeddings)

# 검색
results = vectorstore.similarity_search("휴가 신청 방법", k=3)
```

| 라이브러리            | 라이선스   | 상업적 사용 |
| --------------------- | ---------- | ----------- |
| PyMuPDF               | AGPL-3.0   | ⚠️ 조건부   |
| LangChain             | MIT        | ✅ 자유롭게 |
| sentence-transformers | Apache 2.0 | ✅ 자유롭게 |
| Chroma                | Apache 2.0 | ✅ 자유롭게 |
| Ollama                | MIT        | ✅ 자유롭게 |

PyMuPDF만 상업적 제한(소스코드 공개 의무)가 있고 나머지는 상업적 이용 가능