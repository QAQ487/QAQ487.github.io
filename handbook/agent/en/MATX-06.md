# MATX-06 · Dithered transparency

**Aliases:** Screen-door transparency; Stipple transparency; Dither fade; Opacity mask dithering

**Group:** Materials & surfaces
**Subcategory:** Transparency & refraction

## What you see

When an object turns “semi-transparent” no colours are actually mixed: whole pixels are punched out in a fixed pattern (checkerboard or Bayer matrix). At 50% opacity it looks like seeing through a fly screen, a hole every other pixel; fading out adds more holes until it is gone. At high resolution or with TAA it reads close to soft translucency.

## Not to be confused with

Not alpha blending (REN-16 Alpha blending, where every pixel is a mix of two colours) or fixed-threshold alpha clipping (REN-17 Alpha clipping, all-or-nothing). Not the dither transition (TRN-09, switching between two images) or pixel-art dithering (PIX-08, faking in-between colours).

## Use it for

Fading trees, roofs and pillars that hide the character, distance and LOD cross-fades, fading the character when a third-person camera gets too close, anywhere you want to avoid transparency sorting.

## Tunable parameters

opacity · matrix size (2×2 / 4×4 / 8×8 / blue noise) · screen vs world anchoring · temporal jitter (for TAA) · fade speed

## Request prompt

Add dithered transparency to objects that hide the player in the game: when an object is between the camera and the character, lower its opacity to 0.35 over 0.25 s; the pixel shader looks up a 4×4 Bayer matrix by screen position (threshold = value / 17) and discards when alpha is below it; the object still writes depth and needs no sorting. Restore to 1 over 0.4 s when the camera clears it.

## Implementation hint

Opaque pass, no blending: float th = (bayer4[(int)pos.x & 3][(int)pos.y & 3] + 1) / 17; clip(alpha - th); depth write stays on so no sorting is needed and it works with deferred shading. Offset the pattern per object (or use blue noise) so two overlapping faded objects don’t cancel out; jitter per frame when TAA can resolve it.

## Related

- [REN-16](REN-16.md) — Alpha blending/Translucency
- [REN-17](REN-17.md) — Alpha clipping/Alpha test/Cutout/Alpha scissor
- [PIX-08](PIX-08.md) — Dithering
- [TRN-09](TRN-09.md) — Dither transition
- [MATX-10](MATX-10.md) — X-ray silhouette
- [DIAG-06](DIAG-06.md) — Alpha-to-coverage
- [REN-43](REN-43.md) — LOD cross-fade

## References

- [OpenGL Advanced ’98 course notes — Screen-door transparency](https://www.opengl.org/archives/resources/code/samples/advanced/advanced98/notes/node145.html)
- [DigitalRune docs — Screen-door transparency](https://digitalrune.github.io/DigitalRune-Documentation/html/fa431d48-b457-4c70-a590-d44b0840ab1e.htm)
- [Alex Ocias — Unity stipple transparency shader](https://ocias.com/blog/unity-stipple-transparency-shader/)
- [Unity Shader Graph — Dither node](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.0/manual/Dither-Node.html)
- [Godot docs — Standard Material 3D (triplanar, distance fade dither)](https://docs.godotengine.org/en/stable/tutorials/3d/standard_material_3d.html)
- [Wikipedia — Ordered dithering](https://en.wikipedia.org/wiki/Ordered_dithering)
