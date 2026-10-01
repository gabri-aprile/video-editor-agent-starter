# Cosa è cambiato

Il registro degli aggiornamenti del kit. Ogni versione dice **cosa è cambiato**, **perché ti conviene** e **cosa devi fare tu**.

---

## v0.4.0 — 1 ottobre 2026

Sei settimane, più di cento episodi montati. Stavolta la novità grossa non è una regola in più: è **un modo diverso di muovere le cose**. Abbiamo preso il video di uno studio di motion design, l'abbiamo smontato fotogramma per fotogramma e abbiamo scoperto che usava la nostra stessa tecnologia. Cambiava il metodo. E il metodo adesso è nel kit.

### ⭐ La qualità del movimento (il metodo Autostep)

**Cosa:** un file nuovo, `references/qualita-del-movimento.md`, e due strumenti già funzionanti in `scripts/`: `strisce.mjs` e `fermi.mjs`.

**Perché ti conviene:** è la differenza fra un montaggio che sembra fatto con l'AI e uno che sembra uscito da uno studio. Dentro ci sono tre curve pronte da incollare (una per gli ingressi, una per le cose che arrivano con un peso, una per quelle che entrano in sede con un clic) al posto del rimbalzino che usano tutti, sei regole di regia, e il giro di critica che il tuo agente fa prima di mandarti la bozza. I due strumenti fanno quello che a occhio non riesci a fare: uno ti mette 24 fotogrammi consecutivi di ogni transizione in una striscia, l'altro ti dice quanti secondi del video sono fermi. Sul nostro episodio di prova la striscia ha trovato sei difetti che nei fotogrammi fermi non c'erano.

**Cosa devi fare:** copia le tre curve in cima alla tua composizione (il codice è nel file, sezione 1). Poi di' al tuo agente: *«da ora prima di ogni bozza fai il giro di critica di qualita-del-movimento.md e scrivimi quanti difetti hai trovato»*. Gli strumenti vogliono solo ffmpeg, che hai già.

### 🎨 Fondo chiaro o fondo scuro: il contrasto si rovescia

**Cosa:** sezione nuova in `references/style-guide.md`.

**Perché ti conviene:** noi siamo passati da un fondo viola scuro a uno chiaro con una griglia che scorre lenta, e il video ha preso un'aria più da rivista. Ma il giorno che cambi fondo, tutto quello che avevi tarato per il contrasto va letto al contrario: dove serviva bianco ora serve inchiostro scuro. Nella sezione c'è la tabella di conversione, più due cose imparate: le card scure su fondo chiaro restano scure e funzionano, e nelle scene divise conviene alternare.

**Cosa devi fare:** niente, se il tuo fondo ti piace. Se lo cambi, rileggi la tabella prima del primo episodio.

### 🧩 Sei pezzi presi dal catalogo di Hyperframes, rifatti nel nostro stile

**Cosa:** sezioni nuove in `references/editing-pattern.md`: l'hook con la camera che arretra, i sottotitoli con lo sdoppiamento colorato che si spegne piano, la rotaia per gli elenchi, il numero che sale cifra per cifra, lo scambio in stile chat, il prima/dopo col bordo che spazza.

**Perché ti conviene:** il catalogo pubblico di Hyperframes è pieno di componenti pronti, ma montati così come sono il tuo video sembra il catalogo. La regola che ci ha cambiato il lavoro: **dal catalogo si prende il movimento, non l'aspetto**. Per l'hook c'è anche il difetto che tutti incontrano (la parola che entra tagliata dal bordo) con la correzione.

**Cosa devi fare:** scegline uno e chiedi al tuo agente di rifarlo con la tua style-guide. Ti consiglio di partire dall'hook.

### ➕ Aggiunte opzionali

**Cosa:** in fondo a `references/editing-pattern.md`, più un Layout E nella style-guide: lo speaker in un cerchio su 2-3 scene, tre ingressi forti per i momenti di punta, i font del tuo sito dentro le grafiche, i loghi veri delle aziende che nomini.

