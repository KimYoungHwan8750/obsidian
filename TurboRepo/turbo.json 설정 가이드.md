# turbo.json 설정 가이드

## tasks — 실행할 수 있는 명령 정의

```json
{
  "tasks": {
    "build": { ... },
    "dev": { ... },
    "typecheck": { ... }
  }
}
```

각 태스크 이름은 패키지의 `package.json`에 있는 `"scripts"`의 키와 매칭된다.

```bash
turbo run build
# → 모든 패키지에서 "scripts": { "build": "..." } 실행
```

---

## dependsOn — 실행 순서 제어

### `"^태스크"` (캐럿) — 의존 패키지의 태스크를 먼저

```json
"build": {
  "dependsOn": ["^build"]
}
```

`^` = "내가 의존하는 **다른 패키지**의 build를 먼저 실행해라"

```
apps/web → @yhlib/core 의존 관계에서:
  1. @yhlib/core build 먼저 실행
  2. apps/web build 다음 실행
```

### `"태스크"` (캐럿 없음) — 같은 패키지 내 다른 태스크를 먼저

```json
"test": {
  "dependsOn": ["build"]
}
```

= "같은 패키지 안에서 build가 끝난 후에 test를 실행해라"

### 정리

| 표현 | 의미 |
|------|------|
| `"^build"` | 의존하는 **다른 패키지**의 build를 먼저 |
| `"build"` | **같은 패키지** 내의 build를 먼저 |
| `"lint"` | **같은 패키지** 내의 lint를 먼저 |

---

## outputs — 캐싱할 결과물

```json
"build": {
  "outputs": ["dist/**", ".next/**"]
}
```

Turborepo는 빌드 결과를 캐싱한다. 코드가 안 바뀌었으면 다시 빌드하지 않고 캐시에서 꺼낸다.

```bash
# 첫 실행
turbo run build     # 30초 소요

# 코드 변경 없이 재실행
turbo run build     # 0.1초 (>>> FULL TURBO)
```

`outputs`는 "이 폴더들이 빌드 결과물이다"라고 Turborepo에 알려주는 것이다.

---

## cache — 캐싱 비활성화

```json
"dev": {
  "cache": false
}
```

dev 서버처럼 매번 새로 시작해야 하는 태스크는 캐싱할 필요 없다.

---

## persistent — 장시간 실행 프로세스

```json
"dev": {
  "persistent": true
}
```

dev 서버처럼 종료되지 않는 프로세스에 표시. 안 붙이면 Turborepo가 "이 태스크가 안 끝나네?" 경고를 띄운다.

---

## 전체 예시

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "dev": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "clean": {
      "cache": false
    }
  }
}
```
