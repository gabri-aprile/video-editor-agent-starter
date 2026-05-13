# Brand Kit

Asset visivi canonici dell'agente. **Tutto ciò che è qui è "verità assoluta"** per il render.

## File

- `colors.json` — palette colori
- `typography.json` — font, pesi, scale dimensionali, ombre canoniche
- `fonts/` — i file `.woff2` o `.ttf` dei font (gitignorati per evitare problemi di licenza)

## Aggiungere font

1. Scarica i `.woff2` dei tuoi font (Google Fonts → "Download" → estrai)
2. Mettili in `brand-kit/fonts/`
3. Aggiorna `typography.json` con i nomi dei file
4. Nel template Hyperframes carica con:

```css
@font-face {
  font-family: 'Inter';
  src: url('../brand-kit/fonts/Inter-ExtraBold.woff2') format('woff2');
  font-weight: 800;
  font-style: normal;
  font-display: block;
}
```

## Asset opzionali da aggiungere

- `logo.svg` / `logo.png` — il tuo logo per intro/outro
- `wordmark.svg` — versione testuale del logo
- `bg.png` o `bg.mp4` — background brandizzato per scene fullscreen senza b-roll
- `intro.mp4` / `outro.mp4` — bumper canonici
- `bgm.mp3` — traccia musicale di sottofondo

Riferisci a questi file in `references/style-guide.md` così l'agente sa quando usarli.
