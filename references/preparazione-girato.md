# Preparare il girato prima di montarlo

> Quattro passaggi da fare **prima** di aprire il montaggio.
> Sembrano problemi di montaggio e invece nascono tutti qui: se li salti, poi combatti contro difetti che non riuscirai a spiegarti.

Ordine dei passaggi: **1. re-encode → 2. taglio dei silenzi → 3. ritagli → 4. audio per la trascrizione**.

---

## 1. Re-encode con fotogrammi chiave fitti

**Il sintomo:** chi parla si congela per un istante nelle scene split, oppure il video "scatta" quando il montaggio salta a un punto preciso.

**La causa:** un video non contiene tutti i fotogrammi per intero. Ogni tanto ne salva uno completo (il **fotogramma chiave**) e in mezzo salva solo le differenze. Se i fotogrammi chiave sono distanti otto secondi l'uno dall'altro e il motore di render deve andare al secondo 12,4, si ritrova senza un'immagine completa da cui partire e ti mostra l'ultima buona: la faccia si congela.

**Il rimedio:** ricodifica il girato con un fotogramma chiave ogni secondo.

```bash
ffmpeg -i girato_originale.mp4 \
  -c:v libx264 -r 30 -g 30 -keyint_min 30 -pix_fmt yuv420p \
  -movflags +faststart -c:a aac -b:a 192k source.mp4
```

`-g 30` a 30 fotogrammi al secondo significa **un fotogramma chiave al secondo**. Il file cresce un po', il problema sparisce. Fallo sempre, anche quando sembra che vada bene.

Per le clip di b-roll, che vengono attaccate da punti arbitrari, va ancora più fitto: **`-g 12`**, cioè uno ogni 0,4 secondi.

---

## 2. Tagliare i silenzi (con giudizio)

Nel parlato ci sono pause, respiri, esitazioni. Toglierle rende il video più denso e guadagna secondi preziosi. Ma va fatto con tre precauzioni.

**Le tre soglie:**

| Costante | Valore | Cosa significa |
|---|---|---|
| Soglia di silenzio | **-32 dB** | sotto questo livello lo consideriamo silenzio |
| Durata minima | **0,20 s** | pause più brevi non si toccano |
| Respiro da lasciare | **0,20 s** | di ogni silenzio si conserva un decimo di secondo prima e un decimo dopo |

**Precauzione 1: lascia il respiro.** Non tagliare da un suono all'altro. Se togli tutto, mangi le sillabe finali ("Arena." diventa "Aren") e il parlato suona ansioso.

**Precauzione 2: taglia audio e video insieme.** Sembra ovvio, non lo è: se tagli solo l'audio, il sincrono delle labbra si sposta e da lì in poi il video è inguardabile.

**Precauzione 3: non toccare il silenzio finale.** L'ultimo respiro, dopo l'ultima parola, è quello che regge la card di chiusura. Regola pratica: **salta i silenzi che iniziano dopo `durata − 0,7 secondi`**.

Come si fa, a grandi linee: si rilevano i silenzi, si costruisce l'elenco dei pezzi da tenere, si concatenano in un file solo.

```bash
# 1. rilevamento (leggi i silence_start / silence_end nell'output)
ffmpeg -i src_raw.mp4 -af "silencedetect=noise=-32dB:d=0.20" -f null -

# 2. ricomposizione: trim + atrim di ogni pezzo da tenere, poi concat
#    (l'elenco dei pezzi lo genera il tuo agente a partire dal punto 1)
ffmpeg -y -i src_raw.mp4 -filter_complex_script filtro.txt -map "[v]" -map "[a]" \
  -c:v libx264 -crf 17 -preset medium -r 30 -g 30 -keyint_min 30 -sc_threshold 0 \
  -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 192k src_tight.mp4
```

Su un girato di 47 secondi si recuperano tipicamente **6 decimi di secondo**. Sembra poco. Su un Reel, sei decimi sono un'eternità.

Chiedi al tuo agente di scriverti lo script una volta sola: poi lo riusi per sempre.

---

## 3. I ritagli: uno non basta

**Se hai girato in verticale**, ti serve solo il ritaglio verticale e sei a posto.

**Se hai girato in orizzontale** (capita spessissimo: fotocamere, webcam, avatar generati) servono **due sorgenti distinte** ricavate dallo stesso girato:

| Sorgente | Risoluzione | A cosa serve |
|---|---|---|
| **Banda** | 1080 × 936, ritagliata **a pixel nativi** | la fascia bassa delle scene split |
| **Verticale** | 1080 × 1920, ingrandita e ritagliata | scene a schermo intero e sfondo sfocato |

