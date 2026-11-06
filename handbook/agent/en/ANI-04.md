# ANI-04 · Idle animation

**Aliases:** Breathing idle; Idle loop; Fidget animation; Idle break

**Group:** Animation, movement & physics
**Subcategory:** Character states

## What you see

When the player is not giving input, the character is not frozen but loops subtle breathing, blinking, and gentle hair or cloth movement; after a while it may play a longer fidget (stretching, looking around).

## Not to be confused with

Not secondary action (small motions added while a main action plays); idle is the state of "doing nothing". Not spring bones (ANI-10, physics-driven sway); an idle is usually an authored loop.

## Use it for

Makes characters and scenes feel alive; shows the character is ready for input; conveys personality.

## Tunable parameters

loop length · bob amplitude (1–2 px) · blink interval & length · fidget delay & pool · offset per character so crowds don’t sync

## Request prompt

In your game, give the hero an idle: a 4-frame loop at 200 ms per frame with a 1 px body bob (chest rises and shoulders lift slightly on the inhale); blink for 100 ms every 3–5 s (chosen with a fixed seed); after 8 s without input play a 1.5 s stretch fidget once, then return to the breathing loop.

## Implementation hint

A looping clip in the default state of the animation state machine; trigger idle breaks from a timer after N seconds without input, picked from a small pool. Add a per-instance time offset so several characters don’t breathe in sync.

## Related

- [ANI-10](ANI-10.md) — Spring bones / Jiggle physics
- [ANI-02](ANI-02.md) — Animating on twos
- [PIX-14](PIX-14.md) — Sub-pixel animation

## References

- [Wikipedia — Idle animation](https://en.wikipedia.org/wiki/Idle_animation)
- [Wikipedia — Twelve basic principles of animation](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
