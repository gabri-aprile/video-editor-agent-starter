# Guida — Costruisci il tuo agente Video Editor con Claude Code

**Versione 0.4.0** · 1 ottobre 2026 · [cosa è cambiato](CHANGELOG.md)

Questa guida ti porta da zero a un agente Claude Code che monta Reel verticali 9:16 in autonomia: trascrive l'audio, pianifica il b-roll, scarica gli asset, compone la scena in HTML/CSS/GSAP e renderizza in MP4.

L'agente che costruirai è simile per architettura a "VIDEOEDO" (il mio) ma con il **tuo** stile, il **tuo** brand kit, le **tue** regole. La guida ti dà l'impalcatura e l'esempio funzionante — l'estetica la decidi tu.

---

## Aspettative oneste prima di partire

- **I tuoi primi 5 video saranno brutti.** È normale. Stai costruendo un linguaggio visivo + insegnando a un agente le tue regole. Dal sesto inizia a diventare interessante. Dal decimo è uno strumento serio.
- **Il primo episodio ti porterà via 4-6 ore.** Stai imparando il sistema. Il decimo richiede 30-45 minuti.
- **Non è gratis.** Anche nello scenario più economico spendi qualche euro al mese in API. Vedi sezione [Costi reali](#5-costi-reali-mensili).
- **Non è "AI che fa tutto da sola".** È un copilota di montaggio. Tu dirigi, lui esegue.

---

## Indice

1. [Cosa otterrai](#1-cosa-otterrai)
2. [Glossario](#2-glossario)
3. [Hardware necessario](#3-hardware-necessario)
4. [Prerequisiti software](#4-prerequisiti-software)
5. [Costi reali mensili](#5-costi-reali-mensili)
6. [Installazione passo passo](#6-installazione-passo-passo)
7. [Setup delle API esterne](#7-setup-delle-api-esterne)
8. [Claude Code 101 — come ci si parla](#8-claude-code-101--come-ci-si-parla)
9. [Primo render demo](#9-primo-render-demo)
10. [Lavorare senza HeyGen ed ElevenLabs](#10-lavorare-senza-heygen-ed-elevenlabs)
11. [Personalizzazione dell'agente](#11-personalizzazione-dellagente)
12. [Workflow di feedback iterativo](#12-workflow-di-feedback-iterativo)
13. [Best practice di editing](#13-best-practice-di-editing)
14. [Pipeline completa di produzione](#14-pipeline-completa-di-produzione)
15. [Checklist pre-pubblicazione](#15-checklist-pre-pubblicazione)
16. [Musica, SFX, copyright e AI disclosure](#16-musica-sfx-copyright-e-ai-disclosure)
17. [Esempi di riferimento estetico](#17-esempi-di-riferimento-estetico)
18. [Aggiornamenti e manutenzione](#18-aggiornamenti-e-manutenzione)
19. [Troubleshooting](#19-troubleshooting)
20. [Dove farsi aiutare](#20-dove-farsi-aiutare)
21. [Risorse e link](#21-risorse-e-link)

---

## 1. Cosa otterrai

Un agente Claude Code che, partendo da un file audio + script, produce un MP4 9:16 (1080×1920) pronto per Instagram Reel / TikTok / YouTube Shorts, con:

- caption parola per parola sincronizzate
- b-roll dinamico (stock + AI + screenshot)
- layout split (parlante + b-roll) o fullscreen blur
- audio normalizzato a -14 LUFS
- durata 30-60 secondi

**Cosa NON copre la guida**: la voce e l'avatar (li generi a monte), la scrittura dello script, la pubblicazione automatica.

---

## 2. Glossario

I termini "tecnici" che ricorrono. Tienili a portata.

| Termine | Cosa vuol dire |
|---------|----------------|
| **Reel / Short** | Video verticale 9:16 da 15-90 secondi (Instagram / TikTok / YouTube) |
| **B-roll** | Le immagini/video che vedi mentre qualcuno parla (lo stock, gli screenshot, le scene di contorno) |
| **A-roll** | Il girato principale: il parlante in camera |
| **Talking head** | Inquadratura di una persona che parla guardando in camera |
| **Caption** | I sottotitoli parola per parola che appaiono sincronizzati |
| **Hook** | I primi 3 secondi del video. Devono "agganciare" lo spettatore |
| **CTA** | "Call to action" — l'invito finale (segui, salva, commenta) |
| **fps** | Frame per second. Usa 30 (Hyperframes accetta 24, 30, 60: mai 25) |
| **LUFS** | Unità di misura della "loudness" percepita. Instagram normalizza a -14 LUFS |
| **dBTP** | True-peak in decibel. Tieni sotto -1 dBTP per evitare distorsione |
| **Codec H.264** | Compressione video standard accettata da tutti i social |
| **GSAP** | Libreria JavaScript per animare elementi HTML (la usa Hyperframes) |
| **Headless Chrome** | Chrome senza interfaccia grafica, usato per render automatici |
| **Word-level timestamps** | Per ogni parola trascritta, l'istante esatto di inizio e fine |
| **Stock footage** | Video pre-girati liberi da diritti (Pexels, Pixabay, ecc.) |
| **TTS** | Text-to-speech (la voce sintetica) |
| **API key** | Chiave segreta per accedere a un servizio a pagamento. Mai pubblicarla |
| **Prompt caching** | Sconto Anthropic sui pezzi di prompt che riusi spesso (–90%) |
| **Loudness normalization** | Allineare il volume del video allo standard della piattaforma |
| **Render** | Processo di "stampare" il video finale da scene + audio + animazioni |

---

## 3. Hardware necessario

| Componente | Minimo | Consigliato | Note |
|------------|--------|-------------|------|
| **CPU** | 4 core moderni (Intel i5 10ª gen / Ryzen 5 / Apple M1) | 8+ core | Hyperframes renderizza frame per frame, la CPU conta |
| **RAM** | 16 GB | 32 GB | Chrome headless + ffmpeg + Node insieme sono affamati |
| **GPU** | non necessaria | NVIDIA con CUDA per faster-whisper veloce | Solo se vuoi trascrizione locale rapida |
| **Disco** | 50 GB liberi SSD | 200 GB SSD | Ogni episodio occupa 1-3 GB di file intermedi |
| **Internet** | 20 Mbps | 100+ Mbps | Download stock + upload finale |

**Tempi indicativi di render** (60s di video, 1080×1920 30fps):
- Laptop scarso (4 core, no GPU): 15-25 minuti
- Laptop decente (8 core, no GPU): 6-10 minuti
- Workstation seria (12+ core): 3-5 minuti

**Su Mac M1/M2/M3** funziona tutto nativamente, prestazioni ottime.

---

## 4. Prerequisiti software

Da installare **prima** di partire:

| Tool | Versione min. | Come |
|------|----------------|------|
| Node.js | 20 LTS | [nodejs.org](https://nodejs.org/) → installer per il tuo OS |
| Python | 3.10+ | Solo per `faster-whisper` locale. Altrimenti puoi saltarlo |
| ffmpeg | 6.x | Windows: [gyan.dev](https://www.gyan.dev/ffmpeg/builds/) (poi aggiungi al PATH). Mac: `brew install ffmpeg`. Linux: `apt install ffmpeg` |
| Google Chrome | recente | [google.com/chrome](https://www.google.com/chrome/) |
| Claude Code | latest | `npm install -g @anthropic-ai/claude-code` |
| Git | qualsiasi | Windows: [git-scm.com](https://git-scm.com/). Mac: già incluso |

**Verifica rapida**. Apri terminale (PowerShell su Windows, Terminale su Mac) e lancia uno per uno:

```bash
node --version       # deve mostrare v20 o superiore
python --version     # opzionale
ffmpeg -version
git --version
claude --version
```

Se uno di questi non risponde, fermati e installalo prima di andare avanti.

**Account**:
- Anthropic (obbligatorio) → [console.anthropic.com](https://console.anthropic.com/)
- Pexels (gratis, consigliato) → [pexels.com/api](https://www.pexels.com/api/)
- KIE.ai, ElevenLabs, HeyGen, Apify (opzionali)

---

## 5. Costi reali mensili

Tre scenari realistici per chi pubblica 4 Reel al mese:

### Frugal (~5-12 €/mese)
- Anthropic API + Claude Code: ~5-10 €/mese (basato sull'uso)
- Pexels: gratis
- Trascrizione: locale (faster-whisper) gratis, o Whisper API 0.20 €/mese
- Voce e avatar: registri te stesso col telefono
- **Totale: 5-12 €**

### Misto (~25-40 €/mese)
- Anthropic + Claude Code: 10-15 €
- Pexels: gratis
- KIE.ai per 30% dei b-roll: 10-15 €
- ElevenLabs Starter: 5 € (se usi TTS)
- **Totale: 25-40 €**

### Pro (~80-120 €/mese)
- Anthropic + Claude Code subscription: 20 €
- KIE.ai per b-roll AI generosi: 30-40 €
- ElevenLabs Creator: 22 €
- HeyGen Creator: 24 €
- Apify per scraping: 5 €
- **Totale: 80-120 €**

**Consiglio**: parti **frugal** per i primi 10 episodi. Aggiungi servizi solo quando capisci che ti servono davvero.

---

## 6. Installazione passo passo

### 6.1 Procurati lo starter

**Opzione A** — Download ZIP (più semplice): vai sulla pagina GitHub del progetto, clicca verde **Code** → **Download ZIP**. Scompatta dove preferisci (es. `Documenti/mio-agente-video/`).

**Opzione B** — Git clone:
```bash
git clone https://github.com/gabri-aprile/video-editor-agent-starter.git mio-agente-video
cd mio-agente-video
```

(Il link esatto te lo trovi in cima a questa pagina su GitHub.)

### 6.2 Installa le dipendenze

Da dentro la cartella:

```bash
npm install
```

Aspetta 1-3 minuti. Scarica Hyperframes, l'SDK Anthropic e dotenv.

### 6.3 Configura le variabili d'ambiente

```bash
# Windows PowerShell
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Apri `.env` con un editor di testo. Riempi almeno `ANTHROPIC_API_KEY` e `PEXELS_API_KEY`. Le altre lasciale vuote.

### 6.4 Verifica Claude Code

```bash
claude
```

Si apre l'agente. Scrivi: "chi sei?". Dovrebbe risponderti che è il tuo agente video editor.

Per uscire: `Ctrl+C` due volte, oppure `/exit`.

---

## 7. Setup delle API esterne

### 7.1 Anthropic (obbligatoria)

[console.anthropic.com](https://console.anthropic.com/) → Settings → API Keys → Create Key. Copia in `.env`:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Aggiungi 5-10 € di credito su "Plans & Billing" per iniziare. Anthropic mostra spese in tempo reale.

### 7.2 Pexels (gratis, consigliata)

[pexels.com](https://www.pexels.com/) → registrati → [pexels.com/api](https://www.pexels.com/api/) → "Get Started" → API key.

```
PEXELS_API_KEY=...
```

Limite gratis: 200 richieste/ora, 20.000/mese.

### 7.3 KIE.ai (opzionale, a pagamento)

[kie.ai](https://kie.ai/) → registrati → ricarica credito → API key.

Modelli e prezzi a maggio 2026:
- `seedance-2-fast` — 5s realistici, ~$0.40
- `seedance-2` con reference image — ~$0.625
- `nano-banana + kling-2` — combo image→video, ~$0.465

### 7.4 ElevenLabs / HeyGen / Apify / OpenAI

Solo se ti servono. Vedi `references/api-providers.md` nel progetto.

---

## 8. Claude Code 101 — come ci si parla

### Cos'è Claude Code

È un agente AI da terminale. Lo lanci con `claude` dentro una cartella di progetto. **Ha accesso ai file** di quella cartella: legge, scrive, modifica. Esegue comandi (Node, ffmpeg, git) **chiedendoti permesso ogni volta**.

### Il file `CLAUDE.md`

È l'**identità persistente** dell'agente. Lo legge automaticamente all'inizio di ogni sessione. Ci scrivi: chi è, cosa fa, quali file deve sempre consultare.

**Lo modifichi tu** quando vuoi cambiare il comportamento. Es: "ricorda di non usare mai il fade tra scene" → lo scrivi in `CLAUDE.md` e diventa regola permanente.

### Slash command e skill

Dentro Claude Code scrivi `/nome-comando` per attivare una **skill**. Le skill stanno in `.claude/skills/<nome>.md`.

Lo starter te ne dà 3:
- `/nuovo-episodio` — avvia la pipeline di un nuovo Reel
- `/prepara-girato` — sistema il girato prima del montaggio (fotogrammi chiave, silenzi, ritagli)
- `/render-finale` — checklist + render finale

### Memoria persistente

Claude Code ha una memoria che sopravvive tra sessioni. Dopo un feedback utile, di' "ricorda questo". Lo salva.

### Come dare feedback efficace

❌ Male: "il video non mi piace"
✅ Bene: "la caption nella scena 3 è troppo bassa, sovrappone l'username di Instagram"

❌ Male: "fallo meglio"
✅ Bene: "il b-roll alla parola 'Notion' è uno stock generico, voglio invece uno screenshot della loro homepage"

### Cosa committare in git

- ✅ `CLAUDE.md`, `references/`, `brand-kit/` (non i font), `.claude/skills/`, `scripts/`, `package.json`
- ❌ `.env` (segreto!), `work/` (file intermedi), `output/*.mp4`, `node_modules/`

---

## 9. Primo render demo

```bash
npm run demo
```

Hyperframes crea una scena d'esempio e la renderizza in MP4. Se esce un file, sei pronto. Se fallisce, vai a [Troubleshooting](#19-troubleshooting).

---

## 10. Lavorare senza HeyGen ed ElevenLabs

La maggior parte degli studenti **non** ha piano enterprise HeyGen né serve.

### Setup minimale

1. **Gira col telefono** in verticale 4K o 1080p (torso+testa, luce davanti)
2. **Trasferisci** il file in `work/ep001/source.mp4`
3. **Estrai l'audio**:
   ```bash
   ffmpeg -i source.mp4 -vn -acodec libmp3lame -b:a 192k work/ep001/voice.mp3
   ```
4. Da qui in poi la pipeline è identica.

**Il girato vero è meglio dell'avatar** per i primi mesi. Più autentico, più empatico.

---

## 11. Personalizzazione dell'agente

### 11.1 Modifica `CLAUDE.md`
Sostituisci `[NOME-AGENTE]` col nome che vuoi dargli. Aggiusta ruolo e target.

### 11.2 Scrivi la tua style-guide
`references/style-guide.md` ha placeholder `[ ]` da riempire: risoluzione, fps, font, colori, posizione caption, layout dominante.

### 11.3 Definisci le regole di montaggio
`references/editing-pattern.md`: ritmo b-roll, keyword highlight, silenzi, hook, CTA.

### 11.4 Aggiungi skill
In `.claude/skills/` metti procedure ripetute (es. `fix-caption.md`, `swap-broll.md`).

### 11.5 Memoria nel tempo
Dopo ogni episodio, di' "ricorda questo" quando un feedback è regola permanente. Dopo 10-20 episodi avrai 30-50 regole che rendono i tuoi video coerenti.

---

## 12. Workflow di feedback iterativo

**Sessione tipo:**

```
TU:        /nuovo-episodio
AGENTE:    ID episodio?
TU:        ep001
[...trascrizione, plan, preview...]
TU:        nella scena 4 il b-roll non c'entra, dice "café" 
           ma vedo un ufficio
AGENTE:    cambio query in "italian espresso bar" e ri-renderizzo
[...nuovo preview...]
TU:        perfetto. ricorda che quando parlo di café voglio 
           sempre ambienti italiani
AGENTE:    salvato in memoria
TU:        render finale
```

**Pattern d'oro**:
1. Quick preview prima sempre. **Mai saltare al render high.**
2. Un feedback alla volta.
3. Regola permanente → "ricorda questo". Solo per questo episodio → no salvataggio.

---

## 13. Best practice di editing

> Qui sotto trovi il riassunto. Le regole complete stanno nella cartella `references/`, ed è lì che le legge il tuo agente:
>
> | File | Cosa contiene |
> |---|---|
> | `style-guide.md` | l'estetica: formato, layout, colori, font, posizioni |
> | `editing-pattern.md` | il montaggio: ritmo, hook, speaker, grafiche, documentazione reale |
> | `caption-parola-per-parola.md` | i sottotitoli, dalla trascrizione alle fasce di posizione |
> | `gsap-regole.md` | le regole di animazione da non violare mai |
> | `preparazione-girato.md` | cosa fare al girato **prima** di montarlo |
> | `tecnica-tela-3d.md` | la sequenza con la camera che vola sulle grafiche |
> | `audio.md` | musica, effetti sonori, volume finale |
> | `difetti-noti.md` | i dieci modi in cui un render esce rotto, e la checklist finale |
> | `metodo-di-lavoro.md` | l'ordine dei passaggi e come dare feedback |
> | `pipeline.md`, `api-providers.md` | gli script e i servizi esterni |

### Hook (primi 3s)
- **Mai testuali**. Sempre immagine concreta: mockup, screenshot, b-roll cinematografico.
- Il numero lo dice la voce, gli occhi vedono il mondo.
- Gerarchia delle fonti: generato su misura > scena di film o meme scaricata con `yt-dlp` > stock cinematografico > stock generico (che per l'hook non va mai bene).
- Cerca l'incastro tra la parola e l'immagine: se la voce dice "trucco" e nello stesso istante cade una maschera, hai fatto centro.

### Caption
- Una keyword per frase evidenziata in colore d'accento, un secondo colore **solo** per la CTA finale.
- Posizione **stabile** per >70% del video: ~872 in split, ~1150 in fullscreen.
- Punteggiatura presa dal copione, non dalla trascrizione.
- Niente box dietro, solo triple text-shadow.
- Pausa extra ~180ms dopo `.` `!` `?`.

### B-roll
- Cambia ogni 1.5-2.5s. Tagli netti, no fade.
- **Letteralismo visivo**: voce dice "café" → vedi un café.
- **Mai riusare lo stesso spezzone** due volte.
- Tool/SaaS: demo ufficiale o registrazione dell'interfaccia vera > screenshot > mockup inventato. Mai il video di un altro creator.

### Density
- Entry animation + idle motion + b-roll che cambia + 8-10 elementi animati per scena.
- Mai stamp statici fullscreen morti.

### Audio
- Normalizza a -14 LUFS, true-peak -1 dBTP, **in due passate** (vedi `references/audio.md`).
- Musica amplificata alla sorgente e poi abbassata nel mix, effetti sonori sugli eventi delle grafiche e non sui cambi scena.

### Safe zone social
- Top 0-280px e bottom 1580-1920px coperti da UI Instagram/TikTok.

### Workflow
- **Timeline scritta e approvata prima di montare.**
- **Sempre** bozza 540×960 + storyboard numerato prima del 1080×1920 finale.
- Verifica **sempre** primo e ultimo frame con `ffprobe`.

---

## 14. Pipeline completa di produzione

```
script.txt + voce.mp3 (+ avatar.mp4 opzionale)
        │
        ▼
01_transcribe.mjs     →  word-level timestamps
        │
        ▼
02_plan_broll.mjs     →  Claude API decide tipo b-roll
        │
        ▼
03_fetch_assets.mjs   →  Pexels + KIE.ai + scraping
        │
        ▼
04_render.mjs         →  Hyperframes HTML+CSS+GSAP → MP4
        │
        ▼
05_post.mjs           →  loudness norm, trim, preview
        │
        ▼
output/epXXX.mp4
```

Più due strumenti di controllo, **già funzionanti** (non stub, serve solo ffmpeg): `strisce.mjs` (24 fotogrammi consecutivi di ogni transizione in una striscia) e `fermi.mjs` (quanti secondi del video sono fermi). Si usano nel giro di critica prima della bozza: `references/qualita-del-movimento.md`.

Gli script in `scripts/` sono **stub commentati**. Li implementi insieme all'agente Claude Code.

Dettaglio in `references/pipeline.md`.

---

## 15. Checklist pre-pubblicazione

- [ ] Durata 15-90s (sweet spot 30-60s)
- [ ] Risoluzione 1080×1920, fps 30 (o 24/60, mai 25)
- [ ] Audio normalizzato (-14 LUFS, -1 dBTP)
- [ ] Hook nei primi 3s **senza testo da solo**
- [ ] Caption leggibili con UI Instagram sopra
- [ ] Nessun frame nero finale (`ffprobe`)
- [ ] Strisce sulle transizioni guardate, al massimo un secondo fermo ogni otto (`node scripts/fermi.mjs <video>`)
- [ ] Nessuna grafica sopra un volto
- [ ] Il master contiene davvero gli effetti sonori
- [ ] Voce udibile, BGM non sovrasta
- [ ] CTA chiara negli ultimi 2-4s
- [ ] File MP4 < 500 MB (limite IG Reel)
- [ ] Diritti musica/SFX verificati
- [ ] AI disclosure se necessario
- [ ] Backup su Drive/Dropbox prima dell'upload

---

## 16. Musica, SFX, copyright e AI disclosure

### Fonti gratuite legali
- [YouTube Audio Library](https://www.youtube.com/audiolibrary)
- [Freesound.org](https://freesound.org/)
- [Pixabay Music](https://pixabay.com/music/)

### A pagamento
- Epidemic Sound (~15 €/mese)
- Artlist (~10 €/mese)

**Mai musica da Spotify/YouTube senza licenza.** Instagram smuta o blocca.

### AI disclosure

Instagram e TikTok richiedono di dichiarare contenuti generati o significativamente alterati con AI:
- Avatar HeyGen di te stesso → flag "AI generated"
- Voce clonata ElevenLabs → sì
- Stock Seedance per b-roll generico → di solito no

Nel dubbio attiva il flag nelle impostazioni del post.

---

## 17. Esempi di riferimento estetico

Salva 20-30 Reel che ti piacciono in una collezione Instagram. Studia: ritmo dei tagli, posizione delle caption, tipo di b-roll.

| Stile | Cerca | Cosa imitare |
|-------|-------|--------------|
| Talking head split | `@aliabdaal`, `@nathanielldrew` | Layout, ritmo tagli |
| Tool/SaaS reveal | `@aiadvantage` | Screenshot+overlay, mockup |
| Documentaristico | `@morningbrew`, `@theverge` | Timeline visiva, archive |
| Selfie pov | `@gretarothenberg` | Fullscreen, caption basse |

---

## 18. Aggiornamenti e manutenzione

### Aggiornare Hyperframes
```bash
npm update hyperframes
```
Verifica [CHANGELOG](https://github.com/heygen-com/hyperframes/releases) prima.

### Aggiornare Claude Code
```bash
npm update -g @anthropic-ai/claude-code
```

### Backup
File da non perdere mai: `CLAUDE.md`, `references/`, `brand-kit/`, `.claude/skills/`, `output/*.mp4`.

Commit settimanale su git + push su GitHub privato è la soluzione più sicura.

---

## 19. Troubleshooting

### `hyperframes: command not found`
Usa `npx hyperframes ...` o installa globalmente: `npm install -g hyperframes`.

### `Chromium not found`
Dietro proxy: `PUPPETEER_SKIP_DOWNLOAD=true npm install` + imposta `PUPPETEER_EXECUTABLE_PATH`.

### Audio sfasato
Problema di **fps**. Allinea il girato e la composizione allo stesso framerate (30).

### Caption sgranate
Font non caricato. Controlla path `@font-face` in `brand-kit/fonts/`.

### Frame neri alla fine
Trim con ffmpeg:
```bash
ffprobe -v error -count_frames -show_entries stream=nb_read_frames input.mp4
ffmpeg -i input.mp4 -frames:v <N> output.mp4
```

### Encoding CRLF Windows
```bash
git config core.autocrlf input
```

### `ffmpeg non riconosciuto`
Non è nel PATH. Aggiungi cartella `bin` di ffmpeg → riavvia terminale.

### Permission denied npm (Mac)
```bash
sudo chown -R $USER /usr/local/lib/node_modules
```

### Quota API Anthropic esaurita
[console.anthropic.com](https://console.anthropic.com/) → Billing → ricarica.

---

## 20. Dove farsi aiutare

- **Hyperframes**: [GitHub Issues](https://github.com/heygen-com/hyperframes/issues), [Discord HeyGen](https://discord.gg/heygen)
- **Claude Code**: [docs](https://docs.claude.com/claude-code), [forum Anthropic](https://support.anthropic.com/)
- **ffmpeg**: Stack Overflow
- **GSAP**: [GSAP Forum](https://gsap.com/community/)

**Regola d'oro**: incolla l'errore esatto in Claude Code. 8 volte su 10 lo risolve lui.

---

## 21. Risorse e link

### Hyperframes
- Repo: https://github.com/heygen-com/hyperframes
- Docs: https://hyperframes.mintlify.app/
- Licenza Apache 2.0

### Claude Code
- Docs: https://docs.claude.com/claude-code

### Animazione
- GSAP: https://gsap.com/docs/v3/
- Lottie: https://lottiefiles.com/

### Stock e AI
- Pexels: https://www.pexels.com/api/
- Pixabay: https://pixabay.com/api/docs/
- KIE.ai: https://kie.ai/

### Trascrizione
- faster-whisper: https://github.com/SYSTRAN/faster-whisper
- Whisper API: https://platform.openai.com/docs/guides/speech-to-text

### Voce e avatar
- ElevenLabs: https://elevenlabs.io/
- HeyGen: https://www.heygen.com/

### Musica
- YouTube Audio Library: https://www.youtube.com/audiolibrary
- Epidemic Sound: https://www.epidemicsound.com/

---

## Da dove iniziare adesso

1. Leggi **Glossario**, **Costi**, **Claude Code 101**. 20 minuti.
2. Installa i prerequisiti (sez. 4). 30 minuti.
3. Procurati lo starter, `npm install`, `.env`. 15 minuti.
4. `npm run demo` — se esce un MP4 sei dentro.
5. Apri Claude Code: `claude`. Chiedigli "guidami a fare il mio primo episodio".
6. Gira un video col telefono, porta il file in `work/ep001/`.
7. Lavora con l'agente, dai feedback, itera.
8. Dopo 3-4 episodi, scrivi la tua style-guide con quello che hai imparato.
9. Dopo 10 episodi, hai un agente che lavora come te.

Buon montaggio.
