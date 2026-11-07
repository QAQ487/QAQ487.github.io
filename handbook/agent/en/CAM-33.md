# CAM-33 · Handheld idle camera / Camera breathing

**Aliases:** Idle camera noise; Procedural handheld; Perlin camera drift; Camera breathing; 待機鏡頭呼吸; 手持微顫; 手持ちカメラの呼吸

**Group:** Camera & composition
**Subcategory:** Feedback and Transitions

## What you see

While the player stands still, the view drifts very slowly as if someone is holding the camera; a locked tripod makes the scene feel dead. Amplitude is tiny (~0.2°); people feel its absence more than its presence.

## Not to be confused with

Not event shake (CAM-30 / FB-07, short jolts from hits or explosions) and not locomotion comfort sway (UX-20). Breathing is idle-only and almost purely rotational.

## Use it for

Realistic third-person, survival horror, handheld presence in exploration; always expose a reduced-motion kill switch.

## Tunable parameters

idle threshold ~0.5 s · noise freqs 0.1–0.3 Hz · pitch/yaw amp ~±0.2° · roll amp ~0 · fade-out ~0.2 s · reduced-motion kill (authoring defaults)

## Request prompt

After ~0.5 s of idle, apply layered low-frequency noise to camera rotation only (~0.1–0.3 Hz, about ±0.2° pitch/yaw, roll near 0). Fade out within ~0.2 s of locomotion, look, or attack input. Reduced motion must zero it. Demo the same still scene in LOCKED vs BREATHING lanes.

## Implementation hint

Keep a handheldOffset quaternion/euler driven by 2–3 octaves of value/Perlin noise sampled at low frequencies. Gate with idleTimer; multiply by fade = 1 when idle else decay toward 0 over 0.2 s. Apply after the gameplay follow camera, before trauma shake. If reducedMotion: offset = identity.

## Related

- [CAM-30](CAM-30.md) — Camera shake／Screen shake
- [UX-20](UX-20.md) — Reduced motion / Motion settings
- [FB-07](FB-07.md) — Trauma-based screen shake

## References

- [Squirrel Eiserloh — Juicing Your Cameras With Math (GDC Vault)](https://www.gdcvault.com/play/1023557/Math-for-Game-Programmers-Juicing)
- [Wikipedia — Perlin noise](https://en.wikipedia.org/wiki/Perlin_noise)
- [Jan Willem Nijman — The art of screenshake (YouTube)](https://www.youtube.com/watch?v=AJdEqssNZ-U)
