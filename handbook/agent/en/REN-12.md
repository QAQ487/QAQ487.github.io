# REN-12 · Emission/Emissive/Self-illumination

**Group:** Materials & surfaces
**Subcategory:** Material Color, Surface Detail, and Light Transmission

## What you see

signs, magical markings, or mechanical eyes retain color and brightness in darkness.

## Not to be confused with

emission is a surface output; it does not automatically light nearby walls—that depends on GI or separately placed lights. It also does not automatically produce bloom; the surface can remain bright with bloom disabled. Any sufficiently bright pixel can trigger bloom, not only emissive materials.

## Use it for

luminous components, energy effects, and the appearance of light-source surfaces.

## Tunable parameters

emission color · intensity · mask · pulse rate · GI contribution · exposure response

## Request prompt

In your game, add an emissive surface: render the mechanical eye in #FF3B2F at intensity 8 so it remains visible in darkness, and add a separate red light with a 1.5 m radius for the wall; the eye must stay bright with bloom disabled.

## Implementation hint

Add radiance from an emissive mask independently of direct illumination. If nearby surfaces must receive light, feed emission into an indirect-lighting solution or pair it with an explicit light source.

## References

- [Godot — Emission](https://docs.godotengine.org/en/stable/tutorials/3d/standard_material_3d.html#emission)
- [Unreal — Post Process Effects，Bloom／GI](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-effects-in-unreal-engine)
