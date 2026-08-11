# 썸네일 사진 생성 가이드

링크 블록 왼쪽에 들어가는 원형 썸네일 **11장**을 만들기 위한 프롬프트입니다.
ChatGPT(이미지 생성)에 아래 내용을 그대로 붙여넣으면 됩니다.

---

## 사용법

### 1단계 — 스타일 지정

먼저 아래 **공통 스타일**을 한 번 보내서 톤을 고정합니다.

> I need a set of 11 square thumbnail images for a premium Korean medical clinic's link page.
> They must look like one consistent set — same photographer, same day, same light.
>
> **Shared style for every image:**
> Fine-art editorial still life photography. Soft diffused natural window light from the left,
> gentle shadows, no harsh contrast. Warm ivory and cream color palette (#faf8f5 background tone)
> with muted sage green and soft beige accents. Shallow depth of field, subject centered with
> generous negative space. Calm, quiet, luxurious, minimal. Subtle film grain.
> Square 1:1 aspect ratio, 800x800px.
>
> **Strict rules for every image:**
> - Absolutely no text, letters, numbers, logos, or watermarks
> - No people, no faces, no hands
> - Subject centered and clearly readable when cropped into a small circle
> - Keep composition simple — one clear subject, uncluttered background
> - Consistent warm ivory background across all 10 images
>
> I'll send you the 11 subjects one at a time. Confirm you understand the shared style first.

### 2단계 — 주제별 요청

확인 응답이 오면 아래 11개를 하나씩(또는 한 번에) 요청하세요.

| # | 파일명 | 프롬프트 (Subject) | 상태 |
| --- | --- | --- | --- |
| 1 | `thumb-clinic.png` | A single fresh eucalyptus sprig resting on a folded ivory linen cloth | ✅ |
| 2 | `thumb-aftercare.png` | A small white ceramic bowl with clear water and a floating green leaf | ✅ |
| 3 | `thumb-promotion.png` | An ivory gift box tied with a thin sage green silk ribbon | ✅ |
| 4 | `thumb-pick.png` | A smooth polished white stone resting on soft cream fabric folds | ✅ |
| 5 | `thumb-food.png` | An empty white ceramic plate with a folded linen napkin beside it | ✅ |
| 6 | `thumb-travel.png` | A folded vintage paper map and a small brass compass on ivory linen | ✅ |
| 7 | `thumb-shopping.png` | A minimal ivory paper shopping bag with soft rope handles, standing upright | ✅ |
| 8 | `thumb-hospitality.png` | Three stacked smooth spa stones with a single green leaf on top | ✅ |
| 9 | `thumb-beauty.png` | A frosted glass serum bottle with a brass dropper cap, standing on ivory linen | ✅ |
| 10 | `thumb-essentials.png` | A small cream leather travel pouch with a brass zipper, neatly closed | ✅ |
| 11 | `thumb-feedback.png` | A blank ivory notecard and a slim brass pen on a linen surface | ✅ |

> 8번은 원래 "웰니스"용으로 만든 스파 스톤 사진을 Hospitality 로 재사용했습니다.
> **11장 모두 적용 완료.**

각 프롬프트 앞에 `Same shared style as before. Subject:` 를 붙여서 보내면 톤이 안 흔들립니다.

---

## 받은 뒤 할 일

**파일명을 위 표대로 바꿔서 `images/` 폴더에 넣으면 끝입니다.**
`USE_PHOTOS` 스위치는 이미 켜져 있고, 파일이 없는 칸만 자동으로 라인 아이콘으로 대체됩니다.

### 크기 줄이기 (중요)

ChatGPT 원본은 장당 **2MB** 정도인데, 썸네일은 화면에 **50px 원형**으로만 표시됩니다.
고해상도 폰(3배율)에서도 150px 면 충분하므로 **200×200 으로 줄여서** 씁니다 (장당 ~48KB).

| 용도 | 크기 | 장당 용량 |
| --- | --- | --- |
| 썸네일 | 200×200 | ~48 KB |
| 배경 | 480×720 | ~300 KB |

**줄이는 방법 1 — 이 프로젝트의 도구 사용**

로컬 서버를 띄운 뒤(`npm run dev`) 아래 주소를 열고, 개발자도구 기기 모드에서 해당 크기로 맞춰
캡처하면 됩니다.

```
http://localhost:5173/tools/resize.html?f=/_source/원본파일.png&w=200&h=200
```

**줄이는 방법 2 — [squoosh.app](https://squoosh.app)**

원본을 올리고 Resize 에서 가로세로를 200 으로 지정하면 됩니다.

원본 파일들은 `_source/` 폴더에 보관돼 있습니다.
(`_source/` 는 `.gitignore` 에 있어서 저장소·배포물에 포함되지 않습니다.)

---

---

## 배경

현재 배경은 **수채화 그라데이션 사진** 한 장입니다 (`images/bg.png`, 600×900).

생성에 쓴 프롬프트:

> A vertical background image for a premium wellness clinic website, 1600x2400px.
> Soft abstract gradient of warm ivory, cream, pale peach and a hint of muted sage green,
> blending gently into each other like watercolor on paper. Extremely subtle and low contrast —
> almost flat. Very soft diffused light, no hard edges, no visible objects, no text, no logos,
> no people. This sits behind text and white cards, so it must stay quiet and never compete with
> foreground content. Light and airy overall, never dark or saturated.

새 배경으로 교체하려면 같은 이름(`images/bg.png`)으로 덮어쓰면 됩니다.
사진이 너무 진하면 `index.html` 의 `.bg-fixed` 안 `filter` 주석을 풀어 밝기를 올리세요.

CSS 그라데이션으로 되돌리는 방법도 같은 자리에 주석으로 적어뒀습니다.

---

## 로고 색

로고 원본 파일은 검정이지만, CSS 마스크로 브랜드 초록(`#678b73`)을 입혀서 씁니다.
색을 바꾸려면 `index.html` 의 `:root` 안 `--brand` 값 한 줄만 고치면 됩니다.
파일 자체를 교체할 필요가 없고, OG 이미지·파비콘도 같은 방식이라 `tools/` 에서 다시 뽑으면
같은 색이 적용됩니다.
