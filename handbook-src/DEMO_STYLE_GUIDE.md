# 示範動畫 Style Guide（Canvas 統一版）

日期：2026-11-05  
用途：將原 SVG「原理」示範改寫成同效果層一致嘅 canvas 示範時跟呢份文件。  
目標風格來源：現有 `src/core.js` + `src/demos_*.js`（效果層），**唔係**現有 SVG 導圖風。

---

## 0. 而家兩套風格差喺邊

| | 效果層（canvas，目標） | 原層（SVG，舊） |
|---|---|---|
| 解析度 | 邏輯 **240×135**（16:9），顯示放大到 480×270，`imageSmoothingEnabled=false` | viewBox **640×300** |
| 畫風 | 低解析度像素／方塊場景、共用 sprite、town／forest／battle 場景 | 線條圖、標註箭嘴、Arial 字、 schematically |
| 主色 | 草地 `#5a9a4a`、天空 `#5fa8c8`、墨 `#141a24`、強調青 `#7fe3d8`／`P.cyan`、金 `#f2c94c`、紅 `#e04a3a` | 底 `#0b1426`、青 `#4ee0c3`／`#53dac7`、金 `#f5cb73`、珊瑚 `#ff827b`、灰藍標註 |
| 字型 | **`bold Npx monospace`**（通常 6–8px） | Arial / sans-serif |
| 時間 | `t ∈ [0,1)` 循環；多數 `d` 2.4–8 秒 | SMIL，`dur` 多數 6s；148／188 靜態 |
| API | `DEMOS['ID']={d,f,hi?,s?,t0?}` | 內嵌 `svg` 字串 + 可選 `dur` |

統一 = **全部改用左邊呢套**。唔好將 SVG 線條圖「放大畫」上 canvas；要用同一個 miniature game world 去示範概念。

---

## 1. 畫布與縮放（必須）

- 邏輯座標永遠係 **`W=240`, `H=135`**（`src/core.js`）。
- 預設：喺 240×135 buffer 畫，再 nearest-neighbour 放大到顯示 canvas 480×270。
- 需要較清晰 UI 字／幼線時：設 `hi:true`，顯示 canvas 直接 480×270，但 **繪畫函式開頭 `c.scale(2,2)`**，之後仍然用 240×135 座標（見 `demos_ui.js`）。
- 永遠：`imageSmoothingEnabled = false`；座標盡量 `Math.round`（`R()` 已幫你 round）。
- 唔好引入外部圖片、字型檔、遊戲截圖。

---

## 2. 調色盤（必須用 `P`）

優先用 `core.js` 嘅 `P`：

```
sky #5fa8c8   grass #5a9a4a  grass2 #4f8c42  grassD #3d7236
dirt #b9925e  dirtD #94704a  wood #7a5034   woodD #55361f
roof #b6483a  roofD #86302a  wall #e3c99a   wallD #bf9f72
stone #8a8f99 stoneD #5e636e water #3d7fc4  waterL #6fb3e8
skin #f0c69a  foe #6fbf4a    foeD #3f7f2a   red #e04a3a
white #ffffff ink #141a24    gold #f2c94c   purple #9a5ad1
cyan #7fe3d8  blue #4a78c8   night #0d1630  leaf #3f8f3a leafD #2c6a2e
orange #f08a3a
```

標籤／對照文字常用：`#e9edf2`（主）、`#9aa6b8`／`#cfd8e3`（次）、半透明底 `rgba(0,0,0,.55–.75)` 或 `rgba(10,14,24,.75)`。  
強調好／壞對照：好用青／綠（`P.cyan`、`#7ee36b`），壞或警告用 `P.red`／`P.gold`。  
**禁止**再引入 SVG 套裝主色（`#4ee0c3`、`#f5cb73`、`#ff827b` 做主視覺），除非係刻意引用舊圖對照。

---

## 3. 共用元件（優先重用，唔好重造）

| 函式 | 用途 |
|---|---|
| `R` `circ` `ring` `txt` `otxt` `label` | 方塊、圓、字（`otxt`＝描邊字） |
| `spr` `shadow` | `hero`／`npc`／`foe`／`coin`／`heart`；腳底錨點 |
| `ground` `path` `tree` `house` `tower` `fence` | 場景積木 |
| `town` `forest` `scene('day'\|'night'\|'forest'\|'battle'|…)` | 預烘場景 |
| `burst` `vignette` `bar` `tl` | 粒子、暗角、血條、轉場時間軸 |
| `ease` `eo` `ei` `seg` `lerp` `clamp` `hash` | 時間同隨機（用 `hash`，唔用 `Math.random`） |

新示範先問：可唔可以用 `town`／`bgArena` 類場景 + sprite？得就用。只有抽象光學／數學圖先畫簡圖，但仍用 `P` 色同 monospace 標註。

---

## 4. `DEMOS` 物件契約

```js
DEMOS['CAM-01'] = {
  d: 4,           // 循環秒數；預設 4。常見：2.4–3.2（打擊）、4–6（鏡頭／流程）、6–8（慢示範）
  t0: 0,          // 可選起始 t
  s: false,       // true = 靜態，唔播
  hi: false,      // true = 480×270 直畫 + 函式內 scale(2,2)
  f: (c, t, w, h, player) => { /* t in [0,1) */ }
};
```

