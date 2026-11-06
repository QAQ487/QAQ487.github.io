# TRN-01 · Fade to black

**Aliases:** Fade out / fade in; Dip to black

**Group:** Transitions
**Subcategory:** Fades & dissolves

## What you see

The image darkens until fully black, holds briefly, then the new scene fades up from black.

## Not to be confused with

Not a crossfade (TRN-03, two images blend directly with no black in between) nor a fade to white (TRN-02).

## Use it for

Scene changes, passage of time (sleeping until morning), hiding a load; the most universal, safest transition.

## Tunable parameters

fade out time · hold time · fade in time · curve · colour (black) · input lock

## Request prompt

In your game, use a fade to black when entering or leaving a house: fade to full black over 0.35 s ease-in, hold 0.1 s (swap the scene then), then fade in over 0.35 s ease-out; lock player input during the fade.

## Implementation hint

Fullscreen quad with alpha = fade, blended SrcAlpha/InvSrcAlpha after the scene (and before UI if the UI should stay). Drive from a TransitionManager with out/hold/in states; the scene swap happens at the hold.

## Related

- [TRN-02](TRN-02.md) — Fade to white
- [TRN-03](TRN-03.md) — Crossfade
- [TRN-17](TRN-17.md) — Loading screen

## References

- [Wikipedia — Fade (filmmaking)](https://en.wikipedia.org/wiki/Fade_(filmmaking))
