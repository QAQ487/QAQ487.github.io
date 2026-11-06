# CAMX-05 · Auto-scrolling

**Aliases:** Forced scrolling; Autoscroller; Auto-scroll level

**Group:** Camera & composition
**Subcategory:** Follow & framing rules

## What you see

The camera advances on its own in one direction at a set speed, regardless of the player; the player must keep moving within the screen, gets pushed along by the trailing edge if they fall behind, and is hurt or killed if crushed between a wall and the edge.

## Not to be confused with

Not a follow camera (CAM-04 Camera damping, the camera chasing the player); here the player chases the camera. Not parallax scrolling (PIX-15, which describes how background layers move).

## Use it for

Shoot-’em-ups, chase levels, vehicle or boat sections, levels that need time pressure.

## Tunable parameters

scroll speed · speed keyframes · push vs kill at trailing edge · crush rule · warning cue

## Request prompt

In your game, build an auto-scrolling section: the camera moves right at 40 px/s, speeding up to 80 px/s or pausing at scripted points; clamp the player to the camera view so the left edge pushes them; if the player is squeezed between the edge and terrain, kill them, and show a red warning gradient on the left edge.

## Implementation hint

Drive camera position from a level-time curve (keyframed speed integrated over time), not from the player. After moving the player, clamp it into the camera rect; if the clamp pushes it into solid geometry, trigger the crush/death state.

## Related

- [PIX-15](PIX-15.md) — Parallax scrolling
- [CAM-09](CAM-09.md) — Camera bounds／Camera confinement
- [CAMX-06](CAMX-06.md) — Flip-screen
- [TRN-16](TRN-16.md) — Room transition scroll

## References

- [Wikipedia — Scrolling (auto-scrolling, flip-screen)](https://en.wikipedia.org/wiki/Scrolling)
- [Wikipedia — Scrolling shooter](https://en.wikipedia.org/wiki/Scrolling_shooter)
- [Itay Keren — Scroll Back: The Theory and Practice of Cameras in Side-Scrollers (Game Developer)](https://www.gamedeveloper.com/design/scroll-back-the-theory-and-practice-of-cameras-in-side-scrollers)
