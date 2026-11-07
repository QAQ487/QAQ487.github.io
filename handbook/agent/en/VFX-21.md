# VFX-21 · Voxel / geometric death disintegration

**Aliases:** 死亡時碎成方塊; 消散成小立方體; 數碼分解; Voxel disintegration; Cube burst death; Geometric dissolve; Digital disintegration; ボクセル分解

**Group:** VFX & particles
**Subcategory:** Destruction

## What you see

When a character or enemy is defeated, the body breaks up from one side into many small cubes or triangular shards; the pieces lift off the surface, spin, shrink, drift or get pulled toward a point, then vanish. Compared with a plain dissolve it has clear volume and direction, suiting blocky, tech or virtual-world settings.

## Not to be confused with

Not a dissolve (VFX-04, per-pixel transparency by a noise threshold, no pieces), not shatter (VFX-19, breaking along cracks into large chunks that fall under gravity) and not the generic death-effect category (FB-04). This is orderly small cubes or shards disintegrating in sequence from one side.

## Use it for

Enemy deaths in blocky-styled games, exits of virtual or digital characters, teleporting away, summons expiring.

## Tunable parameters

cube size 3–6 px (2D) / 3–8 cm (3D) · sweep duration 0.5–1.2 s · sweep direction · float 10–30 px · spin 90–360°/s · shrink to 0 · colour from source (starting points)

## Request prompt

Add a voxel-disintegration death: sample the character's shape into 4×4 px cubes (or 5 cm cubes in 3D) and activate them row by row in a feet-to-head scan over 0.8 s; each cube floats up 10–30 px, spins randomly and shrinks to zero while fading out (all starting values). Take each cube's colour from the matching spot on the character, and do not use a white flash.

## Implementation hint

Pre-sample the sprite/mesh into cells with colour and position; per cell: start = sweep(dot(pos, dir)) * duration; age = t - start; if age>0: pos += (drift + up)*age; angle += spin*age; scale = 1 - smoothstep(0, life, age). Render the intact character masked by the sweep front (pixels behind the front hidden) so pieces replace it seamlessly. 3D: instanced cubes or a VAT bake (PHY-01).

## Related

- [VFX-04](VFX-04.md) — Dissolve
- [VFX-19](VFX-19.md) — Shatter
- [FB-04](FB-04.md) — Death effect
- [PHY-01](PHY-01.md) — Position-based cloth (PBD / XPBD)

## References

- [Wikipedia — Voxel](https://en.wikipedia.org/wiki/Voxel)
