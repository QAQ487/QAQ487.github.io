# CAM-21 · Dolly zoom／Vertigo effect

**Group:** Camera & composition
**Subcategory:** Projection and Apparent Distance

## What you see

The character remains roughly the same size while the space behind seems stretched or compressed, creating a sudden sense of weightlessness or realization. (A general cinematographic effect name.)

## Not to be confused with

Not simply a fast zoom. Position and field of view must change in opposing coordination to preserve subject size while changing background relationships.

## Use it for

Special presentation for shock, panic, or a major discovery.

## Tunable parameters

subject distance range · target screen height · FOV range · effect duration · easing · focus tracking · background depth

## Request prompt

In your game, add a dolly zoom when the character is shocked: move from 8 m to 3 m over 1.5 s while solving vertical FOV so the character remains 42% of screen height. Use ease-in-out, measure at the chest, clamp FOV to 20–75°, and keep subject-size drift below 2% while the background visibly stretches.

## Implementation hint

Animate camera distance and FOV in opposite directions while solving FOV each frame to preserve the subject's projected height. Clamp both values and measure the subject from a stable focus plane so animation or posture changes do not destabilize the effect.

## References

- [Wikipedia — Shot (filmmaking)：Dolly zoom／Vertigo effect](https://en.wikipedia.org/wiki/Shot_(filmmaking))
