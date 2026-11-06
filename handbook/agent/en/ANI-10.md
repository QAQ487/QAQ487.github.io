# ANI-10 · Spring bones / Jiggle physics

**Aliases:** Secondary motion; Dynamic bones; Jiggle bones; Hair & cloth physics

**Group:** Animation, movement & physics
**Subcategory:** Animation systems

## What you see

When the character moves or stops, hair, ponytails, capes, ears and accessories lag behind from inertia, then swing back and forth like a spring a few times before settling; the sway is not hand-animated but computed live.

## Not to be confused with

Not an idle animation (ANI-04, an authored loop); spring bones react only after the body moves. Not a ragdoll (ANI-09, the whole body is physical); here only attachments sway while the body follows its animation. Not foliage sway (ENV-08, driven by wind).

## Use it for

Hair, tails, capes, accessories; adding weight to sudden stops, turns and jumps.

## Tunable parameters

stiffness · damping · gravity · drag / inertia scale · bone count · angle limits · collision spheres

## Request prompt

In your game, add spring bones to the hero’s ponytail: 3 bones, stiffness 0.15, damping 0.8, gravity 1 px/frame² each; on a sudden stop the ponytail swings forward about 20° and settles within 0.6 s after 2–3 wobbles; clamp each bone to 45° deflection so it never clips into the body.

## Implementation hint

Verlet or damped-spring simulation per bone tip after the animation pose is evaluated: tip += (tip - prevTip) * (1 - damping) + gravity; pull toward the animated rest direction by stiffness; re-constrain to bone length; write rotations back. Run at a fixed timestep for stability.

## Related

- [ANI-04](ANI-04.md) — Idle animation
- [ANI-09](ANI-09.md) — Ragdoll
- [ANI-08](ANI-08.md) — Procedural animation
- [ENV-08](ENV-08.md) — Foliage sway

## References

- [Godot docs — SpringBoneSimulator3D](https://docs.godotengine.org/en/stable/classes/class_springbonesimulator3d.html)
- [Unreal Engine docs — AnimDynamics (Animation Blueprint)](https://dev.epicgames.com/documentation/en-us/unreal-engine/animation-blueprint-animdynamics-in-unreal-engine)
- [Unity Animation Rigging — Damped Transform constraint](https://docs.unity3d.com/Packages/com.unity.animation.rigging@1.3/manual/constraints/DampedTransform.html)
