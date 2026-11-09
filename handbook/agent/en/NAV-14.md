# NAV-14 · Contextual ping (multiplayer)

**Aliases:** 情境標記; Ping 系統; Look ping; Context ping; ピン留め

**Group:** Visual guidance & wayfinding
**Subcategory:** Interaction cues

## What you see

A ping button looks at crosshair context and places a short-lived icon plus phrase — enemy, loot, danger, or “look here” — synced to teammates’ HUD/minimap.

## Not to be confused with

Not a permanent objective marker (UX-04). Not the quick-chat wheel itself (see UI-11 multiplayer example).

## Use it for

Co-op shooters, multiplayer survival, teams that need fast voiceless callouts.

## Tunable parameters

lifetime · type set · merge window · distance text · mute option (starting points)

## Request prompt

Raycast from the reticle, map hit type to icon (enemy/loot/hazard/point), lifetime 4–6 s, merge same type within 1 s. Play a short cue; show metres. Allow muting others’ pings.

## Implementation hint

OnPing: raycast; type=Classify(hit); replicate icon+pos+type to peers; local despawn after lifetime.

## Related

- [UX-04](UX-04.md) — Objective marker / Waypoint；Objective tracker
- [UI-08](UI-08.md) — Minimap
- [UI-11](UI-11.md) — Radial menu
- [UI-09](UI-09.md) — Off-screen indicator / Edge arrow
- [NAV-17](NAV-17.md) — Scan pulse / Sonar ping

## References

- [Wikipedia — Ping (multiplayer communication)](https://en.wikipedia.org/wiki/Ping_(video_gaming))
