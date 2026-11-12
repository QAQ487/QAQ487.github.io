# ACT-39 · Variable jump height / Jump cut

**Aliases:** 可變跳躍高度; 短按矮跳; 長按高跳; Jump cut; Variable-height jump; Hold-to-jump; 可変ジャンプ

**Group:** Animation, movement & physics
**Subcategory:** Movement & forgiveness

## What you see

A short tap yields a low hop; holding the button rises to full height. Releasing early while still ascending cuts remaining upward velocity (jump cut) so the arc turns down sooner. Hold duration controls height inside one jump — not a second jump.

## Not to be confused with

Not apex hang time (ACT-03, slower fall near the peak) and not a double jump. Variable height decides height within the same launch by how long the button is held.

## Use it for

Precise platforming, choosing low gaps vs high ledges, rooms that need both short hops over spikes and long jumps over pits.

## Tunable parameters

max upward speed · jump-cut scale 0.4–0.55 · min hold for full height · min safe height · optional fall gravity mult (starting points)

## Request prompt

Add variable jump height to a 2D platformer. A light tap jumps low; holding to the cap jumps high. Releasing early while rising shortens the ascent (jump cut). Releasing on the way down must not change this jump, and pressing again in air must not start another jump. Compare tap, hold, and release-while-falling from the same spot. May coexist with ACT-03 apex hang.

## Implementation hint

On JumpPressed while grounded/coyote: vy = jumpSpeed; jumping=true. While vy>0 and JumpReleased: vy *= jumpCut. Optional: if JumpHeld and rising keep riseGravity; else use fallGravity. Never cut after apex (vy<=0). Pair with coyote (ACT-01) and buffer (ACT-02).

## Related

- [ACT-01](ACT-01.md) — Coyote Time / Ledge Grace Period
- [ACT-02](ACT-02.md) — Jump Buffering / Input Buffer
- [ACT-03](ACT-03.md) — Apex Hang Time / Reduced Gravity at Jump Peak
- [ACT-04](ACT-04.md) — Corner Correction / Jump Corner Correction
- [ACT-06](ACT-06.md) — Lift Momentum Storage / Momentum Retention
- [ACT-54](ACT-54.md) — Thrown-object springboard / Cap jump
- [ACT-56](ACT-56.md) — Hover float (puff, flutter, jet)

## References

- [Game Maker's Toolkit — Platformer Toolkit](https://gmtk.itch.io/platformer-toolkit)
- [GMTK — Behind The Code (Platformer Toolkit)](https://gmtk.itch.io/platformer-toolkit/devlog/395523/behind-the-code)
- [Maddy Thorson — Celeste & Forgiveness](https://www.maddymakesgames.com/articles/celeste_and_forgiveness/index.html)
