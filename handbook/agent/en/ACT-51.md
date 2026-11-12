# ACT-51 · Planetoid gravity / Spherical gravity

**Aliases:** Planetoid gravity; Spherical gravity; Small-planet gravity; Walk around the planet; Per-object gravity field; Gravity field; 球形重力; 小星球重力; 繞星行走; 局部重力場; 球体重力; 小惑星重力; 重力フィールド

**Group:** Animation, movement & physics
**Subcategory:** Traversal abilities

## What you see

The character stands on a tiny round planet. Running forward, the planet turns under its feet and the horizon curves sharply; keep running and the character goes round the side and underneath and comes back to where it started, feet always pointing at the planet's centre. The camera rolls with it, so on screen the character is always head-up and it is the starfield and the other planets that swing round. A jump is pulled back to the planet; jump high enough to leave this planet's pull and another planet catches the character, which flips over in mid-air so that its new 'down' points at the new planet, and lands there. Objects, enemies and coins each fall toward the centre of the planet they are on.

## Not to be confused with

Not a fixed-direction gravity flip (the whole level's gravity switched from down to up or sideways). Not magnetic surface crawl (ACT-57, where only certain tracks or surfaces hold the character). Not camera banking (CAMX-13, only the camera rolls; the gameplay gravity does not change).

## Use it for

Space platformers, levels built from small planets, miniature worlds you can run all the way round, hiding items on the far side of a planet.

## Tunable parameters

gravity field per body (sphere / capsule / box) & range · priority & hysteresis where fields overlap · up-vector alignment speed · camera up follow & lag · jump strength vs escaping a field · mid-air flip blend · objects & pickups follow the same fields (authoring defaults)

## Request prompt

Add spherical gravity to the level. Each small planet has its own gravity range; inside it, characters, enemies and drops all get gravity toward that planet's centre, and the character's up keeps aligning to the direction away from the centre, so it can run right round the surface. The camera's up vector smoothly follows the character's up so the character stays head-up and the background rotates instead. When the character leaves one planet's range and enters another's, switch gravity to the new centre and flip the character smoothly in mid-air before it lands. Accept: running a full lap never slips or snags, and the border between two planets' ranges never makes the character jitter back and forth.

## Implementation hint

Give each gravity body a function that returns a gravity direction at a point (toward its centre, or toward the nearest point on a capsule or box surface) plus a priority. Each step, pick the highest-priority field containing the character, with hysteresis at borders to avoid jitter, accelerate along it, and rotate the character's up toward the opposite of gravity with a limited angular speed. Read movement input in the plane perpendicular to up, relative to the camera's forward projected onto that plane. Give the camera its own up vector that eases toward the character's up so the horizon rolls smoothly instead of snapping.

## Related

- [CAMX-13](CAMX-13.md) — Camera banking
- [ACT-57](ACT-57.md) — Magnetic surface crawl
- [ACT-52](ACT-52.md) — Launch star / Launch cannon
- [ACT-03](ACT-03.md) — Apex Hang Time / Reduced Gravity at Jump Peak

## References

- [Wikipedia — Super Mario Galaxy (planetoids with their own gravity; Launch Stars)](https://en.wikipedia.org/wiki/Super_Mario_Galaxy)
- [Wikipedia — Prey (2006 video game) (wall-walk paths; planetoids with their own gravity)](https://en.wikipedia.org/wiki/Prey_(2006_video_game))
- [Wikipedia — Ratchet & Clank: Going Commando (spherical worlds; Gravity Boots)](https://en.wikipedia.org/wiki/Ratchet_%26_Clank:_Going_Commando)
