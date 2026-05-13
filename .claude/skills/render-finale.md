---
name: render-finale
description: Checklist pre-render e produzione del MP4 finale 1080x1920 con audio normalizzato e preview low-res.
---

# Skill: render finale

Eseguila SOLO dopo che l'utente ha approvato esplicitamente il preview.

## Checklist pre-render

Verifica in ordine:

1. **Voice file integro**: `ffprobe work/<ep>/voice.mp3` — durata coerente con `words.json`
2. **Asset completi**: tutti i file in `assets.json` esistono fisicamente in `work/<ep>/assets/`
3. **Source durata ≥ TOTAL composition**: se usi un avatar/source video, deve coprire tutto il render. Altrimenti il parlante "sparisce" negli ultimi frame.
4. **BGM duration ≥ TOTAL** (se usi BGM): se la traccia è corta, applica loop con `ffmpeg -stream_loop`
5. **Brand kit caricato**: font in `brand-kit/fonts/` esistono, colori canonici riferiti correttamente

## Render high-res

```bash
node scripts/04_render.mjs <ep>
```

Output: `work/<ep>/raw.mp4` a 1080×1920 25fps.

## Verifica post-render

1. **Ultimo frame non nero**:
   ```bash
   ffprobe -v error -count_frames -show_entries stream=nb_read_frames work/<ep>/raw.mp4
   ```
   Confronta con frame attesi (durata × 25fps). Se sfora, trim:
   ```bash
   ffmpeg -i raw.mp4 -frames:v <validi> -c copy raw_trimmed.mp4
   ```

2. **Audio presente fino alla fine**: `ffprobe -show_streams raw.mp4` → durata audio = durata video.

## Post-processing

```bash
node scripts/05_post.mjs <ep>
```

Esegue:
- Loudness normalization a -14 LUFS / -1 dBTP
- Quick preview 540×960 ~5-8MB
- Output finale in `output/<ep>.mp4` + `output/<ep>_preview.mp4`

## Consegna

- Mostra all'utente il path del file finale
- Mostra dimensione, durata, bitrate
- Suggerisci di provare il preview low-res prima del high (più rapido da inviare/condividere)
