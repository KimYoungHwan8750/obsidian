# CoplayDev unity-mcp (보조)

## 개요

- GitHub: CoplayDev/unity-mcp
- 역할: 보조 MCP. Cinemachine, VFX, ProBuilder 특화 작업
- 외부 의존성: Python 3.10+, uv
- 서버: 수동 시작

## 설치

### 1. uv 설치 (Python 패키지 매니저)

```bash
pip install uv
```

### 2. Unity 패키지 설치

Unity 에디터에서:
1. Window > Package Manager
2. `+` > Add package from git URL...
3. 입력:

```
https://github.com/CoplayDev/unity-mcp.git?path=/MCPForUnity#main
```

> **주의**: `?path=/MCPForUnity#main` 필수. 없으면 "Repository does not contain a package manifest" 에러 발생.

**베타 버전 (최신 기능):**
```
https://github.com/CoplayDev/unity-mcp.git?path=/MCPForUnity#beta
```

### 3. Claude Code에 MCP 등록

```bash
claude mcp add --scope local --transport http UnityMCP http://127.0.0.1:8080/mcp
```

### 4. 서버 시작

1. Unity 에디터 > Window > MCP for Unity
2. Start Server 클릭
3. Claude Code 선택 > Configure

## Claude Code 설정 수동 등록

`~/.claude.json`의 해당 프로젝트 > `mcpServers`에 추가:

```json
{
  "UnityMCP": {
    "type": "http",
    "url": "http://127.0.0.1:8080/mcp"
  }
}
```

## MCP 제거 (필요 시)

```bash
claude mcp remove --scope local UnityMCP
claude mcp remove --scope user UnityMCP
claude mcp remove --scope project UnityMCP
```

## 등록 확인

```bash
claude mcp list
```

## 주의사항

- Python 3.10+ 및 uv가 PATH에 있어야 함
- 서버 포트: 8080 고정
- Claude Code 세션 재시작해야 MCP 도구가 로드됨
- IvanMurzak과 동시 사용 가능 (포트 다름, 충돌 없음)
