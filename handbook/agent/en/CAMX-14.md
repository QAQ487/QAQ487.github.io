# CAMX-14 · Third-person aim camera

**Aliases:** 越肩瞄準; 準星打不中; 子彈打到牆; 準星與槍口不一致; Crosshair lies; Bullets hit the wall beside cover; Muzzle vs camera ray; Shoulder swap; Aim down sights zoom; Camera-ray targeting; Parallax aiming error

**Group:** Camera & composition
**Subcategory:** Follow & framing rules

## What you see

Holding aim in an over-the-shoulder view: the camera pushes in, FOV narrows, and the crosshair stays at screen centre. Aimed at a distant enemy, shots hit; but when the character stands beside cover and the line from the muzzle is blocked, the bullet hits the wall while the crosshair still shows the enemy. The fix is to cast a ray from the camera through the crosshair to find the true hit point, aim the muzzle at that point, and switch the crosshair to a 'blocked' marker when the muzzle's path is obstructed; when hugging a wall on the right, swap to the left shoulder.

## Not to be confused with

Not the over-the-shoulder camera itself (CAM-11 defines camera position and framing only), not camera collision or occlusion avoidance (CAM-14, CAM-15, which stop the camera clipping walls), not the lock-on camera (CAMX-03, where the target decides facing), and not fire kick (FB-08) or shake (FB-07). This entry is about the crosshair, camera and muzzle disagreeing.

## Use it for

Third-person shooting, bows, throwing and spell aiming; cover shooting; narrow corridors that need left/right shoulder swapping.

## Tunable parameters

shoulder offset (side/up/back) · aim FOV and blend time · camera-ray max distance and collision layers · muzzle-block check · blocked-crosshair style · shoulder-swap trigger (button / wall proximity) · aim sensitivity scale

## Request prompt

Add a third-person aim camera to the game: on aim, move the camera within 0.15 s to a right-shoulder offset (0.5 m right, 0.2 m up, 1.5 m back) and narrow FOV from 60° to 45°; each frame cast a ray from the camera centre through the crosshair and take the nearest hit; fire from the muzzle towards that point; if the muzzle-to-point segment is blocked, turn the crosshair into a grey X and show a small dot where the shot will actually land; on the swap button, or when a wall is within 0.4 m on the right, move to the left shoulder over 0.2 s. The crosshair must never show a target that cannot actually be hit.

## Implementation hint

Engine-agnostic: aimPoint = raycast(camPos, camForward, maxDist) or camPos + camForward × maxDist on miss; shotDir = normalize(aimPoint − muzzlePos); if raycast(muzzlePos, shotDir) hits before aimPoint, project that hit to screen and draw the 'blocked' marker there. Ignore hits closer than the character to the camera (start the camera ray at the character's depth). Shoulder offset = lerp(side, −side, swapT) applied in camera space before camera collision (CAM-14). Engines ship this as a third-person follow + aim extension; a hand-rolled version is two raycasts per frame.

## Related

- [CAMX-03](CAMX-03.md) — Lock-on camera
- [ANI-17](ANI-17.md) — Orientation warping
- [FB-07](FB-07.md) — Trauma-based screen shake
- [FB-08](FB-08.md) — Camera kick
- [CAM-11](CAM-11.md) — Over-the-shoulder camera／OTS
- [CAM-14](CAM-14.md) — Camera collision／Collision resolution
- [CAM-15](CAM-15.md) — Occlusion avoidance／Deocclusion
- [CAM-19](CAM-19.md) — Zoom／Lens zoom

## References

- [Cinemachine 3.1 manual — Third Person Aim extension](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineThirdPersonAim.html)
- [Cinemachine 3.1 manual — Third Person Follow (shoulder offset, camera side)](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineThirdPersonFollow.html)
