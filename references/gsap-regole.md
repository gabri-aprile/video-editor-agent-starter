# Regole GSAP dentro Hyperframes

> Queste sono le regole che il tuo agente deve rileggere **prima di ogni build e di ogni render**.
> Non sono preferenze estetiche: sono la causa numero uno delle animazioni che lampeggiano, saltano o si congelano.

## Perché esistono (spiegato semplice)

Hyperframes non "registra lo schermo". Apre una pagina web, si mette su un istante preciso (es. secondo 12,400), scatta la fotografia di quel frame, poi salta all'istante dopo. Si chiama *seek*: la pagina viene spostata avanti e indietro nel tempo, non lasciata scorrere.

Tutto quello che presuppone un tempo che scorre da solo (un'animazione CSS, un `setTimeout`, un numero casuale) durante il render non funziona: resta fermo, oppure cambia da un fotogramma all'altro senza senso. Da qui le regole che seguono.

---

## Le 6 regole non negoziabili

**1. Sempre `tl.fromTo()`, mai `tl.from()`.**
`from()` scrive lo stato iniziale già al momento in cui costruisci la timeline, cioè prima che la scena sia attiva. Risultato: elementi che lampeggiano, partono dalla posizione sbagliata o saltano in entrata. Con `fromTo()` dichiari sia il punto di partenza sia quello di arrivo, e il motore sa sempre dove mettere le cose a qualsiasi istante.

```js
// ❌ NO
tl.from('.card', { y: 60, opacity: 0, duration: 0.4 })

// ✅ SÌ
tl.fromTo('.card', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 })
```

**2. Una timeline sola, registrata e in pausa.**
La timeline principale va creata con `{ paused: true }` e registrata dove il motore la trova, cioè in `window.__timelines['<id-composizione>']`. È il motore a scorrerla, non tu.

```js
const tl = gsap.timeline({ paused: true })
window.__timelines['ep001'] = tl
```

**3. Costruzione sincrona.**
Niente `async`, `await`, `setTimeout`, `Promise` mentre costruisci la timeline. Quando la pagina è pronta, la timeline deve essere già completa. Se una parte arriva mezzo secondo dopo, nei primi fotogrammi semplicemente non c'è.

**4. Niente casualità, niente loop infiniti.**
Mai `Math.random()`, mai `Date.now()`: darebbero un risultato diverso a ogni fotogramma e l'animazione tremerebbe. Mai `repeat: -1`: calcola un numero di ripetizioni finito partendo dalla durata della scena.

```js
const ripetizioni = Math.floor(durataScena / 1.2)
tl.fromTo('.glow', { opacity: .4 }, { opacity: 1, duration: .6, yoyo: true, repeat: ripetizioni })
```

**5. Spegni gli stati ai confini di scena.**
A inizio scena accendi (`gsap.set(el, { opacity: 1 })`), a fine scena spegni (`gsap.set(el, { opacity: 0 })`). Senza questo "hard kill" le scene si accumulano: al minuto 0:40 hai ancora addosso i residui della scena 2. La durata dichiarata nell'attributo `data-duration` ha la precedenza su quella calcolata da GSAP.

**6. Le animazioni continue vanno sulla timeline, mai nei `@keyframes` CSS.**
Un glow che pulsa, un alone che respira, una barra che scorre: se li scrivi come `animation` CSS, durante il render restano congelati sul primo fotogramma. Vanno messi sulla timeline scrubbata come tutto il resto.

---

## Centramento e trasformazioni

- **Per centrare in orizzontale** usa `gsap.set(sel, { left: '50%', xPercent: -50 })`. Se scrivi `transform: translateX(-50%)` nel CSS, GSAP lo sovrascrive alla prima animazione e l'elemento salta di mezzo schermo.
- **Mai due tween di `transform` sullo stesso elemento**: il secondo cancella il primo.
- **Per far crescere qualcosa in altezza** anima `scaleY`, non `height`. `height` obbliga il browser a ricalcolare il layout e nel render escono fotogrammi incoerenti.
- **Niente animazioni di uscita** nelle scene intermedie: il taglio alla scena successiva *è* l'uscita. Solo l'ultima scena può uscire davvero.
- **Se un elemento contiene testo, non dargli scale o rotazioni continue.** Il testo viene ridisegnato a ogni fotogramma e si vede un micro-tremolio. Il "respiro" mettilo su glow, ombre e sfondi sfocati. I colpi brevi (entrata, accento su una parola) restano validi.
- **Regola "entra, si assesta, sta fermo"** (per i testi): l'elemento entra, si posiziona e poi resta immobile. Niente oscillazioni infinite sulle card di testo. Le **immagini** invece dopo l'arrivo continuano a respirare piano, vedi `references/qualita-del-movimento.md`.
- **La curva d'ingresso non è sempre `back.out`.** Usata su tutto è la curva che fa dire "template". Per gli ingressi usa le tre curve di casa (`posa`, `rinculo`, `aggancio`): come si registrano e quando si usano sta in `references/qualita-del-movimento.md`.

---

## Due errori che passano tutti i controlli

**Un `fromTo` che parte già visibile vuole `immediateRender: false`.**
Se il punto di partenza è visibile (un lampo da opacità 0,75, un anello da 0,9), GSAP scrive quello stato **al fotogramma 0** e lo tiene fino all'istante del tween. Risultato: lampi bianchi a inizio scena, con il codice che sembra giusto.

```js
tl.fromTo('.lampo', { opacity: 0.75 }, { opacity: 0, duration: 0.16, immediateRender: false }, 4.2)
```

**Due cose che si muovono insieme vogliono la stessa curva e la stessa durata.**
Se una frena prima dell'altra, fra le due si apre per qualche fotogramma uno spazio vuoto (spesso nero). Nel fotogramma fermo non si vede, nel video sì.

---

## Prima di renderizzare

- Lancia i comandi di verifica di Hyperframes (lint, validate, inspect) e correggi tutto prima di premere render.
- Framerate ammessi: **24, 30 o 60**. Non 25.
- Curiosità utile: un commento CSS che contiene la stringa `<script>` manda in confusione il linter. Se ti dà un errore incomprensibile, cerca lì.

---

## Il test dei 10 secondi

Se un'animazione ti sembra rotta, prima di indagare fatti queste domande nell'ordine:

1. Ho usato `from()` invece di `fromTo()`?
2. È un'animazione CSS invece che GSAP?
3. C'è un `repeat: -1` o un `Math.random()` nascosto?
4. Ho spento lo stato alla fine della scena precedente?
5. Sto animando `height` invece di `scaleY`?
6. C'è un `fromTo` che parte visibile senza `immediateRender: false`?
7. Due cose che dovevano muoversi insieme hanno curve o durate diverse?

Nove volte su dieci la risposta è in questa lista.
