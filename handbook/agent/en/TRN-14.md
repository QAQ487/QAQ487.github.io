# TRN-14 · Whip pan

**Aliases:** Swish pan; Flash pan; Blur pan

**Group:** Transitions
**Subcategory:** Cuts & spatial transitions

## What you see

The camera swings sideways extremely fast; mid-move the image smears into horizontal motion-blur streaks, and when it stops we are at a new place or character — the cut is often hidden in the blur.

## Not to be confused with

Not a push (TRN-08, a sharp slide) — a whip pan has strong blur and speed. Not a room scroll (TRN-16, normal speed).

## Use it for

Jumping quickly to another character or place, comic timing, action cutscenes.

## Tunable parameters

duration · peak speed · blur length · cut point · easing in/out

## Request prompt

In a cutscene, whip pan from the hero to the distant enemy camp: accelerate right over 0.25 s, blur horizontally (~24 px) for the middle 0.1 s, cut to the camp at peak blur, then decelerate to a stop.

## Implementation hint

Directional blur pass: average N taps along x with offset ∝ camera speed. Swap source texture A→B when blur is maximal. Works on the low-res target before upscaling.

## Related

- [TRN-08](TRN-08.md) — Push transition
- [TRN-13](TRN-13.md) — Match cut
- [TRN-16](TRN-16.md) — Room transition scroll

## References

- [Wikipedia — Whip pan](https://en.wikipedia.org/wiki/Whip_pan)
