# REN-43 · LOD cross-fade

**Aliases:** LOD 交叉淡化; 細節層切換淡化; LOD transition blend; Geomorph LOD; LODクロスフェード

**Group:** Image quality & render diagnostics
**Subcategory:** Level of detail

## What you see

When swapping mesh detail with distance, briefly blend both LODs by fade or geomorph instead of popping.

## Not to be confused with

Often paired with dithered transparency (MATX-06) for soft swaps; this entry is the LOD transition itself.

## Use it for

Open-world trees/buildings, crowds, assets that must look dense up close.

## Tunable parameters

fade duration · hysteresis band · dither vs alpha · per-asset bias (starting points)

## Request prompt

Cross-fade 0.25–0.5 s around the switch distance (or dither via MATX-06); add hysteresis so LODs do not thrash. Debug colour per LOD level.

## Implementation hint

if dist in [d-h,d+h]: draw LOD_n and LOD_n+1 with complementary weights. Prefer dither (MATX-06) to avoid sorting issues.

## Related

- [MATX-06](MATX-06.md) — Dithered transparency
- [REN-16](REN-16.md) — Alpha blending/Translucency

## References

- [Wikipedia — Level of detail (computer graphics)](https://en.wikipedia.org/wiki/Level_of_detail_(computer_graphics))
