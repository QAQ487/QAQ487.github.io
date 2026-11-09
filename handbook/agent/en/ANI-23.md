# ANI-23 · Creature climbing / Clinging to large enemies

**Aliases:** Creature climbing; Colossus climbing; Monster mounting; Clinging; Grab and climb; Shake-off; 攀爬大型生物; 攀附巨獸; 甩落; 巨大生物登攀; しがみつき

**Group:** Animation, movement & physics
**Subcategory:** Animation systems

## What you see

The character leaps onto or grabs a giant enemy's body (fur, scales, armour edges), hands and feet pressed to its surface, and rides along with it: when the giant walks, the character bobs up and down with it. When it shakes violently, the character's body swings outward, the feet come off and only the hands hold on, with the camera shaking in sync; once the shaking stops the character presses back to the surface and keeps climbing. If grip runs out or the shake is too strong, the character is flung off along an arc and lands.

## Not to be confused with

Not yellow paint climb markers (NAV-02, which mark climbable spots on static scenery). Not a contextual vault (ANI-22, over a static obstacle). Not hand contact IK (ANI-21, a hand on a static object). Here the climbing surface itself moves, and the character's pose and swing follow the creature's body.

## Use it for

Giant bosses, climbing up to strike a weak point, clinging to or riding large creatures in combat.

## Tunable parameters

climbable regions (tagged bones) · attach to nearest bone · hand & foot IK · sway 20–45° from bone acceleration · feet-off threshold · re-plant 0.3–0.5 s · camera shake on shake-off · fling arc · grip meter link to UX-02 (authoring defaults)

## Request prompt

Add climbable surfaces to large enemies. When the character grabs a region tagged climbable, attach it to the nearest bone and keep hands and feet on the surface with IK so it moves with the enemy. When the enemy plays a shake, swing the character's body outward 20–45° from that bone's acceleration, lift the feet so only the hands hold on, and shake the camera in sync; re-plant within 0.3–0.5 s after the shake. When grip runs out or the shake exceeds a limit, fling the character off along the shake direction and play a landing. Accept: enemy walking, shaking and shaking the character off all look right, and the character never clips into the enemy's body.

## Implementation hint

Tag climbable regions on the creature's skeleton. On grab, parent the character to the nearest bone with a local offset and move it across the surface in bone space from input. Each frame solve hand and foot IK onto the surface. Read the bone's linear and angular acceleration and feed it into a damped spring that swings the body around the hand grip, lifting the feet above a threshold; drive camera shake from the same value. When the grip meter empties or acceleration exceeds a limit, detach and launch along the current velocity.

## Related

- [NAV-02](NAV-02.md) — Yellow paint
- [ANI-22](ANI-22.md) — Contextual vault / Traversal snapping
- [ANI-21](ANI-21.md) — Hand IK contact
- [UX-02](UX-02.md) — Resource meter / Status bar
- [NAV-09](NAV-09.md) — Weak-point highlight
- [ACT-36](ACT-36.md) — Inverse Kinematics / IK; Forward Kinematics / FK

## References

- [Wikipedia — Shadow of the Colossus](https://en.wikipedia.org/wiki/Shadow_of_the_Colossus)
- [Wikipedia — Dragon's Dogma](https://en.wikipedia.org/wiki/Dragon%27s_Dogma)
