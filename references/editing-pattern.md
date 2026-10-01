# Editing Pattern — Regole di Montaggio

Questo file definisce **come** monti i video, non come si vedono (quello è `style-guide.md`). L'agente lo legge prima di scegliere i b-roll e tagliare la timeline.

---

## Letteralismo visivo

**Il b-roll mostra ciò che la voce dice.**

- Voce dice "café" → in scena un café (Pexels)
- Voce dice "spreadsheet" → screenshot di uno spreadsheet
- Voce dice "Andrea ha detto" → bolla chat con il nome "Andrea"
- Voce dice un numero (es. "30%") → il numero ANIMATO, non statico

Evita astrazioni quando la voce è concreta.

## Quando usare quale tipo di asset

| Voce dice... | Asset migliore | Fallback |
|--------------|----------------|----------|
| Tool/SaaS/sito | Screenshot reale o demo embed delle docs | Mockup CSS custom |
| Persona/azione | Stock Pexels | Video AI Seedance/Kling |
| Concetto astratto | Motion graphics testuale | Stock metaforico |
| Dato/statistica | Numero animato + screenshot fonte | Bar chart custom |
| Citazione | Card con nome + foto autore | Caption hero |

## Ritmo del montaggio

- **Cambio b-roll ogni 1.5-2.5 secondi**. Tagli netti, MAI fade.
- Se una frase è lunga (>3s) e ha più sostantivi, spezzala in 2 b-roll diversi.
- Se una frase è cortissima (<1s), tienila sul b-roll precedente.
- **Mai riusare lo stesso spezzone due volte**, nemmeno segmenti diversi dello stesso file. Una clip, una scena.
- **Transizioni sobrie**: tagli netti. Un'unica transizione marcata, se proprio la vuoi, prima della card finale. I veli scuri tra una scena e l'altra sono invasivi.

## Silenzi

- Soglia: tutto sotto **-35 dB per più di 0.35s** è silenzio.
- Tagli con `KEEP_BREATH = 0.20s` (lasci 200ms di respiro per non mozzare le parole).
- Mai tagliare **sotto i 200ms** o mozzi sillabe finali ("Arena.", "DM.").
- Coda finale: dopo l'ultima parola, lascia 0.5s di respiro prima del fade.

## Layout per tipo di contenuto

Definisci a priori quale layout usi per ogni "template" di video.

- **Tool reveal / educational**: Layout A (split) o C (fullscreen browser)
- **Selfie spontaneo / vlog**: Layout B (fullscreen blur)
- **Documentaristico / storytelling**: Layout A con b-roll archive + caption hero
- **Reazione / pov**: Layout A con webcam sotto

## Caption position — stabile globale

**La y della caption deve sembrare costante per >70% del video.**

- Decidi PRIMA del build se la dominante è **mid** (y=1050) o **low** (y=1380).
- Variazioni solo con senso narrativo (es. caption hero per nome cardine).

## Hook

- Primi 3s: **MAI testo da solo**. Sempre b-roll concreto.
- Il numero/dato lo dice la voce, gli occhi vedono il mondo.
- L'hook deve "spiegare l'argomento in immagini" anche se mutassi l'audio.

### Gerarchia delle fonti per l'hook

Dalla migliore alla peggiore:

1. **Generato su misura** per quella frase (video AI con la scena che ti serve davvero)
2. **Scena riconoscibile** presa da un film o da un meme, scaricata con `yt-dlp`. Costa zero ed è culturalmente riconoscibile: lo spettatore "capisce" prima ancora di leggere
3. **Stock cinematografico** scelto con cura
4. **Stock generico**: solo per b-roll interni, mai per l'hook

**Il colpo migliore è far cadere l'immagine sulla parola.** Se la voce dice "trucco" e nello stesso istante nell'inquadratura cade una maschera, hai fatto centro. Cerca sempre l'incastro tra la parola e ciò che accade a schermo.

### L'hook "camera che arretra" (camera-follow)

Un hook che funziona molto bene: le parole della prima frase compaiono a coppie e **restano ferme**, mentre è la "camera" che arretra a ogni coppia nuova, con un colpo di sfocatura. Il blocco di testo cresce e la camera lo insegue.

