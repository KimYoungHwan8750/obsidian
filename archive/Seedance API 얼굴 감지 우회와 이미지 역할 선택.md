---
title: Seedance API 얼굴 감지 우회와 이미지 역할 선택
tags:
  - archive
  - troubleshooting
  - pattern
  - Seedance
  - BytePlus
  - AI-video-generation
  - content-moderation-bypass
created: 2026-04-17
updated: 2026-04-17
---

# Seedance API 얼굴 감지 우회와 이미지 역할 선택

## 핵심 요약

BytePlus Seedance 2.0 API는 이미지에 사실적 인물 얼굴이 포함되면 `InputImageSensitiveContentDetected.PrivacyInformation` 에러로 차단한다. 그리드 오버레이로 얼굴 특징 패턴을 분할하면 감지를 우회할 수 있으며, 이미지 역할은 `reference_image`가 `first_frame`보다 결과물 품질이 우수하다.

## 맥락

AI 생성 이미지(GPT, Midjourney 등)라도 사실적 인물 얼굴이 포함되면 Seedance API가 실제 인물로 판단하여 차단한다. AI 생성 여부와 무관하게 얼굴 특징의 사실성으로 판단하므로, 이미지 기반 영상 생성(image-to-video) 시 반드시 우회 기법이 필요하다.

## 본문

### 1. 얼굴 감지 우회: 그리드 오버레이

이미지에 흰색 그리드 선을 씌우면 얼굴 특징 패턴이 분할되어 감지 신뢰도가 임계값 이하로 떨어진다.

```python
from PIL import Image, ImageDraw
from io import BytesIO
import base64

def add_grid_overlay(path: str, grid_size: int = 6, line_width: int = 12) -> str:
    """이미지에 그리드 오버레이를 씌워 base64 data URI로 반환."""
    img = Image.open(path).copy()
    draw = ImageDraw.Draw(img)
    w, h = img.size

    for i in range(1, grid_size):
        x = w * i // grid_size
        draw.line([(x, 0), (x, h)], fill="white", width=line_width)
    for i in range(1, grid_size):
        y = h * i // grid_size
        draw.line([(0, y), (w, y)], fill="white", width=line_width)

    buf = BytesIO()
    img.save(buf, format="PNG")
    data = base64.b64encode(buf.getvalue()).decode()
    return f"data:image/png;base64,{data}"
```

**권장 설정:**
- 기본: 6x6 그리드, 선 두께 12px, 흰색 — 대부분 통과
- 강화: 10x10 그리드 — 6x6으로 안 될 때
- 약화: 4x4 그리드 — 화질 보존이 더 중요할 때

### 2. 이미지 역할 선택: `reference_image` vs `first_frame`

Seedance API의 `content` 배열에서 이미지에 부여하는 `role`에 따라 결과가 크게 달라진다.

| 역할 | 동작 | 그리드 영향 |
|------|------|------------|
| `first_frame` | 해당 이미지를 영상의 첫 프레임으로 직접 사용 | 첫 0.1~0.5초에 그리드 잔상이 보임 |
| `reference_image` | 이미지를 스타일/외형 참조로만 사용, 첫 프레임은 모델이 자체 생성 | 그리드 잔상 없음, 깔끔한 시작 |

**결론: 그리드 우회 기법과 함께 사용할 때는 반드시 `reference_image`를 사용한다.**

`first_frame`은 그리드가 씌워진 이미지를 그대로 첫 장면에 넣기 때문에 오버레이가 영상에 노출된다. `reference_image`는 모델이 이미지의 스타일과 외형만 참조하여 새로운 프레임을 생성하므로 그리드 아티팩트가 발생하지 않는다.

```python
# 올바른 사용
content.append({
    "type": "image_url",
    "image_url": {"url": grid_applied_data_uri},
    "role": "reference_image",  # first_frame 아님
})
```

### 3. 비동기 태스크 흐름

Seedance API는 비동기 방식이다. 태스크 생성 후 폴링으로 완료를 확인한다.

```python
# 1. 태스크 생성
task = client.content_generation.tasks.create(
    model="dreamina-seedance-2-0-260128",
    content=content,
    ratio="9:16",
    duration=7,
)

# 2. 폴링 (10~30초 간격)
result = client.content_generation.tasks.get(task_id=task.id)

# 3. 결과 접근
if result.status == "succeeded":
    video_url = result.content.video_url  # .video_url이 아닌 .content.video_url
```

주의: 응답 객체의 영상 URL은 `result.video_url`이 아니라 `result.content.video_url`이다.

## 적용 조건

- **모델**: Seedance 2.0 (`dreamina-seedance-2-0-260128`) 및 Fast 버전에서 확인됨
- **SDK**: `byteplus-python-sdk-v2` (추가 의존성 `sniffio` 수동 설치 필요할 수 있음)
- **한계**: 그리드 강도에 따라 모델이 참조하는 이미지 품질이 저하될 수 있음. 최소한의 그리드(6x6)로 시작하여 필요 시 강화
- **PixVerse 등 타 플랫폼**: 같은 Seedance 모델을 사용하지만 얼굴 감지 정책이 다를 수 있어 그리드가 불필요할 수 있음

## 관련 주제

- [[AI 영상 생성 프롬프트 작성법]]
- [[API 콘텐츠 모더레이션 우회 패턴]]
