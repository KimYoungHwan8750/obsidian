# IvanMurzak Unity-MCP (주력)

## 개요

- GitHub: IvanMurzak/Unity-MCP
- 역할: 주력 MCP. Roslyn 즉시 실행, 런타임 에이전트, 일상 작업 전반
- 외부 의존성: 없음
- 서버: Unity 시작 시 자동 시작

## 설치

### 1. Unity 패키지 설치

Unity 에디터에서:
1. Window > Package Manager
2. `+` > Add package from git URL...

> **주의**: `https://github.com/IvanMurzak/Unity-MCP.git` 직접 입력하면 에러남 (루트에 package.json 없음)

**unitypackage 방식으로 설치:**
1. GitHub > IvanMurzak/Unity-MCP > Releases > 최신 버전 > `AI-Game-Dev-Installer.unitypackage` 다운로드
2. Unity 에디터 > Assets > Import Package > Custom Package...
3. 다운받은 `.unitypackage` 선택 > Import

**또는 OpenUPM:**
```bash
openupm add com.ivanmurzak.unity.mcp
```

### 2. Unity 에디터에서 설정

1. Window > AI Game Developer 열기
2. AI agent 드롭다운 > **Claude Code** 선택
3. 안내에 따라 Claude Code에 등록 명령 실행:

```bash
claude mcp add --transport http ai-game-developer http://localhost:59172
```

> 포트(59172)는 프로젝트 경로의 SHA256 해시로 결정됨. 프로젝트마다 다를 수 있으니 Unity 화면에 표시된 Server URL 확인할 것.

### 3. 서버 시작 및 연결

1. **Start** 클릭 (MCP server)
2. **Connect** 클릭 (Unity 연결)
3. 둘 다 초록색이면 연결 성공

## Claude Code 설정 수동 등록

`~/.claude.json`의 해당 프로젝트 > `mcpServers`에 추가:

```json
{
  "ai-game-developer": {
    "type": "http",
    "url": "http://localhost:59172"
  }
}
```

## 주의사항

- 프로젝트 경로에 **공백 금지** (예: `C:\project\unity_yhlib` ✓, `C:\My Projects` ✗)
- Claude Code 세션 재시작해야 MCP 도구가 로드됨
- "Missing Signature" 경고 → Close (서드파티 패키지라 뜨는 정상 알림)
- "A new scoped registry" 알림 → Close (OpenUPM 레지스트리 추가 알림)
