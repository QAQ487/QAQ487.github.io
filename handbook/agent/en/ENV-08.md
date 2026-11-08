# ENV-08 · Foliage sway

**Aliases:** Wind sway; Vertex wind; Swaying trees; Hierarchical foliage; Coherent wind; 層級枝葉; 階層フォリッジ

**Group:** Environment, weather & time
**Subcategory:** Ground & foliage

## What you see

Trees, bushes and flags sway in the wind: the base stays fixed, the top moves most, and gusts send wave-like ripples across from one side to the other. Prefer hierarchical foliage (slow trunk/branch bend + faster varied leaf flutter) and coherent wind across materials (one traveling gust drives grass, banners, and loose leaves with material-specific lag and amplitude — they must not stop in sync).

## Not to be confused with

Not interactive grass (ENV-09, bending from character contact); sway is a constant, global ambient motion. Not wobbling the whole image (the base must stay put). Do not mint a second “layered wind” card — hierarchy and coherence live here.

## Use it for

Brings scenes to life and shows wind direction and storm strength; one gust should read across materials.

## Tunable parameters

base amplitude · frequency · spatial phase · gust strength & interval · height falloff · main/detail bend layers · per-material lag & amplitude · pixel rounding

## Request prompt

Add foliage sway to trees and bushes in the game: in the shader offset x by vertex height h (0 = root, 1 = top): offset = h² × (sin(time×1.7 + worldX×0.05) × 1.5 + gust × 2.5) px; a gust wave passes west → east every 5 s. Round offsets in pixel mode. Add two layers: main bend (slow, large) and detail flutter (fast, small, desynced phases); drive grass/banners/loose leaves from the same gust phase with banner lag ~0.15 s and larger amplitude than grass.

## Implementation hint

Vertex shader on foliage quads: use the quad’s local v (top = 1) as height weight; offset.x = pow(h,2)*(A*sin(t*f + worldX*k) + gust(worldX - t*speed)). Add a second detail octave with higher frequency and lower amplitude (Crytek-style main/detail bending). Share one world gust field; sample with material lag. For sprites, split tall trees into 2–3 horizontal slices so the bend reads.

## Related

- [ENV-09](ENV-09.md) — Interactive grass
- [ENV-07](ENV-07.md) — Cloud shadows
- [ENV-04](ENV-04.md) — Rain
- [ENV-19](ENV-19.md) — Contact-driven leaf litter
- [PHY-04](PHY-04.md) — Damped rigid-prop settling
- [LGT-15](LGT-15.md) — Komorebi / dappled canopy light

## References

- [GPU Gems ch.7 — Rendering countless blades of waving grass](https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-7-rendering-countless-blades-waving-grass)
- [GPU Gems 3 ch.16 — Vegetation procedural animation and shading in Crysis](https://developer.nvidia.com/gpugems/gpugems3/part-iii-rendering/chapter-16-vegetation-procedural-animation-and-shading-crysis)
- [GPU Gems 3 ch.16 — Vegetation procedural animation (Crytek main/detail bending)](https://developer.nvidia.com/gpugems/gpugems3/part-iii-rendering/chapter-16-vegetation-procedural-animation-and-shading-crysis)
- [GDC Vault — Ghost of Tsushima: Wind, Leaves, and Fog (talk id 1027350)](https://www.gdcvault.com/play/1027350/Ghost-of-Tsushima-Wind-Leaves)
