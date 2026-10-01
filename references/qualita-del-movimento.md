# La qualità del movimento

> Il file che separa un montaggio "fatto bene" da uno che sembra uscito da uno studio.
> Il tuo agente lo rilegge **prima di costruire le grafiche** e **prima di mandarti una bozza**.

---

## Da dove viene

Abbiamo preso il video di uno studio di motion design (Autostep) e l'abbiamo studiato fotogramma per fotogramma. La sorpresa: era fatto con **la nostra stessa tecnologia**, pagina web + GSAP + browser + ffmpeg. Stessi strumenti che hai tu in questo kit.

Quindi la differenza non era lo strumento. Era il **metodo**. E il metodo si copia.

Sono tre cose: le curve giuste, sei regole di regia, e un giro di critica prima di guardare la bozza. Il giro di critica è metà del lavoro, non un controllo in più.

---

## 1. Tre curve, una per gesto

Una "curva" (in GSAP si chiama *ease*) decide **come** una cosa arriva: se accelera, se frena, se rimbalza. La maggior parte dei montaggi fatti con l'AI usa la stessa curva per tutto, di solito `back.out`, quella col rimbalzino. È la curva che fa dire "template" a chi guarda, anche se non sa spiegare perché.

Al suo posto, tre curve, ognuna per un gesto preciso:

| Curva | Quando | Durata tipica |
|---|---|---|
| `posa` | **Tutti gli ingressi.** 5-8 fotogrammi veloci, poi una coda lunga che si posa piano | 0,4-0,9 s |
| `rinculo` | Le cose **con massa che arrivano**: sfora una volta e torna (una tessera, un cartellino, un'auto che frena) | 0,34-0,6 s |
| `aggancio` | Le cose che **entrano in sede con un clic**: carica, scatta, micro-rimbalzo (una barra nel suo posto, una cifra che rulla, una lama che scende) | 0,3-0,45 s |

Ecco come si registrano. Si mettono **una volta sola**, in cima alla composizione, dopo aver caricato GSAP:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13/dist/CustomEase.min.js"></script>
<script>
  gsap.registerPlugin(CustomEase);
  CustomEase.create('posa',     'M0,0 C0.04,0.62 0.18,0.94 0.42,0.985 0.64,1 0.8,1 1,1');
  CustomEase.create('rinculo',  'M0,0 C0.12,0.78 0.2,1.14 0.36,1.1 0.5,1.06 0.62,0.985 0.78,0.995 0.86,1.002 0.94,1 1,1');
  CustomEase.create('aggancio', 'M0,0 C0.36,0 0.56,0.14 0.66,0.56 0.72,0.86 0.74,1.05 0.8,1.03 0.88,1 0.94,0.995 1,1');
</script>
```

E poi si usano per nome:

```js
tl.fromTo('.titolo', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'posa' }, 1.2)
tl.fromTo('.tessera', { y: -200 }, { y: 0, duration: 0.45, ease: 'rinculo' }, 2.0)
tl.fromTo('.barra', { scaleX: 0 }, { scaleX: 1, duration: 0.38, ease: 'aggancio' }, 2.6)
```

> Non sono le curve di nessun brand: sono numeri. Puoi ritoccarle, ma provale così prima di cambiarle.

---

## 2. Le sei regole

**1. Niente si ferma di colpo.**
Dopo l'arrivo, un'immagine continua a respirare: scala da 1 a 1,02-1,06 con `sine.inOut`, piano, fino al taglio. Una cosa che arriva e si congela sembra un adesivo.
⚠️ Il respiro va sulle **immagini** e sui **fondi**, mai sui **testi**: il testo ridisegnato a ogni fotogramma trema (vedi `gsap-regole.md`).

**2. Un simbolo che fa da filo.**
Scegli dal **tema** del video un segno semplice (una barra, una freccia, una forma) che nasce presto, torna in forme diverse e fa da transizione. Non è una decorazione: è quello che tiene insieme il video. Se parli di cambiare marcia, il simbolo è la leva del cambio, non una stellina.

**3. Una cornice ferma nelle scene in serie.**
Quando hai scene che si ripetono (capitoli, punti di un elenco, "1, 2, 3"), contatore, etichetta e tacche **restano nello stesso punto**, e cambia solo il dato. La cifra rulla dal vecchio al nuovo col clic. Quello che si muove si legge solo contro qualcosa di stabile.

**4. Ogni transizione nasce da un elemento già a schermo.**
Niente dissolvenze dal nulla. La lama del capitolo che taglia il quadro, la tessera che si allarga fino a riempire lo schermo, la barra che vola nella sua sede. Trucco: nella scena nuova tieni sotto l'immagine con cui finiva quella prima. L'elemento che passa la copre e il taglio non si vede.

**5. Livelli sfalsati di 2-4 fotogrammi.**
Mai tutto insieme. Il fondo, poi la card, poi il titolo, poi il numero, a distanza di 0,066-0,13 secondi l'uno dall'altro. Tutto insieme sembra un blocco incollato; sfalsato sembra costruito.

**6. Fotogrammi d'impatto, solo sui colpi veri.**
Sul momento forte (il numero che spiazza, la frase che ribalta): 2-3 fotogrammi di lampo bianco (opacità da 0,75 a 0 in 0,16 s) più una scossa di quattro colpi da 0,05 s che si smorza. Su un video da 60 secondi, **al massimo 3-4**. Se lo metti ovunque, non è più un colpo.

⛔ **Il motion blur non serve.** L'abbiamo provato: su un telefono, mentre si scrolla, non si nota. La fluidità viene dai tempi, non dagli effetti.

---

## 3. Due errori meccanici che farai di sicuro

Li abbiamo fatti noi, e tutti i controlli dicevano verde.

**Due cose che si muovono INSIEME vogliono la stessa curva e la stessa durata.**
Un pannello che si stringe e uno che entra al suo posto, il bordo di un riquadro e la riga colorata che lo segue. Se uno va con `posa` e l'altro con `rinculo`, a metà strada fra loro si apre una striscia nera. Nel fotogramma fermo non la vedi, nel video sì.

**Un `fromTo` che parte già visibile va con `immediateRender: false`.**
Un lampo che parte da 0,75, un anello che parte da 0,9: GSAP scrive il loro stato iniziale **al fotogramma 0** e lo tiene lì fino al loro istante. Risultato: lampi bianchi a inizio scena, anche se nel codice partono a metà.

```js
// ❌ il lampo è acceso da inizio scena
tl.fromTo('.lampo', { opacity: 0.75 }, { opacity: 0, duration: 0.16 }, 4.2)

