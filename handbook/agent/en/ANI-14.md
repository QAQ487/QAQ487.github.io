# ANI-14 · Sync groups / Marker-based syncing

**Aliases:** Animation sync; Phase matching; Sync markers; Foot sync; 走路變跑步時腳步錯亂; 滑步; Foot skating during blends; Leader / follower clips; 同期グループ; 同期マーカー

**Group:** Animation, movement & physics
**Subcategory:** Animation systems

## What you see

As a character blends from walk to run, two cycles with different stride lengths are mixed. Without syncing, one clip is at left-foot-down while the other is at right-foot-down, so the blended legs cross, jitter or slide. With syncing, both clips play at the same stride phase (for example aligned at a 'left foot down' marker), so the feet stay in step throughout the blend. One clip is the leader that sets the phase; the followers scale their playback rate to match.

## Not to be confused with

Not animation events/notifies (ACT-38, which fire footstep sounds etc. on a frame), not layered or additive blending (ACT-34, ACT-35, which mix body regions or add motion on top), and not foot IK (ANI-12, which plants the feet afterwards). Sync groups fix phase mismatch when two looping clips are blended.

## Use it for

Walk/run/sprint speed blends, crouch-walk vs stand-walk switches, directional blends (8-way locomotion), mount or quadruped gaits.

## Tunable parameters

group membership · leader selection (highest weight / always-leader / never-leader) · marker names per cycle · normalised-time vs marker sync · blend time · speed thresholds with hysteresis · which clip fires notifies

## Request prompt

Add syncing to the game's locomotion: put walk, run and sprint in one sync group; mark LeftDown and RightDown at the foot contacts of every cycle; the highest-weight clip is the leader and the rest follow by normalised phase; blend speed changes over 0.15–0.3 s with a little hysteresis so the character does not flip back and forth at the threshold speed; foot dust and footstep sounds fire once, from the leader's markers only.

## Implementation hint

Engine-agnostic: per frame, leader advances its phase p = t / length; each follower sets its own time to the same phase (time sync) or to the matching position between the same pair of markers (marker sync), and its playback rate = followerLength / leaderLength so the cycles stay aligned. Engines expose this as sync groups/markers in animation graphs, normalised-time blend trees, or a sync node; a hand-rolled blender just shares one phase accumulator across the clips in a blend space. Fire foot events from the leader only.

## Related

- [ANI-12](ANI-12.md) — Foot IK / Foot placement
- [ANI-08](ANI-08.md) — Procedural animation
- [ANI-04](ANI-04.md) — Idle animation
- [ACT-38](ACT-38.md) — Animation Event / Anim Notify / Notify State
- [ACT-34](ACT-34.md) — Animation Layers / Bone Mask / Partial-body Animation
- [ACT-35](ACT-35.md) — Additive Animation / Additive Pose
- [ANI-15](ANI-15.md) — Distance matching
- [ANI-18](ANI-18.md) — Inertialization

## References

- [Unreal Engine docs — Animation sync groups](https://dev.epicgames.com/documentation/en-us/unreal-engine/animation-sync-groups-in-unreal-engine)
- [Unreal Engine ドキュメント — アニメーションの同期グループ](https://dev.epicgames.com/documentation/ja-jp/unreal-engine/animation-sync-groups-in-unreal-engine)
- [Unity Manual — Animation blend trees (aligning clips in normalized time)](https://docs.unity3d.com/6000.0/Documentation/Manual/class-BlendTree.html)
- [Godot docs — AnimationNodeSync](https://docs.godotengine.org/en/stable/classes/class_animationnodesync.html)
