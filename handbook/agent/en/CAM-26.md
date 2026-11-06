# CAM-26 · Dutch angle／Canted angle

**Group:** Camera & composition
**Subcategory:** Composition and Cinematics

## What you see

A normally level horizon or architectural line is slanted, as if the frame were falling to one side. (General cinematography terminology.)

## Not to be confused with

This is roll around the viewing direction, not pitch that looks up or down. An ordinary high-angle shot is not a Dutch angle.

## Use it for

Unease, imbalance, psychological pressure, or stylized presentation.

## Tunable parameters

roll angle · entry time · hold time · recovery time · roll direction · maximum angle · motion-reduction scale

## Request prompt

In your game, add a Dutch angle in the hallucination zone: roll the camera 12° around its view axis over 0.25 s, hold for at most 2 s, then recover to 0° over 0.8 s without changing pitch or yaw. A reduced-camera-motion option must lower it to 3° or disable it.

## Implementation hint

Apply roll around the camera's forward axis after aim orientation is solved, then interpolate with a bounded easing curve. Expose an accessibility multiplier because sustained or oscillating roll can cause discomfort.

## References

- [Wikipedia — Shot (filmmaking)：Dutch angle shot](https://en.wikipedia.org/wiki/Shot_(filmmaking))
