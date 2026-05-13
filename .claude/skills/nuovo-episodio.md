---
name: nuovo-episodio
description: Avvia un nuovo episodio dalla pipeline. Chiede script e voce, crea cartella work/, lancia trascrizione e planning.
---

# Skill: nuovo episodio

Quando l'utente lancia `/nuovo-episodio` (o equivalente), segui questi passi.

## 1. Raccogli input

Chiedi all'utente:
- **ID episodio** (es. `ep001`). Verifica che non esista già in `work/`.
- **Percorso del file voce** (`voice.mp3` o `voice.wav`).
- **Script** (testo o percorso `script.txt`).
- **Layout target** (split / fullscreen-blur / fullscreen-browser).
- **(Opzionale) Avatar video** se l'utente ha generato un talking head a parte.

## 2. Crea struttura

```
work/<ep>/
├── voice.mp3            (copia)
├── script.txt           (scrivi quello che ha dato l'utente)
├── avatar.mp4           (se fornito)
└── meta.json            (id, layout, data, durata target)
```

## 3. Leggi le bibbie

Prima di procedere, **leggi sempre**:
- `references/style-guide.md`
- `references/editing-pattern.md`
- `brand-kit/colors.json`
- `brand-kit/typography.json`

Confermare a voce all'utente le scelte estetiche derivate.

## 4. Trascrivi

Lancia `node scripts/01_transcribe.mjs <ep>`. Output atteso: `work/<ep>/words.json`.

Verifica:
- numero di parole > 0
- `duration` corrisponde alla durata del file audio (entro 1s)

## 5. Pianifica b-roll

Lancia `node scripts/02_plan_broll.mjs <ep>`. Output: `work/<ep>/plan.json`.

Mostra all'utente il piano sintetizzato:
- numero di segmenti
- distribuzione tipo b-roll (stock / AI / screenshot / mockup)
- costo stimato

**Chiedi conferma** prima di passare al fetch (che costa soldi).

## 6. Fetch asset (solo dopo OK)

Lancia `node scripts/03_fetch_assets.mjs <ep>`.

## 7. Render preview

Lancia `node scripts/04_render.mjs <ep> --preview` → render rapido 540×960.

Mostra all'utente il preview, raccogli feedback.

## 8. Iterazioni

Per ogni feedback dell'utente:
- modifica `plan.json` o `style-guide.md` se è regola persistente
- ri-renderizza solo le scene cambiate
- **mai render high prima dell'approvazione esplicita del preview**

## 9. Render finale

Solo quando l'utente dà esplicito OK: `node scripts/04_render.mjs <ep>` + `node scripts/05_post.mjs <ep>`.

Output finale in `output/<ep>.mp4`.
