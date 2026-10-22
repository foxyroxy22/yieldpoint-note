# Yield Point

A web version of *Yield Point*, an A6 zine that tells my move from polymer engineering into design as a tensile test report. The notebook sits on a lab bench and you turn its pages in 3D.

## Run locally

```bash
python3 serve.py
```

Then open http://localhost:5173. There is no build step: it's plain HTML, CSS and JavaScript modules.

## Files

- `index.html` — page shell, readout and controls
- `src/copy.js` — all text on the pages (edit wording here)
- `src/pages.js` — page layouts and the stress–strain curve
- `src/main.js` — page-flip engine, intro, keyboard / drag / swipe, mobile single-page view
- `src/props.js` — lab bench objects
- `src/style.css` — styles
- `yield-point-web-brief.md` — the original brief

## Controls

Turn page button, ← → keys, click or drag a page. On a phone held upright it shows one page at a time; tap or swipe to move.
