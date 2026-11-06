# ANI-03 · Hold frame / Impact frame

**Aliases:** Held pose; Impact hold; Impact frames; ショックコマ

**Group:** Animation, movement & physics
**Subcategory:** Animation principles

## What you see

At the moment of a hit the character stays on the strongest pose for a few extra frames (a hold), or 1–3 frames in a completely different style are inserted — inverted black and white, a flat silhouette, bold radiating lines — then the image snaps back, making the blow feel heavy.

## Not to be confused with

Not hitstop (pausing game time on contact); a hold only lengthens one pose of the animation. Not a hit flash (FB-01, only the victim turns white) or a freeze-frame finisher (FB-11, the whole scene slows for a finishing shot). An impact frame changes the drawing style of the whole image.

## Use it for

Heavy hits, super moves, successful counters; cartoon or anime-style combat.

## Tunable parameters

hold length (2–6 frames) · impact frames (1–3) · style (invert / silhouette / radial lines / accent colour) · reserve for big hits only

## Request prompt

In your game, when a heavy hit lands: hold the attacker on the punch pose for 3 frames (50 ms), and insert 2 impact frames (33 ms each) — whole screen black, characters as white silhouettes, 16 white lines radiating from the hit point; invert black and white on the second frame, then snap back to colour and play the sparks.

## Implementation hint

Hold: extend the key frame duration in the clip or freeze the animator for N frames on the hit notify. Impact frame: a fullscreen pass for 1–3 frames that thresholds luminance to two tones (optionally inverted) and draws radial lines from the hit point; trigger it from the same hit event.

## Related

- [FB-01](FB-01.md) — Hit flash
- [FB-11](FB-11.md) — Freeze-frame finisher
- [FB-10](FB-10.md) — Slow motion
- [ANI-01](ANI-01.md) — Smear frame
- [ANI-05](ANI-05.md) — Hit reaction

## References

- [Sakugabooru wiki — impact frames (ショックコマ)](https://www.sakugabooru.com/wiki/show?title=impact_frames)
- [Sakuga Blog — Glossary (Impact Frames)](https://blog.sakugabooru.com/glossary/)
- [Wikipedia — Twelve basic principles of animation](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
