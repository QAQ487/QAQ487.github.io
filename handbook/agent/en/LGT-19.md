# LGT-19 · Hemisphere / sky–ground ambient

**Aliases:** Hemisphere lighting; Sky–ground ambient; SH ambient; Zenith–nadir tint; 天空—地面半球環境光; 半球ライティング; 空と地面のアンビエント

**Group:** Lighting & shadows
**Subcategory:** Indirect light & shadows

## What you see

Upward-facing surfaces pick up sky colour; downward-facing surfaces pick up ground bounce colour. The fill has a vertical gradient of hue, not a single grey ambient.

## Not to be confused with

Not full GI / colour bleeding (REN-20). Not a global grade (REN-32). Not height fog (LGT-12).

## Use it for

Outdoor characters, cheap ambient, stylized scenes that need sky vs ground fill.

## Tunable parameters

sky colour · ground colour · normal.y remap · optional weak key (authoring defaults)

## Request prompt

Light a scene with only ambient (or a weak key plus ambient) → object tops vs undersides → tops lean sky-coloured, undersides lean ground-coloured, with a smooth term based on normal.y → restore a flat ambient on disable.

## Implementation hint

ambient = lerp(groundColour, skyColour, saturate(n.y*0.5+0.5)). Evaluate in the shading model as the ambient term. Optionally add a dim directional key.

## Related

- [REN-20](REN-20.md) — Global illumination/GI/Indirect lighting/Color bleeding
- [LGT-13](LGT-13.md) — Atmospheric scattering
- [REN-32](REN-32.md) — Color grading/LUT/White balance

## References

- [Wikipedia — Diffuse reflection (hemisphere lighting context)](https://en.wikipedia.org/wiki/Diffuse_reflection)
- [Unity Manual — Light Probes](https://docs.unity3d.com/Manual/LightProbes.html)
