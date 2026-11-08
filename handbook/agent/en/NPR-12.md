# NPR-12 · Low-poly flat shading

**Aliases:** Flat shading; Faceted shading; Low poly style; Facet shading

**Group:** Stylized rendering (NPR)
**Subcategory:** Retro & lo-fi

## What you see

3D objects are made of a few obvious triangular faces, each a single colour, with clear light/dark breaks between faces like folded paper or a cut gem; when the light moves, a whole face brightens or darkens at once.

## Not to be confused with

Not smooth shading (Gouraud/Phong, where the same low-poly mesh looks rounded and faces vanish) nor PS1 style (NPR-11, about vertex jitter and texture warping). Low poly reads as one colour per face, faces deliberately shown.

## Use it for

Clean indie styles, natural scenery and rocks, mobile games (performance and art direction aligned), abstract or minimalist looks.

## Tunable parameters

triangle count · vertex jitter · key/fill colours & angles · per-face colour variation · optional quantization

## Request prompt

Use flat shading for the game’s low-poly models: each triangle uses its face normal (do not share vertex normals, or compute normalize(cross(ddx(pos), ddy(pos))) in the shader); models around 80–500 triangles with vertices randomly displaced ±16% for irregularity; warm key light (intensity 1.0, 45° elevation) plus a cool fill (intensity 0.25 from the opposite side); no textures, only vertex or per-face colours; optional 2–4 step quantization for a unified palette.

## Implementation hint

Duplicate vertices per face so each triangle carries its face normal, or derive it per pixel from screen-space derivatives of world position (no mesh change). Shade with N_face·L; optionally add per-face hue jitter hash(faceId). Avoid normal maps and smoothing groups.

## Related

- [NPR-11](NPR-11.md) — PS1-style rendering
- [REN-03](REN-03.md) — Toon shading/Cel shading/Ramp shading
- [NPR-13](NPR-13.md) — 3D pixel art (pixelated 3D)
- [LGT-01](LGT-01.md) — Directional, point and spot lights
- [NPR-19](NPR-19.md) — Papercraft / paper-world construction

## References

- [Wikipedia — Shading (flat vs smooth shading)](https://en.wikipedia.org/wiki/Shading)
- [Wikipedia — Low poly](https://en.wikipedia.org/wiki/Low_poly)
- [Wikipedia — Gouraud shading](https://en.wikipedia.org/wiki/Gouraud_shading)
