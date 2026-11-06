# PIX-21 · Normal-mapped sprites

**Aliases:** 2D normal mapping; Dynamic 2D lighting; Lit sprites

**Group:** 2D & pixel-art techniques
**Subcategory:** Lighting

## What you see

Each pixel sprite gets a matching "normal map" storing which way every pixel's surface faces; as torches, lanterns or spells move nearby, the side facing the light brightens and the far side darkens, so the sprite looks three-dimensional while the artist still draws one flat image.

## Not to be confused with

Not 2D shadow casting (PIX-22, where objects block light and cast shadows on the ground) and not baked shading (which never changes as lights move). To stay pixel-art, the lighting is usually quantised to 2–4 brightness steps instead of a smooth gradient.

## Use it for

Night, caves and torch lighting; makes moving lights (fireballs, lanterns) interact with sprites.

## Tunable parameters

light height z · falloff radius · quantisation steps (2–4) · ambient level · normal map authoring (hand-painted vs generated from height)

## Request prompt

Add normal-mapped 2D lighting to the game at night: houses, stone walls, barrels and characters each get a normal map; every lantern/torch is a point light with a height z; the pixel shader computes N·L with distance falloff, quantises the result to 3 steps (dark, mid, bright) and multiplies the sprite colour, keeping the pixel look. Up to 8 lights at once.

## Implementation hint

Bind the normal map as a second SRV with the same UVs and a point sampler. PS: n = normalize(nTex.xyz*2−1); for each light in a cbuffer array: L = normalize(float3(light.xy − worldPx.xy, light.z)); d += saturate(dot(n,L)) * atten; lit = floor(d*steps)/steps. Use worldPx in base-res pixels so quantisation bands stay pixel-aligned.

## Related

- [PIX-22](PIX-22.md) — 2D shadow casting
- [ENV-01](ENV-01.md) — Day-night cycle
- [PIX-08](PIX-08.md) — Dithering

## References

- [Wikipedia — Normal mapping](https://en.wikipedia.org/wiki/Normal_mapping)
- [Godot docs — 2D lights and shadows](https://docs.godotengine.org/en/stable/tutorials/2d/2d_lights_and_shadows.html)
- [mattdesl — ShaderLesson6: normal mapping for 2D sprites](https://github.com/mattdesl/lwjgl-basics/wiki/ShaderLesson6)
