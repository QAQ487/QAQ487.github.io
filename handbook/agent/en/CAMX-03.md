# CAMX-03 · Lock-on camera

**Aliases:** Target lock; Z-targeting; Lock-on targeting; Soft lock

**Group:** Camera & composition
**Subcategory:** Follow & framing rules

## What you see

After pressing the lock button a reticle appears on the target, and the camera swings behind the character and keeps facing the target; moving left or right makes the character strafe around it, so the target stays near the centre while the background sweeps past.

## Not to be confused with

Not an orbit camera (CAM-10 Orbit camera, freely rotated by the player); while locked, the facing is decided by the target. Not auto-recentering (CAM-12 Recentering, which only returns behind the character).

## Use it for

One-on-one fights in 3D action games, aiming that must keep facing an enemy, talking to distant characters.

## Tunable parameters

lock range · target selection rule · camera distance/height · aim bias between character and target · blend time · break-lock distance

## Request prompt

In your game, add a lock-on camera: pressing L1 locks the enemy within 20 m that is closest to the screen centre; place the camera on the target→character line, 4 m behind and 1.6 m above the character, aimed at a point 70% of the way from character to target; show a rotating reticle on the target; blend over 0.25 s when switching or releasing.

## Implementation hint

Camera yaw = atan2 of (target − character); position = character − dir × distance + up × height; look-at = lerp(character, target, bias). Damp yaw separately from position. Break the lock when the target dies, leaves range, or the line of sight is blocked for > 1 s.

## Related

- [CAM-10](CAM-10.md) — Orbit camera／Orbital follow
- [CAM-12](CAM-12.md) — Camera recentering／Auto-recenter
- [CAM-11](CAM-11.md) — Over-the-shoulder camera／OTS
- [CAMX-01](CAMX-01.md) — Cue-focus
- [CAMX-14](CAMX-14.md) — Third-person aim camera
- [ANI-17](ANI-17.md) — Orientation warping

## References

- [Frame Advance — Lock-on targeting](https://frameadvance.net/mechanics/lock-on-targeting/)
- [Wikipedia — The Legend of Zelda: Ocarina of Time (Z-targeting section)](https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Ocarina_of_Time)
- [Cinemachine 3.1 — Rotation Composer (aim at a look-at target)](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineRotationComposer.html)