**Perché ti conviene:** danno varietà senza toccare quello che già funziona. Non sostituiscono niente.

**Cosa devi fare:** niente di obbligatorio. Usale quando un momento lo merita, mai come default.

### ⛔ Le grafiche non coprono mai un volto

**Cosa:** regola nuova in `references/editing-pattern.md` e nel `CLAUDE.md` del kit.

**Perché ti conviene:** una scritta sopra un volto dà fastidio anche a chi non sa dire perché, e vale anche per i volti sfocati sullo sfondo di una clip. Il trucco per controllarlo: si guarda il fotogramma del b-roll **pulito**, perché in quello montato il volto coperto non si vede più.

**Cosa devi fare:** aggiungi la regola alle note che dai al tuo agente. È già nel `CLAUDE.md` nuovo.

### 🩹 Sei difetti che passano tutti i controlli

**Cosa:** `references/difetti-noti.md` passa da tredici a diciannove voci, più tre righe nuove nella checklist.

**Perché ti conviene:** sono i difetti più cari, quelli che trova chi guarda e non chi controlla. Il video finale che esce senza effetti sonori (il passaggio finale prende il file sbagliato, e la data non ti salva). Il colpo che arriva un secondo prima della parola perché l'hai copiato da un altro episodio. La musica che finisce a metà su un video lungo. Il lampo su un confine, dove la domanda giusta è guardare tutti gli altri confini. Due pezzi della stessa grafica che si pestano. I lampi bianchi a inizio scena. In più, in `references/metodo-di-lavoro.md`: quando cloni un progetto, cloni anche le correzioni, oppure le perdi.

**Cosa devi fare:** leggi le voci dalla 14 alla 19 prima della prossima consegna. Se lavori clonando l'episodio precedente, la sezione del metodo di lavoro è per te.

---

### Come aggiornare se hai già la 0.3

Non buttare il tuo progetto. Scarica lo ZIP nuovo, scompattalo in una cartella a parte, aprila in Claude Code e scrivi: *«porta nel mio progetto in <percorso> le novità della 0.4.0 descritte nel CHANGELOG, senza toccare la mia style-guide, il mio brand-kit e la mia memoria»*. I file da portare sono: `references/qualita-del-movimento.md` (nuovo), `scripts/strisce.mjs` e `scripts/fermi.mjs` (nuovi), e le parti nuove di `editing-pattern.md`, `style-guide.md`, `gsap-regole.md`, `difetti-noti.md`, `metodo-di-lavoro.md` e `CLAUDE.md`.

---

## v0.3.0 — 19 agosto 2026

Un mese di episodi montati, e stavolta la novità più utile non è una tecnica nuova: è **una regola vecchia che era sbagliata**. Se hai la versione 0.2, la prima sezione qui sotto vale da sola l'aggiornamento.

### 🩹 Il colore slavato: avevamo detto la cosa sbagliata

**Cosa:** riscritta la sezione sull'HDR in `references/difetti-noti.md`.

**Perché ti conviene:** basta **una** clip scaricata dai siti di stock girata in HDR per far uscire spento tutto il video, faccia compresa. Fin qui lo sapevamo. Quello che non sapevamo è che i due rimedi che consigliavamo non funzionano: ri-etichettare il file senza riconvertirlo non cambia niente, e l'opzione SDR del render *provoca* la conversione invece di evitarla. L'unico posto giusto dove intervenire è la singola clip, prima che entri nel montaggio. Misurato su un episodio: la pelle perdeva il 32% di saturazione.

**Cosa devi fare:** prendi il comando di conversione dalla sezione 5 di `difetti-noti.md` e falla fare al tuo agente dentro lo script che scarica le clip, come controllo automatico. E se avevi messo un filtro di saturazione sul parlante per compensare, toglilo: era un cerotto sopra questo.

### 🆕 Tre difetti nuovi nella lista (e uno che si vede solo se lo misuri)

**Cosa:** `references/difetti-noti.md` passa da dieci a tredici voci.

