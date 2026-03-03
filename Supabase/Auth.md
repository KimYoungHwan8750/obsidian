## Supabase Auth (Next.js)

Supabase의 인증 시스템. Next.js에서는 `@supabase/ssr` 패키지를 사용해 서버사이드 인증을 구현한다.

### 설치

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 환경변수

`.env.local` 파일에 설정한다.

```properties
NEXT_PUBLIC_SUPABASE_URL="https://프로젝트ID.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJI..."
```

`NEXT_PUBLIC_` 접두사가 붙어있으므로 브라우저에서도 접근 가능하다. 이 키는 공개키(publishable key)이므로 노출되어도 괜찮다. 단, `service_role` 키는 절대 클라이언트에 노출하면 안 된다.

---

## 클라이언트 설정

### 브라우저 클라이언트

`lib/supabase/client.ts`

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
```

### 서버 클라이언트

`lib/supabase/server.ts`

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component에서 호출 시 쿠키 쓰기 불가 → 미들웨어가 처리
          }
        },
      },
    }
  )
}
```

`setAll`의 try/catch는 Server Component에서 쿠키 쓰기가 불가능하기 때문에 필요하다. 미들웨어가 대신 쿠키를 저장해준다.

### 미들웨어

`middleware.ts`

미들웨어는 모든 요청에서 JWT 토큰을 갱신하고 쿠키를 동기화한다. **필수 설정**이다.

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // 중요: createServerClient와 이 호출 사이에 다른 코드를 넣지 말 것
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

---

## 회원가입

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
})
```

이메일 확인이 활성화된 경우(기본값) `session`이 `null`로 반환된다. 사용자가 이메일 확인을 완료해야 세션이 생성된다.

메타데이터를 함께 저장할 수 있다.

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    data: {
      first_name: 'John',
      age: 27,
    },
  },
})
```

`options.data`에 넣은 값은 `user_metadata`에 저장된다.

### 이메일 확인 후 리다이렉트

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    emailRedirectTo: 'https://example.com/welcome',
  },
})
```

### 전화번호로 가입

```typescript
const { data, error } = await supabase.auth.signUp({
  phone: '010-1234-5678',
  password: 'password123',
  options: { channel: 'sms' },  // 'sms' 또는 'whatsapp'
})
```

---

## 로그인

### 이메일/비밀번호

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
})
```

### 전화번호/비밀번호

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  phone: '+821012345678',
  password: 'password123',
})
```

에러 메시지는 보안상 "계정 없음", "비밀번호 틀림"을 구분하지 않는다 (사용자 열거 공격 방지).

---

## OAuth 로그인

```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',  // 'github', 'discord', 'kakao' 등
})
```

브라우저가 자동으로 프로바이더 로그인 페이지로 리다이렉트된다.

### 리다이렉트 URL 지정

```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github',
  options: {
    redirectTo: 'https://example.com/welcome',
  },
})
```

### 추가 권한 요청

```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github',
  options: {
    scopes: 'repo gist notifications',
  },
})
```

### 콜백 라우트 (필수)

OAuth 인증 완료 후 코드를 세션으로 교환하는 라우트가 필요하다.

`app/auth/callback/route.ts`

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
```

---

## 로그아웃

```typescript
await supabase.auth.signOut()
```

---

## 세션 관리

### 세션 구조

- **Access Token (JWT)**: 기본 1시간 유효. 모든 API 요청에 포함됨
- **Refresh Token**: 만료 없음. 1회만 사용 가능하고, 사용하면 새 토큰 쌍이 발급됨

### 사용자 정보 조회

```typescript
const { data, error } = await supabase.auth.getUser()
// data.user.id, data.user.email 등
```

### 세션 수동 갱신

```typescript
const { data, error } = await supabase.auth.refreshSession()
```

### 사용자 정보 업데이트 (user_metadata)

