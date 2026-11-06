# CAM-01 · Position-locking／Locked follow

**Group:** Camera & composition
**Subcategory:** 2D Following

## What you see

As the character runs, they remain at the same screen position while the background slides in the opposite direction. Only the horizontal or vertical axis may be locked; the character need not be centered. (Position-locking is a Keren category; follow camera is a more general search term.)

## Not to be confused with

The camera is not stationary, and this is not combat lock-on targeting. Without smoothing, a locked-follow camera also jumps when the character suddenly changes position.

## Use it for

A direct, predictable following rule, suitable for exploration scenes with a small character and sufficient visibility around them.

## Tunable parameters

locked axis (X / Y / both) · screen anchor · follow smoothing · max follow speed · teleport snap threshold · camera bounds

## Request prompt

In your game, add locked-position following: for a 320×180 reference frame, keep the character at 40% of the screen width and 55% of its height, following on both axes. Smooth ordinary motion over 0.12 s, snap immediately after teleports greater than 96 px, and apply level bounds last.

## Implementation hint

Convert the target position to the desired camera transform that keeps it at a fixed normalized screen anchor, then update only the selected axes. Apply optional damping during ordinary movement, but snap when displacement exceeds a teleport threshold, and constrain the result after following.

## References

- [Itay Keren：Follow the Action／Position-locking](https://web.archive.org/web/20261026201424/https://gamedesignskills.com/game-design/camera-design-2d-side-scroller-games/)
