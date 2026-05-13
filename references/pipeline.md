# Pipeline tecnica — Step by step

Documentazione di cosa fa ogni script in `scripts/`. Quando l'agente li implementa con te, segue questa specifica.

---

## Step 01 — Trascrizione word-level

**Script**: `scripts/01_transcribe.mjs`
**Input**: `work/<ep>/voice.mp3` (o `voice.wav`)
**Output**: `work/<ep>/words.json`

Formato output:
```json
{
  "duration": 42.318,
  "words": [
    { "text": "Ciao", "start": 0.12, "end": 0.45 },
    { "text": "ragazzi", "start": 0.45, "end": 0.94 },
    ...
  ]
}
```

**Implementazione consigliata**:
- Locale: `faster-whisper` (Python) — gratis, modello `medium` o `large-v3` per italiano
- Cloud: OpenAI Whisper API — più semplice ma costa ~$0.006/min

---

## Step 02 — Plan b-roll

**Script**: `scripts/02_plan_broll.mjs`
**Input**: `work/<ep>/words.json` + `script.txt` (per contesto narrativo)
**Output**: `work/<ep>/plan.json`

L'agente chiama l'API Claude per generare un piano del b-roll, segmento per segmento.

Formato output:
```json
{
  "segments": [
    {
      "id": 0,
      "start": 0.0,
      "end": 3.2,
      "text": "Ciao ragazzi, oggi parliamo di Notion AI.",
      "keyword": "Notion AI",
      "broll_type": "screenshot",
      "broll_query": "Notion AI landing page hero",
      "layout": "fullscreen-browser"
    },
    ...
  ]
}
```

`broll_type` può essere: `stock` (Pexels), `ai` (KIE.ai), `screenshot` (Apify/manuale), `mockup` (CSS custom), `archive` (footage di repertorio).

**Prompt Claude consigliato**: leggi `style-guide.md` + `editing-pattern.md` + lo script, poi decidi per ogni segmento il tipo di b-roll più adatto seguendo le regole di letteralismo visivo.

---

## Step 03 — Fetch asset

**Script**: `scripts/03_fetch_assets.mjs`
**Input**: `work/<ep>/plan.json`
**Output**: `work/<ep>/assets/` con tutti i file scaricati + `assets.json` (manifest)

Per ogni segmento del plan:
- `stock` → API Pexels (query → search → download top match in 9:16)
- `ai` → API KIE.ai (Seedance Fast con prompt = `broll_query`)
- `screenshot` → Apify actor "Website Screenshot" o equivalente
- `mockup` → marca come "da generare in HTML" nel render step

Salva sempre il **prompt** e la **fonte** di ogni asset AI per tracciabilità.

---

## Step 04 — Render Hyperframes

**Script**: `scripts/04_render.mjs`
**Input**: tutto il contenuto di `work/<ep>/`
**Output**: `work/<ep>/raw.mp4`

L'agente genera un file `composition.html` Hyperframes con:
- struttura DOM per ogni segmento
- CSS dal `brand-kit/`
- GSAP timeline che sincronizza animazioni con `words.json`
- audio source linkato a `voice.mp3`

Poi lancia:
```bash
npx hyperframes render composition.html --output raw.mp4
```

Hyperframes apre Chrome headless, fa seek frame-by-frame, registra, passa a ffmpeg per encoding.

**Linee guida**:
- Una `<section>` per scena, con `data-start` e `data-end` in secondi
- GSAP `gsap.set()` hard-kill ai boundary per evitare leak di animazione
- Niente `repeat: -1` non controllati: causano ghost-frames

---

## Step 05 — Post-processing

**Script**: `scripts/05_post.mjs`
**Input**: `work/<ep>/raw.mp4`
**Output**: `output/<ep>.mp4` (high) + `output/<ep>_preview.mp4` (540×960)

Operazioni:
1. **Loudness normalization**:
   ```bash
   ffmpeg -i raw.mp4 -af loudnorm=I=-14:TP=-1:LRA=11 -ar 48000 -c:v copy normalized.mp4
   ```
2. **Verifica ultimo frame** con `ffprobe`. Se nero/duplicato, trim:
   ```bash
   ffmpeg -i normalized.mp4 -frames:v <validi> -c copy trimmed.mp4
   ```
3. **Quick preview low-res** per anteprima Telegram/WhatsApp:
   ```bash
   ffmpeg -i output/<ep>.mp4 -vf scale=540:960 -b:v 1M -b:a 96k output/<ep>_preview.mp4
   ```
4. (Opzionale) **BGM mix**: layer di musica di sottofondo a -25 LUFS sotto la voce.

---

## File da committare e da ignorare

**Committi**:
- Tutto in `references/`, `brand-kit/`, `.claude/`, `scripts/`
- `CLAUDE.md`, `package.json`, `README.md`

**Non committi** (`.gitignore`):
- `work/*` — file intermedi pesanti
- `output/*.mp4` — i render finali
- `.env` — chiavi API
- `brand-kit/fonts/*` — i font hanno licenze, ognuno scarica i suoi