- `t` 係歸一化時間；要真實秒數用 `t * player.dur` 或 `t * p.dur`（第五參）。
- 循環要 seamless：結尾狀態接得返開頭，或者用 `t%1` 類三角波。
- 對照示範（OFF／ON、Before／After）：左右分屏或並排，中間可加 1px 分隔；兩邊同一場景，只改目標效果。
- 每個 loop 要令「觀察」欄寫到嘅現象喺畫面出現至少一次；唔好淨係寫 label。

---

## 5. 動態與時間設計

- Easing：一般位移用 `ease`（smoothstep）；出場用 `eo`；打擊／彈跳可用 `Math.sin(a/life*Math.PI)`。
- Hit flash／freeze：極短（約 1–3 幀感，`a < 0.03–0.05` 相對秒）。
- 粒子：用 `burst` + 固定 `seed`，保證可重播、可 scrub。
- `prefers-reduced-motion` 同全局暫停已由 Player 處理；示範唔使自己讀 media query。
- 靜態概念（純命名對照、無時間維度）：可以 `s:true`，但仍要畫滿有意義嘅一幀，唔好空白。

建議時長：

| 類型 | `d`（秒） |
|---|---|
| 打擊／閃白／短 feedback | 2.4–3.2 |
| 一般效果／UI | 4 |
| 鏡頭路徑、多階段流程 | 6–8 |
| 很少需要 | >10（難 scrub） |

---

## 6. 文字與標註

- 畫布內標籤用 **英文短詞**（現有效果層慣例：`ON`/`OFF`、`Hit flash`、效果名），唔放長中文句（條目正文先三語）。
- 字級：標題／對照 `label` → 7px；主數字 `otxt` → 8–12；細註 6px。
- 需要可讀底：半透明方塊再 `txt`（參考 `cmMark`／`ppTag`）。
- 唔好用 Arial；唔好用 SVG 式箭嘴裝飾做主視覺（可用極簡線段，1–2px，`P.cyan`／`#e9edf2`）。

---

## 7. 檔案與整合步驟（改原層 → canvas）

1. 喺 `src/demos_<grp>.js`（或新 `demos_prin_cam.js` 等）新增 `DEMOS['CAM-xx']=…`。
2. `build.py`：該原層條目改為效果型渲染所需欄位 **或者** 保留 `layer:'p'` 內容欄，但 `figHtml` 改為有 `DEMOS[id]` 就用 canvas（建議：有 demo 就 canvas，唔再輸出 svg）。
3. 由 `orig_entries.json` 移除或忽略已遷移條目嘅 `svg`（減 HTML 體積）。
4. `python3 build.py` → `HB=batch1.html node test.js`：該 ID 必須 `kind:'canvas'`，`bad` 唔得有；`minsd` 同非靜態 `distinct` 要過現有門檻。
5. 視覺抽樣：至少 3 個時間點截圖人工睇吓同鄰近 FB／CAMX 條目夠唔夠似。

---

## 8. Agent 實作檢查清單（每條必過）

- [ ] 只用 240×135 邏輯座標（或 `hi`+`scale(2,2)`）
- [ ] 顏色來自 `P` 或上文允許嘅標籤色
- [ ] 重用 `spr`／`town`／`scene`／`burst` 等，除非題目天生抽象
- [ ] `Math.random` 零使用；用 `hash(seed+i)`
- [ ] scrub 到任意 `t` 畫面正確（唔靠累積 state）
- [ ] 無外部資產；無 ivy-engine／village-and-goblin 字眼
- [ ] 英文短 label；循環長度合理
- [ ] `node test.js` 該條非 `bad`

---

## 9. 建議遷移優先次序（運動先於靜態）

**P0 — 運動即係定義（優先 canvas）：**  
已有 `dur>0` 嘅 ~40 條（多數 CAM／部分 ACT／FX／UX），以及任何「運鏡、擊停、緩入緩出、震動、時間操控」類。

**P1 — 半動態：**  
對照 Before／After、滑桿感、多階段流程，即使舊圖係靜態。

**P2 — 可留靜態 canvas 一幀：**  
純分類命名、公式示意、無時間軸嘅概念圖（`s:true`），但仍轉做 canvas + `P` 色，唔留 SVG。

唔建議一次 188；按批次 10–20 條，每批鎖定同一 `demos_*.js` 檔同同一場景慣例。

---

## 10. 反例（唔好咁做）

- 把 SVG path 原封搬上 canvas 用 `Path2D` 繼續畫線條圖手冊風  
- 用 640×300 或非 16:9 邏輯解析度  
- 開 antialias 模糊放大像素精靈  
- 每條自訂一套全新角色比例／色票  
- 用真實時間 `Date.now()` 驅動（必須跟 `t`）  
- 示範依賴「上一幀」沒寫入 `t` 嘅狀態機而無法 scrub  

---

## 11. 一句話總結

> 新示範 = **240×135 像素小鎮／戰場玩具世界** + **`P` 色票** + **monospace 短英文標籤** + **可用時間軸 scrub 嘅純函式 `f(c,t)`**。  
> 舊 SVG = 深底線稿示意圖；遷移時係 **重做**，唔係描圖。
