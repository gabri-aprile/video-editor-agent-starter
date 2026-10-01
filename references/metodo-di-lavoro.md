# Il metodo di lavoro

> Questa non è la parte tecnica. È l'ordine in cui si fanno le cose.
> Cambia più cose nella qualità dei tuoi video di qualunque trucco di montaggio.

---

## La regola madre: non si monta senza timeline approvata

Prima di aprire qualsiasi editor, prima di scaricare un solo b-roll, scrivi la **timeline** e falla approvare (da te stesso il giorno dopo, dal cliente, da chi decide).

La timeline è una lista di scene, una riga per scena:

```
0:00–0:03  🎬 HOOK      fullscreen   🎥 scena del film, lo strappo cade su "trucco"
0:03–0:07  🗣  SPLIT     parlante     📷 screenshot della homepage
0:07–0:12  📊 FULLSCREEN grafica      🎨 numero che si costruisce + timeline che si riempie
```

Per ogni riga: **quando**, **che layout**, **che tipo di asset**, **cosa si vede**. Se non riesci a scrivere in una riga cosa aggiunge il visual rispetto a quello che dice la voce, quel b-roll non serve: toglilo.

Approvare una lista costa cinque minuti. Rifare un montaggio ne costa tre ore.

---

## La sequenza completa

1. **Timeline scritta** → approvata
2. **Bozza leggera** a bassa risoluzione (540×960) → si guarda in un minuto, pesa pochi mega, si manda su qualsiasi chat
3. **Storyboard numerato**: una griglia di fotogrammi, uno per scena, con il numero sopra. Serve a dare feedback preciso ("scena 7") invece che vago ("verso metà"). Chiedi al tuo agente di costruirti due strumenti che userai ogni giorno: uno che ti fa vedere **una singola scena senza renderizzare** (apre la composizione a quell'istante e fotografa lo schermo, un secondo invece di dieci minuti) e uno che monta la griglia numerata. Sono le due cose che accorciano di più il giro delle correzioni
4. **Giro di critica dell'agente**, prima che la bozza arrivi a te: fotogrammi fermi, strisce fotogramma per fotogramma su ogni transizione (`scripts/strisce.mjs`), misura dei secondi fermi (`scripts/fermi.mjs`). L'agente ti scrive quanti difetti ha trovato e cosa resta fermo. Come si fa: `references/qualita-del-movimento.md`, sezione 4
5. **Note e correzioni**, una alla volta
6. **Solo adesso** il render pieno a 1080×1920

Saltare il punto 2 per "andare più veloce" è il classico modo di metterci il doppio. Saltare il punto 4 vuol dire fare tu, a occhio, il lavoro che una striscia di fotogrammi fa in un secondo.

---

## Un evento visivo ogni due secondi

Prendi il video finito e scorrilo. Se in una qualsiasi finestra di due secondi non succede niente di nuovo (nessun taglio, nessun elemento che entra, nessun numero che cambia, nessun movimento di camera), lì stai perdendo spettatori.

Non significa animazioni continue e caotiche. Significa che **qualcosa cambia**, con calma, in continuazione.

E vale anche il contrario, che è l'errore più facile da fare quando prendi gusto: **le scene troppo corte tolgono aria al video**. Ventidue scene in quarantatré secondi vuol dire meno di due secondi ciascuna, e chi guarda non fa in tempo a leggere niente. Se ti accorgi che stai sotto i due secondi di media, non stai facendo un montaggio ritmato: stai facendo una raffica.

---

## Quando cloni un progetto, clona anche le correzioni

Prima o poi farai così: per l'episodio nuovo copi la cartella del precedente e cambi i contenuti. Funziona, ma c'è una trappola.

Se una correzione l'hai fatta **solo** nell'episodio 12, e l'episodio 15 lo cloni dal 10, la correzione è sparita, e un difetto che avevi già risolto torna fuori. Non è un difetto nuovo: è una toppa persa per strada.

Due abitudini:
- tieni **un solo progetto di partenza** (il tuo template) e le correzioni che valgono per tutti scrivile **lì**, non solo nell'episodio in cui le hai trovate;
- quando un difetto già risolto ricompare, prima di rifare la diagnosi chiedi all'agente di controllare se la correzione c'è ancora nel file.

E una cosa che si clona di sicuro senza volerlo: i **tempi**. Un'animazione copiata da un altro episodio arriva sulla parola di quell'altro episodio. Vedi `references/difetti-noti.md`, il ritardo ereditato.

---

## Mai riusare lo stesso spezzone due volte

Una clip, una scena. Nemmeno due segmenti diversi dello stesso file. Lo spettatore riconosce l'immagine ripetuta anche senza rendersene conto, e il video sa di riempitivo.

Conseguenza pratica: quando raccogli il materiale, procurane **più del necessario**. Se hai otto scene da coprire, scarica dodici clip.

---

## Dai feedback come si deve

Al tuo agente, e a chiunque altro monti per te.

| ❌ Non funziona | ✅ Funziona |
|---|---|
| "non mi piace" | "nella scena 3 la caption copre la faccia" |
| "fallo meglio" | "alla parola *Notion* voglio uno screenshot della loro homepage, non uno stock generico" |
| "è lento" | "le scene 5 e 6 durano 4 secondi ciascuna, spezzale" |

Un feedback alla volta. Dopo ogni correzione, riguarda l'anteprima prima di chiedere la successiva: spesso la seconda nota si risolve da sola.

---

## Costruisci la memoria dell'agente

Ogni volta che una correzione è una **regola permanente** e non un caso isolato, dillo: "ricorda questo". Finisce nella memoria dell'agente e non lo ripeterà.

Dopo dieci episodi hai venti o trenta regole. Dopo venti episodi hai un montatore che lavora come te. È l'unico vero vantaggio composto di questo sistema: non stai facendo video, stai addestrando uno strumento.

---

## Aspettative oneste

- I primi cinque video saranno brutti. Dal sesto diventano interessanti.
- Il primo episodio ti porta via mezza giornata. Il decimo, quaranta minuti.
- Non è "l'AI che fa i video". È un montatore veloce, instancabile e senza gusto: **il gusto lo metti tu**, una regola alla volta.
