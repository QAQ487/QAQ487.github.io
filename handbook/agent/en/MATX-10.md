# MATX-10 · X-ray silhouette

**Aliases:** See-through walls; Occluded silhouette; Behind-wall outline; Character occlusion silhouette

**Group:** Materials & surfaces
**Subcategory:** Special materials

## What you see

When a character or enemy walks behind a wall, tree or building, the hidden part doesn’t vanish but shows through as a flat-colour silhouette or outline (allies blue, enemies red, pickups yellow); the unoccluded part renders normally, so the silhouette appears only on the covered portion.

## Not to be confused with

Not dithered transparency (MATX-06, which makes the blocking wall see-through); with an X-ray silhouette the hidden character shows through and the wall is unchanged. Not an interactable highlight (NAV-01, an always-on outline) or silhouette readability (PIX-13, character shape design).

## Use it for

Characters hidden by buildings in top-down or third-person games, ally and enemy position cues, a scouting ability in stealth games, pickups shown through walls.

## Tunable parameters

silhouette colour per team · opacity · outline width · pattern (flat / hatched / Fresnel) · max distance · which occluders count (layer mask)

## Request prompt

Add X-ray silhouettes to the game: characters write stencil 1 when drawn normally; then draw each character again with ZTest Greater, ZWrite Off and stencil ≠ 1, outputting a flat colour (player #4aa8ff, enemies #ff5a4a, opacity 0.6) with a 1 px brighter outline; the border between silhouette and normal rendering must sit exactly on the wall’s edge. Hide silhouettes for characters further than 30 m.

## Implementation hint

Pass 1: normal draw, stencil write 1. Pass 2 (after all occluders): same mesh, depth test GREATER, depth write off, stencil test NOT_EQUAL 1 (prevents self-occlusion), flat colour or Fresnel-tinted. Alternative: render characters to a mask + depth buffer and composite with a screen-space outline (sobel) only where the mask’s depth > scene depth.

## Related

- [MATX-06](MATX-06.md) — Dithered transparency
- [NAV-01](NAV-01.md) — Interactable highlight
- [PIX-13](PIX-13.md) — Silhouette readability
- [NAV-03](NAV-03.md) — Foreground-background separation
- [MATX-07](MATX-07.md) — Hologram shader
- [PP-19](PP-19.md) — Thermal vision / Thermographic imaging
- [NAV-17](NAV-17.md) — Scan pulse / Sonar ping
- [ACT-49](ACT-49.md) — Phase-through traversal / Ascend through ceiling
- [ACT-50](ACT-50.md) — Wall merge / Painting form

## References

- [Unity Manual — ShaderLab ZTest command](https://docs.unity3d.com/Manual/SL-ZTest.html)
- [Unity Manual — ShaderLab Stencil command](https://docs.unity3d.com/Manual/SL-Stencil.html)
- [Unity URP docs — Render Objects example: character visible behind objects](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@10.5/manual/renderer-features/how-to-custom-effect-render-objects.html)
- [Rito15 — Stencil silhouette shader (ZTest Greater + stencil)](https://rito15.github.io/posts/unity-shader-script-stencil-silhouette/)
- [Wikipedia — Stencil buffer](https://en.wikipedia.org/wiki/Stencil_buffer)
