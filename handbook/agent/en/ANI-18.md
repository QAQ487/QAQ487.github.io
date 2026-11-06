# ANI-18 · Inertialization

**Aliases:** 慣性混合; 切換動作時突然一跳; 動作切換生硬; 交叉淡化太軟; Pose pop on transition; Snappy transitions; Crossfade feels floaty; Dead blending; Offset blending; 慣性ブレンド

**Group:** Animation, movement & physics
**Subcategory:** Animation systems

## What you see

The player presses dodge or attack. A hard cut makes the pose pop; a normal crossfade (playing both clips for 0.2 s) makes the new move feel soft and underwater, and evaluates two poses during the blend. Inertialization starts the new clip immediately and records only the offset between the old and new pose plus each bone's velocity at that instant, then decays that offset smoothly to zero over a set time, so the new move responds at once with no visible pop.

## Not to be confused with

Not ordinary animation blending / crossfading (ACT-32, which evaluates both clips during the blend), not sync groups (ANI-14, which align looping phase), and not additive animation (ACT-35, which layers an offset on top for good). Inertialization is applied briefly at the transition and evaluates only one source pose.

## Use it for

Transitions that must react instantly: dodges, hit reactions, attack cancels (ACT-24), sharp turns; scenes with many characters where blend cost matters; motion-matching or busy state-machine systems that switch often.

## Tunable parameters

blend time · decay curve (quintic / critically damped spring / dead-blending extrapolation) · per-bone vs whole-pose · handling of interrupted transitions · which transitions use it vs crossfade

## Request prompt

Add inertialization to the character's transitions: at the switch, record each bone's position and rotation offset (old pose − new pose) and the rate of change of that offset; then each frame sample only the new clip and add an offset that decays to zero over 0.2 s with a quintic polynomial or a critically damped spring; if another switch happens mid-decay, recompute the offset from the current output pose. On the frame the dodge button is pressed, the character must already be in the new move with no pop.

## Implementation hint

Engine-agnostic: at transition store x0 = prev − target and v0 = (x0 − x0_lastFrame)/dt per bone channel (positions; rotations as axis-angle of q_prev·q_target⁻¹). Each frame output = target(t) + decay(x0, v0, t). Bollo's version fits a quintic that reaches 0 with zero velocity/acceleration at blendTime (clamp so it doesn't overshoot); spring variants use a critically damped spring with half-life ≈ blendTime/4. Engines expose this as an inertialization node or transition mode in the animation graph; a hand-rolled version needs only the last two output poses.

## Related

- [ANI-14](ANI-14.md) — Sync groups / Marker-based syncing
- [ANI-15](ANI-15.md) — Distance matching
- [ANI-12](ANI-12.md) — Foot IK / Foot placement
- [ACT-32](ACT-32.md) — Animation Blending / Crossfade
- [ACT-24](ACT-24.md) — Cancel / Animation Cancel / Move Cancel
- [ACT-35](ACT-35.md) — Additive Animation / Additive Pose

## References

- [David Bollo — Inertialization: High-Performance Animation Transitions in 'Gears of War' (GDC Vault)](https://www.gdcvault.com/play/1025165/)
- [Unreal Engine docs — Animation Blueprint blend nodes (Inertialization)](https://dev.epicgames.com/documentation/en-us/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine)
- [Unreal Engine ドキュメント — アニメーション ブループリントの Blend ノード（慣性ブレンド）](https://dev.epicgames.com/documentation/ja-jp/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine)
- [Daniel Holden — Dead blending](https://theorangeduck.com/page/dead-blending)
- [Daniel Holden — Spring-It-On: The Game Developer's Spring-Roll-Call (inertialization section)](https://theorangeduck.com/page/spring-roll-call)
- [Godot docs — AnimationNodeTransition (xfade / transition)](https://docs.godotengine.org/en/stable/classes/class_animationnodetransition.html)
