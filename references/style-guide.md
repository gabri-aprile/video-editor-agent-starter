# Style Guide — [TUO BRAND]

Questo file è la "Bibbia estetica" del tuo agente. Lo legge prima di ogni render. Quanto più è dettagliato, tanto più i tuoi video saranno coerenti.

> Sostituisci tutto ciò che è tra `[ ]` con i tuoi valori reali.

---

## Formato base

- **Risoluzione**: 1080×1920 (verticale 9:16)
- **Framerate**: 30 fps (ammessi 24, 30, 60. **Mai 25**: Hyperframes non lo gestisce)
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

### Layout D — Tela 3D con camera in volo (per sequenze ricche)
- Una sola grande tela con le grafiche disposte sopra come stazioni, la camera ci vola dentro
- Speaker in riquadro fisso in basso per tutta la sequenza
- Fondo della tela **scuro ma non nero** (un blu/viola profondo funziona meglio)
- Vedi `references/tecnica-tela-3d.md`

### Layout E — Speaker nel cerchio (opzionale)
- Su 2-3 scene a grafica piena: chi parla in un cerchio di ~270px in alto a destra, con un anello colorato
- Ritaglio largo, testa e spalle. L'etichetta della scena sta dall'altra parte
- Mai di default: vedi `references/editing-pattern.md`, "Aggiunte opzionali"

## Colori

Tienili sincronizzati con `brand-kit/colors.json`. Esempi:

- **Primary** `[#XXXXXX]` — uso: [background dominante, scritte hero]
- **Accent 1** `[#XXXXXX]` — uso: [keyword highlight nelle caption]
- **Accent 2** `[#XXXXXX]` — uso: [CTA finale, money shot]
- **Text on dark** `#FFFFFF`
- **Text on light** `#0A0A0A`

## Fondo chiaro o fondo scuro (e cosa cambia)

Il fondo delle scene senza b-roll è una scelta di stile, e tutte e due funzionano. Noi siamo passati da un viola scuro a un **fondo chiaro con una griglia in prospettiva che scorre lenta**, e il video ha preso un'aria più editoriale. Se ti piace l'idea, un fondo chiaro con un movimento lentissimo (una griglia, una trama) è un ottimo punto di partenza. Il movimento va sulla timeline come tutto il resto, non in CSS.

Il punto da sapere: **quando cambi fondo, il contrasto si rovescia.** Tutto quello che avevi tarato per il fondo scuro va letto al contrario.

| Su fondo scuro | Su fondo chiaro |
|---|---|
| disco scuro sfumato dietro la grafica | card piena chiara, o niente |
| elementi bianchi e brillanti | inchiostro scuro (quasi nero) e colori saturi |
| chip colorate piene | chip colorate piene, ma su una card scura |

Tre cose che abbiamo imparato:
- **Le card scure dentro le scene chiare restano scure**, e va bene così: staccano da sole e hanno un'aria da rivista.
- **Le scene con il b-roll non cambiano**: il b-roll copre il fondo comunque.
- **Nelle scene divise (split) alterna**: troppi fondi chiari di fila stancano, e noi siamo tornati a preferire quelli scuri nelle split. Alterna con un criterio, non a caso.

Una card scura portata su un fondo scuro vuole un bordo sottile chiaro (bianco al 14% circa), sennò sparisce dentro il fondo.

- **Il tuo fondo**: [chiaro / scuro] — [descrizione, es. "bianco caldo con griglia in prospettiva che scorre"]

## Tipografia

Tieni sincronizzato con `brand-kit/typography.json`. Esempi:

- **Caption principale**: [Nome Font] ExtraBold, 90px, `#FFFFFF`, triple text-shadow `0 4px 8px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,1)`
- **Keyword highlight**: stesso font, stesso size, colore `[Accent 1]`, glow `0 0 20px [Accent 1], 0 0 40px [Accent 1]`
- **Hero text fullscreen**: [Nome Font] Black, 140-180px
- **Body / small**: [Nome Font] Medium, 36-48px
- **Mono (codice, terminale)**: JetBrains Mono o simili, 32-40px

## Caption — regole

> Regole complete e ragionate in `references/caption-parola-per-parola.md`. Qui solo i valori.

- **Posizione**: split → y ≈ **872** · fullscreen → y ≈ **1150** · fullscreen con grafica bassa → y ≈ **1272**
- **Una keyword per frase** evidenziata in Accent 1. Accent 2 **solo** per la soluzione e la CTA finale, e solo nella seconda metà del video
- **MAX caratteri per riga**: ~26 nel corpo, ~36 sulla frase-hook (che sta su due righe piene)
- **Mai spezzare** aggettivo+sostantivo. I "compound names" stanno insieme
- **Punteggiatura dal copione**, non dalla trascrizione. Frasi citate tra «caporali»
- **Pausa a fine frase** (`.`, `!`, `?`): gap extra di ~180ms prima della caption successiva
- **Clamp a fine scena**: l'ultima riga non scavalla nella scena successiva
- **Casing**: originale dalla trascrizione (NO ALL-CAPS forzato)
- **Niente box dietro**: solo text-shadow per leggibilità

## Hook (primi 3 secondi)

- **MAI testuali**. Niente counter, niente numeri fullscreen, niente scritta da sola.
- Sempre **b-roll concreto**: mockup, screenshot, oggetto in movimento, scena cinematica.

## CTA (ultimi 2-4 secondi)

- Formato preferito: [es. "money shot" con scritta grande in Accent 2 + speaker in basso]
- Il colore della CTA è [Accent 2], distinto dal colore della keyword (Accent 1)

## Motion design

- Ogni scena deve avere **idle motion** (anche minima, es. `scale 1 → 1.02` in yoyo con un numero **finito** di ripetizioni: `repeat: -1` rompe il render). Sugli elementi di testo il respiro va su glow e ombre, non su scala e rotazione
- **Entry animation** ad ogni cambio scena, con le tre curve di casa (`posa`, `rinculo`, `aggancio`) e i livelli sfalsati di 2-4 fotogrammi: vedi `references/qualita-del-movimento.md`
- **Mai exit animations** intermedie. Solo l'ultima scena può "uscire"
- **Densità target**: 8-10 elementi animati per scena
- **Cambio b-roll**: ogni 1.5-2.5s, tagli netti

## Safe zone social

- **Top 0-280px**: zona username/UI Instagram. Niente caption critiche qui.
- **Bottom 1580-1920px**: zona like/descrizione. Niente caption critiche qui.
- Caption "low" max y=1480px.
- Le finte finestre di browser partono da `top ≥ 290px`, le motion graphics da ~300px.
- Verifica con un rettangolo rosso semitrasparente sovrapposto ai fotogrammi chiave: è il modo più rapido per vedere se qualcosa sconfina.