// ✅ resta spento finché non tocca a lui
tl.fromTo('.lampo', { opacity: 0.75 }, { opacity: 0, duration: 0.16, immediateRender: false }, 4.2)
```

E una terza, più piccola: un oggetto che "vola al suo posto" deve arrivare **esatto sulla sede** e restare pieno fino all'atterraggio. Se si dissolve per strada, l'occhio legge una sparizione, non un aggancio.

---

## 4. Il giro di critica (metà del metodo)

Lo studio che abbiamo studiato aveva un critico per ogni scena. Tu hai il tuo agente. Prima di mandarti una bozza, deve fare **tre passaggi**, in quest'ordine:

**1. Fotogrammi fermi.** 3-5 istanti per scena, montati in una griglia. Servono a trovare stati iniziali sbagliati, cose fuori posto, inquadrature storte.

**2. Le strisce, fotogramma per fotogramma, su ogni transizione.**

```bash
node scripts/strisce.mjs renders/bozza.mp4 4.20 8.06 13.90
```

Per ogni istante che gli dai, prende 24 fotogrammi consecutivi (0,8 secondi) e li mette in una striscia 8×3 da leggere da sinistra a destra, in `work/crit/`. Lì si vede **come entra e come esce** ogni cosa: una barra che svanisce invece di atterrare, una lama che resta appesa al bordo, il buco nero fra due pannelli. Su un nostro episodio ha trovato sei difetti che i fotogrammi fermi non potevano vedere.

Di default guarda la metà alta del quadro (dove stanno le grafiche nel layout split). Aggiungi `--tutto` per il quadro intero.

**3. La misura dei secondi fermi.**

```bash
node scripts/fermi.mjs renders/bozza.mp4
```

Ti dice quanti secondi del video sono **fermi** (nessun movimento visibile) e quanti fotogrammi doppi ci sono in mezzo al movimento (scatti). Riferimento: il video dello studio aveva 6 secondi fermi su 80, il nostro episodio approvato 6 su 57. **La soglia: al massimo un secondo fermo ogni otto.** Se lo superi, guarda le strisce proprio su quei secondi. Con `--fs` misura il quadro intero.

Entrambi gli strumenti usano solo ffmpeg, funzionano su qualsiasi video 1080×1920 a 30 fps, non dipendono da niente altro di questo kit.

**Cosa chiedere al tuo agente:** che nel messaggio della bozza scriva **quanti difetti ha trovato la critica** e **cosa resta fermo**. Se ti dice "zero difetti" al primo giro, non l'ha fatta.

---

## Riepilogo da tenere a portata

- Ingressi `posa`, arrivi con massa `rinculo`, cose in sede `aggancio`. Niente `back.out` su tutto.
- Le immagini respirano, i testi no.
- Un simbolo-filo preso dal tema. Una cornice ferma nelle serie. Transizioni che nascono da qualcosa a schermo.
- Livelli sfalsati di 2-4 fotogrammi. Impatti solo sui colpi veri, massimo 3-4.
- Insieme = stessa curva e stessa durata. `fromTo` che parte visibile = `immediateRender: false`.
- Prima della bozza: fotogrammi fermi, strisce, secondi fermi.
