# REN-20 · Global illumination/GI/Indirect lighting/Color bleeding

**Aliases:** Color bleeding; 反彈染色; Bounced light colour

**Group:** Lighting & shadows
**Subcategory:** Lighting, Occlusion, Reflections, and Atmosphere

## What you see

areas without direct lighting still receive soft light; a white object near a red wall picks up a slight red tint.

## Not to be confused with

GI describes light-transport effects/a computational domain. Lightmaps, probes, voxels, screen-space methods, and ray/path tracing can all contribute; they are not one algorithm. Static baking struggles to respond to dynamic changes, while real-time methods have their own noise, update, or data-coverage limits. Lumen is Unreal's system name, not a generic name for GI.

## Use it for

coherent lighting in interiors and shadows; stylized scenes can exaggerate or reduce bounce lighting. Fixed indoor light can tint a white object slightly red beside a red wall. That is the indirect-light picture; precomputing it is only one method. (The colour-bleed example from former entry LGT-06 is merged here; soft shadows are REN-25.)

## Tunable parameters

bounce count · indirect intensity · update rate · probe spacing · color bleed · denoise radius

## Request prompt

In your game, add global illumination: compute at least one bounce in the small room at indirect intensity 0.8, tint a white box within 0.5 meters of a red wall by about 10%, and update within 0.3 seconds after a door moves.

## Implementation hint

Capture or solve indirect diffuse and specular transport with a method suited to scene motion and scale. Blend spatial data smoothly, limit leaks, and keep direct lighting independently controllable.

## Related

- [LGT-18](LGT-18.md) — Character–environment lighting separation
- [LGT-19](LGT-19.md) — Hemisphere / sky–ground ambient
- [NPR-21](NPR-21.md) — Authored shadow colours

## References

- [Unreal — Post Process Effects，Global Illumination](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-effects-in-unreal-engine)
