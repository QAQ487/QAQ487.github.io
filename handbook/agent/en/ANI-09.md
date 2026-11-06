# ANI-09 · Ragdoll

**Aliases:** Ragdoll physics; Physical animation; Active ragdoll; Powered ragdoll

**Group:** Animation, movement & physics
**Subcategory:** Animation systems

## What you see

When a character is defeated or blown away, a physics engine decides live how the body falls, like a rag doll: limbs flail, steps and walls block them, and every fall is different. An "active ragdoll" variant keeps playing animation while physics pushes the body around.

## Not to be confused with

Not a death animation (ANI-06, an authored fixed fall); a ragdoll differs every time and interacts with the terrain. Not procedural animation (ANI-08, rules still drive the steps); a ragdoll hands control to physics.

## Use it for

Deaths, explosions, knockdowns; comedic physics play; falls that fit the actual terrain.

## Tunable parameters

body count & joint limits · impulse strength & hit bone · damping · blend from animation (0.1–0.2 s) · sleep / cleanup time · active-ragdoll motor strength

## Request prompt

In your game, switch enemies to a ragdoll on death: copy the current animated pose and velocities into 10 rigid bodies (head, torso, pelvis, upper/lower arms, upper/lower legs) with joint limits (knees bend backward only, 0–140°); apply an impulse of about 6 m/s along the hit direction to the struck part; after 3 s, if it has come to rest, freeze it and fade it out.

## Implementation hint

Each bone maps to a rigid body plus constraint; on activation copy bone transforms and velocities from the animated pose, then each frame write simulated transforms back to the skeleton. Active ragdolls drive joint motors toward the animated pose with limited strength.

## Related

- [ANI-06](ANI-06.md) — Death animation
- [ANI-05](ANI-05.md) — Hit reaction
- [ANI-08](ANI-08.md) — Procedural animation
- [ANI-10](ANI-10.md) — Spring bones / Jiggle physics

## References

- [Wikipedia — Ragdoll physics](https://en.wikipedia.org/wiki/Ragdoll_physics)
- [GDC Vault — Physics driven ragdolls and animation at EA: from sports to Star Wars](https://www.gdcvault.com/play/1025210/Animation-Bootcamp-Animating-the-3rd)
- [Unreal Engine docs — Physical animation](https://dev.epicgames.com/documentation/en-us/unreal-engine/physical-animation-in-unreal-engine)
- [Godot docs — Ragdoll system](https://docs.godotengine.org/en/stable/tutorials/physics/ragdoll_system.html)
