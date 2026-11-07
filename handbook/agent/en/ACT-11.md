# ACT-11 · Timing / Spacing

**Group:** Animation, movement & physics
**Subcategory:** Animation Principles and Action Readability

## What you see

The same arm raise can look hesitant when slow or crisp when it snaps into place. Different distances between successive poses also change the impression of speed.

## Not to be confused with

Animation key count, game-logic update rate, and display FPS are different things. More keys do not automatically make an action slower.

## Use it for

Shape rhythm, personality, and perceived weight. Timing concerns when a pose is reached; spacing concerns the distance between adjacent sampled poses. Let the primary hand/weapon overshoot its ready pose by a small authored amount, reverse once, and damp to rest; new gameplay retargets from current output. When retiming attack speed, remap preparation, travel, and recovery separately and keep a minimum readable contact accent and event order — no uniform fast-forward.

## Tunable parameters

total duration · pose timestamps · sample spacing · acceleration impression · key poses · primary-action overshoot/settle · attack-speed retiming with preserved contact accents

## Request prompt

Besides a 600 ms arm raise, let the primary hand/weapon overshoot its ready pose by a small authored amount, reverse once, and damp to rest; new gameplay retargets from current output. When retiming attack speed, remap preparation, travel, and recovery separately and keep a minimum readable contact accent and event order — no uniform fast-forward.

## Implementation hint

Choose when important poses occur and shape spacing between equal-time samples. Also: (1) Overshoot and settle of the primary action — the main hand/weapon passes its ready pose by a small authored amount, reverses once, and damps to rest; new gameplay retargets from current output (not cape/hair follow-through). (2) Attack-speed retiming — when speed changes, remap preparation, travel, and recovery separately; preserve a minimum readable contact accent and event order. Uniform fast-forward erases weight.

## Related

- [ACT-12](ACT-12.md) — Ease In / Ease Out / Slow In and Slow Out
- [ACT-13](ACT-13.md) — Follow Through
- [ACT-18](ACT-18.md) — Startup / Start-up / Wind-up Frames
- [ACT-20](ACT-20.md) — Recovery / Endlag
- [ACT-38](ACT-38.md) — Animation Event / Anim Notify / Notify State
- [ACT-09](ACT-09.md) — Anticipation / Wind-up

## References

- [Wikipedia — Twelve basic principles of animation，Timing](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
- [Pluralsight — Understanding the 12 Principles，Timing and Spacing](https://www.pluralsight.com/resources/blog/software-development/understanding-12-principles-animation)
