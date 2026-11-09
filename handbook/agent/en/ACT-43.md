# ACT-43 · Perfect dodge window

**Aliases:** 完美閃避窗口; 剛好迴避; i-frame dodge window; Perfect dodge timing; ジャスト回避

**Group:** Combat feedback & game feel
**Subcategory:** Combat timing

## What you see

Dodge grants invulnerability (or heavy damage reduction) only for a brief middle slice of the animation. If an enemy hit lands inside that slice, the dodge counts as perfect and may unlock a retaliate or reward. This entry is the rule — not the presentation.

## Not to be confused with

Not slow motion itself (FB-10, how success is shown). They often pair, but do not merge. Distinct from ACT-42 guard counters.

## Use it for

Rhythm-forward action games; bosses that demand reading attack timing.

## Tunable parameters

perfect frames 6–10 @60fps · i-frame vs damage reduction · which attacks qualify · handoff to FB-10 presentation (starting points)

## Request prompt

Only a dodge that would have been hit and lands inside the precision window opens a short counter. Normal dodges, flips with no nearby attack, and late presses do not. Slow motion (FB-10) is an optional cue — keep it cross-linked, not merged.

## Implementation hint

dodgeAge in [perfectStart, perfectEnd] and Overlaps(attack): flag Perfect. Presentation (timeScale, vignette) lives in FB-10; keep data-driven so designers tune frames without editing FX.

## Related

- [FB-10](FB-10.md) — Slow motion
- [ACT-42](ACT-42.md) — Guard counter
- [ACT-25](ACT-25.md) — Cancel Window / Action Window
- [ACT-27](ACT-27.md) — Invulnerability / Invincibility Frames / I-frames
- [FB-26](FB-26.md) — Perfect parry flash / Just guard
- [ACT-46](ACT-46.md) — Bob and weave / Slip

## References

- [Wikipedia — Elden Ring](https://en.wikipedia.org/wiki/Elden_Ring)
