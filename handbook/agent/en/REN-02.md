# REN-02 · Unlit/Unshaded

**Group:** Stylized rendering (NPR)
**Subcategory:** Overall Style and Outlines

## What you see

an object retains its original color when it enters shadow; it may resemble illustration, UI, or a self-lit graphic.

## Not to be confused with

this does not mean “no shader,” nor does it mean emission that lights other objects. Post-processing, exposure, and tone mapping can still change the final color; a single image may not distinguish unlit materials from materials with painted lighting.

## Use it for

hand-painted styles, UI, effects, and lighting painted directly into textures.

## Tunable parameters

tint · texture · opacity · emission value · depth mode · tone-map bypass

## Request prompt

In your game, add an unlit flat-color material: render the quest icon in #4DE1FF, keep the same color in fully dark shadow, and hold its size at 4% of screen height.

## Implementation hint

Render the surface from its texture and tint without evaluating scene lights. Decide explicitly whether exposure, tone mapping, fog, and depth testing still affect the result.

## References

- [Godot — Standard Material 3D，Shading mode](https://docs.godotengine.org/en/stable/tutorials/3d/standard_material_3d.html#shading-mode)
