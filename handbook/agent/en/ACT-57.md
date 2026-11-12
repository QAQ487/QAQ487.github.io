# ACT-57 · Magnetic surface crawl

**Aliases:** Magnetic crawl; Spider ball; Magnet rail; Wall walking; Ceiling walking; Gravity boots; Wall-walk path; 磁力貼面爬行; 磁吸軌道; 牆面行走; 天花板行走; 磁力移動; 壁歩き; 磁力ブーツ

**Group:** Animation, movement & physics
**Subcategory:** Traversal abilities

## What you see

A special track runs up the walls and across the ceiling (a glowing magnetic strip, metal plating or a patterned path). When the character (or the character rolled into a ball) touches it, it clamps on with a click and a ring of sparks or field lines appears around it; moving along the track, the character follows it round corners up the wall and hangs upside down across the ceiling, always pressed to the track's surface, with the camera rolling along or holding a side view. Leaving the end of the track, or jumping off on purpose, switches the clamp glow off, gravity points down again and the character falls.

## Not to be confused with

Not planetoid gravity (ACT-51, where a whole planet pulls toward its centre). Not climbing (hands gripping holds to pull up; yellow climb markers are NAV-02). Not a wall jump (ACT-05). This card is about specific tracks or materials that hold the character, upside down included.

## Use it for

Hidden routes in sci-fi exploration games, puzzles in a rolled-up ball form, maze-like vertical routes, crossing floor hazards along the ceiling.

## Tunable parameters

magnetic surface tag & look (glowing strip) · clamp sound & spark ring · gravity into the surface · up-vector blend at corners · speed on the track · detach at the end / on jump · camera (hold side view or roll with the character) (authoring defaults)

## Request prompt

Add magnetic surface crawl. Mark magnetic tracks in the level clearly with glowing lines. When the character touches one in clamp mode, play a clamp sound and sparks, then point gravity into the track surface and blend the character's up smoothly round corners so it can move along walls and ceilings. At the end of the track, or on jump, switch the clamp effect off, restore normal gravity and let the character leave the surface. Accept: corners never make it drop off or jitter, and normal gravity always returns once it leaves the track.

## Implementation hint

While clamp mode is on, probe toward the character's down and ahead along its movement; on hitting a magnetic surface, set gravity to the inverse of the surface normal and snap the character onto it. Each step, re-probe ahead and below to follow convex and concave corners, blending up toward the new normal. Leaving the tagged area or a jump input restores world gravity. For a rolling ball, constrain motion to the track's spline and use the spline's normal for orientation.

## Related

- [ACT-51](ACT-51.md) — Planetoid gravity / Spherical gravity
- [NAV-02](NAV-02.md) — Yellow paint
- [ACT-05](ACT-05.md) — Wall-Jump Forgiveness / Wall-Jump Window
- [ACT-49](ACT-49.md) — Phase-through traversal / Ascend through ceiling

## References

- [Metroid Wiki — Spider Ball (Morph Ball clings to magnetic tracks on walls and ceilings)](https://www.metroidwiki.org/wiki/Spider_Ball)
- [Wikipedia — Prey (2006 video game) (wall-walk paths; planetoids with their own gravity)](https://en.wikipedia.org/wiki/Prey_(2006_video_game))
- [Wikipedia — Ratchet & Clank: Going Commando (spherical worlds; Gravity Boots)](https://en.wikipedia.org/wiki/Ratchet_%26_Clank:_Going_Commando)
