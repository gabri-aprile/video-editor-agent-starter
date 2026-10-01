---
name: prepara-girato
description: Prepara il girato prima del montaggio: re-encode con keyframe fitti, taglio dei silenzi, ritagli per split/fullscreen/PiP, audio per la trascrizione.
---

# Skill: prepara girato

Quando l'utente lancia `/prepara-girato`, esegui questa procedura. Riferimento completo: `references/preparazione-girato.md`.

## 0. Prima di tutto

Leggi `references/preparazione-girato.md`. Chiedi all'utente:
- percorso del girato originale
- ID episodio
- **come ha girato**: verticale o orizzontale (cambia il numero di ritagli da produrre)
- se userà il riquadro piccolo con la faccia (PiP / tela 3D)

Ispeziona il file prima di toccarlo:

```bash
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,r_frame_rate,duration,color_transfer,color_primaries \
  -of default=nw=1 <girato>
```

⚠️ Se `color_transfer` dice `arib-std-b67` o `bt2020`, il girato è **HDR**: va convertito a bt709 prima di ogni altra cosa, altrimenti contamina tutto il render (vedi `references/difetti-noti.md`).

## 1. Re-encode con fotogrammi chiave fitti

```bash
ffmpeg -i <girato> -c:v libx264 -r 30 -g 30 -keyint_min 30 -pix_fmt yuv420p \
  -movflags +faststart -c:a aac -b:a 192k work/<ep>/source/src_raw.mp4
```

## 2. Taglio dei silenzi

1. Rileva: `ffmpeg -i src_raw.mp4 -af "silencedetect=noise=-32dB:d=0.20" -f null -`
2. Costruisci l'elenco dei pezzi da tenere, con **0,20s di respiro** conservato su ogni taglio
3. **Salta i silenzi che iniziano dopo `durata − 0,7s`**: il respiro finale regge la card di chiusura
4. Ricomponi con `trim` + `atrim` + `concat` (audio e video insieme) → `src_tight.mp4`

Riporta all'utente quanti secondi hai recuperato.

## 3. Ritagli

**Girato verticale**: basta `source.mp4`.

**Girato orizzontale**: produci le tre sorgenti (banda 1080×936 nativa, verticale 1080×1920, e la PiP ~1612×908 se serve).

Gli offset di ritaglio **non si indovinano**: estrai un fotogramma, guardalo, proponi gli offset all'utente e mostragli l'anteprima del ritaglio prima di processare tutto il file.

```bash
ffmpeg -i src_tight.mp4 -ss <metà_video> -frames:v 1 work/<ep>/_check.png
```

## 4. Audio per la trascrizione

```bash
ffmpeg -y -i src_tight.mp4 -ac 1 -ar 16000 work/<ep>/audio16k.wav
```

Verifica che la durata coincida con `src_tight.mp4` prima di passare la palla alla trascrizione.

## 5. Consegna

Riepiloga all'utente: file prodotti, risoluzioni, durate, secondi recuperati dal taglio dei silenzi. Ricorda che **la durata della composizione dovrà stare dentro** quella di `src_tight.mp4`.
