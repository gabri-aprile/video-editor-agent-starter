// 04 — Render con Hyperframes
//
// Input:  work/<ep>/{plan.json, words.json, assets.json, voice.mp3, avatar.mp4?}
// Output: work/<ep>/raw.mp4
//
// Pipeline:
//   1. Genera composition.html con:
//      - <link>/@font-face dei font in brand-kit/fonts/
//      - <audio> con voice.mp3
//      - una <section data-start="..." data-end="..."> per ogni segmento del plan
//      - script GSAP che legge data-start/end e anima caption + b-roll
//   2. Lancia: npx hyperframes render composition.html --output raw.mp4
//
// CONSIGLI IMPORTANTI:
//   - una sola GSAP timeline globale, sync construction (no async dentro tween)
//   - gsap.set() hard-kill ai boundary di scena per evitare leak di animazione
//   - mai repeat:-1 senza controllo (causa ghost frames a fine render)
//   - layout-before-animation: definisci CSS statico finale, anima INTO non FROM
//
// Flag CLI:
//   --preview  → render 540×960 più rapido per anteprima
//   (default)  → render 1080×1920 finale

import 'dotenv/config';
import { argv, exit } from 'node:process';

const ep = argv[2];
const preview = argv.includes('--preview');
if (!ep) {
  console.error('Uso: node scripts/04_render.mjs <episode_id> [--preview]');
  exit(1);
}

console.log(`[04_render] TODO: implementare render ${preview ? 'preview' : 'high'} per ${ep}`);
console.log('Vedi docs Hyperframes: https://hyperframes.mintlify.app/');