Le regole che lo fanno funzionare:
- **Solo nell'hook**, cioè la prima scena. Sul resto del video stanca.
- **Dentro una finestra**, non a tutto schermo: un riquadro largo quanto il video e alto circa 400px, appoggiato sul fondo della metà alta. Sopra deve restare spazio per il b-roll.
- **Parole a coppie** sui tempi veri della trascrizione ("sei andato", "a vedere"). Una parola alla volta è frenetico.
- **Regola anti-vuoto**: ogni parola nuova riempie un lato intero del blocco già scritto (a destra alta quanto il blocco, sotto larga quanto il blocco). Niente buchi.
- Camera in 0,24s con `expo.out`, sfocatura leggera (circa l'1% della larghezza): di più e i fotogrammi diventano illeggibili.
- In questa scena i sottotitoli normali si spengono: **il camera-follow è il sottotitolo**.

⚠️ **Il difetto che tutti incontrano:** se la camera parte insieme alla parola, nei primi fotogrammi il posto per lei non c'è ancora e la finestra la taglia sul bordo. Due correzioni: la **camera parte 0,08 secondi prima** della parola (con `expo.out` in 0,08s ha già fatto l'85% del movimento, e la sincronia col parlato non cambia perché a muoversi è la camera), e la **posa iniziale della camera** si scrive direttamente nell'HTML, non solo nella timeline, sennò al fotogramma 0 la prima parola esce dal quadro.

Il movimento viene dal catalogo pubblico di Hyperframes (componente `caption-camera-follow`): vedi più sotto "Dal catalogo si prende il movimento".

### Portare un 16:9 in verticale senza bande nere

La scena di un film è orizzontale, il tuo Reel è verticale. Non mettere le bande nere: metti la stessa immagine ingrandita e sfocata dietro, e quella nitida davanti al centro (tecnica *blur-fill*).

⚠️ **Se il film è in cinemascope** (quello molto largo, con le barre nere già impresse nel file), **prima taglia via le barre**, poi applica lo sfondo sfocato. Altrimenti stai sfocando del nero e ottieni una cornice grigia orribile.

## Documentazione reale, mai mockup finti

Regola: **ogni affermazione ha una fonte a schermo.** Se dici che un tool fa una cosa, quella cosa si deve vedere mentre succede.

Quattro modi concreti, in ordine di resa:

1. **Registra la schermata dell'interfaccia vera** mentre la usi (si automatizza con un browser headless: apri, clicca, registra)
2. **Screenshot dell'intera pagina dentro una finta finestra di browser in 3D che scorre davvero.** Non ritagliare la pagina sul titolo: sembra mozzata. La finestra entra ruotando, oscilla piano e la pagina scorre dall'alto verso il basso
3. **Un PDF renderizzato pagina per pagina** e usato come b-roll: perfetto per documenti, ricerche, report
4. **Loghi ufficiali** presi dagli archivi pubblici (Wikimedia Commons espone il file originale a risoluzione piena; le miniature spesso restituiscono file vuoti)

**Se il prodotto di cui parli ha una galleria pubblica di esempi, scarica gli originali dal sito** invece di fotografare la pagina: si legge la pagina, si raccolgono gli indirizzi delle immagini e si scaricano a risoluzione nativa. Niente ricampionamento, niente elementi di contorno.

E la regola che vale più di tutte: **mai footage di altri creator** per parlare di un prodotto. Usa il video dimostrativo ufficiale o le tue registrazioni.

## Un documento a schermo si deve poter leggere

Quando porti a schermo una pagina, un articolo o un documento come prova di quello che stai dicendo, il rischio è uno solo: che il testo sia troppo piccolo per essere letto sul telefono. E se non si legge, quella scena non prova niente.

Tre cose che risolvono, in ordine:

1. **Cattura la pagina con una finestra stretta**, intorno ai 500 pixel di larghezza. Il testo va a capo e resta grande. Con una finestra larga il testo, rimpicciolito dentro il riquadro della scena, scende sotto i 30 pixel ed è illeggibile.
2. **Stringi sul titolo**, non prendere il blocco intero: margini, colonne laterali e bottoni fanno sembrare l'articolo vuoto. Su un PDF è il caso peggiore, mezzo foglio bianco.
3. **Dopo aver montato la scena, guarda quel fotogramma e prova a leggerlo.** Non fidarti del fatto che nella cattura originale si leggesse bene. Su un episodio, tre documenti su quattro sono dovuti tornare indietro proprio qui.

Se una pagina non si lascia catturare (capita con i siti che bloccano gli strumenti automatici), cerca la stessa notizia su un'altra testata oppure passa dagli archivi pubblici del web.

## La pagina vera, lavorata (e non una volta sola)

Se il video parla di una pagina (un sito, un prodotto, una pagina di vendita), uno screenshot nell'hook non basta. **La pagina vera torna in più scene, e ogni volta è lavorata in modo diverso**: con dei segni numerati sopra gli elementi veri, allegata a una richiesta in una finta chat, come "dopo" in un prima/dopo.

Chi guarda riconosce la pagina, e ogni volta ne vede un pezzo nuovo. È la prova che rimane per tutto il video, non un cartello all'inizio.

