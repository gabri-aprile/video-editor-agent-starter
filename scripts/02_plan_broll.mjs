// 02 — Plan b-roll con Claude API
//
// Input:  work/<ep>/words.json + work/<ep>/script.txt
// Output: work/<ep>/plan.json
//
// Idea generale:
// 1. Raggruppa parole in segmenti narrativi (frase per frase, o gruppi di 1.5-2.5s)
// 2. Per ogni segmento chiedi a Claude:
//    - quale keyword evidenziare nella caption
//    - quale tipo di b-roll usare (stock / ai / screenshot / mockup / archive)
//    - query/prompt da passare al provider
//    - layout (split / fullscreen-blur / fullscreen-browser)
// 3. Includi in system prompt: references/style-guide.md + references/editing-pattern.md
// 4. USA PROMPT CACHING per la system prompt (è grande e statica). Risparmio ~85%.
//
// Schema output atteso:
// {
//   "segments": [
//     {
//       "id": 0,
//       "start": 0.0,
//       "end": 3.2,
//       "text": "Ciao ragazzi, oggi parliamo di Notion AI.",
//       "keyword": "Notion AI",
//       "broll_type": "screenshot",
//       "broll_query": "Notion AI landing page hero",
//       "layout": "fullscreen-browser"
//     },
//     ...
//   ]
// }

import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'node:fs';
import { argv, exit } from 'node:process';

const ep = argv[2];
if (!ep) {
  console.error('Uso: node scripts/02_plan_broll.mjs <episode_id>');
  exit(1);
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Esempio di chiamata con prompt caching (da completare):
//
// const styleGuide = readFileSync('references/style-guide.md', 'utf8');
// const editingPattern = readFileSync('references/editing-pattern.md', 'utf8');
// const words = JSON.parse(readFileSync(`work/${ep}/words.json`, 'utf8'));
// const script = readFileSync(`work/${ep}/script.txt`, 'utf8');
//
// const response = await client.messages.create({
//   model: 'claude-sonnet-4-6',
//   max_tokens: 4000,
//   system: [
//     {
//       type: 'text',
//       text: `Sei un video editor. Segui RIGOROSAMENTE queste regole.\n\n# STYLE GUIDE\n${styleGuide}\n\n# EDITING PATTERN\n${editingPattern}`,
//       cache_control: { type: 'ephemeral' }
//     }
//   ],
//   messages: [{
//     role: 'user',
//     content: `Pianifica il b-roll per questo episodio.\n\nSCRIPT:\n${script}\n\nWORDS:\n${JSON.stringify(words.words.slice(0, 50))}...\n\nRestituisci JSON valido con il formato richiesto.`
//   }]
// });

console.log(`[02_plan_broll] TODO: implementare planning per ${ep}`);
console.log('Vedi commento in cima al file per lo schema atteso.');
