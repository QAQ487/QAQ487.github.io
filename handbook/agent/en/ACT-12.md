# ACT-12 · Ease In / Ease Out / Slow In and Slow Out

**Group:** Animation, movement & physics
**Subcategory:** Animation Principles and Action Readability

## What you see

A hand gradually slows as it approaches its target pose, rather than moving at constant speed and suddenly freezing.

## Not to be confused with

Every action needing slow movement at both ends; an impact can stop abruptly. Easing an animation curve does not necessarily change the character controller's acceleration.

## Use it for

Create smooth acceleration and deceleration and a sense of settling into a pose.

## Tunable parameters

curve shape · ease-in ratio · ease-out ratio · tangent slope · impact exception

## Request prompt

For a 500 ms hand motion, ease in over the first 20% and ease out over the last 30%, with a faster middle; if it impacts, stop within one update instead of applying the final ease.

## Implementation hint

Use a curve with shallow slopes near selected endpoints and a steeper middle section. Reserve abrupt slope changes for impacts or deliberately sharp actions rather than easing every movement uniformly.

## References

- [Wikipedia — Twelve basic principles of animation，Ease In, Ease Out](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
