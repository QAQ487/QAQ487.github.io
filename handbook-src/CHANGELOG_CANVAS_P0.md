# Canvas remake — principle layer, P0 batch

Date: 2026-11-05 (JST)

## Summary
39 principle-layer demos that used animated SVG are now canvas demos in the effects-layer style.
They follow DEMO_STYLE_GUIDE.md: 240×135 logical canvas, `P` palette, bold monospace labels, shared helpers, and `hash()` for all randomness, so every frame is a pure function of t and can be scrubbed.
Captions are kept in zh, en and ja, and each card now shows them under the canvas.

## Converted IDs (39)
- **CAM (14):** CAM-01, 02, 03, 04, 05, 07, 10, 12, 13, 27, 29, 30, 31, 32
- **REN (4):** REN-30, 33, 40, 41
- **ACT (11):** ACT-01, 03, 09, 10, 12, 13, 16, 21, 29, 30, 31
- **FX (8):** FX-01, 02, 04, 05, 09, 13, 14, 15
- **UX (2):** UX-16, UX-20 (both `hi:true` and drawn at 2× for crisp text)

Skipped: UX-19. It is a redirect to FX-32 and has no demo of its own.

## Content notes
- **CAM-30:** a general camera shake with amplitude, frequency and decay. It does not repeat FB-07's combat trauma model.
- **ACT-09:** a character wind-up pose with no VFX.
- **FX-13:** a VFX charge-up while the pose stays the same.

## Files
New:
- `src/demos_prin.js`: shared helpers (`prTag`, `prDash`, `prLine`, `prWrap`, `prKeys`, `prSeries`/`prAt`, `prWalker`, `prSide`, `prView`/`prW2S`, `prProj`/`prOrbit`/`prInset`, `prLane`, `prDummy`)
- `src/demos_prin_cam.js`
- `src/demos_prin_ren.js`
- `src/demos_prin_act.js`
- `src/demos_prin_fx.js`
- `src/demos_prin_ux.js`

Changed:
- `build.py`: adds `PRIN_FILES` to the JS bundle and blanks `svg` for principle entries that now have a canvas demo.
- `src/app.js`: a principle card uses the canvas `Player` when `DEMOS[id]` exists and the SVG player otherwise. Canvas principle cards also get a caption line.

Output:
- `batch1.html` and `handbook_complete.html` (identical copies)

Screenshots:
- `shots/prin-cam-a.png`
- `shots/prin-cam-b.png`
- `shots/prin-act-a.png`
- `shots/prin-act-b.png`
- `shots/prin-ren-ux.png`
- `shots/prin-fx.png`

## Tests
- `python3 build.py`: CHECK 0 errors, 0 warnings; ERRS []; PRIN canvas 39
- `HB=batch1.html node test.js`: 433 checked, 285 canvas, 148 svg, bad [], ERRORS []
- None of the 39 are in WEAK. The WEAK list only has older effects-layer demos.
- Per-ID check: all 39 are canvas with no SVG left. Each has 4 or more distinct frames out of 5: 35 have 5, and ACT-10, 12 and 30 have 4. Minimum sd is 60 or higher.

## Deviations from the style guide
- **REN-30:** uses `ctx.filter` brightness for eye adaptation.
- **REN-33:** uses multi-sample alpha stacking to show motion blur.
- **REN-40 and FX-15:** use `getImageData`/`putImageData` for per-pixel AA/TAA and the noise dissolve. Results are cached or done on the small buffer, so the cost is low.
- **Comparison lanes:** many comparison demos use two stacked lanes (the `prLane` helper) instead of one full scene.
- **Hero sprite:** in ACT and FX-09 it is cropped to 7 columns so a separate, animated sword can be drawn.