## CTA finale

- Definisci un formato fisso (es. "money shot" verde acid + speaker piccolo)
- Mai variare di episodio in episodio — diventa il tuo trademark

## Girato vero e girato costruito non si montano allo stesso modo

Regola imparata sbagliando, e costata un montaggio intero buttato.

Le motion graphics sono nate sui video in cui chi parla è fermo davanti alla camera, spesso un avatar: lì il girato è statico e la grafica è quello che tiene sveglio lo spettatore.

Su un **girato vero**, ripreso da te, con la mano che si muove e la luce che cambia, le stesse grafiche sembrano appiccicate sopra e **abbassano** la qualità percepita. Su quel materiale: girato pieno, sottotitoli su tutto, e si sovrappone solo la cosa che stai citando davvero (lo screenshot dell'articolo di cui parli, il fotogramma del film che nomini). Niente musica: restano i suoni dell'ambiente in cui hai registrato.

Il verdetto su una bozza da 64 scene montata alla vecchia maniera su materiale girato dal vivo è stato "un lavoro gigantesco ma purtroppo inutile". Prima di iniziare, chiediti quale dei due materiali hai in mano.

## Lo speaker (chi parla in camera)

- **Apri sempre con lo speaker visibile.** Anche se una grafica a schermo intero sarebbe più d'impatto: se non si vede subito chi parla, lo spettatore non si aggancia a nessuno.
- **Deve tornare almeno una volta a metà video**, possibilmente su una frase rivolta direttamente a chi guarda.
- **Non fare tutto split.** Alterna: due o tre momenti a schermo intero sui picchi (il numero chiave, il concetto centrale, la frase finale).
- **Micro-zoom sui momenti forti**: quando pronuncia la parola chiave, un ritocco di scala da 1 a 1,07 in un decimo di secondo, con ritorno lento. Regole: mai nei primi 0,3s né negli ultimi 0,65s di una scena (il render strappa le trasformazioni a cavallo dei tagli), almeno 0,8s tra un colpo e l'altro. E se centri l'elemento, fallo con GSAP e non nel CSS, o il colpo lo fa saltare.
- Nelle scene di zoom a figura intera il movimento dev'essere **visibile**: da 1,03 a 1,20, non da 1,00 a 1,06 che non si nota.

## Motion graphics che si leggono

- **Costruite, non ferme.** Un numero da solo è un cartello. Un numero che si costruisce mentre una barra si riempie sotto è una grafica.
- **Contrasto prima di tutto.** Una grafica dello stesso tono del fondo sparisce. La regola cambia a seconda che il tuo fondo sia scuro o chiaro: su fondo scuro elementi chiari e brillanti, su fondo chiaro inchiostro scuro e colori saturi. Se cambi fondo, il contrasto si rovescia: vedi `references/style-guide.md`, "Fondo chiaro o fondo scuro".
- **Etichette e targhette dentro le card, mai appese fuori.** Una targhetta appesa sotto il bordo cade dritta sulla riga della caption. Se non entra dentro la card, di solito significa che non serve.
- **Le scritte grandi vogliono un'ombra profonda, non un bordo.** Il contorno le fa sembrare adesivi.
- **Elementi grandi**: stai progettando per uno schermo di telefono guardato a mezzo metro. Loghi in riquadri da almeno 170px, numeri da 150px in su.
- **Poco testo**: due o tre scritte forti in tutto il video. Il resto lo dicono le immagini e le caption.
- **Niente etichette sopra i b-roll.** Le clip e i sottotitoli bastano.

## Density

Ogni scena deve avere:
1. **Entry animation** (cosa entra in scena)
2. **Idle motion** (cosa respira durante)
3. **B-roll change** (se la scena dura >2s)
4. **8-10 elementi animati** in totale

Mai uno stamp statico fullscreen morto.

Densità non vuol dire tutto che si muove insieme: vuol dire che qualcosa cambia sempre, con il giusto ritmo. Come si fa bene sta in `references/qualita-del-movimento.md`.

## ⛔ Le grafiche non coprono mai un volto

Regola senza eccezioni. Vale per il volto di chi parla, per i volti nel b-roll, e anche per i volti **sfocati sullo sfondo** di una clip. Un volto coperto da una scritta dà fastidio anche a chi non sa dire perché.

Come si controlla a mano, ed è l'unico modo che funziona davvero: guarda il fotogramma del **b-roll pulito**, prima del montaggio, nell'istante in cui sopra ci va la grafica. Nel fotogramma montato non lo vedi: il volto coperto non si vede più, appunto. Se c'è un volto, la grafica va dall'altra parte del quadro, oppure si cambia l'istante della clip.

## Dal catalogo si prende il MOVIMENTO, non l'aspetto

Hyperframes ha un catalogo pubblico di componenti già pronti: [hyperframes.heygen.com/catalog](https://hyperframes.heygen.com/catalog). Sono una miniera, ma hanno i loro colori e i loro font. Montati così come sono, il tuo video sembra il catalogo.

Il metodo: **prendi i tempi, le curve e il meccanismo, e rifai il pezzo nel tuo stile.** Il tuo agente lo sa fare: gli dai il nome del componente e la tua style-guide.

I pezzi che abbiamo rifatto e che usiamo davvero:

| Dal catalogo | Cosa ci fai |
|---|---|
| `caption-camera-follow` | l'hook con la camera che arretra (sopra, nella sezione Hook) |
| `caption-glitch-rgb` | sottotitoli che entrano con uno sdoppiamento colorato. **A scalare**: pieno nei primi 8 secondi, poi cala e a 26 secondi è sparito, si torna all'entrata normale. Per tutto il video stanca |
| `mk-specs-list` | una **rotaia** numerata per gli elenchi in più scene: cerchi da 1 a 5, quello attivo colorato, il titolo che entra con la sottolineatura che spazza |
| `number-pop-in` | un numero che sale **carattere per carattere** (ogni cifra sale un po', da leggermente piccola e sfocata, una dopo l'altra) |
| `claude-exchange` | uno **scambio in stile chat** con un assistente AI: il prompt che si scrive a blocchi, le risposte numerate che arrivano una alla volta |
| `grade-split-reveal` | un **prima/dopo** sulla stessa immagine: un bordo colorato spazza, si ferma a metà, poi chiude sul "dopo" |

## Aggiunte opzionali (da usare quando servono, mai di default)

Funzionano, ma **non sostituiscono niente**: si aggiungono, sui momenti giusti.

- **Lo speaker in un cerchio.** Su 2-3 scene a grafica piena, chi parla sta in un cerchio di circa 270px in un angolo in alto, con un anello colorato attorno. Il ritaglio è largo, testa e spalle. Solo lì: il resto delle regole sullo speaker vale sempre.
- **Tre ingressi forti** per i momenti di punta: SLAM (entra grande, storto e sfocato e si mette a posto), FLIP (piccola, inclinata, si ribalta in prospettiva), DROP (cade dall'alto e si assesta). ⚠️ Durata 0,3-0,45 secondi: più corti di così **scattano**, li abbiamo provati a 0,14 e si vedeva.
- **I font e il gradiente del tuo sito** dentro le grafiche (titoli, numeri, accenti), se ce l'hai. Così il video e la tua pagina si riconoscono come la stessa cosa. Sottotitoli e fondo restano quelli di sempre.
- **Loghi veri** delle aziende che nomini, su pillole bianche. Si prendono dagli archivi pubblici (Wikimedia Commons, il file originale).

## Il passo avanti: la grafica che passa DIETRO chi parla

Questa è la cosa che separa un montaggio "fatto bene" da uno che sembra prodotto in uno studio, e non è quella che pensi.

Non è la rifinitura del movimento. Abbiamo provato ad aggiungere la scia sugli oggetti in movimento (l'effetto che in After Effects è acceso di default) e il verdetto è stato che su un telefono, mentre si scrolla, non si nota.

La differenza vera è un'altra: nei montaggi di studio **la grafica e la persona stanno nello stesso spazio**, mentre di solito la grafica è un adesivo appiccicato davanti. Una scritta che entra da sinistra, sparisce dietro la sua spalla e riesce dall'altra parte cambia la percezione in un secondo.

Come si ottiene, in breve: si ritaglia la sagoma di chi parla dal girato che hai già (niente sfondo verde, serve un modello che ritagli il **video**, non le singole foto, altrimenti i bordi tremolano), poi si disegnano gli elementi grafici in una passata separata e si spegne la grafica dove c'è la persona. Le passate escono dallo stesso motore con le stesse animazioni, quindi combaciano al pixel.

È un capitolo avanzato: mettici in conto un'oretta per installare il modello di ritaglio. Due avvertenze che costano ore, se non le sai:

- I tag `<video>` **non obbediscono al CSS**: nasconderli non basta, il motore li compone per conto suo. Per una passata senza girato vanno **cancellati** dal codice.
- Per esportare con lo sfondo trasparente serve un formato che la trasparenza la conservi: il WebM te la butta via.

## Coerenza tra video

- Stesso ordine di apparizione di logo/wordmark
- Stesso intro/outro (se ce l'hai)
- Stessa "voce visiva": se il primo episodio è cinematico, anche il decimo lo è
- Stesso colore della keyword highlight in tutti i video
