## Supabase Storage (Next.js)

Supabase Storage는 파일 저장/관리 서비스다. S3 호환, CDN, 이미지 변환을 지원한다.

파일 크기 제한:
- 일반 업로드: 6MB 이하 권장 (최대 5GB)
- 대용량 파일: TUS 프로토콜로 청크 업로드 (6MB 청크)
- 이미지 변환: 최대 25MB, 최대 2500px, 최대 50메가픽셀

---

## 버킷 생성

```typescript
const { data, error } = await supabase.storage.createBucket('avatars', {
  public: true,                       // true면 인증 없이 다운로드 가능
  allowedMimeTypes: ['image/*'],      // 허용 파일 타입
  fileSizeLimit: '1MB',               // 최대 파일 크기
})
```

| 옵션 | 설명 |
|------|------|
| `public` | `true`면 공개 버킷 (다운로드에 인증 불필요). 기본값 `false` |
| `allowedMimeTypes` | 허용 MIME 타입. `['image/*']`, `['image/png', 'application/pdf']` 등 |
| `fileSizeLimit` | 최대 크기. 바이트 숫자 또는 `'1MB'`, `'50KB'` 문자열 |

공개 버킷이라도 업로드/삭제 등은 여전히 인증이 필요하다.

---

## 업로드

```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('folder/avatar.png', file)
```

### 옵션

```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('folder/avatar.png', file, {
    cacheControl: '3600',        // 캐시 시간 (초)
    contentType: 'image/png',    // MIME 타입 (미지정 시 확장자에서 자동 감지)
    upsert: false,               // true면 기존 파일 덮어쓰기
    metadata: { owner: 'user1' }, // 커스텀 메타데이터
  })
```

같은 경로에 파일이 이미 존재하면 `400 Asset Already Exists` 에러가 반환된다. `upsert: true`로 덮어쓸 수 있지만, CDN 전파 지연이 있으므로 새 경로에 업로드하는 것이 더 안전하다.

---

## 다운로드

비공개 버킷의 파일을 다운로드한다.

```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .download('avatar1.png')
// data는 Blob
```

### 이미지 변환 포함

```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .download('image.jpg', {
    transform: { width: 800, height: 300 },
  })
```

공개 버킷은 `getPublicUrl()`로 URL을 얻어 직접 접근하는 것이 더 효율적이다.

---

## Public URL

공개 버킷의 파일 URL을 생성한다. 인증이 필요 없다.

```typescript
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('avatar1.png')

console.log(data.publicUrl)
// https://[project].supabase.co/storage/v1/object/public/avatars/avatar1.png
```

### 이미지 변환 포함

```typescript
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('image.jpg', {
    transform: { width: 500, height: 600 },
  })
```

**주의**: 이 함수는 버킷이 실제로 public인지 확인하지 않는다. private 버킷에 대해 호출하면 URL은 생성되지만 다운로드가 실패한다.

---

## Signed URL (서명된 URL)

비공개 파일에 대해 만료 시간이 있는 임시 URL을 생성한다.

```typescript
const { data, error } = await supabase.storage
  .from('private-bucket')
  .createSignedUrl('document.pdf', 3600)  // 3600초 = 1시간

console.log(data.signedUrl)
```

### 여러 파일 한번에

```typescript
const { data, error } = await supabase.storage
  .from('private-bucket')
  .createSignedUrls(['doc1.pdf', 'doc2.pdf'], 3600)
```

### 이미지 변환 포함

```typescript
const { data, error } = await supabase.storage
  .from('bucket')
  .createSignedUrl('image.jpg', 60000, {
    transform: { width: 200, height: 200 },
  })
```

---

## 파일 목록

```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .list('folder', {
    limit: 100,                              // 최대 반환 수 (기본 100)
    offset: 0,                               // 건너뛸 수
    sortBy: { column: 'name', order: 'asc' }, // 정렬
    search: 'photo',                         // 이름 필터
  })
```

---

## 파일 삭제

```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .remove(['folder/avatar1.png', 'folder/avatar2.png'])
```

여러 파일을 배열로 한번에 삭제할 수 있다. 같은 버킷 내 파일이어야 한다.

---

## 파일 이동

```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .move('old-path/file.pdf', 'new-path/file.pdf')
```

---

## 이미지 변환 옵션 (Pro 플랜+)

| 옵션 | 타입 | 범위 | 기본값 | 설명 |
|------|------|------|--------|------|
| `width` | number | 1-2500 | — | 너비 (px) |
| `height` | number | 1-2500 | — | 높이 (px) |
| `resize` | string | `cover`/`contain`/`fill` | `cover` | 리사이즈 모드 |
| `format` | string | `origin` | auto | 출력 포맷. `'origin'`이면 자동 변환 비활성화 |
| `quality` | number | 20-100 | 80 | 압축 품질 |

- **cover** (기본): 비율 유지, 크기 채움, 넘치는 부분 잘림
- **contain**: 비율 유지, 크기 안에 맞춤
- **fill**: 비율 무시, 크기에 맞춰 늘림

브라우저가 WebP/AVIF를 지원하면 자동으로 변환해서 전송한다.

---

## RLS (접근 제어)

Storage는 `storage.objects`와 `storage.buckets` 테이블에 RLS를 사용한다. 기본적으로 **정책이 없으면 업로드가 차단**된다.

### 작업별 필요 권한

| 작업 | 필요 권한 |
|------|----------|
| 업로드 (INSERT) | `INSERT` |
| 덮어쓰기 (UPSERT) | `INSERT`, `SELECT`, `UPDATE` |
| 다운로드 (SELECT) | `SELECT` |
| 삭제 | `SELECT`, `DELETE` |
| 이동 | `SELECT`, `UPDATE` |
| 목록 | `SELECT` |

### 정책 예시

인증된 사용자만 특정 버킷에 업로드:

```sql
CREATE POLICY "인증_업로드" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatars');
```

사용자별 폴더 (각 사용자가 자기 폴더에만 업로드):

```sql
CREATE POLICY "사용자_폴더_업로드" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = (SELECT auth.jwt()->>'sub')
  );
```

본인 파일만 조회:

```sql
CREATE POLICY "본인_파일_조회" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    (SELECT auth.jwt()->>'sub') = owner_id
  );
```

공개 버킷 조회:

```sql
CREATE POLICY "공개_조회" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'public-bucket');
```

### 헬퍼 함수

| 함수 | 설명 |
|------|------|
| `storage.foldername(name)` | 폴더 경로를 배열로 반환 |
| `storage.filename(name)` | 파일명 반환 |
| `storage.extension(name)` | 확장자 반환 |

---

## Next.js 이미지 연동

`next/image` 컴포넌트에서 Supabase Storage 이미지를 최적화해서 사용할 수 있다.

### 커스텀 로더 설정

`supabase-image-loader.js`

```javascript
const projectId = 'your-project-id'

export default function supabaseLoader({ src, width, quality }) {
  return `https://${projectId}.supabase.co/storage/v1/render/image/public/${src}?width=${width}&quality=${quality || 75}`
}
```

`next.config.js`

```javascript
module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './supabase-image-loader.js',
  },
}
```

사용:

```tsx
import Image from 'next/image'

<Image
  src="bucket-name/image.jpg"
  width={500}
  height={300}
  alt="설명"
/>
```
