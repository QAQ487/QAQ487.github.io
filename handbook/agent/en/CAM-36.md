# CAM-36 · Contextual finisher / Environmental takedown

**Aliases:** Environmental takedown; Contextual finisher; Environmental kill; Context-sensitive execution; Finisher staging; 場景處決; 環境終結技; 環境テイクダウン; 状況フィニッシュ; Tag-team finisher; Dual finisher; Double-team takedown; 雙人合體終結技; 合體技; 連携フィニッシュ

**Group:** Camera & composition
**Subcategory:** Composition and Cinematics

## What you see

When an enemy can be finished, the finisher changes with the surroundings: next to a wall the enemy is slammed into it, beside low cover they are pinned over it, and on open ground a standard takedown plays. At the start both characters snap quickly into position and facing against the wall or cover, and the camera cuts to a side close-up; the killing blow lands with a short freeze and shake, then the camera eases back to the normal follow view and control returns. Variant — tag-team finisher: with a partner nearby and the shared meter full, two portraits and a prompt appear at the screen edge; on trigger both characters rush the enemy from opposite sides, the camera first pulls wide to hold all three in frame, cuts to close-ups of the two striking in turn, freezes and flashes on the last blow, then eases back to the follow view.

## Not to be confused with

Not a kill cam (CIN-04 — a replay after the kill). Not a quick time event (CIN-15 — advanced by button prompts). Not a freeze-frame finisher (FB-11 — the whole frame freezes on the last hit, regardless of surroundings). This card is a finisher whose pose and camera are chosen by nearby geometry. The tag-team variant is about the two characters’ placement and camera staging, not the partner AI itself.

## Use it for

Close-quarters brawling, stealth takedowns, action games where level layout becomes part of the fight, team combos in party combat.

## Tunable parameters

probe radius 1.5–2 m · surface types & priority · align time 0.15–0.25 s · camera side offset & FOV · killing-blow hitstop 6–10 f · blend back 0.4–0.6 s · open-ground fallback · tag-team variant: partner range 8–10 m, two-portrait prompt, wide shot 0.3–0.5 s, alternating close-ups, final-hit freeze 8–12 f (authoring defaults)

## Request prompt

Add contextual finishers. On finisher, probe 1.5–2 m around the pair for walls, waist-high cover and rails and pick the matching move by priority (wall slam / over cover / open-ground takedown). Within 0.15–0.25 s align both characters to the chosen surface and cut the camera to a side close-up; freeze 6–10 frames with a light shake on the killing blow; blend the camera back to the follow view over 0.4–0.6 s at the end. Accept: the same enemy finished next to a wall, beside cover and in the open plays the matching move and camera each time, with no one clipping into the wall. Optional tag-team finisher: show a two-portrait prompt when a partner is within 8–10 m and the meter is full; on trigger align both characters to opposite sides of the enemy, pull the camera wide for 0.3–0.5 s to hold all three, cut to close-ups as they strike in turn, freeze 8–12 frames on the final blow and blend back to the follow view.

## Implementation hint

On finisher, run shape traces around the pair to classify nearby surfaces (wall, waist-high cover, rail, open). Pick a paired animation tagged for that surface, compute target transforms so the victim's contact point meets the surface, and warp both roots there over the align window. Switch to a staged camera placed perpendicular to the surface normal; on the kill anim event apply hitstop and shake; on end blend back to the follow camera. Validate clearance before committing, otherwise use the open-ground fallback. Tag-team variant: when a partner is in range and the shared meter is full, show a two-portrait prompt; on trigger warp both characters to opposite sides of the target, play a wide shot that holds all three, cut to alternating close-ups keyed by animation events, and freeze on the final blow before blending back.

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
- [Wikipedia — Tales of Arise](https://en.wikipedia.org/wiki/Tales_of_Arise)
