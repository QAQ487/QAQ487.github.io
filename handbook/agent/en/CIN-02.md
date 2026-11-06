# CIN-02 · Cutscene

**Aliases:** In-engine cinematic; Real-time cutscene; Scripted sequence; Cinematic

**Group:** Cinematics & narrative
**Subcategory:** Cinematic camera

## What you see

The player temporarily loses control while characters move, talk and act to a script, with camera cuts and moves; it is rendered live with the game’s own engine and assets, so characters look the same as in play.

## Not to be confused with

Not pre-recorded video (FMV / pre-rendered); an in-engine cutscene uses the same scene and characters. Not a scripted camera (CIN-03), which only takes over the camera and may leave the player in control.

## Use it for

Story beats, character introductions, mission start/end, between chapters.

## Tunable parameters

shot list & durations · cut vs blend · skip rule · letterbox · camera hand-back blend

## Request prompt

In your game, build an in-engine cutscene: on a timeline, sequence 3 shots — wide 2 s, medium on the character 3 s, close-up for the dialogue 4 s — with characters moving along waypoints; add letterbox bars (CIN-01) and lock input at the start, allow skipping by holding Confirm for 1 s, and blend the camera back to gameplay over 0.6 s at the end.

## Implementation hint

A timeline asset of tracks (camera, actor transforms/animations, dialogue, audio events) evaluated by time each frame; gameplay systems paused or set to "cinematic" state. Make evaluation pure in time so scrubbing and skipping are trivial.

## Related

- [CIN-01](CIN-01.md) — Letterbox
- [CIN-03](CIN-03.md) — Scripted camera
- [CIN-05](CIN-05.md) — Dialogue portrait
- [TRN-13](TRN-13.md) — Match cut

## References

- [Wikipedia — Cutscene](https://en.wikipedia.org/wiki/Cutscene)
- [Unity — Timeline package manual](https://docs.unity3d.com/Packages/com.unity.timeline@1.8/manual/index.html)
- [Unreal Engine docs — Cinematics and movie making](https://dev.epicgames.com/documentation/en-us/unreal-engine/cinematics-and-movie-making-in-unreal-engine)
