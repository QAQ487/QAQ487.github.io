# ANI-06 · Death animation

**Aliases:** Defeat animation; Death pose; KO animation

**Group:** Animation, movement & physics
**Subcategory:** Character states

## What you see

A body motion played when a character is defeated: for example kneeling then falling forward, or being launched and bouncing once on landing, ending in a lying pose; the body may then stay, blink out or dissolve.

## Not to be confused with

Not a death effect (FB-04, bursts, smoke and particles); the death animation is the character’s own body motion, and the two are often combined. Not a ragdoll (ANI-09, physics computes the fall live); a death animation is usually authored.

## Use it for

Tells the player clearly that the enemy is down; gives the final blow a conclusion; ending beats in boss fights.

## Tunable parameters

fall direction · fall time · bounce · hold on ground · removal (blink / dissolve / stay) · variants per attack type

## Request prompt

In your game, add an enemy death animation: after the final hit, lean back for 0.15 s, fall to the ground within 0.35 s with one 2 px bounce, hold the lying pose for 1 s; then blink for 0.5 s (toggle visibility every 60 ms) and disappear. Fall away from the direction of the hit.

## Implementation hint

A terminal state in the animation state machine with no exit transitions; spawn the death VFX from an animation event at the impact frame. Optionally switch to a ragdoll mid-fall (ANI-09) or dissolve the body (VFX-04) after the hold.

## Related

- [FB-04](FB-04.md) — Death effect
- [ANI-09](ANI-09.md) — Ragdoll
- [ANI-05](ANI-05.md) — Hit reaction
- [VFX-04](VFX-04.md) — Dissolve
- [FB-03](FB-03.md) — Invincibility blink

## References

- [Player Motion — Hit reaction animations for games (flinch, stagger, knockdown, death)](https://playermotion.games/playbook/hit-reaction-animations)
- [Wikipedia — Ragdoll physics](https://en.wikipedia.org/wiki/Ragdoll_physics)
