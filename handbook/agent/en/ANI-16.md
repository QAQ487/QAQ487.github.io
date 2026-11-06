# ANI-16 · Stride warping

**Aliases:** 步幅扭曲; 腳步滑行; 跑步滑步; Foot skating; Ice-skating feet; Moonwalking; Stride scaling; Speed–animation mismatch; Pose warping; ポーズ ワープ; 歩幅

**Group:** Animation, movement & physics
**Subcategory:** Animation systems

## What you see

The game speeds the character up or down (speed boosts, carrying weight, slopes, gameplay tuning) but the run cycle stays the same: the feet slide on the ground like ice skating, or step too densely as if marching on the spot. Stride warping runs after the animation and moves both feet further apart or closer together along the movement direction by actual speed ÷ the clip's own speed, adjusting pelvis height slightly, so planted feet stop sliding without a large change in playback rate.

## Not to be confused with

Not simply changing playback rate (the steps become frantic or slow-motion), not sync groups (ANI-14, which handle phase between two clips), not foot IK (ANI-12, which handles uneven ground rather than stride length), and not distance matching (ANI-15, which handles non-looping starts and stops).

## Use it for

Characters whose movement speed changes continuously or is tuned often; one run set covering many speeds; networked characters whose speed is decided by the server.

## Tunable parameters

reference root speed per clip · scale clamp (min/max) · split between stride scale and playback rate · warp axis (velocity / facing) · pelvis adjustment · IK solver and foot bones

## Request prompt

Add stride warping to the character: record the run cycle's root-motion speed (e.g. 4.0 m/s); each frame compute scale = actual horizontal speed ÷ 4.0, clamped to 0.7–1.4; scale both feet's IK targets along the velocity direction around the pelvis, lowering the pelvis by up to 3 cm when scale < 1; cover anything outside the clamp with playback rate; then solve the legs with two-bone IK. Planted feet must not slide.

## Implementation hint

Engine-agnostic post-process on the sampled pose: s = clamp(|v_xy| / v_clip, sMin, sMax); for each foot, p' = pelvisProj + (p − pelvisProj) projected on the warp axis × s (perpendicular component unchanged); drop the pelvis by a small amount proportional to (1 − s) so legs can reach; then two-bone IK from hip to p'. Any remaining ratio (v / (v_clip × s)) goes to playback rate. Engines ship this as a stride-warping / pose-warping node (UE docs: StrideScale = LocomotionSpeed / RootMotionSpeed); a hand-rolled version reuses the foot-IK solver from ANI-12.

## Related

- [ANI-15](ANI-15.md) — Distance matching
- [ANI-17](ANI-17.md) — Orientation warping
- [ANI-12](ANI-12.md) — Foot IK / Foot placement
- [ANI-14](ANI-14.md) — Sync groups / Marker-based syncing
- [ACT-30](ACT-30.md) — Root Motion
- [ACT-36](ACT-36.md) — Inverse Kinematics / IK; Forward Kinematics / FK

## References

- [Unreal Engine docs — Pose warping (Stride / Orientation / Slope warping)](https://dev.epicgames.com/documentation/en-us/unreal-engine/pose-warping-in-unreal-engine)
- [Unreal Engine ドキュメント — ポーズ ワープ](https://dev.epicgames.com/documentation/ja-jp/unreal-engine/pose-warping-in-unreal-engine)
- [Unity Manual — Inverse Kinematics (foot / hand IK)](https://docs.unity3d.com/Manual/InverseKinematics.html)
