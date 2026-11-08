# LGT-17 · Backlit leaf translucency

**Aliases:** Backlit foliage; Leaf subsurface glow; Transmitted leaf light; 逆光透葉; 葉片透光; 逆光の葉透け; 木の葉の半透明

**Group:** Lighting & shadows
**Subcategory:** Atmosphere & volume

## What you see

When the sun sits behind foliage, leaves glow yellow-green (or autumn warm) and veins become readable. The glow is in the leaf, not a rim outline alone.

## Not to be confused with

Not general SSS (REN-19, often skin). Not rim light hugging the silhouette (REN-05). Not spots cast by gaps onto other surfaces (LGT-15).

## Use it for

Backlit forest paths, foliage close-ups, vegetation that must transmit light.

## Tunable parameters

transmission colour · thickness map · vein contrast · front vs back blend · twig opacity (authoring defaults)

## Request prompt

Place the sun behind a leafy branch → the leaves themselves → transmitted warm-green glow with visible vein structure on thin regions; opaque twigs stay darker → restore front-lit opaque leaves when the light moves in front.

## Implementation hint

Shade leaves with a thin-surface transmission term when N·L is negative (or L is behind the leaf): albedo * transmissionColour * thickness. Add a vein darkening texture. Keep woody twigs opaque.

## Related

- [REN-19](REN-19.md) — Subsurface scattering/SSS
- [REN-05](REN-05.md) — Rim lighting/Rim light
- [LGT-15](LGT-15.md) — Komorebi / dappled canopy light
- [ENV-08](ENV-08.md) — Foliage sway

## References

- [Wikipedia — Subsurface scattering](https://en.wikipedia.org/wiki/Subsurface_scattering)
