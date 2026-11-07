# ANI-11 · Look-at / Head tracking

**Aliases:** Head look; Aim offset; Look-at IK; Eye tracking; Gaze-led turn; 視線先行轉向; 視線リードターン

**Group:** Animation, movement & physics
**Subcategory:** Animation systems

## What you see

The character’s head (sometimes eyes and upper body too) turns automatically toward something of interest: an NPC turns to look as you approach, an enemy keeps staring at the player, a character glances at a pickup. The body keeps its current action; only the head turns, within an angle limit. Extend with a gaze-led turn mode: when planned direction differs by more than ~30°, eyes and head aim there 100–200 ms before the body turns; torso then feet follow (stagger like ACT-14). That makes turns feel intentional rather than robotic. Cross-link turn-in-place (ANI-19).

## Not to be confused with

Not the whole character turning (directional sprites ANI-07 or a turn) for pure look-at; the body’s facing stays the same. Not an interactable highlight (NAV-01, an outline on the object); look-at is the character’s reaction. Gaze-led is a leading mode for turns, not a separate card.

## Use it for

Makes NPCs responsive, hints at interactable things, enemy lock-on, dialogue eye contact, intentional turns.

## Tunable parameters

trigger radius · max yaw / pitch · turn speed · weight split head / neck / spine / eyes · return delay · target priority · gaze-lead 100–200 ms · body follow stagger

## Request prompt

In your game, add look-at to NPCs: when the player is within 64 px, turn the head smoothly toward them over 0.3 s, up to ±70° horizontally and ±30° vertically; beyond the limit, return the head to neutral rather than over-twisting; when the player leaves, return to the original facing within 1 s. When planned facing differs by >30°, aim eyes/head first for ~150 ms, then stagger torso and feet.

## Implementation hint

After evaluating the animation, rotate the head (and a fraction on neck/spine) toward the target direction in local space, clamped to limits and smoothed with a damped interpolation; fade the weight to 0 when the target leaves the cone. For gaze-led turns, schedule eye/head targets ahead of root yaw and stagger torso/feet like ACT-14. In 2D, swap head frames or offset the face block.

## Related

- [ANI-07](ANI-07.md) — 4-way / 8-way directional sprites
- [NAV-01](NAV-01.md) — Interactable highlight
- [ANI-12](ANI-12.md) — Foot IK / Foot placement
- [ANI-08](ANI-08.md) — Procedural animation
- [ANI-17](ANI-17.md) — Orientation warping
- [ANI-19](ANI-19.md) — Turn-in-place / Pivot step
- [ACT-14](ACT-14.md) — Overlapping Action / Drag

## References

- [Unreal Engine docs — Look At (Animation Blueprint)](https://dev.epicgames.com/documentation/en-us/unreal-engine/animation-blueprint-look-at-in-unreal-engine)
- [Unity Scripting API — Animator.SetLookAtPosition](https://docs.unity3d.com/ScriptReference/Animator.SetLookAtPosition.html)
- [Unity Animation Rigging — Multi-Aim constraint](https://docs.unity3d.com/Packages/com.unity.animation.rigging@1.3/manual/constraints/MultiAimConstraint.html)
- [Godot docs — LookAtModifier3D](https://docs.godotengine.org/en/stable/classes/class_lookatmodifier3d.html)
