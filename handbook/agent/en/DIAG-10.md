# DIAG-10 · Specular anti-aliasing (Toksvig / geometric roughness)

**Aliases:** 高光閃點; 金屬表面閃爍; 光滑表面跳星星; 遠處反光雪花; Sparkling highlights; Specular shimmer; Fireflies on shiny surfaces; Normal-map aliasing; Toksvig; Geometric specular AA; Roughness limiter

**Group:** Image quality & render diagnostics
**Subcategory:** Normals & specular

## What you see

Glossy metal, wet floors, car paint or surfaces with fine normal maps show dancing white sparkles as the camera moves or backs away, like a coat of glitter; with TAA they turn into smears or lingering dots. Inside one pixel the normals point in very different directions, yet a single direction is used to evaluate a very narrow highlight. Specular anti-aliasing raises roughness according to how spread out the normals within a pixel are (Toksvig in the mips, Kaplanyan-style geometric roughness in the shader), so highlights get slightly wider but stable and stop sparkling.

## Not to be confused with

Not geometric edge aliasing (REN-38, REN-39, which treat mesh edges), not texture shimmer (DIAG-03, a colour-texture sampling problem), and not Z-fighting (DIAG-05, two surfaces alternating). REN-37 lists specular sparkle as a kind of aliasing; this entry adds how to fix it at the material level.

## Use it for

Metal, wet surfaces, car paint, polished floors, fine scratch normal maps; realistic or stylised scenes that use many low-roughness materials.

## Tunable parameters

Toksvig in mip generation on/off · geometric (screen-space) roughness variance and threshold · roughness floor · TAA interaction · which materials opt in

## Request prompt

Add specular anti-aliasing to the game's PBR materials: when generating normal-map mips, keep the unnormalised average length |n| and use the Toksvig formula to raise that level's roughness, writing it back into the roughness map; in the shader, add geometric roughness: from ddx/ddy of the normal compute σ² = min(2 × (|ddx(n)|² + |ddy(n)|²), 0.18) and roughness² = clamp(roughness² + σ², 0, 1), with the cap exposed as a setting. When the camera moves slowly, the metal floor must no longer show dancing sparkles.

## Implementation hint

Toksvig: for a mip texel with averaged normal length L = |n̄|, convert roughness to a Blinn-Phong/GGX spread and widen it: ft = L / (L + s·(1 − L)) for power s, or for GGX α'² = α² + (1 − L)/L (clamped). Geometric (Kaplanyan/Tokuyoshi): dn = ddx(N), dm = ddy(N); variance = min(σ²·(dot(dn,dn) + dot(dm,dm)), threshold); α² = saturate(α² + variance). Engines expose this as a specular AA / roughness limiter setting (screen-space or on texture import); in a custom renderer it is a few lines in the BRDF prologue plus a mip-generation pass for roughness.

## Related

- [DIAG-03](DIAG-03.md) — Mipmapping and anisotropic filtering
- [DIAG-05](DIAG-05.md) — Z-fighting / depth precision / reversed-Z
- [DIAG-07](DIAG-07.md) — Detail normal blending (reoriented normal mapping)
- [MATX-02](MATX-02.md) — Clear coat, sheen and iridescence
- [MATX-05](MATX-05.md) — Wet surface
- [REN-37](REN-37.md) — Aliasing/Jaggies/Shimmering/Specular aliasing
- [REN-40](REN-40.md) — Temporal Anti-Aliasing/TAA

## References

- [Stephen Hill — Specular showdown in the wild west (specular anti-aliasing)](https://blog.selfshadow.com/2011/07/22/specular-showdown/)
- [Godot docs — 3D antialiasing (specular aliasing, screen-space and import roughness limiter)](https://docs.godotengine.org/en/stable/tutorials/3d/3d_antialiasing.html)
- [Wikipedia — Spatial anti-aliasing](https://en.wikipedia.org/wiki/Spatial_anti-aliasing)
