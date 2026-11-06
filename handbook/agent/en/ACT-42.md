# ACT-42 · Guard counter

**Aliases:** 防反; 格擋反擊; Block counter; Just guard punish; ガードカウンター

**Group:** Combat feedback & game feel
**Subcategory:** Combat timing

## What you see

After a successful block — especially against a heavy hit — a short window lets an attack input fire a dedicated counter: faster startup, higher damage, or armored. The window is tighter than a normal cancel; missing it yields a normal attack.

## Not to be confused with

Not blockstun itself (ACT-23) and not stance break (ACT-41). A guard counter is the input window from successful guard into a special retaliate move.

## Use it for

Action-game defensive rhythm; enemies that reward reading over panic dodging.

## Tunable parameters

counter window 0.18–0.28 s · damage mult · startup frames · which blocked attacks qualify · success FX (starting points)

## Request prompt

After a successful block, a heavy input inside a short window becomes a counter. Empty guard, taking the hit, or pressing heavy after the window keep the original moves. Accept those four cases. Tune separately from ACT-23 blockstun.

## Implementation hint

OnGuardSuccess(hit): arm CounterWindow(t). If AttackPressed while window: Play(CounterClip), cancel blockstun early. Else fall through to normal attack buffer.

## Related

- [ACT-23](ACT-23.md) — Blockstun / Guard Stun
- [ACT-41](ACT-41.md) — Stance break / Poise break
- [ACT-18](ACT-18.md) — Startup / Start-up / Wind-up Frames
- [ACT-19](ACT-19.md) — Active Frames / Hit Window

## References

- [Wikipedia — Elden Ring](https://en.wikipedia.org/wiki/Elden_Ring)
- [Street Fighter — Frame data / guard concepts (example recognition)](https://www.streetfighter.com/6/en-us/character/ryu/frame)
