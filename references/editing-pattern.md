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

## CTA finale

- Definisci un formato fisso (es. "money shot" verde acid + speaker piccolo)
- Mai variare di episodio in episodio — diventa il tuo trademark

## Density

Ogni scena deve avere:
1. **Entry animation** (cosa entra in scena)
2. **Idle motion** (cosa respira durante)
3. **B-roll change** (se la scena dura >2s)
4. **8-10 elementi animati** in totale

Mai uno stamp statico fullscreen morto.

## Coerenza tra video

- Stesso ordine di apparizione di logo/wordmark
- Stesso intro/outro (se ce l'hai)
- Stessa "voce visiva": se il primo episodio è cinematico, anche il decimo lo è
- Stesso colore della keyword highlight in tutti i video
