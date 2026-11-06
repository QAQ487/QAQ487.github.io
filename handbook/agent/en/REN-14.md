# REN-14 · Parallax mapping/Parallax Occlusion Mapping (POM)

**Group:** Materials & surfaces
**Subcategory:** Material Color, Surface Detail, and Light Transmission

## What you see

at oblique angles, nearby texture details seem to hide those behind them, giving stone joints more depth than normal mapping alone.

## Not to be confused with

sampling positions are adjusted using height and viewing angle. POM is a more involved family of methods; not all parallax caused by camera movement is POM. It generally does not change the mesh silhouette, and can stretch at extreme angles. Layer/step counts, UVs, and self-shadowing affect cost and quality.

## Use it for

height-field surfaces such as brick walls, floor tiles, and pits.

## Tunable parameters

height scale · step count · refinement steps · view-angle fade · self-shadow · UV scale

## Request prompt

In your game, add POM recesses to a stone floor: use a 3 cm height range, 24 primary steps plus 4 refinement steps, fade below a 12-degree surface angle, and let nearer stones occlude texture details behind them at oblique views.

## Implementation hint

Offset texture sampling by tracing through a height field along the view direction, with bounded iteration and refinement counts. Fade or simplify the effect at grazing angles and distance to control stretching and cost.

## References

- [LearnOpenGL — Parallax Mapping（有方法比較）](https://learnopengl.com/Advanced-Lighting/Parallax-Mapping)
