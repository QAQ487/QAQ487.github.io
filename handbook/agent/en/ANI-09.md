# ANI-09 · Ragdoll

**Aliases:** Ragdoll physics; Physical animation; Active ragdoll; Powered ragdoll; Hit blending; Kinetic stumble; 受擊物理混合; 物理よろめき

**Group:** Animation, movement & physics
**Subcategory:** Animation systems

## What you see

When a character is defeated or blown away, a physics engine decides live how the body falls, like a rag doll: limbs flail, steps and walls block them, and every fall is different. An "active ragdoll" variant keeps playing animation while physics pushes the body around. Hit blending (while still alive): a shot or heavy blow pushes the struck part and nearby limbs away, the torso twists or leans back, the character stumbles and the feet step out once or twice to regain balance; pushed against a wall, the body bumps into it and slides along it, then eases back into its normal animation once balanced.

## Not to be confused with

Not a death animation (ANI-06, an authored fixed fall); a ragdoll differs every time and interacts with the terrain. Not procedural animation (ANI-08, rules still drive the steps); a ragdoll hands control to physics. Hit blending is also not an authored hit reaction (ANI-05, the same reaction every time); it differs by hit direction and body part and interacts with walls.

## Use it for

Deaths, explosions, knockdowns; living enemies stumbling under fire in grounded shooters; comedic physics play; falls that fit the actual terrain.

## Tunable parameters

body count & joint limits · impulse strength & hit bone · damping · blend from animation (0.1–0.2 s) · sleep / cleanup time · active-ragdoll motor strength · hit-blend weight 0.6–0.8 & recovery 0.4–0.8 s · balance-recovery step trigger

## Request prompt

In your game, switch enemies to a ragdoll on death: copy the current animated pose and velocities into 10 rigid bodies (head, torso, pelvis, upper/lower arms, upper/lower legs) with joint limits (knees bend backward only, 0–140°); apply an impulse of about 6 m/s along the hit direction to the struck part; after 3 s, if it has come to rest, freeze it and fade it out. For living hits use hit blending: on impact raise the physics weight of the struck bone and its neighbours to 0.6–0.8 within 0.05 s, apply the hit impulse, let the foot-placement system take recovery steps when balance is lost, and blend the weight back to 0 over 0.4–0.8 s into the original animation.

## Implementation hint

Each bone maps to a rigid body plus constraint; on activation copy bone transforms and velocities from the animated pose, then each frame write simulated transforms back to the skeleton. Active ragdolls drive joint motors toward the animated pose with limited strength. Hit blending: keep the character animated, but on a hit raise a per-bone physics blend weight on the struck chain, apply the impulse, and let motors pull back toward the animated pose; if the centre of mass leaves the support area, trigger recovery steps via foot placement; collide the simulated bodies with world geometry so walls stop limbs; decay the weight back to 0.

## Related

- [ANI-06](ANI-06.md) — Death animation
- [ANI-05](ANI-05.md) — Hit reaction
- [ANI-08](ANI-08.md) — Procedural animation
- [ANI-10](ANI-10.md) — Spring bones / Jiggle physics
- [ANI-12](ANI-12.md) — Foot IK / Foot placement
- [FB-27](FB-27.md) — Part break / Component severing

## References

- [Wikipedia — Ragdoll physics](https://en.wikipedia.org/wiki/Ragdoll_physics)
- [GDC Vault — Physics driven ragdolls and animation at EA: from sports to Star Wars](https://www.gdcvault.com/play/1025210/Animation-Bootcamp-Animating-the-3rd)
- [Unreal Engine docs — Physical animation](https://dev.epicgames.com/documentation/en-us/unreal-engine/physical-animation-in-unreal-engine)
- [Godot docs — Ragdoll system](https://docs.godotengine.org/en/stable/tutorials/physics/ragdoll_system.html)