```typescript
const { data, error } = await supabase.auth.updateUser({
  data: { nickname: '새닉네임' },  // user_metadata 업데이트
})
```

이 코드는 **클라이언트에서도 호출 가능**하다. 즉 사용자가 자기 `user_metadata`를 자유롭게 수정할 수 있다. 본인 닉네임을 본인이 바꾸는 건 정상적인 동작이지만, 입력 검증이 없으므로 실무에서는 `user_metadata` 대신 **별도 테이블 + 서버 검증**을 사용한다.

```sql
-- profiles 테이블에 DB 제약조건으로 검증
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  nickname TEXT NOT NULL CHECK (char_length(nickname) BETWEEN 2 AND 20),
  avatar_url TEXT CHECK (char_length(avatar_url) <= 500)
);

-- RLS: 본인만 수정 가능
CREATE POLICY "본인_프로필_수정" ON profiles
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);
```

```typescript
// Server Action에서 추가 검증 후 DB에 저장
async function updateNickname(formData: FormData) {
  'use server'
  const nickname = formData.get('nickname') as string
  if (nickname.length < 2 || nickname.length > 20) {
    throw new Error('닉네임은 2~20자')
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  await supabase.from('profiles').update({ nickname }).eq('id', user!.id)
}
```

이렇게 하면 3중 방어가 된다:
1. 클라이언트 검증 — UX용 (우회 가능)
2. Server Action 검증 — 길이 체크
3. DB 제약조건 — `CHECK (char_length(...))` (최후의 보루)

### 상태 변화 감지

```typescript
supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)
  // event: 'SIGNED_IN', 'SIGNED_OUT', 'TOKEN_REFRESHED', 'USER_UPDATED' 등
})
```

---

## 서버에서 인증 확인: getClaims vs getUser vs getSession

| 메서드 | 검증 방식 | 네트워크 요청 | 안전성 |
|--------|----------|-------------|-------|
| `getClaims()` | JWT 서명 검증 | 없음 (로컬) | 안전 |
| `getUser()` | Auth 서버에 검증 요청 | 있음 | 안전 |
| `getSession()` | 검증 없이 토큰만 반환 | 없음 | **불안전** |

서버에서 페이지 보호나 사용자 데이터 접근 시 **`getClaims()` 또는 `getUser()`를 사용**해야 한다. `getSession()`은 서버에서 신뢰하면 안 된다.

```typescript
// 추천: getClaims() — 빠르고 안전
const { data } = await supabase.auth.getClaims()
const userId = data?.claims?.sub

// 추천: getUser() — 더 확실하지만 네트워크 비용
const { data } = await supabase.auth.getUser()
const userId = data?.user?.id
```

---

## JWT 구조

Supabase JWT는 아래와 같은 클레임을 포함한다.

### 고정 클레임 (Required)

| 필드 | 설명 | 예시 |
|-----|------|-----|
| `sub` | 사용자 UUID (`auth.uid()`) | `"550e8400-..."` |
| `role` | Supabase 시스템 역할 | `"authenticated"`, `"anon"` |
| `email` | 이메일 | `"user@example.com"` |
| `phone` | 전화번호 | `"+821012345678"` |
| `exp` | 만료 시간 (Unix) | `1640995200` |
| `iat` | 발급 시간 (Unix) | `1640991600` |
| `aal` | 인증 강도 | `"aal1"`, `"aal2"` |
| `session_id` | 세션 ID | `"session-uuid"` |

`role`은 `"authenticated"` / `"anon"` / `"service_role"` 중 하나이며, 커스텀 역할(admin 등)을 넣는 곳이 아니다.

### 선택 클레임 (Optional)

| 필드 | 설명 |
|-----|------|
| `app_metadata` | 서버만 수정 가능한 데이터 (역할, 권한 등) |
| `user_metadata` | 클라이언트도 수정 가능한 데이터 (닉네임 등) |
| `amr` | 인증 방법 목록 |

### 커스텀 클레임

