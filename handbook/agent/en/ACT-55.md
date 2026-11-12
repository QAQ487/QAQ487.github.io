# ACT-55 · Ground pound & dive cancel

**Aliases:** Ground pound; Butt stomp; Body slam; Ground-pound dive; Dive cancel; Pound cancel; Drop dash; 臀部重壓; 落地重壓; 重壓轉撲; 撲出取消; ヒップドロップ; ダイブキャンセル; ドロップダッシュ

**Group:** Animation, movement & physics
**Subcategory:** Traversal abilities

## What you see

The character presses down in mid-air: it first stops on the spot for a moment, curls up and flips, then drops straight down fast. On touchdown the ground bursts with a ring of dust and a shock ring, the camera gives a small jolt, crates or switches underfoot are smashed or pressed and small enemies nearby are knocked over. Variant — dive cancel: pressing another button during the pause or the drop turns the slam into a forward dive instead, the body stretched out low over the ground and the forward speed kept; on landing it can go straight into a roll or a jump. Another variant: instead of slamming, the character lands curled up and shoots forward into a roll the moment it touches the ground.

## Not to be confused with

Not a pogo bounce (ACT-45, where a hit bounces the character upward). Not an ordinary landing cushion pose. Not the shockwave effect itself (VFX-06). This card is the whole mid-air pause → straight drop → landing impact move, plus the cancel that turns it into a forward dive.

## Use it for

Pressing switches, breaking floors and hitting enemies directly below in platformers; turning a downward move into forward speed so skilled players can chain their movement.

## Tunable parameters

pre-drop hang & flip · drop speed · landing shock ring, dust & camera shake · breakables & switches on impact · landing recovery · dive-cancel window (hang + drop) & forward speed kept · roll-on-landing variant (authoring defaults)

## Request prompt

Add a ground pound. On down in mid-air, stop the character on the spot and play a curl-and-flip, then drop it straight down fast. On touchdown, play dust and a shock ring with a light camera shake, apply it to breakables and switches at the landing point, and hold the character briefly before recovery. Optional dive cancel: a dive press during the pause or the drop cancels the fall and turns it into a forward dive along the facing that keeps horizontal speed, landing into a roll or a jump. Accept: the dive cancel works in both the pause and the drop, and the pound only breaks floors tagged as breakable, never passing through other terrain.

## Implementation hint

State machine: Air → PoundHang (velocity zeroed, flip animation) → PoundDrop (fixed fast downward velocity, no horizontal input) → PoundLand (impact query in a small radius, shake, recovery). In PoundHang and PoundDrop, accept the dive input: switch to Dive with forward velocity from the facing (at least the speed held before the pound) and a slight downward part, then to Slide or Roll on landing. Run the impact query against breakable and switch tags only on the PoundLand frame.

## Related

- [ACT-45](ACT-45.md) — Pogo bounce / Downward strike bounce
- [VFX-06](VFX-06.md) — Shockwave
- [FB-07](FB-07.md) — Trauma-based screen shake
- [ACT-54](ACT-54.md) — Thrown-object springboard / Cap jump

## References

- [Super Mario Wiki — Ground Pound (mid-air pause, then a straight drop)](https://www.mariowiki.com/Ground_Pound)
- [Super Mario Wiki — Dive (dive performed out of a Ground Pound in Odyssey)](https://www.mariowiki.com/Dive)
- [Wikipedia — Super Mario World 2: Yoshi's Island (flutter jump, ground pound, swallow and spit enemies)](https://en.wikipedia.org/wiki/Yoshi%27s_Island)
- [Wikipedia — Crash Bandicoot 2: Cortex Strikes Back (body slam)](https://en.wikipedia.org/wiki/Crash_Bandicoot_2:_Cortex_Strikes_Back)
- [Wikipedia — Sonic Mania (drop dash on landing)](https://en.wikipedia.org/wiki/Sonic_Mania)
