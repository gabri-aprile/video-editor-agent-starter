# Style Guide — [TUO BRAND]

Questo file è la "Bibbia estetica" del tuo agente. Lo legge prima di ogni render. Quanto più è dettagliato, tanto più i tuoi video saranno coerenti.

> Sostituisci tutto ciò che è tra `[ ]` con i tuoi valori reali.

---

## Formato base

- **Risoluzione**: 1080×1920 (verticale 9:16)
- **Framerate**: 25 fps
- **Durata target**: 30-60s
- **Codec**: H.264 ~10 Mbps + AAC 192kbps
- **Audio loudness**: -14 LUFS integrated, true-peak -1 dBTP

## Layout

Definisci quali layout usi e quando.

### Layout A — Split classico (consigliato per avatar/talking head)
- B-roll occupa il **50% superiore** (altezza 0-960px)
- Parlante occupa il **50% inferiore** (altezza 960-1920px)
- Background tra i due: [colore o gradient]

### Layout B — Fullscreen blur (consigliato per selfie spontanei)
- Speaker fullscreen
- `backdrop-filter: blur([X]px)` su un layer dietro per riempire i bordi
- Caption in basso (mai a metà schermo, copre il volto)

### Layout C — Fullscreen browser/mockup (per tool/SaaS reveal)
- Screenshot o demo embed a tutto schermo
- Speaker piccolo in basso-destra in pillola tonda (es. 280×280px)

## Colori

Tienili sincronizzati con `brand-kit/colors.json`. Esempi:

- **Primary** `[#XXXXXX]` — uso: [background dominante, scritte hero]
- **Accent 1** `[#XXXXXX]` — uso: [keyword highlight nelle caption]
- **Accent 2** `[#XXXXXX]` — uso: [CTA finale, money shot]
- **Text on dark** `#FFFFFF`
- **Text on light** `#0A0A0A`

## Tipografia

Tieni sincronizzato con `brand-kit/typography.json`. Esempi:

- **Caption principale**: [Nome Font] ExtraBold, 90px, `#FFFFFF`, triple text-shadow `0 4px 8px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,1)`
- **Keyword highlight**: stesso font, stesso size, colore `[Accent 1]`, glow `0 0 20px [Accent 1], 0 0 40px [Accent 1]`
- **Hero text fullscreen**: [Nome Font] Black, 140-180px
- **Body / small**: [Nome Font] Medium, 36-48px
- **Mono (codice, terminale)**: JetBrains Mono o simili, 32-40px

## Caption — regole

- **Posizione**: y ≈ [1050px se split / 1480-1620px se fullscreen]
- **Una keyword per frase** evidenziata in Accent 1
- **MAX caratteri per riga**: ~20 (per evitare wrap a tre righe)
- **Mai spezzare** aggettivo+sostantivo. I "compound names" stanno insieme.
- **Pausa a fine frase** (`.`, `!`, `?`): gap extra di ~180ms prima della caption successiva
- **Casing**: originale dalla trascrizione (NO ALL-CAPS forzato)
- **Niente box dietro**: solo text-shadow per leggibilità

## Hook (primi 3 secondi)

- **MAI testuali**. Niente counter, niente numeri fullscreen, niente scritta da sola.
- Sempre **b-roll concreto**: mockup, screenshot, oggetto in movimento, scena cinematica.

## CTA (ultimi 2-4 secondi)

- Formato preferito: [es. "money shot" con scritta grande in Accent 2 + speaker in basso]
- Il colore della CTA è [Accent 2], distinto dal colore della keyword (Accent 1)

## Motion design

- Ogni scena deve avere **idle motion** (anche minima, es. `scale 1 → 1.02 yoyo infinite`)
- **Entry animation** ad ogni cambio scena: scale-up, fade-in, slide
- **Mai exit animations** intermedie. Solo l'ultima scena può "uscire"
- **Densità target**: 8-10 elementi animati per scena
- **Cambio b-roll**: ogni 1.5-2.5s, tagli netti

## Safe zone social

- **Top 0-280px**: zona username/UI Instagram. Niente caption critiche qui.
- **Bottom 1580-1920px**: zona like/descrizione. Niente caption critiche qui.
- Caption "low" max y=1480px.
