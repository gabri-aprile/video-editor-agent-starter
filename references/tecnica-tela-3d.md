# La tela 3D con la camera che vola

> La tecnica che fa la differenza tra un reel che sembra un template e uno che sembra prodotto.
> Serve quando devi mostrare **tre o più grafiche di fila**. Su un video di due scene non ha senso.

---

## L'idea in una frase

Invece di far entrare e uscire una card alla volta, disponi **tutte** le grafiche su una sola grande tela, come stazioni su una mappa. Poi ci fai volare sopra la camera: si sposta, si inclina in curva, si sfoca per la velocità e atterra su una stazione alla volta.

Chi parla resta in un riquadro in basso per tutta la sequenza. E ogni tanto un video vero a schermo pieno copre la tela, mentre sotto la camera continua a spostarsi di nascosto.

Il risultato è che le grafiche non sembrano diapositive: sembrano **un unico spazio** che stai esplorando.

---

## Come è fatta (tre livelli, uno dentro l'altro)

```
#cam-stage    l'oblò: 1080×1920, ritaglia tutto il resto. Qui vive la prospettiva
  └ #cam-tilt il livello che ruota in 3D (l'inclinazione della camera)
      └ #world  la tela vera e propria: si sposta e si ingrandisce
          ├ .wtool  stazione 1  (un foglio 1080×1920 con dentro una grafica)
          ├ .wtool  stazione 2
          └ ...
```

Valori di riferimento (adattali al tuo brand):

| Cosa | Valore | Perché |
|---|---|---|
| Tela `#world` | **4600 × 5600 px** | grande abbastanza per otto stazioni su tre colonne |
| `perspective` sull'oblò | **1180px**, origine 50% 44% | più è basso, più l'effetto 3D è marcato |
| Fondo della tela | scuro ma **non nero**, es. `#1a1536` con sopra 4-5 aloni radiali colorati | il nero piatto uccide il senso di profondità |
| Griglia di sfondo | linee ogni **130px**, bianche al 8% | è ciò che rende **visibile** il movimento: senza griglia la camera sembra ferma |
| Ogni stazione | un riquadro **1080 × 1920** | grande quanto lo schermo: quando la camera atterra, la grafica riempie l'inquadratura |

La griglia sembra un dettaglio decorativo. Non lo è: è il riferimento visivo che dice all'occhio "ti stai spostando".

---

## Le tappe della camera

Una lista, una riga per tappa. Cinque informazioni ciascuna:

| Campo | Cosa significa |
|---|---|
| `id` | nome della stazione |
| `mg` | quale grafica ci va dentro |
| `at` | **a che secondo** la camera è arrivata |
| `S` | quanto è ingrandita la camera su quella stazione (1.00-1.12) |
| `pos` | **dove sta** la stazione sulla tela, in pixel `[x, y]` |

Esempio reale (percorso a serpentina su tre colonne):

```
w1  at 9.22   S 1.10   pos [1000, 1000]
w2  at 12.16  S 1.06   pos [2300, 1000]
w3  at 13.52  S 1.02   pos [3600, 1000]     ← fine prima riga
w4  at 15.80  S 1.12   pos [3600, 2150]     ← scende
w5  at 19.42  S 1.04   pos [2300, 2150]     ← torna indietro
w6  at 21.94  S 1.00   pos [1000, 2150]
w7  at 23.78  S 1.06   pos [1000, 3300]     ← scende ancora
w8  at 27.36  S 1.08   pos [2300, 3300]
```

Colonne a x = 1000 / 2300 / 3600, righe a y = 1000 / 2150 / 3300. **A serpentina**: prima riga da sinistra a destra, seconda al contrario, terza di nuovo verso destra. Così i voli sono corti e il movimento resta leggibile.

⚠️ **Non c'è una coordinata di profondità e non c'è una rotazione per tappa.** La profondità nasce dalla prospettiva più la scala; l'inclinazione la calcola il codice a ogni volo. Se qualcuno ti dice che ogni tappa ha x, y, z e rotazione, sta immaginando.

