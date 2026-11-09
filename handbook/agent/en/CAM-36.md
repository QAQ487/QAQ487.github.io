# CAM-36 · Contextual finisher / Environmental takedown

**Aliases:** Environmental takedown; Contextual finisher; Environmental kill; Context-sensitive execution; Finisher staging; 場景處決; 環境終結技; 環境テイクダウン; 状況フィニッシュ

**Group:** Camera & composition
**Subcategory:** Composition and Cinematics

## What you see

When an enemy can be finished, the finisher changes with the surroundings: next to a wall the enemy is slammed into it, beside low cover they are pinned over it, and on open ground a standard takedown plays. At the start both characters snap quickly into position and facing against the wall or cover, and the camera cuts to a side close-up; the killing blow lands with a short freeze and shake, then the camera eases back to the normal follow view and control returns.

## Not to be confused with

Not a kill cam (CIN-04 — a replay after the kill). Not a quick time event (CIN-15 — advanced by button prompts). Not a freeze-frame finisher (FB-11 — the whole frame freezes on the last hit, regardless of surroundings). This card is a finisher whose pose and camera are chosen by nearby geometry.

## Use it for

Close-quarters brawling, stealth takedowns, action games where level layout becomes part of the fight.

## Tunable parameters

probe radius 1.5–2 m · surface types & priority · align time 0.15–0.25 s · camera side offset & FOV · killing-blow hitstop 6–10 f · blend back 0.4–0.6 s · open-ground fallback (authoring defaults)

## Request prompt

Add contextual finishers. On finisher, probe 1.5–2 m around the pair for walls, waist-high cover and rails and pick the matching move by priority (wall slam / over cover / open-ground takedown). Within 0.15–0.25 s align both characters to the chosen surface and cut the camera to a side close-up; freeze 6–10 frames with a light shake on the killing blow; blend the camera back to the follow view over 0.4–0.6 s at the end. Accept: the same enemy finished next to a wall, beside cover and in the open plays the matching move and camera each time, with no one clipping into the wall.

## Implementation hint

On finisher, run shape traces around the pair to classify nearby surfaces (wall, waist-high cover, rail, open). Pick a paired animation tagged for that surface, compute target transforms so the victim's contact point meets the surface, and warp both roots there over the align window. Switch to a staged camera placed perpendicular to the surface normal; on the kill anim event apply hitstop and shake; on end blend back to the follow camera. Validate clearance before committing, otherwise use the open-ground fallback.

## Related

- [CIN-04](CIN-04.md) — Kill cam
- [CIN-15](CIN-15.md) — Quick time event
- [FB-11](FB-11.md) — Freeze-frame finisher
- [ACT-37](ACT-37.md) — Motion Warping / Root Motion Warping
- [CAM-31](CAM-31.md) — Camera cut／Hard cut
- [CAM-25](CAM-25.md) — Close-up／CU
- [NAV-09](NAV-09.md) — Weak-point highlight

## References

- [Wikipedia — Sleeping Dogs (video game)](https://en.wikipedia.org/wiki/Sleeping_Dogs_(video_game))
- [Wikipedia — Batman: Arkham Knight](https://en.wikipedia.org/wiki/Batman:_Arkham_Knight)
