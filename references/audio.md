# Audio: musica, effetti, volume finale

> L'audio è la metà del video che nessuno guarda e tutti sentono. Tre regole e sei a posto.

---

## 1. La musica va alzata alla sorgente, poi abbassata nel mix

Sembra un controsenso ed è il passaggio che quasi tutti sbagliano. Le tracce di sottofondo che scarichi hanno volumi molto diversi tra loro: alcune sono registrate piano. Se ti limiti ad abbassarle nel mix, quelle già piano spariscono del tutto.

Il metodo giusto: **prima porti la traccia a un livello noto** (la amplifichi alla sorgente), **poi** la abbassi sotto la voce con un valore prevedibile. Così ogni episodio ha lo stesso rapporto voce/musica, indipendentemente da dove hai preso la traccia.

Ordine di grandezza: la musica sta sotto il parlato di parecchio (si deve percepire, non ascoltare). Nelle pause e nelle transizioni può risalire.

⚠️ **Prima di tagliare un estratto, guarda com'è fatto il brano.** Le intro dei pezzi lunghi stanno spesso 6-9 dB sotto il corpo del brano: se prendi i primi trenta secondi, il video parte praticamente muto proprio nell'apertura, che è il momento in cui non te lo puoi permettere. Stampa il profilo del volume a blocchi e prendi la zona piena, non l'inizio. Quando passi da una traccia all'altra, fai entrare la seconda **mentre** la prima sta sfumando, non dopo.

Se la traccia è più corta del video, falla ripetere invece di lasciarla finire nel silenzio:

```bash
ffmpeg -stream_loop -1 -i bgm.mp3 -t <durata_video> bgm_loop.mp3
```

## 2. Gli effetti sonori vanno sugli eventi della grafica, non sui cambi scena

Questo è il dettaglio che separa un montaggio amatoriale da uno che "suona bene".

- ❌ Un suono a ogni cambio scena: dopo dieci secondi è fastidioso e sembra una presentazione aziendale.
- ✅ Un suono quando **succede qualcosa dentro la grafica**: il numero che si accende, la barra che si riempie, il segno di spunta che compare, il primo posto della classifica che arriva.

Volumi bassi, sempre. E mixali **prima** della normalizzazione finale, non dopo, altrimenti sballi il livello complessivo.

Fonti gratuite legali: [Freesound](https://freesound.org/), [Pixabay](https://pixabay.com/sound-effects/), la libreria audio di YouTube.

## 3. Normalizza alla fine, in due passate

Le piattaforme social riportano tutti i video allo stesso volume percepito. Se consegni un video più forte, te lo abbassano loro e lo fanno male. Meglio arrivarci già allineato: **-14 LUFS integrati, picco reale -1 dBTP**.

Fallo in **due passate**: la prima misura il file, la seconda applica la correzione con i valori misurati. La singola passata è una stima e sbaglia, soprattutto sui video con dinamica ampia.

```bash
# passata 1: misura (leggi i valori nel JSON che stampa)
ffmpeg -i input.mp4 -af loudnorm=I=-14:TP=-1:LRA=11:print_format=json -f null -

# passata 2: applica usando i valori misurati
ffmpeg -i input.mp4 -af loudnorm=I=-14:TP=-1:LRA=11:measured_I=<...>:measured_TP=<...>:measured_LRA=<...>:measured_thresh=<...>:offset=<...>:linear=true -ar 48000 -c:v copy -shortest output.mp4
```

Lascia che sia il tuo agente a leggere i valori della prima passata e a comporre il comando della seconda: è esattamente il tipo di lavoro noioso e preciso in cui non sbaglia.

### Il limitatore prima della normalizzazione

Se nel video c'è musica densa, la normalizzazione da sola non basta: i colpi improvvisi (un effetto, un attacco di batteria) le passano davanti e il file finisce sopra lo zero, cioè distorce. Non lo senti sempre in cuffia, ma si sente sui telefoni.

La catena che regge è **doppia**: un limitatore che tiene il grosso e un secondo, più rapido, che prende quello che è passato.

```bash
-af "alimiter=limit=0.74:attack=1:release=50,alimiter=limit=0.80:attack=0.1:release=10"
```

Il punto è l'attacco del primo: con valori più lenti (4 millisecondi) i transitori passano lisci e il mix esce sopra lo zero.

⚠️ **Per misurare il picco vero usa l'analisi statistica del segnale** (`astats`), non la riga "Peak" dell'analisi di loudness: quella riporta un picco diverso e ti fa credere di essere a posto.

---

## Diritti

Mai musica presa da servizi di streaming o da altri video. Le piattaforme la riconoscono, tolgono l'audio o bloccano il post. Le fonti gratuite legali sono più che sufficienti per i primi mesi; se poi vuoi qualcosa di più curato, gli abbonamenti alle librerie musicali costano quanto una pizza al mese.
