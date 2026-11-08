# REN-32 · Color grading/LUT/White balance

**Aliases:** Linear workflow; sRGB; Gamma correction; 光暈疊加變髒; 漸層中間發暗; Split toning; Teal and orange; Teal & orange; 分離色調; 青橙調色; スプリットトーニング; ティール＆オレンジ; Day-for-night; American night; 日拍夜; デイ・フォー・ナイト

**Group:** Post-processing & screen filters
**Subcategory:** Cameras, Color, and Post-Processing

## What you see

teal-and-orange, warm yellow, or cool blue looks; shadows and highlights may use different tints.

## Not to be confused with

color grading is the adjustment process; a LUT (lookup table) is one mapping tool, not a synonym for the effect. It cannot replace actual scene lighting; mismatched LUT color spaces or application order can cause errors.

## Use it for

unifying art direction and differentiating regions, seasons, and moods. Two lights that overlap into grey, or a gradient whose middle is too dark, come from mixing colour in the wrong brightness space. They are not a look a grade should request. Grading arranges warmth and contrast on a picture that is already correct. (Former entry DIAG-02, “Linear workflow”, is merged here only as that contrast.) Day-for-night / American night is a named grade example — day footage pushed toward night — not an actual time-of-day cycle (ENV-01) and not exposure alone (REN-30).

## Tunable parameters

temperature · tint · saturation · contrast · shadow color · highlight color · LUT strength · day-for-night sky suppress · teal-orange split

## Request prompt

In your game, add whole-image color grading: snow white balance 7500 K, saturation 0.9, 8% cyan-blue shadows and 4% warm yellow highlights; also offer a day-for-night example that darkens mids/highlights, restrains colour, cools selectively and suppresses a bright sky, keeping skin-tone shift below 5%.

## Implementation hint

Apply white balance and creative grading in a known color space at a fixed point in the display pipeline. Offer split toning (teal shadows / orange highlights) and a day-for-night grade that darkens mids/highlights, restrains colour, cools selectively, and suppresses a conspicuously bright sky. Blend grades by scene state.

## Related

- [CIN-14](CIN-14.md) — Flashback filter
- [PP-14](PP-14.md) — Bleach bypass / Skip bleach
- [PP-17](PP-17.md) — Cross-processing / X-pro
- [ENV-01](ENV-01.md) — Day-night cycle
- [REN-30](REN-30.md) — Exposure/Auto exposure/Eye adaptation

## References

- [Unreal — Post Process Effects，Color Grading](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-effects-in-unreal-engine)
