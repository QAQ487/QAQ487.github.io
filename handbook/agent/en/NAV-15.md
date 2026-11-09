# NAV-15 · Blink targeting arc / Ledge-snapped landing preview

**Aliases:** Blink targeting; Teleport arc; Teleport preview; Landing marker; Ledge snap preview; Blink marker; 瞬移落點預覽; 瞬移弧線; テレポート照準; 着地点プレビュー

**Group:** Visual guidance & wayfinding
**Subcategory:** Placement & range

## What you see

While the blink button is held, an arc shoots from the character's hand and ends in a landing marker (a character silhouette or ring). Aimed at a wall below a ledge or a platform edge, the marker snaps to the standable spot on top of the edge and shows a small up arrow meaning the character will climb onto it; aimed beyond range or somewhere you cannot stand, the arc turns red and the marker becomes a cross. On release the character jumps instantly to the marker, leaving a puff of afterimage particles at the start and a small shock ring at the landing.

## Not to be confused with

Not a placement ghost (NAV-05, previewing where a building will go). Not a range indicator (NAV-06, an attack radius). Not a spawn or teleport effect (VFX-15, only the flash of appearing or vanishing). This card is the before-the-move preview of where you will land, including the ledge snap.

## Use it for

Short-range teleport, grapple landing points, VR teleport locomotion, movement powers that reach high places.

## Tunable parameters

max range 15–20 m · arc vs straight ray · ledge search height 0.5–1 m & inward depth · standing-clearance test · valid / invalid colours · marker shape (silhouette / ring / cross) · mantle arrow · travel time ≤ 0.1 s (authoring defaults)

## Request prompt

Add a landing preview to the blink ability. While the button is held, draw an arc from the character's hand out to 15–20 m with a landing marker at its end. If the end hits a wall and a standable ledge top lies within 0.5–1 m above, snap the marker onto that top and add a small up arrow. Out of range or with no room to stand, turn the arc red and the marker into a cross, and do not move on release. On release move the character to the marker within 0.1 s, leave afterimage particles at the start and play a small shock ring at the landing. Accept: aiming at the wall just under a ledge snaps the landing onto the ledge top, and the character never ends up inside the wall.

## Implementation hint

Each frame while aiming, trace the arc (or ray) from the hand and take the first hit. If it hits a wall, search upward and inward a short distance for a ledge top with enough standing clearance (capsule test) and, if found, place the marker there and flag a mantle. If it hits a floor, test clearance in place. Colour the arc and marker from the validity result. On release, teleport (or very fast lerp) the character to the marker and spawn departure and arrival effects.

## Related

- [NAV-05](NAV-05.md) — Placement ghost
- [NAV-06](NAV-06.md) — Range indicator
- [VFX-15](VFX-15.md) — Spawn / teleport effect
- [ANI-22](ANI-22.md) — Contextual vault / Traversal snapping
- [NAV-02](NAV-02.md) — Yellow paint
- [FX-03](FX-03.md) — Afterimages / Ghost Trails

## References

- [Wikipedia — Dishonored](https://en.wikipedia.org/wiki/Dishonored)
- [Wikipedia — Dishonored 2](https://en.wikipedia.org/wiki/Dishonored_2)
