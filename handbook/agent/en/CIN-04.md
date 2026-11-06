# CIN-04 · Kill cam

**Aliases:** Killcam; Death replay; Finisher cam; Instant replay

**Group:** Cinematics & narrative
**Subcategory:** Cinematic camera

## What you see

After a character is defeated (or lands the final blow), the last few seconds replay, often from the attacker’s viewpoint or a close-up, with slow motion, a colour shift and a "REPLAY" tag so the player sees what happened.

## Not to be confused with

Not a freeze-frame finisher (FB-11, the frame stops but does not rewind); a kill cam rewinds and replays. Not slow motion (FB-10, which happens live without replay).

## Use it for

Explaining "how did I die" in competitive games, showing off a great final blow, cinematic close-ups of finishers.

## Tunable parameters

buffer length · replay start offset · playback speed · viewpoint · grade/desaturation · skip & respawn deadline

## Request prompt

In your game, play a kill cam when the player is defeated: keep snapshots of positions and animation for the last 4 s, replay from 3 s before the defeat at 0.5× speed with the camera behind the attacker’s shoulder, desaturate the image by 40%, and blink a red "REPLAY" tag top-left; any key skips, and the replay never runs longer than the respawn timer.

## Implementation hint

A ring buffer of per-entity snapshots (transform, anim state, events) recorded every tick; on trigger, render a separate playback world from the buffer with interpolation, isolated from live simulation and networking.

## Related

- [FB-11](FB-11.md) — Freeze-frame finisher
- [FB-10](FB-10.md) — Slow motion
- [CIN-03](CIN-03.md) — Scripted camera
- [FB-09](FB-09.md) — Camera punch-in

## References

- [GDC Vault — Replay Technology in Overwatch: Kill Cam, Gameplay, and Highlights](https://gdcvault.com/play/1024053/Replay-Technology-in-Overwatch-Kill)
- [Devtricks — Implementing instant replays (killcam)](https://vorixo.github.io/devtricks/killcam/)
- [Wikipedia — Instant replay](https://en.wikipedia.org/wiki/Instant_replay)
