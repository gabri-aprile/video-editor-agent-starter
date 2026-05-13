// 01 — Trascrizione word-level
//
// Input:  work/<ep>/voice.mp3
// Output: work/<ep>/words.json
//
// Due implementazioni possibili:
//   A) faster-whisper locale (Python, gratis)
//      - Richiede: pip install faster-whisper
//      - Lancia script Python che salva words.json
//   B) OpenAI Whisper API (cloud, $0.006/min)
//      - Endpoint: /v1/audio/transcriptions
//      - Parametro chiave: timestamp_granularities: ["word"]
//
// Formato output atteso:
// {
//   "duration": 42.318,
//   "words": [
//     { "text": "Ciao", "start": 0.12, "end": 0.45 },
//     ...
//   ]
// }
//
// Chiedi all'agente Claude Code di implementare la variante che preferisci.

import 'dotenv/config';
import { argv, exit } from 'node:process';

const ep = argv[2];
if (!ep) {
  console.error('Uso: node scripts/01_transcribe.mjs <episode_id>');
  exit(1);
}

console.log(`[01_transcribe] TODO: implementare trascrizione per ${ep}`);
console.log('Vedi commento in cima al file per le due varianti consigliate.');
