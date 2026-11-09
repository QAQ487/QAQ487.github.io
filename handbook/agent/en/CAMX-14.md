# CAMX-14 · Third-person aim camera

**Aliases:** 越肩瞄準; 準星打不中; 子彈打到牆; 準星與槍口不一致; Crosshair lies; Bullets hit the wall beside cover; Muzzle vs camera ray; Shoulder swap; Aim down sights zoom; Camera-ray targeting; Parallax aiming error; Melee-aim swap; Instant aim from melee; Gun mode swap; 近戰瞄準即時切換; 即時瞄準; 近接と射撃の即時切替

**Group:** Camera & composition
**Subcategory:** Follow & framing rules

## What you see

Holding aim in an over-the-shoulder view: the camera pushes in, FOV narrows, and the crosshair stays at screen centre. Aimed at a distant enemy, shots hit; but when the character stands beside cover and the line from the muzzle is blocked, the bullet hits the wall while the crosshair still shows the enemy. The fix is to cast a ray from the camera through the crosshair to find the true hit point, aim the muzzle at that point, and switch the crosshair to a 'blocked' marker when the muzzle's path is obstructed; when hugging a wall on the right, swap to the left shoulder. Variant — instant melee ↔ aim swap: in the middle of melee, holding aim pulls the camera to the shoulder almost at once, the crosshair appears and the carried gun or device goes straight into a firing pose, with no animation of putting the melee weapon away and drawing a gun; releasing aim or pressing melee snaps the camera back to the normal follow distance and the character attacks straight away.

## Not to be confused with

Not the over-the-shoulder camera itself (CAM-11 defines camera position and framing only), not camera collision or occlusion avoidance (CAM-14, CAM-15, which stop the camera clipping walls), not the lock-on camera (CAMX-03, where the target decides facing), and not fire kick (FB-08) or shake (FB-07). This entry is about the crosshair, camera and muzzle disagreeing. For the instant swap, the point is that there is no weapon-swap animation between the two stances, not the ray itself.

## Use it for

Third-person shooting, bows, throwing and spell aiming; cover shooting; narrow corridors that need left/right shoulder swapping; melee-and-shooting hybrids, such as characters who fire through a companion drone or a sidearm.

## Tunable parameters

shoulder offset (side/up/back) · aim FOV and blend time · camera-ray max distance and collision layers · muzzle-block check · blocked-crosshair style · shoulder-swap trigger (button / wall proximity) · aim sensitivity scale · instant melee ↔ aim swap: blend in/out time (≈ 0.1–0.15 s), skip weapon-swap animation, melee input cancels aim, melee lock-on released while aiming

## Request prompt

Add a third-person aim camera to the game: on aim, move the camera within 0.15 s to a right-shoulder offset (0.5 m right, 0.2 m up, 1.5 m back) and narrow FOV from 60° to 45°; each frame cast a ray from the camera centre through the crosshair and take the nearest hit; fire from the muzzle towards that point; if the muzzle-to-point segment is blocked, turn the crosshair into a grey X and show a small dot where the shot will actually land; on the swap button, or when a wall is within 0.4 m on the right, move to the left shoulder over 0.2 s. The crosshair must never show a target that cannot actually be hit. Optional instant melee ↔ aim swap: when aim is held during melee, move the camera to the shoulder in about 0.1–0.15 s and show the crosshair, skip the weapon-swap animation, go straight into the firing pose and release the melee lock-on for the duration; on releasing aim or pressing melee, return the camera at the same speed and start the melee move on the same frame. Accept: going melee → aim → melee back and forth never waits on a sheathe or draw.

## Implementation hint

Engine-agnostic: aimPoint = raycast(camPos, camForward, maxDist) or camPos + camForward × maxDist on miss; shotDir = normalize(aimPoint − muzzlePos); if raycast(muzzlePos, shotDir) hits before aimPoint, project that hit to screen and draw the 'blocked' marker there. Ignore hits closer than the character to the camera (start the camera ray at the character's depth). Shoulder offset = lerp(side, −side, swapT) applied in camera space before camera collision (CAM-14). Engines ship this as a third-person follow + aim extension; a hand-rolled version is two raycasts per frame. Instant melee ↔ aim swap: treat aim as an upper-body layer and camera state that can enter from any melee state; on aim-down, start the shoulder blend and the firing pose immediately without a weapon-swap state, and suspend melee lock-on; on aim-up or a melee press, reverse the blend at the same rate and let the melee input fire on that frame.

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
- [Game8 — Stellar Blade: How to Use Ranged Attacks (hold L2 to aim; aiming disengages melee focus)](https://game8.co/games/Stellar-Blade/archives/452514)
- [Game Rant — Stellar Blade gun (hold L2 and the drone quickly mounts on the arm)](https://gamerant.com/stellar-blade-how-unlock-use-gun-ammo/)
