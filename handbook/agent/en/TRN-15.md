# TRN-15 · Seamless transition

**Aliases:** Masked loading; Hidden loading; Squeeze-through transition; Elevator loading

**Group:** Transitions
**Subcategory:** Cuts & spatial transitions

## What you see

There seems to be no transition: the player squeezes through a gap, rides a lift, walks a long corridor or opens a door with no interruption of camera or control, while the next area loads behind the scenes.

## Not to be confused with

Not a loading screen (TRN-17, which stops to show "loading"); a seamless transition hides the loading inside gameplay.

## Use it for

Open worlds and continuous experiences; preserves immersion and avoids black screens.

## Tunable parameters

passage length (s) · movement speed · occluder framing · fallback slow-down · streaming budget

## Request prompt

In your game, add a 3 s "push through the hedge" passage between town and forest: the hero walks slowly on rails, bushes cover the screen edges, and the forest area streams in meanwhile; if loading is not done after 3 s, slow the hero and play branch-parting until it is.

## Implementation hint

Engine-side: async resource loading on a worker thread with a ready flag; gameplay script throttles movement speed until ready. Rendering: foreground occluder sprites near the camera to frame the view.

## Related

- [TRN-17](TRN-17.md) — Loading screen
- [TRN-16](TRN-16.md) — Room transition scroll

## References

- [Wikipedia — Loading screen](https://en.wikipedia.org/wiki/Loading_screen)