**Perché ti conviene:** sono il video che parte nero per due secondi (colpa del peso della composizione, non del file video: ricomprimere il girato non serve a niente), il fotogramma nero sul confine tra una scena a schermo intero e una divisa, e il velo di chiusura che diventa un lampo quando la scena dopo è chiara. In più, nella checklist finale, la caccia ai fotogrammi-lampo: si trovano solo facendo misurare la luminosità di ogni fotogramma, a occhio non si vedono.

**Cosa devi fare:** rileggi la lista prima della prossima consegna. Il difetto del confine, se ce l'hai, ce l'hai su tutti gli episodi.

### 🔊 Il limitatore prima della normalizzazione

**Cosa:** sezione nuova in `references/audio.md`, più una regola sulla musica.

**Perché ti conviene:** con la musica densa la normalizzazione da sola non basta e i colpi improvvisi mandano il file sopra lo zero, cioè in distorsione. In cuffia non sempre si sente, sui telefoni sì. La catena giusta è doppia, ed è scritta lì. L'altra regola: le intro dei brani stanno spesso molto sotto il corpo del pezzo, quindi tagliare i primi trenta secondi ti fa partire il video quasi muto proprio nell'apertura.

**Cosa devi fare:** copia la catena del limitatore nel tuo script di post-produzione, prima della normalizzazione.

### 🎬 Girato vero e girato costruito non si montano allo stesso modo

**Cosa:** sezione nuova in `references/editing-pattern.md`.

**Perché ti conviene:** è la lezione più costosa del mese. Le motion graphics sono nate sui video in cui chi parla è fermo davanti alla camera. Sul girato ripreso dal vivo le stesse grafiche sembrano appiccicate e abbassano la qualità percepita: lì servono girato pieno, sottotitoli su tutto, e sopra solo la cosa che stai davvero citando. Un montaggio da 64 scene è finito nel cestino per aver ignorato questa differenza.

**Cosa devi fare:** prima di iniziare un episodio, chiediti quale dei due materiali hai in mano.

### 📄 I documenti a schermo si devono poter leggere

**Cosa:** sezione nuova in `references/editing-pattern.md`.

**Perché ti conviene:** se porti a schermo un articolo come prova di quello che dici e il testo non si legge sul telefono, quella scena non prova niente. Il modo giusto di catturare una pagina è con una finestra **stretta**, non larga: il testo va a capo e resta grande. Su un episodio, tre documenti su quattro sono dovuti tornare indietro per questo.

**Cosa devi fare:** dopo aver montato una scena-documento, guarda quel fotogramma e prova a leggerlo davvero.

### ⏱️ Il respiro fra le scene, e due strumenti che accorciano il giro

**Cosa:** aggiunte in `references/metodo-di-lavoro.md`.

**Perché ti conviene:** "un evento visivo ogni due secondi" vale anche al contrario. Ventidue scene in quarantatré secondi non è ritmo, è una raffica: chi guarda non fa in tempo a leggere. E poi i due strumenti che ti conviene farti costruire subito dall'agente: l'anteprima di **una singola scena senza renderizzare** (un secondo invece di dieci minuti) e la griglia numerata dei fotogrammi per dare le note.

**Cosa devi fare:** se stai sotto i due secondi di media per scena, accorcia il copione invece di aggiungere scene.

### 📐 I ritagli del girato si ricalibrano

**Cosa:** sezione nuova in `references/preparazione-girato.md`.

**Perché ti conviene:** i valori dei ritagli valgono per quella posizione davanti alla camera. Cambi posto o obiettivo, e nella scena divisa ti ritrovi mezzo fuori dal quadro. Il ritaglio si calcola a partire dal **viso**, misurato su più istanti, non dal centro dell'immagine.

**Cosa devi fare:** rifai i valori il giorno che cambi setup.

### 🚀 Il capitolo avanzato: la grafica che passa dietro di te

**Cosa:** sezione nuova in fondo a `references/editing-pattern.md`.

