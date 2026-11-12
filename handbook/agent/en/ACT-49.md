# ACT-49 · Phase-through traversal / Ascend through ceiling

**Aliases:** Phase-through traversal; Ascend; Phase through ceiling; Surface through ceiling; Pass through solid; Dash-through block; Phase dash; 穿越實體移動; 穿頂上升; 穿透天花板; 衝刺穿越方塊; すり抜け移動; 天井抜け; すり抜けダッシュ

**Group:** Animation, movement & physics
**Subcategory:** Traversal abilities

## What you see

Standing under a low ceiling, the underside of a bridge or a cave roof, the character sees a glowing landing marker appear on the surface overhead, meaning it can pass through here; where it cannot, or where there is no room to stand on top, no marker appears. On the ability button the character turns into a translucent figure with a glowing rim and rises straight up into the ceiling; the camera follows it inside the solid, the screen briefly goes dark with streaks of light sweeping down. The character then pops out of the surface above with a ripple or puff of dust, lands, steadies itself and regains its solid colours. Cancelling midway sends it back down the same path to where it started. Variant — dash-through: dashing into a special block or black barrier, the character slides straight through its inside along the dash direction and comes out of the far side with its speed intact; an ordinary wall still stops it.

## Not to be confused with

Not a one-way platform (a thin platform you jump up through as a solid body). Not a teleport (VFX-15, only a vanish and an appear, with no travel in between). Not the X-ray silhouette (MATX-10, which only draws an occluded character; nothing passes through). Not wall merge (ACT-50, where the character flattens onto a wall and moves along it).

## Use it for

Quick exits from caves and interiors, vertical exploration, shortcuts from below, traversal puzzles limited to certain materials, pass-through blocks or barriers in platformers.

## Tunable parameters

phasable surface tag · search depth through the solid · landing-spot standing test & marker look · phase look (translucency, rim glow, streaks) · in-solid screen treatment · emerge ripple & settle pose · cancel = reverse the same path · dash-through variant: block tag, keep speed & direction (authoring defaults)

## Request prompt

Add a phase-through movement ability. When the character stands under a phasable ceiling with enough room to stand on top of it, project a glowing landing marker onto that top surface. On the ability button, turn the character into a translucent glowing figure and move it straight up through the ceiling with collision and damage off; the camera follows and shows a dark in-solid view with sweeping streaks. On reaching the surface above, play an emerge pose and a ripple, then restore collision. Cancelling midway sends it back down the same path. Optional dash-through: dashing into a tagged block keeps the direction and speed and passes straight through to the far side; ordinary walls still block. Accept: the ability cannot start where no marker is shown, the character never ends up inside geometry after emerging, and a cancel returns it to its starting spot.

## Implementation hint

While grounded, cast upward from the head; if the first hit is a phasable surface, keep casting from just past it until open space is reached, then test a standing capsule there and show the marker on that top surface only if it fits. On activation, switch the character to a no-collision, no-damage state and move it along the vertical line with an eased curve, swapping to the phase material and drawing the in-solid overlay while the camera is inside geometry. On arrival, restore collision and play the emerge pose and ripple. Store the start point so a cancel runs the same path back. Dash-through blocks: on dash entry into a tagged volume, ignore collision with that volume only, keep velocity until the exit side, and keep normal stops on untagged surfaces.

## Related

- [VFX-15](VFX-15.md) — Spawn / teleport effect
- [MATX-10](MATX-10.md) — X-ray silhouette
- [ACT-50](ACT-50.md) — Wall merge / Painting form
- [NAV-01](NAV-01.md) — Interactable highlight
- [ACT-57](ACT-57.md) — Magnetic surface crawl

## References

- [Wikipedia — The Legend of Zelda: Tears of the Kingdom (Ascend moves up through solid ceilings; Recall rewinds an object's movement)](https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Tears_of_the_Kingdom)
- [Zelda Wiki — Ascend (pass upward through a ceiling and surface on top)](https://zeldawiki.wiki/wiki/Ascend)
- [Wikipedia — Celeste (video game) (dream blocks carry Madeline through when dashed into)](https://en.wikipedia.org/wiki/Celeste_(video_game))
- [Hollow Knight Wiki — Shade Cloak (dash through enemies, damage and Shade Gates)](https://hollowknight.wiki/w/Shade_Cloak)
