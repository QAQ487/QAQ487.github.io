# REN-03 · Toon shading/Cel shading/Ramp shading

**Aliases:** Three-tone; Three-tone shading; Wrap lighting; Half-Lambert; Painted shade masks; 三階明暗; 半朗伯; 包裹明暗; 手繪陰影遮罩

**Group:** Stylized rendering (NPR)
**Subcategory:** Overall Style and Outlines

## What you see

light and dark areas form two or three clearly separated levels, or transition through artist-defined color bands; highlights may also become hard-edged patches.

## Not to be confused with

toon shading does not require an outline. A ramp is a common approach, not the only algorithm for all toon shading. Normals, shadows, and ambient fill affect the bands; faces may need additional artistic controls.

## Use it for

anime, comics, limited-tone styles, and other NPR (Non-Photorealistic Rendering). Common variants include three-tone bands, hard vs soft transitions, wrap / Half-Lambert shading, and painted shade masks — methods for looks such as NPR-23, not separate cards.

## Tunable parameters

band count · ramp colors · shadow threshold · softness · specular size · ambient fill · wrap / Half-Lambert · painted shade mask

## Request prompt

In your game, add toon shading with three lighting bands (thresholds 0.35 and 0.7, transition 0.02), demonstrate wrap / Half-Lambert and one painted shade mask, and keep a hard-edged highlight patch.

## Implementation hint

Map a lighting term through an artist-authored ramp or a small set of thresholds (two-tone or three-tone), with hard or soft band boundaries. Offer wrap / Half-Lambert so faces do not fall to full black, and optional painted persistent shade masks as a coarse complement to the live ramp. SDF or edited normals can author shade shape without separate cards.

## Related

- [NPR-21](NPR-21.md) — Authored shadow colours
- [NPR-22](NPR-22.md) — Core-shadow band
- [NPR-23](NPR-23.md) — Art-directed face shadows

## References

- [Godot — Diffuse／Specular Mode](https://docs.godotengine.org/en/stable/tutorials/3d/standard_material_3d.html#diffuse-mode)
- [Unity — Feature Examples，Custom Lighting](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.0/manual/Shader-Graph-Sample-Feature-Examples.html)
