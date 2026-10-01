# Caption parola per parola

> Come si costruiscono i sottotitoli che compaiono sillaba per sillaba sotto il parlato.
> È la parte del video che lo spettatore guarda per il 90% del tempo: se sbagli qui, non ti salva nessuna grafica.

---

## Il principio: verbatim dall'audio, punteggiatura dal copione

La trascrizione word-level ti dà, per ogni parola, l'istante di inizio e di fine. Quello è il **tempo**: preciso, non toccarlo.

La punteggiatura invece **non** prenderla dalla trascrizione. I motori di trascrizione saltano le virgole, mettono un punto dove ci vorrebbero i due punti, non riconoscono i virgolettati. Prendi la punteggiatura dal **copione che hai scritto tu** e riallineala parola per parola.

In pratica:
- tempi → dalla trascrizione
- testo e punteggiatura → dal copione
- le due liste si allineano confrontando le parole, non i caratteri

Correggi sempre a mano i nomi propri che la trascrizione sbaglia (i nomi di prodotto e di marca sono i primi a saltare). Un brand scritto male nelle caption è la cosa che i tuoi spettatori notano per prima.

---

## Una keyword per frase, due colori

Per ogni frase evidenzia **una sola** parola con un colore d'accento. Non due, non tre: una. Se evidenzi tutto, non hai evidenziato niente.

Usa **due colori con due significati diversi e mai intercambiabili**:

| Colore | Quando | Esempi di parole |
|---|---|---|
| **Accent 1** (definito nel tuo brand kit) | tensione, brand, parola-shock, soggetto chiave | il nome del tool, "assurda", "curriculum" |
| **Accent 2** | solo la soluzione e la CTA finale | "gratis", "in DM", "te lo mando" |

Il secondo colore vale meno se lo usi tre volte: tienilo per il finale.

**Attenzione alla parola che ricorre.** Se la parola della CTA compare anche prima nel copione (capita spesso: "slide", "sistema", "video"), il colore della CTA si accende a metà reel e perde tutto l'effetto. Soluzione: accendi il secondo colore solo **dopo un certo istante** del video, non ogni volta che la parola compare.

Se la parola evidenziata è il tema del pezzo, mettila **all'inizio** della riga: si legge subito.

---

## Come si spezzano le righe

- **Massimo ~26 caratteri per riga** nel corpo del video. Oltre vai a tre righe e diventa un muro.
- **Per la frase-hook usa un limite più largo (~36)**: così l'hook sta su due righe piene, una di lancio e una di colpo. È più cinematografico.
- Quando non c'è una keyword da mettere in evidenza, spezza in due parti bilanciate (metà e metà), non a caso.
- **Mai spezzare aggettivo e sostantivo**, e mai separare un nome composto.
- **Unisci i frammenti orfani.** Le trascrizioni producono spesso pezzetti come `'è` o `.2`: se non li riattacchi alla parola giusta, ti ritrovi un apostrofo da solo a capo.

---

## Posizione: decidi una fascia e tienila

La caption deve sembrare ferma nello stesso punto per più del 70% del video. Tre fasce stabili, sceglile in base al layout della scena:

| Layout della scena | Fascia caption | Perché |
|---|---|---|
| **Split** (b-roll sopra, parlante sotto) | ~y **872** | sta sopra la testa del parlante, dentro la zona centrale sicura |
| **Fullscreen** | ~y **1150** | vicino alla grafica ma staccata, sopra la zona dei bottoni |
| Fullscreen con grafica che scende in basso | ~y **1272** | l'unica variazione ammessa, e solo se la grafica lo impone |

Sopra 280px c'è il nome utente dell'app, sotto 1600px ci sono i like e la descrizione: lì la caption non si legge. Verifica sempre con una banda colorata di prova che nessun elemento grafico tocchi la fascia della caption.

---

## Dettagli che si notano solo quando mancano

- **Pausa a fine frase**: dopo `.` `!` `?` lascia ~180ms in più prima della caption successiva. Dà respiro.
- **Clamp a fine scena**: l'ultima riga di una scena non deve scavallare nella scena dopo. Tronca la sua durata al confine.
- **Niente box dietro**, solo ombra su tre livelli. Il box copre il video e sembra un sottotitolo di YouTube del 2015.

```css
text-shadow: 0 4px 8px rgba(0,0,0,.6), 0 2px 4px rgba(0,0,0,.8), 0 0 2px rgba(0,0,0,1);
```

- **Casing originale**: niente maiuscolo forzato, si legge peggio ed è più aggressivo di quanto pensi.
- **Le frasi citate vanno tra caporali** («così»), non tra virgolette dritte.
- **Mai ripetere nella grafica il testo che dice già la caption.** Se la voce dice "comodissimo" e la caption lo scrive, la grafica non deve scriverlo una terza volta: usa un'icona.

---

## Checklist caption prima del render

- [ ] La punteggiatura è quella del copione, non della trascrizione
- [ ] I nomi di marca e di prodotto sono scritti giusti
- [ ] Una sola keyword per frase
- [ ] Il colore della CTA compare solo nel finale
- [ ] Nessuna riga a tre livelli
- [ ] Nessun frammento orfano (apostrofi o numeri da soli a capo)
- [ ] La fascia è stabile per la maggior parte del video
- [ ] Nessuna caption sotto un elemento grafico
