# REN-37 · Aliasing/Jaggies/Shimmering/Specular aliasing

**Group:** Image quality & render diagnostics
**Subcategory:** Clarity, Shimmering, and Residual Images

## What you see

diagonal edges look like stairs; distant grass, wire fences, and thin highlights flicker during movement.

## Not to be confused with

aliasing is a family of undersampling phenomena, not only jagged geometric silhouettes. Texture detail, shader highlights, and temporal sampling can each have issues; raising resolution or adding MSAA alone may not fix everything.

## Use it for

usually an artifact to address; retro styles may deliberately retain a hard-pixel look.

## Tunable parameters

render scale · sample rate · texture filtering · roughness floor · LOD bias · temporal stability

## Request prompt

In your game, audit and reduce aliasing: at 1080p and 60 fps, pan past a wire fence for 10 seconds, record silhouette jaggies, thin-line shimmer, and specular sparkle separately, and reduce each visible artifact by at least 70% from baseline.

## Implementation hint

Diagnose aliasing by separating silhouette, texture, specular, and temporal undersampling. Address each source with appropriate sampling, filtering, level-of-detail, or material bandwidth controls rather than one universal switch.

## References

- [Godot — 3D antialiasing，Introduction／比較圖](https://docs.godotengine.org/en/stable/tutorials/3d/3d_antialiasing.html)
