# NAV-07 · Guiding wind (environmental direction cue)

**Aliases:** 風指引方向; 沒有導航箭頭; 草和樹葉指路; Guiding wind; Environmental wayfinding; Diegetic navigation; Wind direction cue; 風による誘導

**Group:** Visual guidance & wayfinding
**Subcategory:** Path guidance

## What you see

After the player sets a destination, the wind in the scene blows toward it: grass, leaves, cloth strips and floating particles all sway in that direction instead of an on-screen arrow or route line. Players find their way by reading the environment and the screen stays clean. The cue needs enough strength and duration, and a conventional marker should be offered as a fallback.

## Not to be confused with

Not a breadcrumb trail (UX-29, a row of dots on the ground), not light-based guidance (UX-30, leading with light, shade and area colour) and not general foliage sway (ENV-08, with no directional meaning). This entry turns ambient motion itself into an arrow toward the goal.

## Use it for

Open-world exploration, games aiming for a minimal HUD, nature-themed works; water currents, flocks of birds or motes of light can stand in for wind.

## Tunable parameters

wind dir = normalize(target - player).xz · turn smoothing 0.3–1 s · boost 2–4× for 1.5–3 s · leaf particles · fallback marker toggle (starting points)

## Request prompt

Add guiding wind: once the player sets a target, set the global wind direction to the horizontal direction from player to target, turning smoothly over 0.5 s; when the guide button is pressed, ramp wind strength to 3× normal over 2 s and lift leaf particles (all starting values). Grass and tree sway, cloth (PHY-01) and particles all read the same wind parameter. Provide a Show classic route marker fallback in settings.

## Implementation hint

Single global WindParams {dir, strength, gustPhase} uploaded to foliage vertex shaders (ENV-08), cloth solvers and particle forces. On guide: dir = slerp(dir, toTarget, dt/turnTime); strength = base*lerp(1,boost,envelope(t)). Spawn leaf particles upwind of the player moving along dir so they pass through view.

## Related

- [UX-29](UX-29.md) — Breadcrumbing / Breadcrumb trail
- [UX-30](UX-30.md) — Lighting cues / Color coding
- [ENV-08](ENV-08.md) — Foliage sway
- [PHY-01](PHY-01.md) — Position-based cloth (PBD / XPBD)

## References

- [Wikipedia — Ghost of Tsushima (guiding wind navigation, example only)](https://en.wikipedia.org/wiki/Ghost_of_Tsushima)
