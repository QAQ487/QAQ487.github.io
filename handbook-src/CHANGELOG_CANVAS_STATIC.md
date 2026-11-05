# Canvas remake — remaining principle-layer static demos

Date: 2026-11-05  
Model: Auto (default)

## Summary
All **148** remaining principle-layer entries that still used static SVG are now canvas demos in the effects-layer style (`DEMO_STYLE_GUIDE.md`). Combined with the earlier P0 batch (39), the principle layer is **187** canvas demos; the built handbook has **433** canvas entries and **0** SVG players.

## Converted IDs (148)
- **CAM (18):** CAM-06, 08, 09, 11, 14–26, 28  
  (Skipped from this list: none. UX-19 remains a redirect only and was never in the list.)
- **REN (38):** REN-01–29, 31, 32, 34–39, 42
- **ACT (27):** ACT-02, 04–08, 11, 14, 15, 17–20, 22–28, 32–38
- **FX (30):** FX-03, 06–08, 10–12, 16–38
- **UX (35):** UX-01–15, 17, 18, 21–38

## Quality notes / weaker IDs
These still pass `test.js` (not in `bad[]`, none of the 148 appear in `WEAK`) but are visually simpler or more schematic than the best P0 town loops:

- **CAM-16–21:** Shared perspective/ortho panel helpers; phenomena (1/z scale, FOV, dolly ratios, dolly-zoom) are labeled and measurable, but staging is more optical than a full side-scroller beat.
- **CAM-14 / CAM-15:** Redrawn away from the trial’s map-style top-down diagrams (side-view wall push + orbit LOS). Still teaching diagrams more than narrative scenes.
- **REN material/optics cluster (REN-01–15, 18–19, 23–24, 35–39, 42):** Many use simplified spheres / split panels; readable, but less “toy town” than ACT/CAM follow demos.
- **FX-21–34 (audio / haptic):** Visualized with meters, pan bars, and controller glyphs inside the pixel frame — correct for the handbook, not literal VFX fireworks.
- **UX-07–10, UX-37:** Menu/modal/onboarding UI loops; `hi:true` used where crisp HUD text helps (same pattern as UX-16/20).

## Files
- `src/demos_prin_cam.js` — appended CAM-06…28 remakes
- `src/demos_prin_ren.js` — appended REN static remakes
- `src/demos_prin_act.js` — appended ACT static remakes
- `src/demos_prin_fx.js` — appended FX static remakes
- `src/demos_prin_ux.js` — appended UX static remakes
- `build.py` — unchanged contract: principle entries with `DEMOS[id]` get blank `svg`

## Tests
- `python3 build.py`: CHECK 0 errors, 0 warnings; PRIN canvas **187**; HTML ≈ **2,489,377** bytes
- `HB=batch1.html node test.js`: checked **433**, canvas **433**, svg **0**, bad **[]**, ERRORS **[]**
- WEAK list contains only pre-existing effects-layer IDs (LGT/PP/NPR/PIX/FB/VFX/UI); **no** CAM/REN/ACT/FX/UX principle IDs

## Deploy
- `batch1.html` copied to `handbook_complete.html` and to `handbook/index.html` on `main` for GitHub Pages.
