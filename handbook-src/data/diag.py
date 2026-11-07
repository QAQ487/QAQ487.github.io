from common import E
# DIAG — planar reflections. Former diagnostic cards in this file were retired through REDIRECTS.
# ---- round 2 ----
E("DIAG-09","反射對位","Planar reflections",["鏡子沒有倒影","水面反射在畫面邊緣消失","倒影缺一塊","Mirror shows nothing","Reflections vanish at screen edges","Missing reflection of off-screen objects","Mirror reflection","Reflection camera","平面反射"],"S",
("平面反射（為鏡面或水面額外渲染一次鏡像）",
"角色站在鏡子、光滑大理石地板或平靜的湖面前：用螢幕空間反射時，畫面外或被角色擋住的東西反射不出來，倒影在畫面邊緣斷掉；用反射探針時，倒影不會隨角色移動。平面反射以反射平面把鏡頭鏡像到另一邊，從那裏把場景再渲染一次（通常解析度較低），然後貼回鏡面上，所以倒影完整、準確，包括角色本身。",
"不是螢幕空間反射（原手冊 REN-24，只能用畫面已有的像素）；也不是盒體投影立方體貼圖（REN-23，靜態、近似）；也不是一般的反射探針（原手冊 REN-23）。平面反射準確但每多一個反射平面就要多渲染一次場景，只適用於少數、真正平坦的表面。",
"鏡子、平靜水面、光滑舞台地板、需要清楚倒影的謎題或演出鏡頭。",
"為遊戲中的湖面加入平面反射：以水面高度建立反射矩陣，把主鏡頭鏡像到水面下方；以半解析度渲染一次場景到反射貼圖，使用斜截近平面裁掉水面以下的物件；只渲染不透明物件和天空，關閉陰影與後處理以節省成本；水面 shader 以螢幕座標取樣反射貼圖，再按法線圖偏移 2–4 像素做漣漪；只有當水面在畫面中可見時才更新。角色走到水邊時倒影必須完整且同步。"),
("Planar reflections",
"A character stands in front of a mirror, polished marble floor or calm lake. With screen-space reflections, anything off-screen or hidden behind the character can't be reflected and the reflection breaks off at the screen edge; with a reflection probe, the reflection doesn't follow the moving character. Planar reflections mirror the camera across the reflecting plane, render the scene again from there (usually at lower resolution), and map the result back onto the surface, so the reflection is complete and accurate, character included.",
"Not screen-space reflections (original handbook REN-24, limited to pixels already on screen), not box-projected cubemaps (REN-23, static and approximate), and not ordinary reflection probes (original handbook REN-23). Planar reflections are accurate but cost an extra scene render per reflecting plane, so they suit only a few genuinely flat surfaces.",
"Mirrors, calm water, glossy stage floors, puzzles or cinematic shots that need a clear reflection.",
"Add a planar reflection to the game's lake: build a reflection matrix from the water height and mirror the main camera below the surface; render the scene once at half resolution into a reflection texture, using an oblique near plane to clip everything below the water; draw only opaque objects and the sky, with shadows and post-processing off to save cost; in the water shader sample the reflection texture in screen space and offset it by 2–4 pixels from the normal map for ripples; update only while the water is visible. When the character walks to the water's edge the reflection must be complete and in sync."),
("平面反射（鏡面や水面のために鏡像をもう一度描画）",
"キャラクターが鏡、磨かれた大理石の床、静かな湖の前に立つ。スクリーンスペースリフレクションでは画面外やキャラに隠れたものが映らず、映り込みが画面の端で途切れる。リフレクションプローブでは映り込みが動くキャラについてこない。平面反射は反射面を挟んでカメラを鏡像の位置に置き、そこからシーンをもう一度（たいてい低解像度で）描画して面に貼り戻すので、キャラ自身も含めて映り込みが完全で正確になる。",
"スクリーンスペースリフレクション（元のハンドブック REN-24、画面上の既存ピクセルしか使えない）でも、ボックス投影のキューブマップ（REN-23、静的で近似）でも、通常のリフレクションプローブ（元のハンドブック REN-23）でもない。平面反射は正確だが、反射面が 1 つ増えるごとにシーンをもう 1 回描画するので、本当に平らな少数の面にだけ向く。",
"鏡、静かな水面、つやのあるステージの床、はっきりした映り込みが必要な謎解きや演出カット。",
"ゲームの湖に平面反射を追加して。水面の高さから反射行列を作り、メインカメラを水面の下へ鏡像配置する。シーンを半解像度で 1 回反射テクスチャへ描画し、斜めのニアクリップ面で水面より下を切り捨てる。コスト削減のため不透明物と空だけを描き、影とポストプロセスは切る。水面シェーダーではスクリーン座標で反射テクスチャをサンプリングし、ノーマルマップで 2〜4 ピクセルずらして波紋にする。水面が画面に見えている間だけ更新する。キャラが水辺に歩いてきたとき、映り込みが欠けずに同期していること。"),
"reflection plane (height/normal) · render-target resolution scale · layers/objects included · oblique clip plane · shadows/post in the reflection pass · update rate · distortion strength · fade at grazing angles (Fresnel)",
"Reflection matrix for plane (n, d): M = I − 2·n·nᵀ (with translation −2·d·n); viewReflect = view × M; flip winding (cull front instead of back). Use an oblique near plane (Lengyel's method) so geometry below the plane is clipped by the projection itself. Render to an RT, then in the surface shader sample with screen UV (or projective UV from the reflection camera), add normal-based offset, and lerp with the probe/SSR result by Fresnel. Engines expose this as a planar-reflection actor/component or a reflection-camera script.",
["REN-24 Screen-Space Reflections / SSR","REN-23 Reflections / IBL / Reflection probes"],["dg_ue_planar","dg_ue_planar_ja"])

