# ACT-54 · Thrown-object springboard / Cap jump

**Aliases:** Thrown-object springboard; Cap jump; Bounce off a thrown object; Throw-and-bounce; Summoned spring; Mid-air springboard; 帽子跳; 拋物踏板跳; 空中踏板; 召喚彈簧; キャップジャンプ; 投げた物を踏み台; 呼び出しバネ

**Group:** Animation, movement & physics
**Subcategory:** Traversal abilities

## What you see

In mid-air the character throws its hat, a ball or another small object ahead of it; the object stops in the air, spinning and glowing faintly. When the character touches it or lands on top of it, the object dips under the weight, the character springs up by a set height and the object flies back to its hand. That gives the player one extra jump in the air and gets it across gaps it could not otherwise clear. It works once per airtime: once used, the object no longer glows, and it becomes available again on landing. Variant — summoned spring: the character calls a spring-shaped companion or device that appears beneath it and bounces it up high when stepped on; or it throws an orb of light and, catching hold of it in mid-air, pushes off in the opposite direction.

## Not to be confused with

Not a pogo bounce (ACT-45, which needs an attack to hit an enemy or spikes). Not a launcher (ACT-52, where the launcher decides the path). Not a double jump (a second jump in mid-air with no object at all). The point of this card is that the bounce point is an object the player throws or calls up, and its position is visible.

## Use it for

Advanced movement in 3D platformers, stretching air distance, shortcuts for skilled players, and temporary footholds made from a companion or item in 2D platformers.

## Tunable parameters

throw distance & hover time · hover spin & glow · contact zone (touch or land on top) · bounce height (fixed) · return-to-hand animation · one use per airtime & visible spent state · reset on landing · summoned-spring variant (authoring defaults)

## Request prompt

Add a thrown-object springboard. In the air, the throw button sends the object a short way forward, where it stops in mid-air, spinning and glowing. If the character touches it or lands on top of it while it is hovering, play a dip-and-rebound on the object, give the character a fixed-height upward bounce and fly the object back to the character. Allow one use per airtime: the object stops glowing once used and resets on landing. Optional summoned-spring variant. Accept: throwing twice in one airtime only bounces the first time, and the object is recalled automatically when its hover time ends.

## Implementation hint

On throw, spawn the object along the facing, ease it to a stop and hold it there for its hover time. Each step while airborne, test the character's feet (or body) against the object's trigger; on contact, if the bounce is still available, set vertical speed to the fixed bounce value regardless of fall speed, consume the bounce, play the squash on the object and send it back to the hand. Clear the spent flag on landing. Treat it as an extra jump in the movement state machine so jump cut (ACT-39) can still apply.

## Related

- [ACT-45](ACT-45.md) — Pogo bounce / Downward strike bounce
- [ACT-52](ACT-52.md) — Launch star / Launch cannon
- [ACT-39](ACT-39.md) — Variable jump height / Jump cut
- [ACT-53](ACT-53.md) — Possession / Capture

## References

- [Super Mario Wiki — Cap Jump (throw Cappy, then jump off it in mid-air)](https://www.mariowiki.com/Cap_Jump)
- [Wikipedia — Super Mario Odyssey (Cappy captures enemies and objects; the cap works as a temporary platform)](https://en.wikipedia.org/wiki/Super_Mario_Odyssey)
- [Wikipedia — Mega Man 3 (Rush Coil lets Mega Man jump higher)](https://en.wikipedia.org/wiki/Mega_Man_3)
