# Keeping `handbook/index.html` in sync

The GitHub Pages site serves `handbook/index.html`. Editable sources live in `handbook-src/`.

After changing CSS/JS/demos/data:

```bash
cd handbook-src
python3 build.py          # writes batch1.html
cp batch1.html ../handbook/index.html
HB=batch1.html node test.js   # optional smoke
```

Do not edit only the monolithic HTML unless you also mirror the same change into `src/` (or rebuild will overwrite it).