**Perché ti conviene:** è la cosa che fa sembrare un montaggio uscito da uno studio, e non è quella che pensi. Abbiamo provato la scia sugli oggetti in movimento (in After Effects è accesa di default) e il verdetto è stato che su un telefono non si nota. La differenza vera è che in quei montaggi la grafica e la persona stanno nello stesso spazio: una scritta che sparisce dietro la tua spalla e riesce dall'altra parte. Nella sezione c'è come si fa e le due trappole che costano ore.

**Cosa devi fare:** niente, finché non ti senti a tuo agio col resto. È un capitolo da leggere quando il montaggio base ti viene naturale. E mettici in conto un'oretta di installazione.

---

## v0.2.0 — 21 luglio 2026

Due mesi di episodi montati davvero, e il motore è cambiato parecchio. Questa versione porta dentro al kit le regole che nel frattempo sono diventate obbligatorie: quelle che, quando mancano, ti fanno perdere il weekend a capire perché un'animazione lampeggia.

**In breve:** cinque nuovi file di regole nella cartella `references/`, le regole vecchie aggiornate, una correzione importante sul framerate.

### 🆕 Le regole GSAP (il file che ti salva il primo weekend)

**Cosa:** `references/gsap-regole.md`, nuovo. Le sei regole non negoziabili per animare dentro Hyperframes, spiegate col perché.

**Perché ti conviene:** sono la causa numero uno delle animazioni che lampeggiano, saltano o si congelano. Il motore non registra lo schermo: salta da un istante all'altro, quindi tutto ciò che presume un tempo che scorre da solo (animazioni CSS, numeri casuali, cicli infiniti) non funziona. Se non lo sai, passi ore a cercare un bug che non c'è.

**Cosa devi fare:** niente, se non copiare il file. Ma leggilo prima del prossimo render, sono cinque minuti. E c'è in fondo un "test dei 10 secondi" da usare ogni volta che qualcosa sembra rotto.

### 🆕 Caption parola per parola, versione 3

**Cosa:** `references/caption-parola-per-parola.md`, nuovo.

**Perché ti conviene:** i sottotitoli sono la parte del video che lo spettatore guarda per il 90% del tempo. Le tre cose che cambiano di più:
- la **punteggiatura si prende dal copione**, non dalla trascrizione (le trascrizioni saltano le virgole e sbagliano i due punti)
- **una sola keyword per frase**, con due colori dai significati diversi: uno per la tensione, uno riservato alla CTA finale. E il colore della CTA si accende solo nella seconda metà, altrimenti se la parola ricorre prima ti colori mezzo reel
- **fasce di posizione fisse** (872 in split, 1150 in fullscreen) invece di posizioni decise scena per scena

**Cosa devi fare:** se hai già scritto le tue regole caption, confrontale con quelle nuove e aggiorna i valori delle fasce.

### 🆕 La tela 3D con la camera che vola

**Cosa:** `references/tecnica-tela-3d.md`, nuovo, più un Layout D nella style guide.

**Perché ti conviene:** è la novità che si vede di più. Invece di card che entrano ed escono una per volta, disponi tutte le grafiche su **una sola grande tela** e ci fai volare sopra la camera, che mette a fuoco una stazione alla volta. Chi parla resta in un riquadro fisso in basso per tutta la sequenza, e ogni tanto un video vero a schermo pieno interrompe la tela senza fermare il volo.

È la differenza tra un reel che sembra un template e uno che sembra prodotto.

**Cosa devi fare:** provala sul prossimo video che ha tre o più grafiche di fila. Non ha senso su un video di due scene.

### 🆕 Cosa fare al girato prima di montarlo

**Cosa:** `references/preparazione-girato.md`, nuovo.

**Perché ti conviene:** quattro problemi che sembrano problemi di montaggio e invece nascono prima:
- **chi parla si congela** nelle scene split → serve un re-encode con fotogrammi chiave più fitti
- **i silenzi lunghi** vanno tagliati, ma con un respiro di due decimi e tagliando audio e video insieme, o rompi il sincrono delle labbra. E il silenzio finale non si tocca: regge la card di chiusura
- **se hai girato in orizzontale** servono due ritagli distinti, uno per la fascia dello split e uno per lo schermo intero. Con un ritaglio solo, uno dei due esce sgranato
- **il riquadro con la faccia** vuole una sua sorgente dedicata, altrimenti il volto risulta gigante

