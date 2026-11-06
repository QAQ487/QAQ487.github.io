# CAM-06 · Look-ahead／Projected-focus

**Group:** Camera & composition
**Subcategory:** 2D Following

## What you see

As the character accelerates rightward, the view’s focal position gradually shifts right. The character sits closer to the left edge, with more visible distance ahead. (Look-ahead is common terminology. Projected-focus is Keren’s category for velocity extrapolation; not all look-ahead predicts from velocity.)

## Not to be confused with

Leaving space according to facing direction is not the same as predicting actual movement direction, especially when the character faces right while sliding left. Extrapolating vertical jump velocity may cause unnecessary vertical bobbing.

## Use it for

Reveals obstacles, enemies, and landing spots earlier.

## Tunable parameters

prediction time · max look-ahead · speed threshold · acceleration smoothing · recenter time · vertical contribution

## Request prompt

In your game, add velocity-predictive look-ahead: average the character's horizontal velocity over 0.12 s, project 0.35 s ahead, and clamp the focus offset to 56 px. Add no offset below 20 px/s, transition direction over 0.22 s, recenter over 0.4 s when stopped, and use only 20% of vertical velocity.

## Implementation hint

Estimate a projected focus from filtered target velocity, clamp its offset, and add it to the normal follow target. Use hysteresis around zero velocity and usually reduce or disable the vertical component so jumping does not make the view bob.

## References

- [Unity：Lookahead Time](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachinePositionComposer.html)
- [Keren：Projected-focus](https://web.archive.org/web/20261026201424/https://gamedesignskills.com/game-design/camera-design-2d-side-scroller-games/)
