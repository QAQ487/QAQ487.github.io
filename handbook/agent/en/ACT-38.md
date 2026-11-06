# ACT-38 · Animation Event / Anim Notify / Notify State

**Group:** Animation, movement & physics
**Subcategory:** Skeletal Animation, Movement, and Pose Composition

## What you see

A footstep sound plays as a foot lands; a sword trail switches on during part of a swing and off when that interval ends.

## Not to be confused with

Notifies being the required source of combat truth in every game. They are an engine-provided synchronization mechanism. Actual hits, damage, and network authority may be determined by another system; reaching the sword-trail moment does not guarantee a hit.

## Use it for

Synchronize sound, effects, or custom logic with positions on the animation timeline. One-shot events and sustained intervals with a start and end can be represented separately.

## Tunable parameters

event timestamp · state interval · payload · duplicate guard · authority boundary

## Request prompt

Trigger one footstep at 18% and another at 68% of the walk cycle; enable a sword-trail state from 240 to 360 ms and disable it on exit, while damage remains authoritative in separate combat rules.

## Implementation hint

Associate one-shot callbacks and bounded state intervals with animation timeline positions, then dispatch them reliably when those positions are crossed. Keep cosmetic synchronization separate from authoritative hit or network decisions where required.

## References

- [Epic Games — Animation Notifies，Notify／Notify State](https://dev.epicgames.com/documentation/en-us/unreal-engine/animation-notifies-in-unreal-engine)