Perché due. Un girato 1920×1080 portato a 1080×1920 va **ingrandito di 1,78 volte**: perde definizione. Se poi da quel file ricavi anche la fascia dello split, la fascia esce morbida. Invece la fascia da 936 pixel di altezza **c'è già dentro** il girato nativo: la ritagli senza toccare un pixel e resta nitida.

```bash
# banda per lo split: ritaglio nativo, nessun ingrandimento
ffmpeg -i src_tight.mp4 -vf "crop=1080:936:420:72,fps=30,format=yuv420p" \
  -c:v libx264 -crf 18 -g 30 -keyint_min 30 -pix_fmt yuv420p -an source_band.mp4

# verticale per schermo intero e sfondo sfocato (qui l'ingrandimento è inevitabile)
ffmpeg -i src_tight.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,format=yuv420p" \
  -c:v libx264 -crf 18 -g 30 -keyint_min 30 -pix_fmt yuv420p -c:a aac -b:a 192k source.mp4
```

⚠️ **Gli offset del ritaglio (`420:72` qui sopra) dipendono da dove sta la faccia nella tua inquadratura.** Non copiarli: guarda un fotogramma e trova i tuoi. Regola: la testa non deve toccare il bordo alto, gli occhi stanno più o meno sul terzo superiore.

### La terza sorgente: il riquadro con la faccia

Se usi la tela 3D (o comunque un riquadro piccolo con chi parla), **serve una terza sorgente dedicata**, un ritaglio 16:9 preso dentro il girato nativo, circa **1612 × 908**.

Il motivo è controintuitivo: se dentro un riquadro 16:9 ci metti il **ritaglio verticale**, il volto esce enorme e tagliato, perché stai infilando un'inquadratura stretta in una cornice larga. Serve un ritaglio già largo.

```bash
ffmpeg -i src_tight.mp4 -vf "crop=1612:908:154:86,fps=30,format=yuv420p" \
  -c:v libx264 -crf 18 -g 30 -keyint_min 30 -pix_fmt yuv420p -an source_pip.mp4
```

Anche qui gli offset sono i tuoi: inquadra busto e testa, un po' più larghi di quanto ti verrebbe da fare.

---

## 3bis. I ritagli si ricalibrano quando cambi inquadratura

I valori dei ritagli non sono universali: valgono per **quella** posizione davanti alla camera. Il giorno che ti siedi più a sinistra, o cambi obiettivo, vanno rifatti, altrimenti nella scena divisa ti ritrovi mezzo fuori dal quadro.

Due cose che ho imparato tarandoli:

- Il ritaglio della fascia si calcola **a partire dal viso**, non dal centro dell'immagine. Fatti misurare dall'agente dove sta la testa nel quadro in una decina di istanti diversi e usa il valore mediano invece di andare a occhio.
- Il primo piano a schermo intero non deve essere ingrandito troppo: se nella scena divisa lo stesso girato si vede a grandezza naturale, un primo piano quasi doppio stona. Meglio un ingrandimento leggero.

## 4. L'audio per la trascrizione

Ricavalo **dal girato già tagliato**, mai da quello originale: altrimenti i tempi delle parole non corrispondono più a quello che monti (è l'errore che fa perdere più tempo in assoluto).

```bash
ffmpeg -y -i src_tight.mp4 -ac 1 -ar 16000 audio16k.wav
```

Mono a 16 kHz è il formato che i motori di trascrizione preferiscono: più leggero e più accurato.

Prima di fidarti del file delle parole, **controlla che la sua durata coincida con quella del girato tagliato**. Se hai lanciato la trascrizione in background e leggi il file troppo presto, stai leggendo quello dell'episodio prima.

---

## Riepilogo dei file che ti ritrovi

```
girato_originale.mp4     quello che esce dalla camera o dal generatore
  ↓ re-encode -g 30
src_raw.mp4              fotogrammi chiave fitti
  ↓ taglio silenzi
src_tight.mp4            ← da qui in poi tutto deriva da questo
  ├→ source.mp4          1080×1920, con audio: schermo intero e sfondo sfocato
  ├→ source_band.mp4     1080×936, nativo: la fascia dello split
  ├→ source_pip.mp4      1612×908: il riquadro piccolo
  └→ audio16k.wav        mono 16 kHz: per la trascrizione
```

Regola d'oro: **la durata della composizione deve stare dentro la durata di `src_tight.mp4`**, mai pareggiarla. Un centesimo di secondo oltre e l'ultimo fotogramma esce nero.
