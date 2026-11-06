# NPR-02 · Stylized specular / Anime hair highlight

**Aliases:** Angel ring; Hair halo highlight; Toon specular; Stylized highlight

**Group:** Stylized rendering (NPR)
**Subcategory:** Toon shading

## What you see

A bright, jagged-edged arc of colour wraps around the top of the head like a halo; the highlight is a drawn, fixed shape (band, star, block) with crisp edges, not a soft blob that slides with the light as in realistic shading.

## Not to be confused with

Not an ordinary specular highlight (REN-10, a soft blob placed purely by light and view) nor anisotropic reflection (REN-11, a physically stretched highlight along fibres). The angel ring is an artist-shaped pattern that mostly follows the view.

## Use it for

Anime-style character hair, eye glints, cartoon highlights on plastic or metal props, keeping 3D models consistent with 2D character art.

## Tunable parameters

band latitude · band width · strand count & jitter · view vs light follow · core width · colour

## Request prompt

Add an angel-ring highlight to anime-style hair: two-tone toon base (N·L threshold 0.15); draw a band at head-normal latitude ≈0.72 rad, width 0.085, coloured hair base ×1.6 shifted toward pale violet; split the head into 48 strands around its circumference and offset the band by a hashed ±0.05 per strand for a jagged edge; the light only pushes the band ±0.05 sideways, it mainly follows the camera. Add a pure-white core 35% of the band width. A UV-aligned highlight mask texture can replace the procedural band.

## Implementation hint

Compute the band in a space the artist controls: latitude from the head-local normal (or a UV v-coordinate on a hair card), shifted slightly by dot(L, headRight); jitter edges with hash(strandIndex). Mask = abs(lat - centre + jitter) < width; add a white core where the mask is narrower. Composite after the toon ramp, before outlines. A matcap or a painted mask texture scrolled by view angle are common alternatives.

## Related

- [REN-10](REN-10.md) — Specular highlight
- [REN-11](REN-11.md) — Anisotropy/Anisotropic reflection
- [REN-03](REN-03.md) — Toon shading/Cel shading/Ramp shading
- [NPR-01](NPR-01.md) — Gooch shading

## References

- [URP 渲染實戰 — 頭髮天使環 Angel ring (Kajiya-Kay → toon band)](https://gametech.byte888.com/urp/zh-hant/case/14-7.html)
- [MooaToon docs — Add stylized hair highlights](https://mooatoon.com/en/docs/Tutorial/AddStylizedHairHighlights)
- [Wikipedia — Specular highlight](https://en.wikipedia.org/wiki/Specular_highlight)
- [Wikipedia — Blinn–Phong reflection model](https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model)
