# CAM-34 · Landing camera dip

**Aliases:** Landing bob; Camera land squash; Fall impact camera; Landing impulse; 落地鏡頭下沉; 着地ディップ

**Group:** Camera & composition
**Subcategory:** Feedback and Transitions

## What you see

On landing the view sinks slightly and springs back; heavier falls dip deeper. Without it the player feels like a floating capsule. This is a short impulse, not follow policy.

## Not to be confused with

Not landing compression animation (ACT-10) and not event shake (CAM-30). Dip only offsets camera Y and springs back. Complements vertical-follow hysteresis (CAM-04 / CAM-05): hysteresis is follow policy; dip is the land impulse.

## Use it for

Platforming, parkour FPS/TPS, landings that need weight.

## Tunable parameters

fall-speed scale · min trigger speed · impulse −2…−12 cm · ζ≈0.5 · settle ~0.25 s (authoring defaults)

## Request prompt

When grounded after airborne, apply a downward camera-Y impulse scaled by fall speed (authoring start about −2 to −12 cm) and return with an underdamped spring (ζ≈0.5, ~0.25 s). Hops below a small threshold produce nothing.

## Implementation hint

OnBecameGrounded: if fallSpeed > eps: camYVel += -k*fallSpeed (clamp). Integrate underdamped spring toward 0 each frame. Do not alter gameplay transform. Keep separate from trauma shake and from platform Y-hold.

## Related

- [ACT-10](ACT-10.md) — Squash and Stretch
- [FB-08](FB-08.md) — Camera kick
- [CAM-04](CAM-04.md) — Camera damping／Follow smoothing／Camera lag
- [CAM-05](CAM-05.md) — Platform-snapping

## References

- [Squirrel Eiserloh — Juicing Your Cameras With Math (GDC Vault)](https://www.gdcvault.com/play/1023557/Math-for-Game-Programmers-Juicing)
- [Jonasson & Purho — Juice it or lose it (YouTube)](https://www.youtube.com/watch?v=Fy0aCDmgnxg)
