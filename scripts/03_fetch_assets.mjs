// 03 — Fetch asset secondo il plan
//
// Input:  work/<ep>/plan.json
// Output: work/<ep>/assets/*.mp4|.png + work/<ep>/assets.json (manifest)
//
// Per ogni segmento:
//   - broll_type=stock     → Pixabay API video search → tieni le clip verticali → download
//   - broll_type=ai        → KIE.ai (Seedance Fast con prompt=broll_query)
//   - broll_type=screenshot → Apify website-screenshot-crawler oppure curl + headless Chrome
//   - broll_type=mockup    → marca come "render in HTML" — verrà generato in step 04
//   - broll_type=archive   → cerca in archive.org (manuale o via API)
//
// Salva SEMPRE prompt+source di ogni asset AI per tracciabilità.
//
// Schema assets.json:
// {
//   "ep001_broll_pixabay_0": {
//     "segment_id": 0,
//     "file": "assets/ep001_broll_pixabay_0.mp4",
//     "source": "pixabay",
//     "source_id": 1234567,
//     "duration": 8.5
//   },
//   ...
// }

import 'dotenv/config';
import { argv, exit } from 'node:process';

const ep = argv[2];
if (!ep) {
  console.error('Uso: node scripts/03_fetch_assets.mjs <episode_id>');
  exit(1);
}

// Endpoint Pixabay esempio (non filtra per verso: chiedine di più e tieni quelle con height > width):
// const res = await fetch(`https://pixabay.com/api/videos/?key=${process.env.PIXABAY_API_KEY}&q=${encodeURIComponent(q)}&per_page=30&safesearch=true`);
// const { hits } = await res.json();
// per ogni hit: la versione più grande fra hit.videos.large/medium/small che ha un url (large a volte è vuoto)
//
// Pexels solo se hai già una chiave (dal 26/10/2026 non ne dà di nuove):
// fetch(`https://api.pexels.com/videos/search?query=...&orientation=portrait`, { headers: { Authorization: process.env.PEXELS_API_KEY } })

// Endpoint KIE Seedance esempio:
// const res = await fetch('https://kieai.erweima.ai/api/v1/seedance/generate', {
//   method: 'POST',
//   headers: { Authorization: `Bearer ${process.env.KIE_API_KEY}`, 'Content-Type': 'application/json' },
//   body: JSON.stringify({ prompt, duration: 5, model: 'seedance-2-fast', ratio: '9:16' })
// });
// // Poi polling su status fino a completion → URL → download

console.log(`[03_fetch_assets] TODO: implementare fetch per ${ep}`);
