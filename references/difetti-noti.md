# Difetti noti e verifiche prima di consegnare

> I diciannove modi in cui un render "riuscito" esce comunque rotto, e come accorgersene prima di pubblicare.
> Ognuno di questi è costato almeno un pomeriggio a qualcuno. Leggerli ti risparmia il pomeriggio.

---

## 1. Il primo fotogramma è nero

I video partono "a freddo": nel fotogramma zero il tag video non ha ancora niente da mostrare. Risultato: il tuo Reel si apre con un lampo nero, proprio nell'istante in cui devi agganciare.

**Due rimedi, usali insieme:**
- dai al video della **prima** scena uno stato acceso già nel codice (`style="opacity:1"`), senza aspettare che lo accenda l'animazione
- droppa il primo fotogramma in post

## 2. L'ultimo fotogramma è nero

La durata totale della composizione deve stare **dentro** la durata del girato, non pareggiarla. Se il girato dura 45,376 secondi, la composizione finisce a 45,36. Un centesimo oltre e l'ultimo fotogramma esce nero.

Verifica sempre dopo il render:

```bash
ffprobe -v error -count_frames -show_entries stream=nb_read_frames output.mp4
```

Confronta con i fotogrammi attesi (durata × fps). Se sfora, taglia:

```bash
ffmpeg -i output.mp4 -frames:v <numero_valido> -c copy output_tagliato.mp4
```

Quando normalizzi il volume aggiungi `-shortest`: l'audio ricodificato può risultare qualche millisecondo più lungo del video e ti riporta indietro il frame nero.

## 3. Le scene si accumulano

Con molte scene fatte di sola grafica, gli elementi delle scene precedenti restano appesi e si vedono sotto quelle nuove. È il difetto più insidioso perché in anteprima veloce spesso non si nota.

**Rimedio:** ogni contenitore di scena parte da `opacity: 0` nel CSS, viene acceso all'inizio della sua scena e **spento alla fine** con GSAP. Nessuna eccezione.

## 4. I video annidati non si vedono

I tag `<video>` devono essere **figli diretti** della composizione, non infilati dentro altri contenitori animati. Se li annidi, il motore non li tratta come sorgenti video e ti ritrovi un buco.

Stessa famiglia di problemi: niente `clip-path` animato, il render non lo segue.

## 5. Il colore esce slavato (il caso HDR)

Questo è il difetto che costa più tempo di tutti, perché sembra colpa del montaggio e non lo è.

Basta **una sola clip HDR** dentro la composizione (tante clip gratuite dei siti di stock lo sono, senza dirtelo) e il motore riporta a norma **tutto** il render, compreso il primo piano di chi parla. Il risultato: il tuo viso esce spento, e tu passi la serata a mettere filtri di saturazione sopra un problema che sta da un'altra parte.

Quanto pesa, misurato su un episodio vero: la pelle è passata da 0,477 nel girato a 0,363 nel render. Il 32% di saturazione in meno, senza aver toccato niente.

**Controlla ogni clip prima di usarla:**

```bash
ffprobe -v error -select_streams v:0 -show_entries stream=color_transfer,color_primaries -of csv=p=0 clip.mp4
```

Se leggi `arib-std-b67`, `smpte2084` o `bt2020`, quella clip è HDR e va convertita **davvero**, prima di entrare nel montaggio:

```bash
ffmpeg -i clip.mp4 -vf "zscale=t=linear:npl=100,tonemap=hable:desat=0,zscale=p=bt709:t=bt709:m=bt709:r=tv,format=yuv420p" -c:a copy clip_bt709.mp4
```

Due cose che sembrano scorciatoie e non funzionano:

- **Ri-etichettare il file senza riconvertirlo** (`-c:v copy` cambiando i metadati) non serve a niente: i valori dell'immagine restano quelli di prima.
- **L'opzione SDR del render non ti protegge.** Quella *forza* la conversione a fine corsa, cioè fa esattamente il danno che vuoi evitare. Il posto giusto dove convertire è la singola clip, all'inizio.

Se lo automatizzi nello script che prepara le clip (controllo dei metadati, e se sono HDR passa il filtro qui sopra), il problema sparisce per sempre e ti togli anche il filtro di saturazione che avevi messo come cerotto.

## 6. Il parlante si congela nelle scene split

Non è un bug del montaggio, è il girato: ha fotogrammi chiave troppo radi. Vedi `references/preparazione-girato.md`, sezione re-encode.

## 7. Le clip troppo corte fanno fantasmi

