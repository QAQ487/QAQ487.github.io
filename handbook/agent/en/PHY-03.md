# PHY-03 · Jelly soft body (shape matching / pressure)

**Aliases:** 史萊姆彈彈的; 果凍感; 落地壓扁; Soft body; Jelly physics; Shape matching; Pressure soft body; ソフトボディ

**Group:** Animation, movement & physics
**Subcategory:** Soft bodies & deformation

## What you see

The outline is a ring of points; when hit or landing, it dents locally and squashes overall, then springs back to its rest shape with a slight wobble. A common method is shape matching: each frame find the rigid pose that best fits the current points and pull each point toward its rest-shape position; or add internal pressure inside a closed outline to preserve area.

## Not to be confused with

Not hand-keyed squash and stretch (an animation principle decided by keyframes) and not a vertex wobble shader — here the deformation is computed from the collision in real time, so every impact looks different.

## Use it for

Slime-type characters, jelly blocks, balloons, bouncy platforms, cute-style props reacting to landing and hits.

## Tunable parameters

points 12–24 · shape-match stiffness 0.1–0.5 · pressure 0–1 · damping 0.9–0.98 · rest-shape blend · reduced-motion amplitude scale (all starting points)

## Request prompt

Add a jelly soft body to the slime character: 16 outline points, pulled toward the rest shape each frame by shape matching (starting stiffness 0.3), plus internal pressure to keep its area; on landing the bottom should flatten and the sides bulge, wobbling a few times and recovering within about 0.5 s. Make the wobble amplitude adjustable and reduce it under the reduced-motion setting.

## Implementation hint

Rest offsets q_i = x0_i - c0. Each step: integrate; c = centroid; A = Σ (x_i-c) q_iᵀ; R = polar(A) (2D: angle from atan2 of A); goal g_i = c + R q_i; x_i += α (g_i - x_i). Optional pressure: push points along outward normals by k*(A0 - area)/perimeter. Collide with the floor by clamping y.

## Related

- [PHY-01](PHY-01.md) — Position-based cloth (PBD / XPBD)
- [FB-13](FB-13.md) — Squash on hit
- [ANI-09](ANI-09.md) — Ragdoll

## References

- [Wikipedia — Soft-body dynamics](https://en.wikipedia.org/wiki/Soft-body_dynamics)
- [Müller et al. 2005 — Meshless Deformations Based on Shape Matching (PDF)](https://matthias-research.github.io/pages/publications/MeshlessDeformations_SIG05.pdf)
- [Godot docs — Using SoftBody3D](https://docs.godotengine.org/en/stable/tutorials/physics/soft_body.html)
