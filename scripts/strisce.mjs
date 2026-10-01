// strisce.mjs — il GIRO DI CRITICA fotogramma per fotogramma.
// Per ogni istante: 24 fotogrammi consecutivi (0,8s a 30fps) in una striscia 8×3, letti da sinistra a destra.
// È così che si vedono le cose che un fotogramma fermo non mostra: una barra che svanisce invece di atterrare,
// una lama che resta appesa al bordo, un buco nero fra due pannelli che si muovono con curve diverse.
// Spiegazione completa: references/qualita-del-movimento.md, sezione 4.
//
// Uso (dalla cartella del progetto): node scripts/strisce.mjs renders/bozza.mp4 4.20 8.06 13.90 ...
//   → work/crit/c_<t>.jpg (solo la fascia alta 0-1000, dove stanno le grafiche nel layout split;
//     --tutto per il quadro intero)
// Serve solo ffmpeg nel PATH.
import { execFileSync } from 'child_process';
import fs from 'fs';
const args = process.argv.slice(2);
const TUTTO = args.includes('--tutto');
const [VID, ...T] = args.filter((a) => !a.startsWith('--'));
if (!VID || !T.length || !fs.existsSync(VID)) { console.error('uso: node scripts/strisce.mjs <video> t1 t2 ... [--tutto]'); process.exit(1); }
fs.mkdirSync('work/crit', { recursive: true });
for (const t of T) {
  const vf = (TUTTO ? 'scale=180:-1' : 'crop=1080:1000:0:0,scale=240:-1') + ',tile=8x3:padding=2';
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', t, '-t', '0.8', '-i', VID, '-vf', vf, '-frames:v', '1', 'work/crit/c_' + t + '.jpg']);
  console.log('work/crit/c_' + t + '.jpg');
}
