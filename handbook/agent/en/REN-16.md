# REN-16 · Alpha blending/Translucency

**Group:** Materials & surfaces
**Subcategory:** Material Color, Surface Detail, and Light Transmission

## What you see

glass, smoke, and ghosts reveal the background at intermediate opacity rather than being fully visible or invisible.

## Not to be confused with

transparency is not refraction; a transparent surface need not distort the background. Traditional alpha blending has draw-order, depth-write, and multilayer overdraw issues, but “transparent objects cannot cast shadows/reflect” describes only certain pipeline limitations, not a universal rule.

## Use it for

transparent materials, particles, and soft color layering.

## Tunable parameters

opacity · blend mode · depth write · sort priority · refraction amount · overdraw limit

## Request prompt

In your game, add a translucent ghost: use opacity 0.45 in the body and 0.7 at the rim with premultiplied alpha, allow up to four overlapping layers, and avoid obvious sorting pops from front and rear views.

## Implementation hint

Composite translucent surfaces with a defined straight- or premultiplied-alpha convention and a deliberate depth/sorting policy. Budget overlapping layers and handle shadows and reflections according to the chosen pipeline.

## References

- [Godot — Transparency（比較圖及該引擎限制）](https://docs.godotengine.org/en/stable/tutorials/3d/standard_material_3d.html#transparency)
