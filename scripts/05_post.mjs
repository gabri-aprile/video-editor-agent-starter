// 05 — Post-processing
//
// Input:  work/<ep>/raw.mp4
// Output: output/<ep>.mp4  +  output/<ep>_preview.mp4
//
// Pipeline:
//   1. Loudness normalization a -14 LUFS integrated / -1 dBTP true-peak
//   2. Verifica numero frame con ffprobe; se ultimo frame nero/duplicato, trim
//   3. Quick preview 540×960 ~5-8MB per condivisione rapida
//
// Comandi ffmpeg di riferimento:
//
//   # Loudness norm
//   ffmpeg -i work/<ep>/raw.mp4 -af loudnorm=I=-14:TP=-1:LRA=11 -ar 48000 -c:v copy work/<ep>/normalized.mp4
//
//   # Conta frame validi
//   ffprobe -v error -count_frames -show_entries stream=nb_read_frames -of default=noprint_wrappers=1:nokey=1 work/<ep>/normalized.mp4
//
//   # Trim ultimo frame se serve
//   ffmpeg -i work/<ep>/normalized.mp4 -frames:v <N> -c copy output/<ep>.mp4
//
//   # Quick preview low-res
//   ffmpeg -i output/<ep>.mp4 -vf scale=540:960 -b:v 1M -b:a 96k -movflags +faststart output/<ep>_preview.mp4

import { spawn } from 'node:child_process';
import { argv, exit } from 'node:process';

const ep = argv[2];
if (!ep) {
  console.error('Uso: node scripts/05_post.mjs <episode_id>');
  exit(1);
}

console.log(`[05_post] TODO: implementare post-processing per ${ep}`);
console.log('Vedi i comandi ffmpeg di riferimento nel commento in cima al file.');
