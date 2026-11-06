# CAMX-11 · Fixed camera angles

**Aliases:** Fixed camera system; Static camera angles; Pre-set camera shots; Cinematic fixed cameras

**Group:** Camera & composition
**Subcategory:** Projection & lens

## What you see

Each area has a camera at a fixed position and angle, like a security camera; the character walks toward and away from it, growing and shrinking on screen, while the camera never moves; entering the next area cuts straight to another camera.

## Not to be confused with

Not a scripted camera (CIN-03, a temporary takeover during a sequence); fixed cameras are the normal gameplay camera. Not a rail camera (CAM-27 Rail camera, which moves along a track).

## Use it for

Horror, mystery, puzzle adventures; games that want filmic composition, threats hidden off-screen, or pre-rendered backgrounds.

## Tunable parameters

camera placement per zone · trigger volumes & hysteresis · cut vs short blend · input direction hold time · pan-only tracking

## Request prompt

In your game, use fixed camera angles: 1–3 cameras per room, chosen by trigger volumes; switch with a hard cut and keep the player’s movement direction unchanged for 0.5 s after the cut (so the stick direction doesn’t suddenly flip); a camera may rotate to track the character while its position stays fixed.

## Implementation hint

Store camera transforms per zone; on zone change, cut. Convert stick input to world direction using the camera that was active when the stick was last neutral to keep movement continuous across cuts. Add overlap (hysteresis) between trigger volumes to avoid flicker.

## Related

- [CIN-03](CIN-03.md) — Scripted camera
- [CAM-27](CAM-27.md) — Rail camera／Spline dolly／Camera path
- [CAM-31](CAM-31.md) — Camera cut／Hard cut
- [TRN-13](TRN-13.md) — Match cut

## References

- [Wikipedia — Virtual camera system (fixed, tracking, interactive)](https://en.wikipedia.org/wiki/Virtual_camera_system)
- [Wikipedia — Tank controls](https://en.wikipedia.org/wiki/Tank_controls)
- [Wikipedia — Pre-rendering](https://en.wikipedia.org/wiki/Pre-rendering)
- [Cinemachine 3.1 — Clear Shot (choose among fixed cameras)](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineClearShot.html)
