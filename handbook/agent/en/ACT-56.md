# ACT-56 · Hover float (puff, flutter, jet)

**Aliases:** Hover float; Puff float; Flutter jump; Flap hover; Helicopter hover; Jet hover; Water-jet hover; Exhale drop; 懸浮滯空; 鼓氣浮空; 振翅懸停; 噴射懸停; ホバリング; ふんばりジャンプ; ジェットホバー

**Group:** Animation, movement & physics
**Subcategory:** Traversal abilities

## What you see

Holding or tapping jump in mid-air stops the character from falling freely. Some puff up and drift slowly like a balloon, flapping upward a little with every press; some kick their legs like beating wings to hold their height for a moment; some spin their hair like a helicopter and float gently down; others have a device on their back that jets water or air downward to hold them up, the jet splashing where it hits the ground. While hovering the character can only drift sideways slowly and usually cannot attack. When the player lets go or presses another button, the character lets out a puff of air (or the jet cuts out), shrinks back to its normal size and starts to fall normally. Jet types usually have a time limit, and the jet weakens and flickers as it runs low.

## Not to be confused with

Not apex hang time (ACT-03, a brief gravity reduction near the top of a jump with no special pose). Not gliding (forward flight that mainly trades height for distance). Not a double jump (a one-off upward kick). The point of a hover is its own pose and a sustained stay in the air.

## Use it for

Forgiving platformers (letting newer players correct a jump), reaching high places, looking down at what is below from the air, and cleaning or attacking below with a jet while hovering.

## Tunable parameters

entry (hold / repeated jump presses) · pose (puff, flutter, spin, jet) · fall-speed cap while hovering · lift per press (capped) · horizontal speed scale · attacks disabled · exit puff / jet stop · optional fuel meter, weak-jet warning & ground splash (authoring defaults)

## Request prompt

Add a hover. While the hover button is held in the air (or jump is tapped repeatedly), switch to a hover pose (puff, flutter or jet), clamp the fall speed to something very slow, give a small upward push on each press, slow horizontal movement and disable attacks. On release or the cancel button, play an exhale or jet stop, return the character to its normal shape and let it fall normally. For a jet type, add a timed meter: the jet weakens and flickers as the meter runs low and stops when it is empty, and add a splash or dust where the jet hits the ground. Accept: a hover and a normal jump are distinguishable at a glance, and ending a hover never gives the character a sudden extra rise.

## Implementation hint

Add a Hover state reachable from any airborne state. While in it, clamp downward velocity to a low maximum, add a small upward impulse on each press (capped so it never exceeds a set rise speed) and scale air control down. On exit, play the exhale or stop effect and return to the normal fall state without adding velocity. For a jet hover, drain a fuel value over time, scale the jet effect with the remaining fuel, cast down to find the ground and spawn a splash where the jet meets it.

## Related

- [ACT-03](ACT-03.md) — Apex Hang Time / Reduced Gravity at Jump Peak
- [ACT-39](ACT-39.md) — Variable jump height / Jump cut
- [ACT-54](ACT-54.md) — Thrown-object springboard / Cap jump
- [ENV-22](ENV-22.md) — Spray-to-clean grime

## References

- [WiKirby — Hover (Kirby puffs up and floats; exhales to drop)](https://wikirby.com/wiki/Hover)
- [Wikipedia — Kirby's Adventure (inflates to fly; exhaling ends the flight)](https://en.wikipedia.org/wiki/Kirby%27s_Adventure)
- [Wikipedia — Super Mario World 2: Yoshi's Island (flutter jump, ground pound, swallow and spit enemies)](https://en.wikipedia.org/wiki/Yoshi%27s_Island)
- [Wikipedia — Rayman 2: The Great Escape (helicopter hair to glide)](https://en.wikipedia.org/wiki/Rayman_2:_The_Great_Escape)
- [Wikipedia — Super Mario Sunshine (FLUDD sprays water to clean goop; Hover nozzle)](https://en.wikipedia.org/wiki/Super_Mario_Sunshine)