**Come si punta una stazione.** La tela si sposta in modo che il centro della stazione finisca a x=540 (metà schermo) e y=620 (un po' sopra il centro, per lasciare aria al riquadro del parlante in basso):

```js
const camX = (c) => 540 - c.pos[0] * c.S
const camY = (c) => 620 - c.pos[1] * c.S
```

---

## Il volo (è qui che si gioca tutto)

Tra una tappa e l'altra, quattro animazioni sovrapposte. Il volo **finisce esattamente** sul secondo della tappa, non inizia lì.

```js
const gap = tappa.at - precedente.at
const mv  = Math.min(0.62, gap * 0.55)   // dura il 55% dell'intervallo, mai più di 0,62s
const t0  = tappa.at - mv                // parte prima, arriva puntuale
```

1. **Spostamento e zoom** della tela: durata `mv`, easing `power2.inOut`. Parte piano, accelera, frena. È il volo.
2. **Inclinazione in curva**: la camera ruota di **±15°** in orizzontale e **∓7°** in verticale nella prima metà del volo (`sine.in`)...
3. ...e **si raddrizza** nella seconda metà (`sine.out`). Esattamente come un aereo che si inclina entrando in curva e si rimette dritto uscendone. Il senso di rotazione si alterna volo dopo volo.
4. **Sfocatura di velocità**: la tela si sfoca fino a **14px** mentre accelera e torna a fuoco arrivando.

Sul punto 4 una precisazione onesta: **non è vero motion blur**. È una sfocatura animata. Il vero motion blur richiederebbe di calcolare più campioni per fotogramma e costa un'eternità di render. Questa costa zero e l'occhio ci casca.

**Le grafiche si accendono un decimo di secondo prima dell'arrivo** (0,34s di dissolvenza). Se le accendi quando la camera è già ferma, si vede il "pop".

---

## Il riquadro con chi parla

Resta lì per tutta la sequenza, fisso in basso.

| Cosa | Valore |
|---|---|
| Dimensioni | **806 × 454 px** (16:9) |
| Posizione | centrato, **190px dal fondo** |
| Angoli | 30px, bordo bianco sottile al 16%, ombra profonda |
| Entrata | scala da 0,85 a 1 con micro-rimbalzo (`back.out(1.7)`), 0,4s |

Due cose importanti:

- **Il centramento si fa con GSAP** (`xPercent: -50`), mai con il CSS: altrimenti la prima animazione lo fa saltare di mezzo schermo.
- **Serve una sorgente video dedicata** per il riquadro. Se ci infili dentro il ritaglio verticale che usi per lo schermo intero, il volto esce gigante e tagliato. Vedi `references/preparazione-girato.md`.

Il riquadro va **sincronizzato al tempo assoluto del girato**, non fatto ripartire da zero: se la sequenza inizia al secondo 9,16 del video, anche il riquadro deve mostrare il secondo 9,16.

---

## I video veri che interrompono la tela

Ogni tanto (una volta ogni 6-8 secondi) un b-roll a schermo pieno copre tutto. Serve al ritmo: un reel fatto di sola grafica stanca, per quanto bella sia.

Il trucco è che **la tela non si ferma**: il video si limita a coprirla. Sotto, la camera continua a volare verso la stazione successiva, e quando il video sparisce sei già altrove. È il modo più economico di far sembrare che stia succedendo molto di più.

Regole pratiche:

- Il video sta **sopra la tela ma sotto il riquadro del parlante e sotto le caption**
- Deve essere **figlio diretto** della composizione, non annidato: se lo annidi, il motore non lo mostra
- Si accende in **0,14 secondi** (praticamente uno stacco netto), non in dissolvenza
- Dentro, un lentissimo zoom da 1,06 a 1,13 (effetto Ken Burns): un video fermo dentro un montaggio in movimento sembra rotto
- Si spegne **50 millisecondi prima** della fine della sua finestra, o lascia un fotogramma sporco
- Sotto, una sfumatura scura alta ~760px per far leggere le caption

---

## Quando NON usarla

- Video corti con una o due grafiche: è un cannone per una zanzara
- Contenuti molto parlati dove chi ascolta deve stare sulla faccia
- Quando le grafiche non hanno **niente in comune**: la tela funziona perché suggerisce che le stazioni fanno parte di uno stesso discorso

**Il caso migliore** è quando la tela *è* l'oggetto del pezzo: se parli di presentazioni, le stazioni sono le slide sparse su un piano e la camera si muove come dentro l'editor. Lì la tecnica smette di essere un effetto e diventa il contenuto.
