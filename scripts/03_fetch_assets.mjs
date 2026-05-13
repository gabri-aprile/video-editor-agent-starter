// 03 — Fetch asset secondo il plan
//
// Input:  work/<ep>/plan.json
// Output: work/<ep>/assets/*.mp4|.png + work/<ep>/assets.json (manifest)
//
// Per ogni segmento:
//   - broll_type=stock     → Pexels API video search → download top match 9:16
//   - broll_type=ai        → KIE.ai (Seedance Fast con prompt=broll_query)
//   - broll_type=screenshot → Apify website-screenshot-crawler oppure curl + headless Chrome
//   - broll_type=mockup    → marca come "render in HTML" — verrà generato in step 04
//   - broll_type=archive   → cerca in archive.org (manuale o via API)
//
// Salva SEMPRE prompt+source di ogni asset AI per tracciabilità.
//
// Schema assets.json:
// {
//   "ep001_broll_pexels_0": {
//     "segment_id": 0,
//     "file": "assets/ep001_broll_pexels_0.mp4",
//     "source": "pexels",
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

// Endpoint Pexels esempio:
// const res = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(q)}&orientation=portrait&size=large&per_page=5`, {
//   headers: { Authorization: process.env.PEXELS_API_KEY }
// });

// Endpoint KIE Seedance esempio:
// const res = await fetch('https://kieai.erweima.ai/api/v1/seedance/generate', {
//   method: 'POST',
//   headers: { Authorization: `Bearer ${process.env.KIE_API_KEY}`, 'Content-Type': 'application/json' },
//   body: JSON.stringify({ prompt, duration: 5, model: 'seedance-2-fast', ratio: '9:16' })
// });
// // Poi polling su status fino a completion → URL → download

console.log(`[03_fetch_assets] TODO: implementare fetch per ${ep}`);
