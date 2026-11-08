# CIN-14 · Flashback filter

**Aliases:** Memory filter; Sepia flashback; Dream sequence look

**Group:** Cinematics & narrative
**Subcategory:** Narrative techniques

## What you see

When a memory sequence starts, the whole image gets a "past" look: sepia or black-and-white, lowered saturation, a dark vignette or soft glow at the edges, light grain or film scratches, sometimes blurred edges; the filter fades out when returning to the present.

## Not to be confused with

Not a fade to white (TRN-02, just a transition); the flashback filter stays on for the whole memory. Not a status effect tint (FB-05, applied only to a character).

## Use it for

Memories, dreams, past timelines, a character’s inner world — players instantly read "this is not now".

## Tunable parameters

tone (sepia / mono / desaturated) · saturation · vignette strength · grain amount · edge blur · fade in/out time

## Request prompt

In your game, apply a flashback filter for memory sequences: start with a 0.5 s fade to white (TRN-02), then grade the whole image sepia (greyscale multiplied by #c8a878) at 20% saturation, add a 35% round vignette and 6% animated grain; fade the filter out over 0.8 s when returning to the present.

## Implementation hint

Fullscreen post pass on the scene render target: luminance → tint multiply → lerp with original by strength; multiply a radial vignette; add hashed per-frame grain. Drive one "flashback" weight 0→1 so it can fade.

## Related

- [TRN-02](TRN-02.md) — Fade to white
- [FB-05](FB-05.md) — Status effect tint
- [FB-16](FB-16.md) — Low-health vignette
- [TRN-03](TRN-03.md) — Crossfade
- [REN-29](REN-29.md) — Bloom/Glow
- [REN-32](REN-32.md) — Color grading/LUT/White balance

## References

- [Wikipedia — Flashback (narrative)](https://en.wikipedia.org/wiki/Flashback_(narrative))
- [Wikipedia — Sepia (color)](https://en.wikipedia.org/wiki/Sepia_(color))
- [Wikipedia — Vignetting](https://en.wikipedia.org/wiki/Vignetting)
