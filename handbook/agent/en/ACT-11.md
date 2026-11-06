# ACT-11 · Timing / Spacing

**Group:** Animation, movement & physics
**Subcategory:** Animation Principles and Action Readability

## What you see

The same arm raise can look hesitant when slow or crisp when it snaps into place. Different distances between successive poses also change the impression of speed.

## Not to be confused with

Animation key count, game-logic update rate, and display FPS are different things. More keys do not automatically make an action slower.

## Use it for

Shape rhythm, personality, and perceived weight. Timing concerns when a pose is reached; spacing concerns the distance between adjacent sampled poses.

## Tunable parameters

total duration · pose timestamps · sample spacing · acceleration impression · key poses

## Request prompt

Create a 600 ms arm raise sampled every 100 ms, with successive travel distances of 2, 4, 8, 8, 4, and 2 cm, preserving duration while showing acceleration then deceleration.

## Implementation hint

Choose when important poses occur, then shape the distances traveled between equal-time samples. Timing establishes rhythm, while spacing establishes the perceived speed between those poses.

## References

- [Wikipedia — Twelve basic principles of animation，Timing](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
- [Pluralsight — Understanding the 12 Principles，Timing and Spacing](https://www.pluralsight.com/resources/blog/software-development/understanding-12-principles-animation)