**Cosa devi fare:** questa è la parte più pratica dell'aggiornamento. Applicala già al prossimo girato.

### 🆕 Audio e difetti noti

**Cosa:** `references/audio.md` e `references/difetti-noti.md`, nuovi.

**Perché ti conviene:** l'audio in tre regole (musica amplificata alla sorgente e poi abbassata, effetti sonori sugli **eventi delle grafiche** e non sui cambi scena, normalizzazione finale in due passate). E la lista dei dieci modi in cui un render "riuscito" esce comunque rotto: primo fotogramma nero, ultimo fotogramma nero, scene che si accumulano, colore slavato per colpa di una clip HDR. Ognuno di questi è costato un pomeriggio a qualcuno.

**Cosa devi fare:** usa la checklist finale di `difetti-noti.md` prima di ogni pubblicazione.

### 🆕 Il metodo di lavoro

**Cosa:** `references/metodo-di-lavoro.md`, nuovo.

**Perché ti conviene:** è la parte che vale di più e non è tecnica. **Timeline scritta e approvata prima di montare** → bozza leggera a 540p con storyboard numerato → note → solo allora il render pieno. Più la regola dell'evento visivo ogni due secondi e quella del b-roll mai riusato.

Approvare una lista costa cinque minuti, rifare un montaggio ne costa tre ore.

### ✏️ Regole aggiornate

- **`editing-pattern.md`**: nuove sezioni su hook (con la gerarchia delle fonti e il blur-fill per portare un 16:9 in verticale), speaker (apertura sempre con chi parla, ritorno a metà video, micro-zoom sui momenti forti), motion graphics leggibili, documentazione reale al posto dei mockup finti.
- **`style-guide.md`**: fasce caption aggiornate, Layout D, safe zone più precise, e l'idle motion senza cicli infiniti.
- **`CLAUDE.md`**: il tuo agente ora ha l'elenco completo delle reference e cinque regole di lavoro non negoziabili.

### ⚠️ Correzione importante: il framerate

Nella v0.1 il kit diceva 25 fps. **È sbagliato:** Hyperframes accetta 24, 30 o 60. A 25 il render si comporta in modo imprevedibile.

**Cosa devi fare:** se hai impostato 25 fps da qualche parte nel tuo progetto, portalo a **30**. Corretto ovunque nel kit.

---

### Come aggiornare il tuo progetto

Se hai già un progetto avviato con la v0.1, **non ricominciare da capo**. Fai così:

1. Scarica il kit nuovo in una cartella a parte
2. **Copia** dal kit nuovo alla tua cartella: tutta la cartella `references/` (tranne `style-guide.md` e `editing-pattern.md` se li hai personalizzati) e il file `CHANGELOG.md`
3. Se hai personalizzato style guide ed editing pattern, apri i file nuovi **accanto** ai tuoi e riporta a mano le parti che ti interessano
4. Nel tuo `CLAUDE.md` aggiungi l'obbligo di leggere `references/gsap-regole.md` prima di ogni render
5. Cerca `25` nelle tue impostazioni di framerate e portalo a 30

Se non hai voglia di farlo a mano: apri il kit nuovo in Claude Code e scrivi *"confronta questa cartella con il mio progetto in `<percorso>` e portami dentro le novità senza toccare le mie personalizzazioni"*. È esattamente il tipo di lavoro che fa bene.

Le tue chiavi API, il tuo brand kit, la tua memoria e i tuoi video **non si toccano**: restano dove sono.

---

## v0.1.0 — 13 maggio 2026

Prima versione dello starter kit: `CLAUDE.md` dell'agente, `references/` (style guide, editing pattern, pipeline, provider API), gli script della pipeline da 01 a 05, il `brand-kit/`, due skill (`/nuovo-episodio` e `/render-finale`) e la guida `README.md` in 21 capitoli.