Ogni clip di b-roll deve durare **almeno quanto la scena più 0,3 secondi**. Se è più corta, verso la fine sfuma da sola o lascia un fotogramma congelato. E fai finire la clip un millesimo prima del confine di scena, così non sborda in quella dopo.

## 8. La durata dichiarata non torna

L'attributo `data-duration` va sul nodo radice della composizione ed è quello che comanda. Se lo dimentichi, il motore usa la durata che si calcola da solo e non è quasi mai quella giusta.

## 9. Un fix rompe altre scene

Quando modifichi un CSS condiviso per aggiustare una scena, ne stai toccando dieci. Prima di consegnare, rigenera l'anteprima di **tutte** le scene che usano quella classe, non solo di quella che stavi sistemando.

## 10. Il render crasha a metà

Un errore del tipo "Protocol error: Target closed" è un crash momentaneo del browser headless, non un problema del tuo progetto. Rilancia il render.

## 11. Il video parte nero per due secondi (e non è il primo fotogramma)

Diverso dal difetto numero 1. Qui il video parte, ma nei primi due secondi non si vede nessun contenuto: né il girato né le immagini.

La causa non è il peso del file video: è il peso della **composizione**. Con decine di scene piene di animazioni, il motore impiega quel tempo prima di riuscire a disegnare qualcosa. Misurato su un episodio: ricomprimere il girato da 193 a 98 MB non ha cambiato niente, mentre rifare la timeline con 14 scene invece di 64 ha portato il primo fotogramma a 0,3 secondi.

Cosa fare: alleggerisci la timeline, togli dalla pagina i video che in quel montaggio non usi (restano peso morto), e usa **un solo elemento video continuo** invece di uno per ogni pezzo.

## 12. Un fotogramma nero sul confine tra due scene

Succede quando una scena a schermo intero passa a una scena divisa. Il fondo scuro che copriva chi parla si spegne nello stesso istante in cui il motore scarta l'ultimo fotogramma della scena, e per un fotogramma resta il nero.

Cosa fare: spegni quel fondo **0,05 secondi prima** del confine, e solo in quel verso (schermo intero verso diviso). È un difetto di impianto, non di quella scena: se ce l'hai, ce l'hai su tutti gli episodi.

## 13. Il velo di chiusura diventa un lampo

Se usi un velo scuro per chiudere un primo piano e la scena successiva è chiara, la luminosità fa un salto in tre fotogrammi (misurato: 35, poi 14, poi 113) e sullo schermo si vede un lampo.

Cosa fare: salta il velo quando la scena che entra è chiara. Il velo serve a coprire uno stacco brusco, non a farne uno nuovo.

---

> **Dal 14 in poi:** difetti che sopravvivono a **tutti** i controlli verdi. Il render è valido, i numeri tornano, e il video è sbagliato lo stesso. Sono i più cari, perché li trova chi guarda, non chi controlla.

## 14. Il video finale esce senza effetti sonori

Il passaggio finale (normalizzazione del volume, codifica) parte da un file video. Se di default prende il render **senza** effetti, invece di quello con gli effetti mixati, il master che consegni è muto di effetti. E tutti i controlli sugli effetti dicono verde, perché controllano il file giusto: solo che quel file non entra nella catena.

Ci è successo due volte di fila sullo stesso episodio. La data dei file non aiuta: quello sbagliato può essere il più recente.

Cosa fare:
- lancia la post-produzione **sempre** indicando a mano il file di partenza, mai col default;
- fai mettere all'agente una guardia nello script: se esiste un render con gli effetti più recente di quello muto, si rifiuta di partire da quello muto;
- prima di consegnare, verifica che **il master** contenga gli effetti: ascolta due o tre punti dove sai che c'è un suono.

## 15. Il colpo arriva un secondo prima della parola (il ritardo ereditato)

Hai costruito un'animazione che deve cadere sulla parola "no". La copi da un altro episodio, dove funzionava. Qui arriva un secondo prima. Nessun controllo lo vede: l'animazione sta dentro la sua scena, solo che è tarata sui tempi di un'altra.

La regola: **ogni colpo si rimette sui tempi della trascrizione.**
ritardo giusto = istante in cui la parola viene detta − inizio della scena.

Due conseguenze:
- se sopra il pezzo di codice c'è un commento che cita i tempi di un altro episodio, quel pezzo non è stato rimesso a tempo;
- gli **effetti sonori** di solito sono agganciati allo stesso ritardo: si spostano **insieme** all'animazione, mai uno solo dei due.