**`user_metadata`** — 클라이언트에서 수정 가능. 표시용 데이터에 적합.

```typescript
// 회원가입 시 설정
await supabase.auth.signUp({
  email, password,
  options: { data: { nickname: '홍길동' } }
})

// 이후 업데이트
await supabase.auth.updateUser({
  data: { nickname: '새이름' }
})
```

**`app_metadata`** — 서버(Admin API)에서만 수정 가능. 역할/권한에 적합.

```typescript
// service_role key가 필요한 Admin 클라이언트
await supabaseAdmin.auth.admin.updateUserById(userId, {
  app_metadata: { role: 'admin', org_id: 123 }
})
```

RLS에서 접근:

```sql
-- user_metadata (조작 가능 → 권한 판단에 부적합)
auth.jwt()->'user_metadata'->>'nickname'

-- app_metadata (서버만 설정 → 권한 판단에 적합)
auth.jwt()->'app_metadata'->>'role'
```

### Custom Access Token Hook

JWT 발급 시마다 DB를 조회해서 동적으로 클레임을 추가하는 방식. Supabase Dashboard → Authentication → Hooks에서 설정한다.

```sql
CREATE OR REPLACE FUNCTION custom_access_token_hook(event jsonb)
RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE
  claims jsonb;
  user_role text;
BEGIN
  claims := event->'claims';

  -- 매번 DB에서 최신 역할 조회
  SELECT role INTO user_role FROM user_roles
    WHERE user_id = (event->>'user_id')::uuid;

  claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
  event := jsonb_set(event, '{claims}', claims);
  RETURN event;
END;
$$;
```

RLS에서: `auth.jwt()->>'user_role'`

`app_metadata` vs Custom Hook:
- `app_metadata`: 역할이 거의 안 바뀌는 경우 적합. 간단하고 빠름
- Custom Hook: 역할이 자주 바뀌거나 복잡한 조건이 필요할 때. 매번 DB 조회하므로 성능 비용 있음

---

## RLS에서 Auth 함수 사용

### `auth.uid()`

현재 사용자의 UUID를 반환한다. JWT 서명으로 보호되어 변조 불가.

```sql
-- 본인 데이터만 조회
CREATE POLICY "본인_조회" ON posts
  FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- 본인만 삽입
CREATE POLICY "본인_삽입" ON posts
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- 본인만 수정
CREATE POLICY "본인_수정" ON posts
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- 본인만 삭제
CREATE POLICY "본인_삭제" ON posts
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) = user_id);
```

`(SELECT auth.uid())`처럼 서브쿼리로 감싸면 쿼리 플래너가 결과를 캐시해서 성능이 좋아진다.

### `auth.jwt()`

JWT 전체를 JSON 객체로 반환한다.

```sql
-- app_metadata의 역할로 권한 판단
CREATE POLICY "관리자만_삽입" ON posts
  FOR INSERT TO authenticated
  WITH CHECK (
    auth.jwt()->'app_metadata'->>'role' = 'admin'
  );
```

### 즉시 반영이 필요한 경우 (구독 플랜 등)

JWT 클레임은 토큰 갱신(최대 1시간) 전까지 이전 값이 남아있다. 즉시 반영이 필요하면 RLS에서 DB 테이블을 직접 조회한다.

```sql
CREATE POLICY "pro_이상만_사용가능" ON premium_features
  FOR INSERT TO authenticated
  WITH CHECK (
    (SELECT auth.uid()) = user_id
    AND EXISTS (
      SELECT 1 FROM subscriptions
      WHERE subscriptions.user_id = auth.uid()
        AND plan IN ('pro', 'max')
        AND expires_at > now()
    )
  );
```

---

## Next.js Server Action 예시

`app/auth/actions.ts`

```typescript
'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })
  if (error) throw new Error(error.message)
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })
  if (error) throw new Error(error.message)
  redirect('/check-email')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
```
