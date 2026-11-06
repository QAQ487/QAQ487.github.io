# ANI-15 · Distance matching

**Aliases:** 起步停步滑行; 煞停時滑步; 停下來腳還在走; Stop slide; Feet slide when stopping; Start/stop foot sliding; Distance curve; Stop at mark; 距離マッチング

**Group:** Animation, movement & physics
**Subcategory:** Animation systems

## What you see

The character stops from different speeds after the stick is released. If the stop clip plays by time, either the feet finish planting while the body is still sliding, or the feet keep stepping after the body has stopped. With distance matching, code predicts how far is left before the stop and uses that distance to look up the matching frame on the stop clip's distance curve, so the last step always lands exactly on the stop point. Starts, pivots and jump landings (using height above ground) can be driven the same way.

## Not to be confused with

Not sync groups (ANI-14, which align the phase of two looping clips), not stride warping (ANI-16, which continuously scales a looping stride to match speed), and not motion warping (ACT-37, which bends a whole move's displacement towards a given target). Distance matching handles non-looping starts, stops and landings, and lets distance, not time, drive playback.

## Use it for

Characters with variable speed and acceleration/deceleration physics; starts and stops that must end on a precise spot; jump-landing anticipation; settling in front of doors, ladders or interaction points.

## Tunable parameters

distance curve per clip (to-stop / travelled / height-to-ground) · stop-point prediction (speed, deceleration, friction) · lookup method (curve inversion, monotonic) · max playback-rate clamp · end threshold · fallback to time playback

## Request prompt

Add distance matching to the character's stops: bake a 'distance to stop point' curve into the stop clip (0 on the last frame); when the character starts braking, predict the stop point from current speed and deceleration; every frame, invert the curve with the remaining distance to get the playback time instead of adding deltaTime; play out the last frame once less than 2 cm remains. Handle starts the same way with a 'distance travelled' curve. Feet must not slide at the stop.

## Implementation hint

Engine-agnostic: precompute for each start/stop/land clip a monotonic curve D(time) from the root-motion track. At runtime predict the remaining distance d (e.g. v²/(2·decel) for constant braking, or simulate the movement component's friction), then time = D⁻¹(d) by binary search over the baked samples; clamp the implied playback rate (e.g. 0.5×–2×) so poses don't snap. Engines expose this as distance-matching nodes/functions in the animation graph; a hand-rolled version is one lookup table per clip and a sampler that takes a time instead of advancing it.

## Related

- [ANI-16](ANI-16.md) — Stride warping
- [ANI-14](ANI-14.md) — Sync groups / Marker-based syncing
- [ANI-12](ANI-12.md) — Foot IK / Foot placement
- [ACT-30](ACT-30.md) — Root Motion
- [ACT-37](ACT-37.md) — Motion Warping / Root Motion Warping

## References

- [Unreal Engine docs — Distance matching](https://dev.epicgames.com/documentation/en-us/unreal-engine/distance-matching-in-unreal-engine)
- [Unreal Engine ドキュメント — 距離マッチング](https://dev.epicgames.com/documentation/ja-jp/unreal-engine/distance-matching-in-unreal-engine)
