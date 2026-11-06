# ANI-05 · Hit reaction

**Aliases:** Flinch; Hit react; Stagger; Hurt animation

**Group:** Animation, movement & physics
**Subcategory:** Character states

## What you see

When struck, the character’s body recoils away from the hit: the head and upper body are pushed back first, then ease back to the original pose; heavy hits become a stagger or knockdown. Hits from the front and back recoil in different directions.

## Not to be confused with

Not hitstun (how long the character cannot act); the hit reaction is the visible body motion, and the two can be designed separately. Not a hit flash (FB-01, a colour change), not knockback (the whole character is pushed away), and not squash on hit (FB-13, a pure scale deformation).

## Use it for

Confirms the hit landed and from which side; distinguishes light from heavy hits.

## Tunable parameters

direction set (front / back / left / right) · strength tiers (flinch / stagger / knockdown) · snap-in time (0.05–0.1 s) · recovery time · upper-body only vs full body

## Request prompt

In your game, give enemies hit reactions: determine whether the hit came from the front or back and play a matching flinch — head and upper body tilt 15° away within 60 ms, then return over 300 ms ease-out; light hits affect only the upper body (the legs keep walking), heavy hits switch to a 0.8 s full-body stagger that steps back 6 px.

## Implementation hint

Pick a clip from the angle between the character’s forward vector and the hit direction; light flinches play as an additive layer masked to the upper body so locomotion continues, heavy ones as full-body states. Blend in very fast, out slowly; restart on repeated hits.

## Related

- [FB-01](FB-01.md) — Hit flash
- [FB-13](FB-13.md) — Squash on hit
- [ANI-03](ANI-03.md) — Hold frame / Impact frame
- [ANI-06](ANI-06.md) — Death animation
- [ANI-09](ANI-09.md) — Ragdoll

## References

- [Game Developer — The role of animations in hit effects](https://www.gamedeveloper.com/programming/the-role-of-animations-in-hit-effects)
- [Player Motion — Hit reaction animations for games (flinch, stagger, knockdown, death)](https://playermotion.games/playbook/hit-reaction-animations)
