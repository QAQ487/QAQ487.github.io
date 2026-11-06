# LGT-05 · Area light

**Aliases:** Rect light; Area lights; Soft light source; Light with size

**Group:** Lighting & shadows
**Subcategory:** Light sources

## What you see

Light comes from a shape with size (a window, neon tube, TV screen, softbox) rather than a point: shadows are sharp near the contact point and grow softer with a penumbra further away; highlights on glossy surfaces take the shape of the light (rectangle, strip) instead of a tiny dot.

## Not to be confused with

Not a spot or point light (LGT-01, always hard shadows and dot highlights) and not simply blurring a hard shadow (REN-25 Cast shadows: true softness varies with distance, a blur is equally soft everywhere).

## Use it for

Window light indoors, neon and screen light, studio-style character lighting, scenes that need soft, believable light.

## Tunable parameters

shape (rect / disc / tube) · size · intensity · two-sided · shadow softness / sample count

## Request prompt

Add a rectangular area light to the game's interiors as window light (2 m × 1.2 m, colour #dfe8ff, intensity 3): compute diffuse and specular as an integral over the area (e.g. the LTC method) so the floor highlight is a rectangle; shadows are crisp at contact and softer further from the ground (penumbra width ∝ occluder-to-ground distance ÷ light-to-occluder distance × light width).

## Implementation hint

Real-time: Linearly Transformed Cosines (LTC) with two small LUT textures for diffuse+specular from polygonal lights. Soft shadows: PCSS-style variable filter width from blocker distance, or many shadow samples. Offline/baked: area lights are integrated by the lightmapper (LGT-06).

## Related

- [LGT-01](LGT-01.md) — Directional, point and spot lights
- [REN-25](REN-25.md) — Cast shadows/Soft shadows/Penumbra
- [LGT-06](LGT-06.md) — Baked lighting
- [LGT-09](LGT-09.md) — Contact shadows

## References

- [LearnOpenGL — Area lights (LTC)](https://learnopengl.com/Guest-Articles/2022/Area-Lights)
- [Wikipedia — Umbra, penumbra and antumbra](https://en.wikipedia.org/wiki/Penumbra)
- [Unity Manual — Light component](https://docs.unity3d.com/Manual/class-Light.html)
