# REN-27 · Volumetric lighting/Volumetric fog/Light shafts/God rays

**Aliases:** Dust motes in shafts; God-ray dust; 光柱塵埃; 光束中的浮塵; 光線の中の塵

**Group:** Lighting & shadows
**Subcategory:** Lighting, Occlusion, Reflections, and Atmosphere

## What you see

sunlight through windows or spotlights through smoke creates visible beams and lit/shadowed volumes in the air.

## Not to be confused with

volumetric refers to scattering/absorption in a medium; god rays describe an appearance that can also be approximated in screen space, without true volumes. Volume sampling resolution, noise, light leaking, and temporal trails involve trade-offs. Godot's Forward+ restriction is not a restriction on every engine.

## Use it for

stages, forests, churches, and smoky or dusty atmosphere. Dust motes inside light shafts brighten in the beam and dim outside it, reinforcing the volume; ambient floating particles are ENV-11 — they can share a scene but are not this entry. Forest canopy shafts shaped by leaf gaps over a dark woodland path are LGT-15 (木漏れ日) — that forest picture, not bouncing ground spots.

## Tunable parameters

density · scattering · absorption · anisotropy · volume resolution · temporal weight · mote count · mote brightness in/out of beam

## Request prompt

In your game, add volumetric lighting with shaft motes: send sunlight through church windows into fog of density 0.04, anisotropy 0.6, 64 samples per ray; form three soft-edged beams behind pillars, and brighten about 12 dust motes inside the beams while dimming them outside.

## Implementation hint

Integrate light scattering and extinction through a participating medium, including shadowed regions along each view path. Seed sparse bright motes that brighten inside beams and dim outside; use jittered low-resolution sampling and guarded temporal accumulation.

## Related

- [ENV-11](ENV-11.md) — Ambient particles
- [LGT-15](LGT-15.md) — Komorebi / canopy light shafts

## References

- [Godot — Volumetric fog and fog volumes（含示範專案入口）](https://docs.godotengine.org/en/stable/tutorials/3d/volumetric_fog.html)
