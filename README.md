# RELIEVE_R — RELIEVE CLINIC 링크 페이지

원페이지 링크 사이트입니다. 빌드 도구나 프레임워크 없이 **HTML 파일 하나**로 동작합니다.

```
index.html          페이지 전체 (CSS·JS·아이콘 전부 인라인)
build.mjs           배포 주소를 OG 태그에 자동 주입 → dist/ 생성
package.json        npm run build / npm run dev
images/
  relieve_clinic_profile.png    상단 로고 (유일한 이미지 파일)
```

## 디자인

다크 럭셔리 — 딥 차콜 바탕에 샴페인 골드 포인트.

| 토큰 | 값 | 쓰임 |
| --- | --- | --- |
| `--bg` | `#14161a` | 페이지 바탕 |
| `--surface` | `rgba(30,33,38,.72)` | 링크 블록 |
| `--gold` | `#c9a961` | 아이콘·섹션 제목·테두리 |
| `--text` | `#f0ece4` | 본문 (아이보리) |
| `--text-dim` | `#8b8b86` | 보조 문구 |

`<style>` 최상단 `:root` 에서 이 다섯 개만 바꾸면 전체 톤이 한 번에 바뀝니다.

**배경은 이미지가 아니라 CSS 그라데이션**입니다(`.bg-fixed`). 위쪽에서 떨어지는 골드 글로우와
아래쪽 반사광 두 겹으로 구성돼 있어서, 배경 사진 파일이 필요 없고 어떤 화면 비율에서도 안 깨집니다.

로고 원본이 검정이라 어두운 배경에서 안 보이므로 CSS `filter` 로 아이보리로 반전시켜 씁니다.
로고 파일 자체를 밝은 버전으로 교체하면 `.logo img` 의 `filter` 줄을 지우면 됩니다.

## 실행

`index.html` 을 브라우저로 그냥 열면 됩니다.
단, 공유 버튼의 클립보드 복사는 보안 정책상 `http://localhost` 또는 `https://` 에서만 동작합니다.

```bash
python -m http.server 8777
# http://localhost:8777
```

## 배포

빌드 설정은 아래 두 줄이 전부입니다.

| | 값 |
| --- | --- |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Vercel이면 Framework Preset은 `Other`. Cloudflare Pages도 항목 이름만 다르고 값은 같습니다.

`npx vercel` 로 CLI 배포해도 동일하게 동작합니다.

### 공유 썸네일 주소는 자동입니다

`index.html` 의 OG 태그는 실제 주소 대신 `__SITE_URL__` 자리표시자로 되어 있고,
`build.mjs` 가 배포 시점에 진짜 주소로 바꿔서 `dist/` 에 내보냅니다. **직접 고칠 필요 없습니다.**

주소는 아래 순서로 결정됩니다.

| 우선순위 | 환경변수 | 언제 쓰이나 |
| --- | --- | --- |
| 1 | `SITE_URL` | 커스텀 도메인 등 직접 지정할 때 |
| 2 | `VERCEL_PROJECT_PRODUCTION_URL` | Vercel 운영 배포 (배포마다 안 바뀜) |
| 3 | `CF_PAGES_URL` | Cloudflare Pages |
| 4 | `VERCEL_URL` | Vercel 미리보기 배포 (PR 등) |
| 5 | (없음) | `http://localhost:5173` |

2~4번은 배포 서비스가 알아서 넣어주므로 아무 설정도 안 해도 됩니다.

**커스텀 도메인**(예: `link.example.com`)을 연결했다면 그때만 Vercel/Cloudflare 대시보드의
Environment Variables 에 `SITE_URL = https://link.example.com` 을 추가하세요.
프로토콜 유무, 끝 슬래시는 알아서 정리됩니다.

### 아이콘·썸네일 이미지

원본 서버에는 이 파일들이 없어서(404) 새로 만들어 넣었습니다. 전부 기존 로고·배경 자산에서
생성한 것이라 사이트와 톤이 같습니다.

| 파일 | 크기 | 용도 |
| --- | --- | --- |
| `og.png` | 1200×630 | 카카오톡·SNS 공유 미리보기 (다크 + 골드 테두리) |
| `favicon.png` | 256×256 | 브라우저 탭 아이콘 (다크 바탕 + 아이보리 R) |
| `apple-touch-icon.png` | 180×180 | iOS "홈 화면에 추가" 아이콘 |

`build.mjs` 가 `dist/` 로 자동 복사합니다.

