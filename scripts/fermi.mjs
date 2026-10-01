// fermi.mjs — quanti SECONDI FERMI ha il montaggio.
// Differenza media fra fotogrammi consecutivi nella fascia alta (0-984, dove stanno le grafiche nel layout split),
// secondo per secondo. Un secondo sotto 0,2 è fermo.
// Riferimento: il video di studio che abbiamo analizzato, 6 secondi fermi su 80; un nostro episodio approvato, 6 su 57.
// Stampa anche i fotogrammi DOPPI in mezzo al movimento (scatti): nel riferimento 1 su 2396.
// Spiegazione completa: references/qualita-del-movimento.md, sezione 4.
//
// Uso (dalla cartella del progetto): node scripts/fermi.mjs renders/bozza.mp4 [--fs]   (--fs = quadro intero)
// Pensato per video 1080×1920 a 30 fps. Serve solo ffmpeg nel PATH.
import { execFileSync } from 'child_process';
import fs from 'fs';
const VID = process.argv[2];
if (!VID || !fs.existsSync(VID)) { console.error('uso: node scripts/fermi.mjs <video> [--fs]'); process.exit(1); }
const crop = process.argv.includes('--fs') ? '' : 'crop=1080:984:0:0,';
fs.mkdirSync('work', { recursive: true });
execFileSync('ffmpeg', ['-v', 'error', '-i', VID, '-vf', crop + 'scale=320:-1,format=gray,tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=work/_fermi.txt', '-f', 'null', '-']);
const v = fs.readFileSync('work/_fermi.txt', 'utf8').split('\n').filter((l) => l.includes('YAVG')).map((l) => parseFloat(l.split('=')[1]));
const fps = 30, sec = [];
for (let s = 0; (s + 1) * fps <= v.length; s++) { const seg = v.slice(s * fps, (s + 1) * fps); sec.push(seg.reduce((a, b) => a + b, 0) / seg.length); }
const fermi = sec.map((m, s) => [s, m]).filter(([, m]) => m < 0.2).map(([s]) => s);
let dup = 0; for (let i = 1; i < v.length - 1; i++) if (v[i] < 0.05 && v[i - 1] > 0.5 && v[i + 1] > 0.5) dup++;
console.log('secondi fermi: ' + fermi.length + ' su ' + sec.length + (fermi.length ? '  (' + fermi.join(', ') + ')' : ''));
console.log('fotogrammi doppi in mezzo al movimento: ' + dup);
console.log(fermi.length / sec.length > 0.12 ? '⚠️ più di un secondo fermo ogni 8: guarda le strisce su quei secondi' : '✅ nella misura giusta (≤ 1 secondo fermo ogni 8)');
