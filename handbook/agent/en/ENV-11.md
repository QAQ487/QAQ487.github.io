# ENV-11 · Ambient particles

**Aliases:** Floating motes; Dust motes; Fireflies; Pollen

**Group:** Environment, weather & time
**Subcategory:** Weather

## What you see

Sparse little lights or motes floating on screen: pollen, dust and drifting leaves by day, fireflies at night; slow, random in direction, long-lived.

## Not to be confused with

Not snow or rain (ENV-04/05, dense and uniformly directed) nor a pickup sparkle (VFX-16, attached to an item). Ambient particles are low-density background atmosphere.

## Use it for

Gives the image "air" and distinguishes regions (fireflies in the forest, dust in mines).

## Tunable parameters

count · drift speed · noise frequency · pulse period · colour & glow · spawn area relative to camera

## Request prompt

Add fireflies to the night forest in the game: up to 24 at once, each drifting slowly on Perlin noise (8 px/s) and pulsing on a 2–4 s period (additive, yellow-green #d8ff8a, 1 px core plus 3 px soft glow); in the daytime town use 12 faint white pollen motes drifting with the wind.

## Implementation hint

Small CPU emitter around the camera bounds; render in the additive particle batch (Blend One/One) after the light pass so fireflies stay bright at night.

## Related

- [ENV-04](ENV-04.md) — Rain
- [ENV-05](ENV-05.md) — Snow
- [VFX-16](VFX-16.md) — Pickup sparkle
- [ENV-19](ENV-19.md) — Contact-driven leaf litter

## References

- [Godot docs — 2D particle systems](https://docs.godotengine.org/en/stable/tutorials/2d/particle_systems_2d.html)
- [Unity Manual — Particle System](https://docs.unity3d.com/Manual/class-ParticleSystem.html)