## 16. La musica finisce prima del video

Su un video lungo, scrivere sul tag audio una durata più lunga del file **non** fa ripetere la musica: il motore suona la traccia e poi basta. Su un nostro episodio da tre minuti la musica finiva a 1'22" e il resto era nudo.

Cosa fare: **su ogni video sopra il minuto, controlla prima del render che la traccia duri almeno quanto il video.** Se è corta, allungala ripetendola con una dissolvenza incrociata (in ffmpeg si chiama `acrossfade`) e ascolta le giunte.

Per verificare a render fatto, ascolta **la coda** del video, dove non si parla più: nelle pause del parlato respiri ed effetti confondono.

## 17. Un lampo su un confine: misura prima tutti gli altri

Trovi un fotogramma sbagliato (un lampo, un nero) sul passaggio fra due scene. L'istinto è indagare quel confine. Sbagliato: la prima misura si fa **su tutti gli altri**.

- Se il difetto c'è su tutti i confini, è un problema del motore o del tuo template.
- Se gli altri sono puliti, il colpevole è **attaccato a quella scena**: un velo, una lama, un elemento che entra o esce proprio lì.

Senza questa domanda abbiamo seguito due diagnosi plausibili e buttato due render. Con la domanda, il colpevole si è trovato in cinque minuti.

## 18. Due pezzi della stessa grafica che si pestano

Il controllo della safe zone guarda la grafica **intera** e dice se sconfina. Non dice se dentro la grafica un badge è finito sopra una colonna, o una spunta sopra un'etichetta. E nella griglia dei fotogrammi, a misura di miniatura, non si vede.

Cosa fare: fatti costruire dall'agente un controllo che, su tre istanti per scena, confronta **ogni coppia** di elementi visibili e segnala quando si coprono per più di un decimo. Due avvertenze per non farlo diventare rumore:
- guarda anche gli elementi senza classe (le etichette vere sono spesso dei semplici `<b>` o `<span>`);
- gli strati concentrici voluti (una spunta dentro una casella) vanno in una lista di eccezioni **con il motivo scritto**. Un controllo che segnala sempre le stesse quattro cose lo smetti di leggere.

## 19. Lampi bianchi a inizio scena

Un'animazione che parte da uno stato visibile (un lampo, un bagliore) si accende al fotogramma 0 della scena invece che al suo istante. È un errore di GSAP, spiegato con la correzione in `references/gsap-regole.md`, "Due errori che passano tutti i controlli". Su un nostro episodio erano sei lampi, tutti verdi ai controlli.

---

## Checklist finale prima di pubblicare

Tecnica:
- [ ] Primo fotogramma non nero
- [ ] Ultimo fotogramma non nero, durata dentro quella del girato
- [ ] Spazio colore `bt709`, pixel format `yuv420p`
- [ ] Audio presente fino all'ultimo secondo
- [ ] Volume normalizzato (vedi `references/audio.md`)
- [ ] Risoluzione 1080×1920, framerate 24, 30 o 60
- [ ] Nessun fotogramma-lampo: fai misurare la luminosità media di ogni fotogramma e cerca quelli sotto il 55% dei vicini (a occhio non si vedono, e nella griglia dei fotogrammi nemmeno)
- [ ] File sotto i limiti della piattaforma
- [ ] Il master contiene davvero gli effetti sonori (difetto 14)
- [ ] Sopra il minuto: la musica dura quanto il video (difetto 16)

Movimento (`references/qualita-del-movimento.md`):
- [ ] Strisce fotogramma per fotogramma su ogni transizione (`scripts/strisce.mjs`)
- [ ] Al massimo un secondo fermo ogni otto (`scripts/fermi.mjs`)
- [ ] Ogni colpo cade sulla sua parola, rimesso sui tempi della trascrizione (difetto 15)

Contenuto:
- [ ] **Nessuna grafica copre un volto**, nemmeno sfocato sullo sfondo di un b-roll (controlla il b-roll pulito, vedi `references/editing-pattern.md`)
- [ ] Hook nei primi 3 secondi, visivo e non testuale
- [ ] Il parlante compare nell'apertura e torna almeno una volta a metà
- [ ] Nessuna clip di b-roll usata due volte
- [ ] Caption dentro la fascia, mai sotto una grafica
- [ ] Un evento visivo ogni ~2 secondi
- [ ] CTA chiara negli ultimi secondi
- [ ] Diritti di musica ed effetti a posto
