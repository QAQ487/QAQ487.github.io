# CAMX-01 · Cue-focus

**Aliases:** Attention point; Point of interest framing; Camera attractor

**Group:** Camera & composition
**Subcategory:** Follow & framing rules

## What you see

When the player approaches a point of interest — a chest, an exit, a boss door — the camera stops looking only at the character and is pulled toward a point between the character and that cue; after leaving its range the camera drifts back to the character.

## Not to be confused with

Not look-ahead (CAM-06 Look-ahead, which leaves room in the movement direction); cue-focus offsets come from fixed objects in the level. Not a scripted camera (CIN-03, which takes control away); the player keeps playing throughout.

## Use it for

Signalling "something is here", keeping important objects in frame, steering the eye without interrupting play.

## Tunable parameters

influence radius · weight · falloff curve · smoothing time · max offset · priority when cues overlap

## Request prompt

In your game, add cue-focus to points of interest: each cue has a 96 px influence radius and a 0–1 weight; inside the radius, camera target = character + (cue − character) × weight × (1 − distance/radius), default weight 0.45; the camera reaches the target with a 0.35 s smoothing time and eases back to the character the same way when leaving.

## Implementation hint

Keep a list of cue volumes; each frame sum weighted offsets (weight × falloff(distance)) from the followed target, clamp the total offset, then feed the result into the normal follow/damping step instead of moving the camera directly. Apply camera bounds last.

## Related

- [CAM-06](CAM-06.md) — Look-ahead／Projected-focus
- [CAM-08](CAM-08.md) — Region-focus
- [CIN-03](CIN-03.md) — Scripted camera
- [NAV-01](NAV-01.md) — Interactable highlight

## References

- [Itay Keren — Scroll Back: The Theory and Practice of Cameras in Side-Scrollers (Game Developer)](https://www.gamedeveloper.com/design/scroll-back-the-theory-and-practice-of-cameras-in-side-scrollers)
- [Cinemachine 3.1 — Target Group](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineTargetGroup.html)
