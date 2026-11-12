# CAMX-13 · Camera banking

**Aliases:** Roll on turn; Camera lean; Bank into turns; Camera roll

**Group:** Camera & composition
**Subcategory:** Camera moves & cuts

## What you see

A chase camera tilts toward the inside of a turn as the vehicle corners, tipping the horizon a few degrees; sharper turns tilt more, and it slowly levels out on straights. The roll lags slightly behind the steering, adding a sense of speed and centrifugal force.

## Not to be confused with

Not a Dutch angle (CAM-26 Dutch angle, a static composition choice); banking is a dynamic roll that follows the steering in real time. Not screen shake (FB-07, random jitter).

## Use it for

Racing, flying, skating/skiing, fast third-person movement sections.

## Tunable parameters

roll gain · max roll · roll smoothing vs yaw smoothing · drift multiplier · comfort toggle

## Request prompt

In your game, add camera banking: roll angle = turn rate × 0.12, clamped to ±10°, reached with a 0.3 s smoothing time (slower than yaw); raise the limit to ±14° while drifting; level out over 0.5 s on straights; add a "reduce camera motion" option that disables the roll.

## Implementation hint

Compute target roll from yaw rate (or lateral acceleration), damp it with its own spring, and apply it as a rotation around the camera’s forward axis after look-at. Keep the follow rig on the vehicle’s flattened heading so the vehicle’s own roll does not whip the horizon.

## Related

- [CAM-26](CAM-26.md) — Dutch angle／Canted angle
- [FB-07](FB-07.md) — Trauma-based screen shake
- [CAM-04](CAM-04.md) — Camera damping／Follow smoothing／Camera lag
- [PIX-20](PIX-20.md) — Mode 7 and raster effects
- [ANI-20](ANI-20.md) — Locomotion lean / Body banking
- [ACT-51](ACT-51.md) — Planetoid gravity / Spherical gravity

## References

- [Unity Discussions — arcade vehicle camera: "banking when turning"](https://discussions.unity.com/t/arcade-vehicle-physics-w-drifting-advice-needed/820285)
- [RCCP docs — Cameras (cornering lean / roll settings)](https://bonecrackergames.com/bonecrackergames.com/admin/AssetStoreDemos/RCCP/New12/Documentation/HTML/07_cameras.html)
- [Cinemachine 3.1 — Cinemachine Camera (lens incl. Dutch roll)](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineCamera.html)
- [Wikipedia — Banked turn](https://en.wikipedia.org/wiki/Banked_turn)
