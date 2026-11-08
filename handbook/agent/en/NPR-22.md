# NPR-22 · Core-shadow band

**Aliases:** Core shadow; Terminator band; Dark band at the terminator; 明暗交界暗帶; コアシャドウ; 明暗境界の暗帯

**Group:** Stylized rendering (NPR)
**Subcategory:** Toon shading

## What you see

Along the light/dark terminator a narrower, deeper or richer band appears, then the form shadow opens slightly again before the bounce.

## Not to be confused with

Not cavity AO (REN-21/REN-22). Not a bright rim (REN-05). Not merely a second cel band from REN-03 (though it can be authored into a ramp). This names the painter’s terminator accent.

## Use it for

Faces and rounded forms with painted shading.

## Tunable parameters

band width · band darkness · travel with light · wrap kill (authoring defaults)

## Request prompt

Light a rounded form → the terminator → draw a deeper/richer narrow band that travels with the light; the rest of the form shadow stays lighter than that band → band disappears if the light becomes fully wraparound / ambient.

## Implementation hint

Where N·L crosses the terminator, darken a narrow band (or author it into the ramp). Keep the remainder of the form shadow lighter. Hide the band under strong wrap/ambient-only lighting.

## Related

- [REN-03](REN-03.md) — Toon shading/Cel shading/Ramp shading
- [REN-21](REN-21.md) — Ambient occlusion/AO/Occlusion map
- [NPR-21](NPR-21.md) — Authored shadow colours
- [NPR-23](NPR-23.md) — Art-directed face shadows

## References

- [Wikipedia — Core shadow](https://en.wikipedia.org/wiki/Core_shadow)
