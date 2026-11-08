# NPR-24 · Cavity and ridge shading

**Aliases:** Cavity shading; Concavity darkening; Ridge highlight; Curvature shading; 凹槽暗染; 凸脊提亮; キャビティシェーディング; 凹みを落とす; エッジの強調

**Group:** Stylized rendering (NPR)
**Subcategory:** Toon shading

## What you see

Concave crevices receive extra darkening and convex ridges a slight lift, making carved detail readable even under flat light.

## Not to be confused with

Not general AO / SSAO of large occluded pockets (REN-21 / REN-22 — related, but this names the tighter curvature/cavity-ridge accent). Not an outline (REN-04). Not a terminator core shadow on a broad form (NPR-22).

## Use it for

Armor grooves, carved stone, props that must read under flat light.

## Tunable parameters

cavity amount · ridge amount · curvature scale · AO compare · harsh-light falloff (authoring defaults)

## Request prompt

Show a sculpted surface under even light → concavities darken and ridges lift according to local curvature → the accent eases if the light becomes extremely harsh and directional (document if kept as an authored overlay).

## Implementation hint

Use baked curvature/cavity maps or screen-space curvature to darken concavities and lift ridges as a stylized pass under flat light. Provide AO-only vs CAVITY+RIDGE compare.

## Related

- [REN-21](REN-21.md) — Ambient occlusion/AO/Occlusion map
- [REN-22](REN-22.md) — Screen-Space Ambient Occlusion/SSAO
- [REN-04](REN-04.md) — Outline/Contour/Inverted-hull outline
- [NPR-22](NPR-22.md) — Core-shadow band

## References

- [Wikipedia — Ambient occlusion (curvature / cavity context)](https://en.wikipedia.org/wiki/Ambient_occlusion)
- [Unreal Engine docs — Contact Shadows](https://dev.epicgames.com/documentation/en-us/unreal-engine/contact-shadows-in-unreal-engine)
