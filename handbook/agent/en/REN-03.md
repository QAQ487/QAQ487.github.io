# REN-03 · Toon shading/Cel shading/Ramp shading

**Aliases:** Three-tone; Three-tone shading; Wrap lighting; Half-Lambert; Painted shade masks; 三階明暗; 半朗伯; 包裹明暗; 手繪陰影遮罩

**Group:** Stylized rendering (NPR)
**Subcategory:** Overall Style and Outlines

## What you see

light and dark areas form two or three clearly separated levels, or transition through artist-defined color bands; highlights may also become hard-edged patches.

## Not to be confused with

toon shading does not require an outline. A ramp is a common approach, not the only algorithm for all toon shading. Normals, shadows, and ambient fill affect the bands; faces may need additional artistic controls.

## Use it for

anime, comics, limited-tone styles, and other NPR (Non-Photorealistic Rendering).

## Tunable parameters

band count · ramp colors · shadow threshold · softness · specular size · ambient fill

## Request prompt

In your game, add toon shading: use three lighting bands on the character with thresholds at 0.35 and 0.7, a transition width of 0.02, and one hard-edged highlight patch.

## Implementation hint

Map a lighting term through an artist-authored ramp or a small set of thresholds, with separate controls for shadow and highlight bands. Keep face or hero-character overrides available where raw normals produce unwanted bands.

## Related

- [NPR-21](NPR-21.md) — Authored shadow colours
- [NPR-22](NPR-22.md) — Core-shadow band
- [NPR-23](NPR-23.md) — Art-directed face shadows

## References

- [Godot — Diffuse／Specular Mode](https://docs.godotengine.org/en/stable/tutorials/3d/standard_material_3d.html#diffuse-mode)
- [Unity — Feature Examples，Custom Lighting](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.0/manual/Shader-Graph-Sample-Feature-Examples.html)
