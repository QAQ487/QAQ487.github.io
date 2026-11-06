# TRN-17 · Loading screen

**Aliases:** Interstitial; Loading interstitial; Tips screen

**Group:** Transitions
**Subcategory:** Cuts & spatial transitions

## What you see

A separate screen shown while switching areas: a progress bar or animated icon, tip text, artwork or a small animation; the game starts once loading is done.

## Not to be confused with

Not a seamless transition (TRN-15, loading hidden in gameplay); a loading screen explicitly tells the player "loading".

## Use it for

Large area changes and first launch; can also teach (tips) or tell lore.

## Tunable parameters

minimum display time · progress source (real / smoothed) · tip pool · animation · fade in/out

## Request prompt

Add a loading screen to the game: dark background, a small enemy running in place (4-frame loop) in the centre, a pixel-style progress bar and one random tip (trilingual) below; once loaded keep it up for at least 0.3 s to avoid flicker, then fade to black into the game.

## Implementation hint

Keep the loading scene tiny and resident; load on a worker thread, report progress via an atomic; the render thread only draws the loading scene. Smooth the displayed progress so it never goes backwards.

## Related

- [TRN-15](TRN-15.md) — Seamless transition
- [TRN-01](TRN-01.md) — Fade to black

## References

- [Wikipedia — Loading screen](https://en.wikipedia.org/wiki/Loading_screen)
- [Design Atlas — Loading tips](https://design.solhun.com/en/game-ui/loading-tips/)
