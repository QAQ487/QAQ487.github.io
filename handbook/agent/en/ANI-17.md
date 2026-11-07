# ANI-17 · Orientation warping

**Aliases:** 方向扭曲; 斜向移動腳步交叉; 側移時腳打交叉; Strafing feet cross; Diagonal moonwalk; Locomotion angle warp; 8-way blend artefacts; Pose warping; ポーズ ワープ

**Group:** Animation, movement & physics
**Subcategory:** Animation systems

## What you see

The character aims forward while moving diagonally or sideways. With only forward, back, left and right clips, a 45° direction is a blend of two clips and the feet cross, tangle or slide. Orientation warping plays just the nearest clip (say, run forward), rotates the lower body (pelvis and legs) to the real movement direction, and spreads the opposite rotation across the spine bones, so the chest and weapon keep facing the aim direction and the steps stay clean.

## Not to be confused with

Not look-at / aim offset (ANI-11, which only turns the head and upper body to point at a target), not stride warping (ANI-16, which handles stride length), and not sync groups (ANI-14, which handle phase). Orientation warping handles the angle between movement direction and facing direction.

## Use it for

Strafing in third-person shooters and action games; circling an enemy while locked on (CAMX-03); characters that only have 4- or 8-way locomotion clips but must move at any angle.

## Tunable parameters

locomotion angle source (velocity vs facing) · cardinal clip set (4 / 8-way) · max warp angle · pelvis vs spine weight distribution · rotation axis · interpolation speed · disable during starts/pivots

## Request prompt

Add orientation warping to the character: compute the angle between movement direction and facing; play the nearest cardinal clip (forward/back/left/right); apply the remaining angle (up to ±45°) to the pelvis, and give the counter-rotation to three spine bones in 0.2/0.3/0.5 shares so the chest keeps its facing; smooth the angle over 0.1 s to avoid jitter when the stick flicks. Feet must not cross on diagonals.

## Implementation hint

Engine-agnostic post-process: angle = signed angle(facing, velocity); choose cardinal clip k minimising |angle − θk|; residual r = angle − θk (clamped). Rotate the root/pelvis by r about up-axis, then counter-rotate spine bones by −r × w_i (Σw_i = 1) so the chest's world yaw is unchanged; feet follow via IK so they stay planted. Engines ship this as an orientation-warping / pose-warping node; a hand-rolled version is a few bone rotations after sampling plus the foot-IK pass from ANI-12.

## Related

- [ANI-16](ANI-16.md) — Stride warping
- [ANI-11](ANI-11.md) — Look-at / Head tracking
- [ANI-14](ANI-14.md) — Sync groups / Marker-based syncing
- [ANI-12](ANI-12.md) — Foot IK / Foot placement
- [CAMX-03](CAMX-03.md) — Lock-on camera
- [CAMX-14](CAMX-14.md) — Third-person aim camera
- [ACT-33](ACT-33.md) — Blend Space / Blend Tree
- [ANI-19](ANI-19.md) — Turn-in-place / Pivot step

## References

- [Unreal Engine docs — Pose warping (Stride / Orientation / Slope warping)](https://dev.epicgames.com/documentation/en-us/unreal-engine/pose-warping-in-unreal-engine)
- [Unreal Engine ドキュメント — ポーズ ワープ](https://dev.epicgames.com/documentation/ja-jp/unreal-engine/pose-warping-in-unreal-engine)
