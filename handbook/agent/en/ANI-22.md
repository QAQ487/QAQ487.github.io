# ANI-22 · Contextual vault / Traversal snapping

**Aliases:** Auto vault; Contextual vault; Parkour vault; Mantle; Slide under; Traversal snapping; 自動翻越; 跑酷翻越; 自動乗り越え; ボルト; マントル

**Group:** Animation, movement & physics
**Subcategory:** Animation systems

## What you see

While running, a low obstacle appears ahead (low wall, crate, railing). With no extra button, or by holding the same one, a hand plants exactly on the edge, the body side-vaults over, and the run continues on landing with almost no loss of speed. Different heights pick different moves: step over very low ones, hand-vault waist-high ones, mantle onto chest-high ones, and slide under ones with a gap below.

## Not to be confused with

Not yellow paint (NAV-02 — the visual cue for climbable spots). Not motion warping itself (ACT-37 — the alignment technique; this card is the picture made with it). Not general climbing (grabbing and moving up a wall). This card is obstacle crossing that keeps running rhythm.

## Use it for

Parkour, stealth and chase sequences, open spaces where running rhythm must not break.

## Tunable parameters

probe distance 1–2 m · height bands (step / vault / mantle / slide) · speed retention · hand-contact alignment · landing clearance check · trigger (auto vs hold) (authoring defaults)

## Request prompt

Add contextual vaults to running. While running, measure height and depth of obstacles 1–2 m ahead: below knee height step over, waist height hand-vault, chest height mantle, a passable gap underneath slide. Once chosen, align the hand contact to the obstacle edge and keep roughly the entry horizontal speed through the move, landing straight back into the run. Do not trigger if the obstacle is too tall or the far side has no footing. Accept: one try at each of the four heights with no floating hand, no clipping, and no obvious speed drop.

## Implementation hint

While running, sweep a capsule forward and trace down to measure the obstacle's top height, depth and the far-side floor. Map height to a traversal clip; place the hand contact on the edge point and warp the root through the clip so the hand meets it while horizontal speed is preserved. Finish the contact with hand IK. Abort if the far side lacks clearance.

## Related

- [NAV-02](NAV-02.md) — Yellow paint
- [ACT-37](ACT-37.md) — Motion Warping / Root Motion Warping
- [ANI-21](ANI-21.md) — Hand IK contact
- [ANI-16](ANI-16.md) — Stride warping
- [ACT-36](ACT-36.md) — Inverse Kinematics / IK; Forward Kinematics / FK
- [ANI-12](ANI-12.md) — Foot IK / Foot placement

## References

- [Wikipedia — Mirror's Edge](https://en.wikipedia.org/wiki/Mirror%27s_Edge)
- [Wikipedia — Assassin's Creed (video game)](https://en.wikipedia.org/wiki/Assassin%27s_Creed_(video_game))
