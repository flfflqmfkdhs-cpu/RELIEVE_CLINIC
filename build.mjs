// index.html 의 __SITE_URL__ 자리표시자를 실제 배포 주소로 바꿔 dist/ 에 내보냅니다.
// 의존성 없음. Node 18+ 면 동작합니다.
//
//   로컬:      node build.mjs
//   Vercel:    Build Command = npm run build,  Output Directory = dist
//   Cloudflare Pages: Build command = npm run build,  Build output directory = dist

import { readFile, writeFile, rm, mkdir, cp, access } from "node:fs/promises";

// 우선순위: 직접 지정 > Vercel 운영 도메인 > Cloudflare > Vercel 미리보기 > 로컬
const rawUrl =
  process.env.SITE_URL ||                       // 커스텀 도메인 등 직접 지정할 때
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||  // Vercel 운영 도메인 (배포마다 안 바뀜)
  process.env.CF_PAGES_URL ||                   // Cloudflare Pages
  process.env.VERCEL_URL ||                     // Vercel 미리보기 배포 (PR 등)
  "http://localhost:5173";                      // 아무것도 없으면 로컬

// VERCEL_URL 류는 프로토콜이 없고, CF_PAGES_URL 은 붙어서 옵니다. 양쪽 다 맞춰줍니다.
const siteUrl = (/^https?:\/\//.test(rawUrl) ? rawUrl : `https://${rawUrl}`).replace(/\/+$/, "");

const html = await readFile("index.html", "utf8");

if (!html.includes("__SITE_URL__")) {
  console.warn("경고: index.html 에 __SITE_URL__ 자리표시자가 없습니다. OG 태그가 하드코딩된 상태일 수 있습니다.");
}

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await writeFile("dist/index.html", html.replaceAll("__SITE_URL__", siteUrl));
await cp("images", "dist/images", { recursive: true });

// 루트에 두는 단일 파일들. 없으면 건너뜁니다.
for (const file of ["og.png", "favicon.png", "apple-touch-icon.png", "robots.txt"]) {
  try {
    await access(file);
    await cp(file, `dist/${file}`);
  } catch {
    console.warn(`건너뜀: ${file} 없음`);
  }
}

console.log(`빌드 완료 → dist/  (SITE_URL = ${siteUrl})`);
