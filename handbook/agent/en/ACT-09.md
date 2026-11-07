# ACT-09 · Anticipation / Wind-up

**Group:** Animation, movement & physics
**Subcategory:** Animation Principles and Action Readability

## What you see

Pulling an arm back before a punch, or bending the knees before a jump.

## Not to be confused with

Visual anticipation does not necessarily match the entire startup period used by combat rules. Player actions do not always need long wind-ups, which may make control feel sluggish.

## Use it for

Make the next action easier to read and establish direction and force. An enemy's wind-up can also telegraph an attack. On the first presented update after an accepted attack, enter a readable directional extreme, then move rapidly toward contact. Do not delay gameplay acceptance for a decorative crouch. Optional short compressed anticipation is fine; acceptance must not wait for a full crouch.

## Tunable parameters

anticipation duration · key pose · attack direction · startup timing · release cue · immediate strong start pose · compressed anticipation

## Request prompt

On the first presented update after an accepted attack, enter a readable directional extreme, then move rapidly toward contact, with a slower weight-bearing tail after. Do not delay gameplay acceptance for a decorative crouch. Optional ~180 ms compressed anticipation is fine, but acceptance must not wait for a full crouch. See Wyatt Cheng GDC 2013 animation talks for the strong-start idea.

## Implementation hint

On the first presented update after an accepted attack, enter a readable directional extreme, then move rapidly toward contact, with a slower weight-bearing tail after contact. Do not delay gameplay acceptance for a decorative crouch — a weak first visible change is often blamed on input latency. Pair with FX-13 for VFX charge-up.

## Related

- [ACT-18](ACT-18.md) — Startup / Start-up / Wind-up Frames
- [ACT-11](ACT-11.md) — Timing / Spacing
- [FX-13](FX-13.md) — VFX Anticipation / Attack Charge-up

## References

- [Wikipedia — Twelve basic principles of animation，Anticipation](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
