# ACT-50 · Wall merge / Painting form

**Aliases:** Wall merge; Painting form; Merge into wall; Mural form; Flat-on-wall mode; Shadow form; 2D-on-wall section; 融入牆壁; 化身壁畫; 牆上平面化; 影子形態; 壁に入る; 壁画化; 壁面移動

**Group:** Animation, movement & physics
**Subcategory:** Traversal abilities

## What you see

The character walks up to a wall and presses a button: its body squashes flat onto the surface and becomes a mural, just an outline and flat colours, while the camera swings round to a side view facing the wall. Now the character can only move left and right along the wall, following it round corners onto the next face and slipping past gaps or railings that block the floor; attacks from outside cannot touch it, and nor can objects on the ground. Where the wall breaks off (a doorway, a gap) or the energy runs out, the character peels off the wall, pops back into 3D and lands in front of it. Variant — shadow and pixel planes: the character steps into a shadow cast on a wall and becomes that shadow, jumping along the outlines of the cast shapes; or it enters a special pipe and becomes an old-style pixel sprite running through a flat level printed on the wall, snapping back to 3D in an instant when it leaves.

## Not to be confused with

Not phase-through traversal (ACT-49, which passes through geometry to the other side). Not the X-ray silhouette (MATX-10) or a toon outline, which only change how things are drawn while the playable space stays the same. Not full-screen pixelation (PP-05, where the whole image goes blocky rather than the character entering a plane). This card is the character turning from 3D into a flat form stuck to a surface, and the different routes that opens.

## Use it for

Getting round obstacles, crossing gaps and dodging attacks in top-down or third-person adventures; using walls as a second layer of level; flat throwback sections; light-and-shadow puzzles.

## Tunable parameters

mergeable surface tag & prompt · enter squash & exit pop · flat look (outline, flat colour, no shading) · camera swing to wall-facing view · movement constrained to the wall plane (wrap at corners) · energy drain & low warning · auto-exit at gaps & doorways · exit placement in front of the wall (authoring defaults)

## Request prompt

Add a wall-merge ability. Mergeable walls show a prompt as the character approaches. On the button, play a short squash and replace the character with a flat image stuck to the wall (outline plus flat colour), and swing the camera to a side view facing the wall. While merged, allow only left/right movement and jumps in the wall plane, wrap round corners onto the adjoining wall, ignore collisions with objects and attacks outside the wall, and drain an energy bar. When the wall breaks off, the button is pressed again or the energy runs out, play a peel-off, restore the 3D character and place it in a safe spot in front of the wall. Accept: the character never leaves the wall at a corner, it always peels off at a doorway or gap, and it never ends up stuck inside the wall afterwards.

## Implementation hint

Represent each mergeable wall as a chain of segments in wall space: distance along the wall (u) and height (v). On merge, project the character onto the nearest segment, hide the 3D mesh and draw a flat sprite or decal aligned to the wall normal at (u, v). Move with 2D platformer rules in (u, v); when u passes a segment end at a corner, continue on the next segment and turn the camera to keep facing the new segment. If the next segment is missing (doorway, gap) or the energy is empty, exit: place the character a capsule radius in front of the wall at the current (u, v), validated by a clearance test, and restore the mesh with a pop.

## Related

- [ACT-49](ACT-49.md) — Phase-through traversal / Ascend through ceiling
- [MATX-10](MATX-10.md) — X-ray silhouette
- [PP-05](PP-05.md) — Pixelation

## References

- [Wikipedia — The Legend of Zelda: A Link Between Worlds (merges into walls as a 2D painting)](https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_A_Link_Between_Worlds)
- [Wikipedia — Contrast (video game) (shifts into a shadow form that moves along walls)](https://en.wikipedia.org/wiki/Contrast_(video_game))
- [GamesBeat — Super Mario Odyssey's interdimensional travel (pixel Mario pasted onto a wall)](https://gamesbeat.com/super-mario-odysseys-interdimensional-travel-is-one-of-its-best-visual-tricks/)
- [Super Mario Wiki — 8-bit pipe (enters a wall as 2D 8-bit Mario)](https://www.mariowiki.com/8-bit_pipe)
