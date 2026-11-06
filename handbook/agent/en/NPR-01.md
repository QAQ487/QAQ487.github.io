# NPR-01 · Gooch shading

**Aliases:** Gooch lighting; Cool-to-warm shading; Technical illustration shading

**Group:** Stylized rendering (NPR)
**Subcategory:** Toon shading

## What you see

The lit side of an object leans warm (yellow, orange) and the side facing away does not go black but turns a cool blue-violet; the form blends smoothly from warm to cool, with black outlines and a small pure-white highlight, like a technical illustration or product diagram.

## Not to be confused with

Not toon shading (REN-03, which cuts light and dark into a few hard bands); Gooch is a smooth ramp whose point is “shadows go cool, not black”. Not rim lighting (REN-05, which only brightens the silhouette edge).

## Use it for

Technical explanations, build/edit-mode previews, tutorial levels, object viewers where form must read under any lighting.

## Tunable parameters

cool colour · warm colour · base-colour mix (α, β) · highlight exponent & threshold · outline width

## Request prompt

Add Gooch shading to the game’s objects: k=(1+N·L)/2; cool = (0,0,0.55)+0.25×base colour, warm = (0.6,0.6,0)+0.5×base colour, final = lerp(cool, warm, k); shadow brightness never below 0.15. Add 1–2 px black outlines (depth + normal edges) and a hard white highlight with Blinn-Phong exponent 48 thresholded at 0.55. Let the viewer rotate the light; key light about 45° above the horizon.

## Implementation hint

Per pixel: k = 0.5 + 0.5*dot(N, L); kCool = coolBlue + alpha*albedo; kWarm = warmYellow + beta*albedo; col = lerp(kCool, kWarm, k). Add a thresholded Blinn-Phong highlight (step(t, pow(dot(N,H), e))) in white and an edge-detection or inverted-hull outline. No ambient term is needed — the cool tone is the “ambient”.

## Related

- [REN-03](REN-03.md) — Toon shading/Cel shading/Ramp shading
- [REN-05](REN-05.md) — Rim lighting/Rim light
- [NPR-03](NPR-03.md) — Edge-detection outline
- [LGT-01](LGT-01.md) — Directional, point and spot lights

## References

- [Wikipedia — Gooch shading](https://en.wikipedia.org/wiki/Gooch_shading)
- [Gooch, Gooch, Shirley, Cohen — A Non-Photorealistic Lighting Model for Automatic Technical Illustration (SIGGRAPH 98)](https://users.cs.northwestern.edu/~ago820/SIG98/abstract.html)
- [Wikipedia — Non-photorealistic rendering](https://en.wikipedia.org/wiki/Non-photorealistic_rendering)
