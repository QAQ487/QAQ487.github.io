# Keeping published handbook files in sync

The GitHub Pages site serves `handbook/` and root `llms.txt`. Editable sources live in `handbook-src/`.

After changing CSS/JS/demos/data:

```bash
cd handbook-src
python3 build.py          # writes batch1.html, ../handbook/index.html,
                          # ../handbook/llms.txt, ../handbook/agent/en/*.md, ../llms.txt
HB=batch1.html node test.js   # optional smoke
python3 tools/check_handbook.py ../handbook/index.html
```

`build.py` publishes the human SPA and the English agent static layer together so the ~460 entries stay aligned.

Do not edit only the monolithic HTML unless you also mirror the same change into `src/` (or rebuild will overwrite it).
