# Turborepo 주요 명령어

## 기본 실행

```bash
turbo run build          # 모든 패키지의 build 실행
turbo run dev            # 모든 패키지의 dev 실행
turbo run typecheck      # 모든 패키지의 typecheck 실행
```

---

## --filter — 특정 패키지만 실행

가장 자주 쓰는 옵션.

```bash
# 특정 패키지만
turbo run dev --filter=@yhlib/web

# 특정 패키지 + 그것이 의존하는 패키지까지
turbo run build --filter=@yhlib/web...

# 특정 패키지 + 그것을 의존하는 패키지까지
turbo run build --filter=...@yhlib/core
```

### filter 패턴 정리

| 패턴 | 의미 |
|------|------|
| `--filter=@yhlib/web` | 이 패키지만 |
| `--filter=@yhlib/web...` | 이 패키지 + 의존하는 모든 패키지 (downstream) |
| `--filter=...@yhlib/core` | 이 패키지 + 이걸 의존하는 모든 패키지 (upstream) |
| `--filter=./apps/*` | 디렉토리 기반 필터 |

---

## 실행 흐름 시각화

```
turbo run build
       │
       ▼
  turbo.json 읽기
  "build" 태스크의 dependsOn: ["^build"]
       │
       ▼
  패키지 의존 그래프 분석:
    apps/web → @yhlib/next → @yhlib/core
       │
       ▼
  실행 순서 결정:
    1. @yhlib/core build    (의존 없음 → 먼저)
    2. @yhlib/next build    (core 완료 후)
    3. apps/web build       (next 완료 후)
       │
       ▼
  각 단계에서 캐시 확인:
    코드 변경 없으면 → 캐시 사용 (즉시 완료)
    코드 변경 있으면 → 실제 빌드 실행
```

---

## 기타 유용한 옵션

```bash
# 의존 그래프 시각화 (브라우저에서 열림)
turbo run build --graph

# 캐시 무시하고 강제 실행
turbo run build --force

# dry run (실제 실행 없이 어떤 순서로 실행될지 확인)
turbo run build --dry-run

# 병렬 실행 수 제한
turbo run build --concurrency=2
```

---

## 핵심 요약

Turborepo가 하는 일은 딱 두 가지:
1. **순서 정하기** — 패키지 의존성 그래프 분석 → 올바른 순서로 태스크 실행
2. **캐싱** — 코드가 안 바뀌었으면 이전 결과 재사용

나머지(패키지 간 연결, 의존성 설치)는 전부 pnpm workspace가 처리한다.