**다시 만들려면** — 생성용 소스가 `tools/` 에 있습니다. 로컬 서버를 띄운 뒤 브라우저 개발자도구의
기기 모드로 아래 주소를 정확한 크기로 캡처하면 됩니다.

| 결과물 | 소스 | 캡처 크기 |
| --- | --- | --- |
| `og.png` | `tools/og.html` | 1200×630 |
| `favicon.png` | `tools/favicon.html` | 256×256 |
| `apple-touch-icon.png` | `tools/favicon.html?size=180&square` | 180×180 |

`tools/` 는 `dist/` 로 복사되지 않으므로 배포물에는 포함되지 않습니다.

## 수정할 곳

전부 `index.html` 안에 있습니다.

| 항목 | 위치 |
| --- | --- |
| 한국어 문구·섹션·링크 | `<script>` 의 `const SITE_KO = {...}` |
| 영어 문구·섹션·링크 | `<script>` 의 `const SITE_EN = {...}` |
| SNS 아이콘 링크 (인스타/카톡/왓츠앱/네이버) | `<div class="social">` 안의 `href` |
| 색상 (배경/글자/포인트) | `<style>` 최상단 `:root` 변수 |
| 페이지 제목·OG 태그 | `<head>` |

### 섹션/블록 추가

`sections` 배열에 객체를 하나 더 넣으면 됩니다. `SITE_KO` 와 `SITE_EN` 양쪽 모두 수정해야
언어 전환 시 어긋나지 않습니다.

```js
{
  title: "새 섹션 이름",
  blocks: [
    { label: "버튼 이름", url: "https://...", icon: "leaf" }
  ]
}
```

### 아이콘

블록 왼쪽 아이콘은 이미지 파일이 아니라 **HTML 안에 인라인된 SVG** 입니다. 색이 CSS 를 따라가고
이미지 요청이 발생하지 않습니다. `icon` 값에는 아래 이름 중 하나를 씁니다.

| 이름 | 모양 | 이름 | 모양 |
| --- | --- | --- | --- |
| `leaf` | 잎 | `plane` | 종이비행기 |
| `heart` | 하트 | `bag` | 쇼핑백 |
| `tag` | 가격표 | `drop` | 물방울 |
| `star` | 4각 별 | `case` | 여행가방 |
| `utensils` | 포크·나이프 | `chat` | 말풍선 |
| `bed` | 침대 | `bottle` | 화장품 병 |

새 아이콘은 `<script>` 의 `ICONS` 목록에 `이름: \`<path d="..." />\`` 한 줄을 추가하면 됩니다.
24×24 기준으로 그리면 되고, 선 굵기·색·모서리 처리는 `lineIcon()` 이 공통으로 씌워줍니다.

`icon` 을 생략하거나 목록에 없는 이름을 쓰면 빈 원만 표시됩니다.

### 아직 링크가 없는 블록

`url` 을 빈 문자열(`""`)로 두면 클릭되지 않는 흐린 박스로 표시됩니다. 링크를 나중에 받기로 한
항목을 미리 자리만 잡아둘 때 씁니다. 주소를 채워 넣으면 자동으로 일반 블록이 됩니다.

```js
{ label: "Hospitality", url: "", icon: "bed" }      // 흐림 · 클릭 불가
{ label: "Hospitality", url: "https://...", icon: "bed" }   // 정상 동작
```

### 시작 언어 바꾸기

기본은 영어입니다. 한국어로 시작하려면:

```js
let currentLang = "ko";   // "en" → "ko"
```

## 기능

- 반응형 (최대 폭 600px, 모바일 우선) — 320 / 375 / 390 / 430px 실측 확인
- KOR / EN 언어 전환
- 블록 우측 `⋮` → 모바일은 네이티브 공유 시트, 데스크톱은 링크 복사 + 토스트
- 키보드 포커스 표시, `prefers-reduced-motion` 대응
- iOS 홈 화면 아이콘, 모바일 주소창 색상(`theme-color`)

## 참고 — OG 태그를 JS로 바꾸면 안 되는 이유

카카오톡·페이스북 크롤러는 자바스크립트를 실행하지 않고 서버가 내려준 원본 HTML만 읽습니다.
그래서 `document.querySelector('meta').setAttribute(...)` 같은 코드로는 공유 썸네일이 절대
바뀌지 않습니다. 반드시 **빌드 시점**(이 프로젝트 방식) 또는 **서버 응답 시점**에 값이 박혀 있어야
합니다.
