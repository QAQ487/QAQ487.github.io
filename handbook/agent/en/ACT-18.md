# ACT-18 · Startup / Start-up / Wind-up Frames

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

After pressing attack, an initial arm raise or wind-up occurs before that move's attack detection can hit anyone.

## Not to be confused with

Input latency itself. Capcom's tables describe start-up as the frame on which attack detection appears; follow their counting convention when reading them.

## Use it for

Determine attack speed, reactability, and the risk of starting a move.

## Tunable parameters

startup duration · first active instant · input timestamp · telegraph pose · frame convention

## Request prompt

Give the heavy attack 240 ms of startup and enable attack detection from 241 ms onward; show a readable arm raise for the first 160 ms and document whether the first active update is included in timing counts.

## Implementation hint

Represent startup as the interval from accepted input until attack detection first becomes active. Document whether the first active update is included in reported startup counts to avoid off-by-one ambiguity.

## References

- [Capcom — Street Fighter 6 A.K.I. Frame Data，表頭說明](https://www.streetfighter.com/6/en-us/character/aki/frame)
