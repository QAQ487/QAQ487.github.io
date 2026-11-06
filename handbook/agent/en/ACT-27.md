# ACT-27 · Invulnerability / Invincibility Frames / I-frames

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

A roll passes through a blade, or wake-up protection prevents an attack's otherwise expected damage or hit reaction.

## Not to be confused with

Universal protection. Invulnerability may apply only to strikes, throws, or projectiles, and only during part of an action. Not every dodge has invulnerability. Shrinking a hurtbox so an attack misses is not necessarily rule-based invulnerability.

## Use it for

Provide a timing-dependent defensive option or prevent repeated hits in a short interval.

## Tunable parameters

invulnerable channels · start time · end time · hurtbox state · rehit protection

## Request prompt

From 80 to 260 ms after a roll starts, grant invulnerability to strikes and projectiles while throws remain valid; keep hurtboxes visible in debug and reject the specified channels by rule.

## Implementation hint

During a defined action interval, reject only the configured damage or grab categories while leaving other interactions intact. Distinguish rule-based invulnerability from attacks missing because hurtboxes moved.

## References

- [Capcom — Street Fighter 6 A.K.I. Frame Data，completely invincible／invincible to throws 等註解](https://www.streetfighter.com/6/en-us/character/aki/frame)
