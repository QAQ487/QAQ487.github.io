# ENV-20 · Surface runoff and edge dripping

**Aliases:** Rain runoff; Roof edge drips; Water rivulets; Foliage water shedding; 屋簷滴水; 雨垂れ

**Group:** Environment, weather & time
**Subcategory:** Weather

## What you see

Rain stops, but eaves keep dripping; a wet branch shakes and sheds a brief shower. Weather is state held by objects, not an overlay that vanishes instantly.

## Not to be confused with

Not the rain overlay alone (ENV-04), wet shading alone (MATX-05), or a flowmap alone (VFX-03). This is storage → drainage → secondary contact.

## Use it for

Rain stages, realistic cinematics, worlds that stay wet after rain.

## Tunable parameters

wetness capacity · drip rate · rivulet channels · post-rain decay · sheltered flag · shake shed impulse (authoring defaults)

## Request prompt

Rain wets collecting surfaces, or an impulse shakes wet foliage → streams or intermittent drops travel downhill, detach, and splash/rings → stored water drains after rain; sheltered dry objects do not drip.

## Implementation hint

Per-object wetness01 filled by rain overlap. Emit drips from authored sockets when wetness > threshold with interval = f(wetness). Gust/shake events dump a burst and reduce wetness. ENV-04 drives fill; MATX-05 can read the same wetness for shading.

## Related

- [ENV-04](ENV-04.md) — Rain
- [MATX-05](MATX-05.md) — Wet surface
- [ENV-13](ENV-13.md) — Ripples
- [VFX-03](VFX-03.md) — Flowmap

## References

- [Sébastien Lagarde — Water drop / rainy world notes (Remember Me era)](https://seblagarde.wordpress.com/2013/04/14/water-drop-3b-physically-based-wet-surfaces/)
