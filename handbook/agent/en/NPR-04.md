# NPR-04 · Line boil

**Aliases:** Boiling lines; Wiggle lines; Jittered outline

**Group:** Stylized rendering (NPR)
**Subcategory:** Outlines & lines

## What you see

A character or object that is standing still still has outlines that quiver constantly, as if retraced every few frames; the shake is stepped (about 8–12 changes per second), cycling a few drawings, and the fills usually stay put.

## Not to be confused with

Not camera shake (the whole image moves) nor pixel-art sub-pixel animation (PIX-14, a deliberately designed tiny motion). Line boil is the hand-drawn instability of retracing the same drawing, not the character moving. Not edge-detection outlines either (NPR-03, which are stable).

## Use it for

Hand-drawn animation, doodle or children’s-drawing styles, dreamlike or uneasy scenes, giving 3D or vector graphics a handmade feel.

## Tunable parameters

variant count · switch rate (fps) · vertex offset amplitude · line-width jitter · whether fills boil

## Request prompt

Add line boil to the game’s hand-drawn outlines: make 3 variants (different hash seeds) and switch 8 times per second (seed = floor(time×8) mod 3); offset each outline vertex by ±1.25 px (at 240p; about ±5 px at 1080p), and vary line width between 1.3 and 2.0 px per variant; keep fills and character positions still. Keep boiling while paused; a “reduce motion” option sets the rate to 0.

## Implementation hint

Stepped time: seed = floor(time*rate) % variants. Offset stroke vertices (or UVs into a noise texture, or the screen-space position in an outline post-process) by hash(seed, vertexId) * amplitude. For shader outlines, offset the sampling position by noise(uv*scale + seed). Keep the rate low (6–12) — continuous noise reads as wobble, not boil.

## Related

- [NPR-03](NPR-03.md) — Edge-detection outline
- [NPR-09](NPR-09.md) — Sketch / Pencil shader
- [PIX-14](PIX-14.md) — Sub-pixel animation
- [NPR-16](NPR-16.md) — Ukiyo-e / woodblock print

## References

- [PremiumBeat — How to create line boil animations](https://www.premiumbeat.com/blog/how-to-create-line-boil-animations/)
- [PremiumBeat — Wiggly text and animations using the line boil effect](https://www.premiumbeat.com/blog/wiggle-text-line-boil/)
