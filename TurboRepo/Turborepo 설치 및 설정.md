# Turborepo 설치 및 설정

## 전제 조건

pnpm workspace가 먼저 구성되어 있어야 한다.

```yaml
# pnpm-workspace.yaml
packages:
  - "packages/*"
  - "apps/*"
```

```json
// 루트 package.json
{
  "private": true,
  "packageManager": "pnpm@9.15.0"
}
```

> `pnpm install` 하면 `workspace:*`로 참조된 로컬 패키지를 심링크로 연결해준다. 이건 pnpm의 기능이지 Turborepo의 기능이 아니다.

## 설치

```bash
pnpm add -Dw turbo
```

`-Dw` = devDependency로 root workspace에 설치

## turbo.json 생성

프로젝트 루트에 `turbo.json`을 만든다. 이게 Turborepo의 유일한 설정 파일이다.

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    },
    "typecheck": {
      "dependsOn": ["^build"]
    }
  }
}
```

## root package.json 편의 스크립트

```json
{
  "scripts": {
    "dev:web": "turbo run dev --filter=@yhlib/web",
    "dev:mobile": "turbo run dev --filter=@yhlib/mobile",
    "build": "turbo run build",
    "typecheck": "turbo run typecheck"
  }
}
```

## .npmrc (권장)

```
shamefully-hoist=true
strict-peer-dependencies=false
```

`shamefully-hoist=true`는 React Native, 일부 Next.js 플러그인이 루트 레벨 의존성을 기대하는 경우 필요하다.
