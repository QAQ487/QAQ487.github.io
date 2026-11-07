# PHY-01 · Position-based cloth (PBD / XPBD)

**Aliases:** 披風穿模; 布料像紙板; 旗幟飄動; Cloth simulation; PBD cloth; XPBD; Distance constraints; クロスシミュレーション; VAT; Vertex animation texture; Baked vertex animation; 頂點動畫貼圖; 群眾動畫; 倒塌動畫

**Group:** Animation, movement & physics
**Subcategory:** Cloth & ropes

## What you see

Capes, flags and skirts are built from a grid of particles: each step predicts new positions from velocity and gravity, then repeatedly pulls neighbouring particles back to their rest distance (distance constraints), with some vertices pinned to the shoulders or a pole. The cloth sags, lifts in the wind, stays against the body and keeps swaying slightly before it settles.

## Not to be confused with

Not spring bones (ANI-10, each bone driven by a spring, with no cloth-mesh constraints), and not vertex-shader wind sway (ENV-08, displacement only, no collision).

## Use it for

Capes, flags, curtains, skirts, tents — cloth that must react to a character or a wind field rather than replay a baked animation. A pre-recorded vertex animation is only a data carrier: it can play something that looks like cloth, a collapse (VFX-19), or a crowd, but it does not react to collision and it is not a separate picture. (Former entry MATX-09, “Vertex animation texture”, is merged here. There is no separate crowd-presentation card.)

## Tunable parameters

grid 12×16 · pinned top row · substeps 2–4 · iterations 4–8 · stretch compliance 0–1e-6 · bend compliance 1e-4 · damping 0.01–0.05 · wind dir/strength (all starting points)

## Request prompt

Add position-based cloth to the character's cape: a 12×16 particle grid with the top row pinned to the shoulder bones; update with 2–4 substeps per frame and 4–8 distance-constraint iterations per substep (starting values, tune for performance); add simple sphere/capsule colliders so it does not pass through the body, and expose wind direction and strength. When the character stops, the cape should come to rest naturally within about one second.

## Implementation hint

Per substep: v+=g*dt; xPred=x+v*dt; for k iterations: for each edge (i,j) move both toward rest length weighted by inverse mass (XPBD adds compliance α/dt²); pinned vertices have w=0; resolve sphere/capsule collisions by projecting out; v=(xPred-x)/dt; x=xPred. Build normals from the grid for shading.

## Related

- [PHY-02](PHY-02.md) — Verlet rope and chain
- [PHY-03](PHY-03.md) — Jelly soft body (shape matching / pressure)
- [ENV-08](ENV-08.md) — Foliage sway
- [ANI-10](ANI-10.md) — Spring bones / Jiggle physics
- [VFX-19](VFX-19.md) — Shatter

## References

- [Müller et al. 2006 — Position Based Dynamics (paper PDF)](https://matthias-research.github.io/pages/publications/posBasedDyn.pdf)
- [Matthias Müller — Ten Minute Physics (PBD / XPBD tutorials)](https://matthias-research.github.io/pages/tenMinutePhysics/index.html)
- [Wikipedia — Cloth modeling](https://en.wikipedia.org/wiki/Cloth_modeling)
- [Unity Manual — Cloth component](https://docs.unity3d.com/Manual/class-Cloth.html)
