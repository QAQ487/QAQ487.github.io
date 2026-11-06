# CIN-03 · Scripted camera

**Aliases:** Camera takeover; Camera override; Cinematic camera blend

**Group:** Cinematics & narrative
**Subcategory:** Cinematic camera

## What you see

When an event fires, the camera stops following the player and automatically pans or pulls out to show a target (a door that opened, an enemy arriving, a distant landmark), holds, then glides back to the player.

## Not to be confused with

Not a cutscene (CIN-02); usually only the camera is taken over — time may keep running and characters do not perform. Not a camera punch-in (FB-09, a brief hit reaction).

## Use it for

Showing what a switch opened, pointing out a new objective, revealing a boss room, guiding the eye.

## Tunable parameters

travel time · easing · hold time · return blend · input/AI pause · skippable

## Request prompt

In your game, after the player pulls a lever, take over the camera: pan to the opened door over 0.8 s ease-in-out, hold 1.2 s (the door animation plays here), then return to the player over 0.8 s; lock input and pause enemies meanwhile, and show "B to skip" in a corner.

## Implementation hint

Camera "director" with prioritised virtual cameras: the event raises a scripted camera’s priority, the brain blends position/zoom between them (ease curve), then lowers it again. Keep the gameplay camera updating underneath so the return blend lands on the right spot.

## Related

- [CIN-02](CIN-02.md) — Cutscene
- [CIN-01](CIN-01.md) — Letterbox
- [FB-09](FB-09.md) — Camera punch-in
- [TRN-16](TRN-16.md) — Room transition scroll

## References

- [Cinemachine 3.1 — Camera control and transitions](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/concept-camera-control-transitions.html)
- [Cinemachine 3.1 — Blending between cameras](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineBlending.html)
- [Unreal Engine docs — Cinematic cameras](https://dev.epicgames.com/documentation/en-us/unreal-engine/cinematic-cameras-in-unreal-engine)
