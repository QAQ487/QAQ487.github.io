# ENV-09 · Interactive grass

**Aliases:** Grass displacement; Player-reactive grass; Bending grass

**Group:** Environment, weather & time
**Subcategory:** Ground & foliage

## What you see

When a character walks through grass, nearby blades are pushed aside and bend outward, then slowly spring back after it leaves; sometimes with clipping particles.

## Not to be confused with

Not wind sway (ENV-08, independent of characters) nor footprints (ENV-10, which leave a lasting mark). Interactive grass recovers.

## Use it for

Gives characters physical contact with the world; especially effective top-down.

## Tunable parameters

influence radius · max bend · spring time · number of tracked actors · clipping particles

## Request prompt

Add interactive grass to the game: each grass tuft reads the 4 nearest character positions and, within 12 px, bends away from them by up to 4 px at the tip; after they leave it springs back with a damped spring over 0.5 s; when slashed it sprays 3–5 grass clippings.

## Implementation hint

Pass up to N actor positions in a constant buffer; in the grass vertex shader bend = sum(normalize(p-actor)*falloff(dist)) * h². For persistence/springback, render actor "stamps" into a low-res displacement render target that fades each frame, and sample it in the vertex shader.

## Related

- [ENV-08](ENV-08.md) — Foliage sway
- [ENV-10](ENV-10.md) — Footprints
- [ENV-19](ENV-19.md) — Contact-driven leaf litter

## References

- [GPU Gems ch.7 — Rendering countless blades of waving grass](https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-7-rendering-countless-blades-waving-grass)
