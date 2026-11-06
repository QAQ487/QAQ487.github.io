# CAM-30 · Camera shake／Screen shake

**Group:** Camera & composition
**Subcategory:** Feedback and Transitions

## What you see

At an explosion, heavy hit, or landing, the whole scene briefly shakes horizontally, vertically, or rotationally, then gradually settles. (General. Cinemachine Impulse is one event-driven system, not the sole official name for camera shake.)

## Not to be confused with

The physical world has not actually moved as a whole. This is not hit stop or controller vibration. Jitter caused by noisy target animation combined with look-ahead may simply be a defect.

## Use it for

Communicates impact, event intensity, and distance; attenuation can be directional and temporal.

## Tunable parameters

translation amplitude · rotation amplitude · duration · frequency · noise seed · envelope · distance falloff · motion-reduction scale

## Request prompt

In your game, add camera shake for a nearby heavy hit: 0.22 s duration, up to ±6 px translation, ±1.2° roll, and roughly 24 Hz noise, with a 0.03 s attack followed by exponential decay. Halve strength every 5 m and stop beyond 20 m; reduced camera motion scales intensity to 25%.

## Implementation hint

Generate deterministic band-limited noise for positional and rotational offsets, multiply it by an attack-decay envelope, and add it after normal camera following. Combine simultaneous impulses through a bounded intensity value and attenuate them by event distance and direction.

## References

- [Unity Cinemachine Impulse：遊戲事件與震動訊號](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineImpulse.html)
