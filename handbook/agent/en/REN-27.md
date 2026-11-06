# REN-27 · Volumetric lighting/Volumetric fog/Light shafts/God rays

**Group:** Lighting & shadows
**Subcategory:** Lighting, Occlusion, Reflections, and Atmosphere

## What you see

sunlight through windows or spotlights through smoke creates visible beams and lit/shadowed volumes in the air.

## Not to be confused with

volumetric refers to scattering/absorption in a medium; god rays describe an appearance that can also be approximated in screen space, without true volumes. Volume sampling resolution, noise, light leaking, and temporal trails involve trade-offs. Godot's Forward+ restriction is not a restriction on every engine.

## Use it for

stages, forests, churches, and smoky or dusty atmosphere.

## Tunable parameters

density · scattering · absorption · anisotropy · volume resolution · temporal weight

## Request prompt

In your game, add volumetric lighting: send sunlight through church windows into fog of density 0.04, use scattering anisotropy 0.6 and 64 samples per ray, and form three distinct soft-edged beams behind the pillars.

## Implementation hint

Integrate light scattering and extinction through a participating medium, including shadowed regions along each view path. Use jittered low-resolution sampling and guarded temporal accumulation to balance cost and stability.

## References

- [Godot — Volumetric fog and fog volumes（含示範專案入口）](https://docs.godotengine.org/en/stable/tutorials/3d/volumetric_fog.html)
