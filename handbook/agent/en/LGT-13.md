# LGT-13 · Atmospheric scattering

**Aliases:** Sky model; Physically based sky; Rayleigh and Mie scattering; Aerial perspective

**Group:** Lighting & shadows
**Subcategory:** Atmosphere & volume

## What you see

The sky colour is computed by simulating sunlight scattering through the atmosphere: deep blue overhead and paler at the horizon at noon; as the sun nears the horizon its light crosses more air, so the sky and sun turn orange-red and the opposite sky goes violet-blue; distant mountains also turn bluer and fainter with distance (aerial perspective). A bright halo surrounds the sun.

## Not to be confused with

Not a hand-authored sky gradient (ENV-02, colour stops chosen by an artist); scattering derives the colours from the sun angle. Not a day-night cycle (ENV-01, tinting the whole scene), though the two are often combined so the scattering drives the day-night light colour.

## Use it for

Open worlds, flight and high-altitude scenes, day-night cycles with natural sunrises and sunsets, planet surfaces.

## Tunable parameters

Rayleigh & Mie coefficients · scale heights · Mie anisotropy g · sun intensity · sample counts · LUT resolution · aerial-perspective strength

## Request prompt

Use a single-scattering atmosphere model for the game's sky: Rayleigh coefficients (5.8, 13.5, 33.1) × 10⁻⁶ /m with an 8 km scale height; Mie 21 × 10⁻⁶ /m, 1.2 km scale height, g = 0.76; 16 samples along the view ray and 8 towards the sun; precompute into a 256×64 lookup table and refresh only when the sun moves more than 0.5°. Apply the same model as aerial perspective to distant mountains.

## Implementation hint

Ray-march the view ray through a spherical atmosphere shell; at each sample accumulate density and the optical depth towards the sun; inscatter = Σ e^(−τ)·(β_R·P_R + β_M·P_M)·ds. Bake into transmittance / sky-view LUTs (Hillaire-style) with a compute shader and sample in the sky and fog passes.

## Related

- [ENV-02](ENV-02.md) — Sky gradient
- [ENV-01](ENV-01.md) — Day-night cycle
- [LGT-12](LGT-12.md) — Height fog
- [REN-26](REN-26.md) — Fog/Distance fog/Depth fog
- [LGT-19](LGT-19.md) — Hemisphere / sky–ground ambient

## References

- [GPU Gems 2 ch.16 — Accurate atmospheric scattering](https://developer.nvidia.com/gpugems/gpugems2/part-ii-shading-lighting-and-shadows/chapter-16-accurate-atmospheric-scattering)
- [Wikipedia — Rayleigh scattering](https://en.wikipedia.org/wiki/Rayleigh_scattering)
- [Unreal Engine docs — Sky Atmosphere component](https://dev.epicgames.com/documentation/en-us/unreal-engine/sky-atmosphere-component-in-unreal-engine)
