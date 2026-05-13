# API Providers — cheatsheet

Note pratiche sui provider esterni usati nella pipeline. Aggiornato a maggio 2026.

---

## Anthropic (Claude API)

- **Cosa**: planning del b-roll, scelta keyword, orchestrazione decisioni narrative
- **Endpoint**: `https://api.anthropic.com/v1/messages`
- **SDK**: `@anthropic-ai/sdk` per Node
- **Modello consigliato per planning**: `claude-sonnet-4-6` (rapporto qualità/prezzo)
- **Modello per task complessi multi-step**: `claude-opus-4-7`
- **Costo indicativo**: $0.10-0.50 per episodio
- **Tip**: usa **prompt caching** per la system prompt che contiene style-guide + editing-pattern. Risparmio 80-90%.

## Pexels

- **Cosa**: stock footage gratuito
- **Endpoint**: `https://api.pexels.com/videos/search`
- **Auth**: header `Authorization: <API_KEY>`
- **Limite**: 200 req/ora, 20'000/mese (gratis)
- **Tip**: filtra per `orientation=portrait` e `size=large` per avere clip 9:16 utilizzabili senza ritagli pesanti

## KIE.ai

- **Cosa**: gateway unificato per modelli video AI (Seedance, Kling, Nano Banana, Veo)
- **Endpoint**: `https://kieai.erweima.ai/api/v1/...` (vedi loro docs)
- **Modelli (mag 2026)**:
  - `seedance-2-fast` → clip 5s, $0.40, no reference image
  - `seedance-2` → clip 5s con reference image $0.625
  - `nano-banana` + `kling-2` (image→video combo) → $0.465
  - `veo-3-fast` → economico per scene generiche
- **Tip**: i clip Seedance Fast sono **fissi 5.0s**. Se ti serve durata maggiore applica `setpts` slowdown in ffmpeg, altrimenti l'ultimo frame resta congelato.

## ElevenLabs

- **Cosa**: TTS multilingua
- **Tip italiano**: voce "Bella" o cloning della tua voce con 3 min di sample
- **Costo**: ~$22/mese piano Creator, sufficiente per 30-50 episodi

## HeyGen

- **Cosa**: avatar parlanti
- **Tip**: l'API seria è enterprise. Per studenti conviene usare la **dashboard manuale** o generare l'avatar a parte e poi importarlo nella pipeline come `avatar.mp4`.

## Apify

- **Cosa**: actor pre-fatti per scraping (screenshot siti, post Instagram, articoli)
- **Actor utili**:
  - `apify/website-screenshot-crawler` — screenshot fullscreen di un URL
  - `apify/instagram-scraper` — post pubblici (verifica termini d'uso)
- **Costo**: pay-per-event, ~$0.01-0.05 per asset
- **Tip**: per b-roll "news" funziona bene fare screenshot dell'articolo originale + zoom/scroll animato con CSS in Hyperframes

## OpenAI (alternativa Whisper)

- **Cosa**: trascrizione cloud
- **Endpoint**: `https://api.openai.com/v1/audio/transcriptions`
- **Modello**: `whisper-1` con `timestamp_granularities: ["word"]`
- **Costo**: $0.006/minuto audio
- **Tip**: per italiano la qualità è ottima. Locale (`faster-whisper`) è gratis ma vuole GPU per essere veloce.

---

## Pattern di costo per episodio (60s, ~25 clip b-roll)

| Profilo | Pexels | KIE | Whisper | Claude | TOTALE |
|---------|--------|-----|---------|--------|--------|
| **Frugal** (solo stock) | gratis | 0 | $0.006 | $0.20 | ~$0.20 |
| **Misto** (80% stock, 20% AI) | gratis | $2.00 | $0.006 | $0.30 | ~$2.30 |
| **AI-heavy** (50% AI) | gratis | $5.00 | $0.006 | $0.30 | ~$5.30 |

Per studenti consiglio di partire **frugal** per i primi 5-10 episodi, poi aggiungere AI dove serve veramente.
