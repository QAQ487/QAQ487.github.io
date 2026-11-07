from common import E
# Motion / immersion presentation batch — 14 new cards. Numbers are authoring defaults.

E('CAM-33','回饋與轉場','Handheld idle camera / Camera breathing',
['Idle camera noise','Procedural handheld','Perlin camera drift','Camera breathing','待機鏡頭呼吸','手持微顫','手持ちカメラの呼吸'],'C',
('待機手持鏡頭／鏡頭呼吸','角色站定不動時，視角仍極緩慢地漂移，像有人手持攝影機；鎖死在三腳架上的畫面會顯得死板。振幅極小（約 0.2°），人往往是「感覺到沒有它」多過「看見它」。','不是事件震動（CAM-30／FB-07，受擊或爆炸的短促抖動）；也不是步行晃動（UX-20 舒適搖晃，隨移動出現）。鏡頭呼吸只在待機、且幾乎只動旋轉。','第三人稱寫實、生存恐怖、需要「手持臨場感」的過場與探索；必須提供減少動態關閉項。','玩家待機約 0.5 秒後，只對鏡頭施加分層低頻噪聲旋轉偏移（約 0.1–0.3 Hz，俯仰／偏航約 ±0.2°，滾轉近 0）。移動、轉向或攻擊輸入後約 0.2 秒內淡出。減少動態設定必須把它歸零。示範用同一靜景左右對照 LOCKED 與 BREATHING。'),
('Handheld idle camera / Camera breathing','While the player stands still, the view drifts very slowly as if someone is holding the camera; a locked tripod makes the scene feel dead. Amplitude is tiny (~0.2°); people feel its absence more than its presence.','Not event shake (CAM-30 / FB-07, short jolts from hits or explosions) and not locomotion comfort sway (UX-20). Breathing is idle-only and almost purely rotational.','Realistic third-person, survival horror, handheld presence in exploration; always expose a reduced-motion kill switch.','After ~0.5 s of idle, apply layered low-frequency noise to camera rotation only (~0.1–0.3 Hz, about ±0.2° pitch/yaw, roll near 0). Fade out within ~0.2 s of locomotion, look, or attack input. Reduced motion must zero it. Demo the same still scene in LOCKED vs BREATHING lanes.'),
('待機の手持ちカメラ／カメラの呼吸','立ち止まっている間も視点がごくゆっくり流れ、誰かがカメラを持っているように見える。三脚で完全固定すると死んだ絵になる。振幅は約 0.2° と小さく、「無いこと」の方が感じ取られやすい。','イベント揺れ（CAM-30／FB-07）ではない。歩行の快適スウェイ（UX-20）でもない。呼吸は待機中だけで、ほぼ回転のみ。','写実三人称、サバイバルホラー、手持ち感の探索。必ずモーション低減で切れるようにする。','約 0.5 秒の待機後、カメラ回転だけに低周波ノイズ（約 0.1〜0.3 Hz、ピッチ／ヨー ±0.2°、ロールほぼ 0）を重ねる。移動・視点・攻撃入力から約 0.2 秒でフェードアウト。低減設定では必ず 0。同じ静止画を LOCKED／BREATHING で並べる。'),
'idle threshold ~0.5 s · noise freqs 0.1–0.3 Hz · pitch/yaw amp ~±0.2° · roll amp ~0 · fade-out ~0.2 s · reduced-motion kill (authoring defaults)',
'Keep a handheldOffset quaternion/euler driven by 2–3 octaves of value/Perlin noise sampled at low frequencies. Gate with idleTimer; multiply by fade = 1 when idle else decay toward 0 over 0.2 s. Apply after the gameplay follow camera, before trauma shake. If reducedMotion: offset = identity.',
['CAM-30','UX-20','FB-07'],['mo_eiserloh','mo_w_perlin','mo_nijman'])

E('CAM-34','回饋與轉場','Landing camera dip',
['Landing bob','Camera land squash','Fall impact camera','Landing impulse','落地鏡頭下沉','着地ディップ'],'C',
('落地鏡頭下沉','落地瞬間視角略往下沉再彈回；落差越大沉得越深。沒有它時角色像漂浮膠囊。這是短促衝量，不是跟隨策略。','不是落地壓縮動畫本身（ACT-10）；也不是事件震動（CAM-30）。下沉只動鏡頭垂直偏移並快速回彈。與垂直跟隨滯後（CAM-04／CAM-05）互補：滯後管「跟不跟 Y」，下沉管「落地一下」。','平台跳躍、第一／三人稱跑酷、需要重量感的落地。','離地後再次着地時，依下落速度對鏡頭 Y 施加向下衝量（起始約 −2 至 −12 cm），以欠阻尼彈簧（ζ≈0.5，約 0.25 s）回正。低於小門檻的輕跳不觸發。'),
('Landing camera dip','On landing the view sinks slightly and springs back; heavier falls dip deeper. Without it the player feels like a floating capsule. This is a short impulse, not follow policy.','Not landing compression animation (ACT-10) and not event shake (CAM-30). Dip only offsets camera Y and springs back. Complements vertical-follow hysteresis (CAM-04 / CAM-05): hysteresis is follow policy; dip is the land impulse.','Platforming, parkour FPS/TPS, landings that need weight.','When grounded after airborne, apply a downward camera-Y impulse scaled by fall speed (authoring start about −2 to −12 cm) and return with an underdamped spring (ζ≈0.5, ~0.25 s). Hops below a small threshold produce nothing.'),
('着地カメラディップ','着地で視点がわずかに沈み、ばねで戻る。落下が大きいほど深く沈む。無いと浮いたカプセル感になる。短いインパルスであり、追従ポリシーではない。','着地のつぶれアニメ（ACT-10）ではない。イベント揺れ（CAM-30）でもない。カメラ Y だけを沈めて戻す。縦追従ヒステリシス（CAM-04／CAM-05）と対：ヒステリシスは「Y を追うか」、ディップは「着地の一押し」。','足場跳び、パルクール、着地に重さが欲しい場面。','空中から接地したら落下速度に比例してカメラ Y に下向きインパルス（初期 −2〜−12 cm）を加え、不足減衰ばね（ζ≈0.5、約 0.25 s）で戻す。小さなホップは無視。'),
'fall-speed scale · min trigger speed · impulse −2…−12 cm · ζ≈0.5 · settle ~0.25 s (authoring defaults)',
'OnBecameGrounded: if fallSpeed > eps: camYVel += -k*fallSpeed (clamp). Integrate underdamped spring toward 0 each frame. Do not alter gameplay transform. Keep separate from trauma shake and from platform Y-hold.',
['ACT-10','FB-08','CAM-04','CAM-05'],['mo_eiserloh','mo_juice'])

E('CAM-35','3D 跟隨與可讀性','See-through occluder / Dithered fade',
['X-ray occluder','Cutout silhouette','Wall fade','Occlusion dither','遮擋漸隱','壁抜けディザ'],'C',
('遮擋物透視／抖色淡出','相機與角色之間的牆改為紗窗般的抖色半透明，或在角色周圍開出剪影洞；鏡頭本身不推近。','不是鏡頭避讓／推近（CAM-14／CAM-15，鏡頭移動避開遮擋）。本條固定鏡頭、改變遮擋物外觀。也不是永久 X 光材質（MATX-10）作為常駐狀態。','俯視動作 RPG、第三人稱在密閉空間、需要始終看清角色。','物體與相機→角色射線相交時，該物體在約 0.15 秒內抖色淡至約 30% 不透明，或角色周圍圓形剪洞；遮擋解除後約 0.3 秒恢復。'),
('See-through occluder / Dithered fade','A wall between camera and character fades to a screen-door / dither pattern, or a hole opens around the character — without dollying the camera.','Not camera collision / deocclusion moves (CAM-14 / CAM-15). This keeps the camera and changes the wall. Not a permanent X-ray material state (MATX-10).','Isometric action RPGs, third-person indoors, anytime the character must stay readable.','When an object intersects the camera→character ray, dither-fade it to ~30% opacity over ~0.15 s, or cut a circular silhouette around the character; restore over ~0.3 s once clear.'),
('遮蔽の透視／ディザフェード','カメラとキャラの間の壁をスクリーン扉状のディザ半透明にするか、キャラ周囲に切り抜き穴を開ける。カメラは寄らない。','カメラ衝突／回避移動（CAM-14／CAM-15）ではない。カメラは固定し、壁の見た目を変える。常時の X 線材質（MATX-10）とも違う。','見下ろしアクション RPG、室内三人称、キャラを常に見せたい場面。','カメラ→キャラのレイと交差した物体を約 0.15 秒で不透明度約 30% までディザフェード、または円形カットアウト。クリア後約 0.3 秒で戻す。'),
'fade-in ~0.15 s · target opacity ~0.3 · restore ~0.3 s · dither vs cutout · ray thickness (authoring defaults)',
'Each frame gather occluders along camera-to-focus. Blend a per-renderer opacity or clip threshold; prefer ordered dither / alpha-to-coverage so sorting stays stable. Cutout variant: clip in screen space with a soft circle around the focus projection. Never move the camera for this effect.',
['CAM-15','CAM-14','MATX-06','MATX-10'],['mo_w_dither'])

E('ANI-19','動畫系統技術','Turn-in-place / Pivot step',
['Idle turn','Rotate-in-place threshold','Foot-planted turn','180 turn','Pivot step','原地轉向','その場ターン'],'C',
('原地轉向／軸步','站定時小幅轉向只扭上半身、腳不動；超過閾值才踏出 90°／180° 一步並帶動根骨骼。沒有它時整身像轉盤——常見的廉價感。','不是視線追蹤（ANI-11，頭跟目標、身體可不轉）；也不是移動中的方向扭曲（ANI-17）。原地轉向專指站定時的面向修正。','第三人稱動作、寫實角色、需要「腳有重量」的待機。','面向與目標偏航差低於約 60–90° 時用脊柱／頭加性扭轉、腳鎖定；超過則播放 90°／180° 踏步並讓根旋轉對齊腳着地；完成後腳朝新方向、扭轉歸零。'),
('Turn-in-place / Pivot step','Standing still, a small stick twist turns the upper body with feet planted; past a threshold the character takes a 90°/180° step. Without it the whole body spins like a turntable — a common cheap tell.','Not look-at (ANI-11, head tracks while the body may stay) and not orientation warping while moving (ANI-17). Turn-in-place is idle facing correction.','Third-person action, realistic characters, idle facing that needs planted feet.','Yaw error under ~60–90°: absorb with additive spine/head twist and locked feet. Over threshold: play a 90° or 180° step and rotate the root with foot plants; then feet face the new direction and twist returns to 0.'),
('その場ターン／ピボットステップ','静止中の小さな向き変更は上半身だけねじり足は固定。しきい値を超えると 90°／180° の一歩でルートを回す。無いとターンテーブルのように安く見える。','ルックアット（ANI-11）ではない。移動中の向きワープ（ANI-17）でもない。静止時の向き修正。','三人称アクション、写実キャラ、足に重さがある待機。','ヨー誤差が約 60〜90° 未満なら背骨／頭の加算ねじりで吸収し足を固定。超えたら 90°／180° ステップを再生し足の接地に合わせてルート回転。完了後は足が新方向、ねじりは 0。'),
'twist threshold 60–90° · max spine twist · 90/180 clip set · foot-plant sync · blend out twist (authoring defaults)',
'Compute yawError = deltaAngle(facing, desired). If abs(error) < threshold: set additive aim/twist weights; freeze foot IK targets. Else: select turn clip by signed error quadrant, root-rotate with animation events on plant, clear twist at end. Cross-link gaze-led turn on ANI-11.',
['ANI-11','ANI-17','ACT-14'],['mo_w_ik','an_w_12p'])

E('ANI-20','動畫系統技術','Locomotion lean / Body banking',
['Lean into turns','Acceleration lean','Procedural lean','Run tilt','移動側傾','走行リーン'],'C',
('移動側傾／身體傾斜','急轉或加速時角色向彎道或前方傾斜，停下時短暫後仰。沒有它時像紙板在轉盤上滑。','不是載具鏡頭側傾（CAMX-13，鏡頭滾轉）；本條是角色身體。也不是單純動畫曲線預錄的傾角，而是隨加速度程序驅動。','跑酷、第三人稱移動、卡通平台。','以側向加速度（速度×轉向率）或前進加速度驅動骨盆／脊柱滾轉與俯仰（2D 可用精靈旋轉），比例傾斜、上限約 10–15°，彈簧平滑；加速度≈0 回正。急停給短暫後仰。'),
('Locomotion lean / Body banking','When swerving or speeding up, the runner tilts into the curve or forward, then straightens; on a hard stop they lean back briefly. Without it the character slides like a cardboard cutout.','Not vehicle camera banking (CAMX-13). This is the character body. Prefer acceleration-driven lean over a baked tilt cycle alone.','Parkour, third-person locomotion, cartoon platformers.','Drive pelvis/spine roll and pitch (or sprite rotation in 2D) from sideways acceleration (speed × turn rate) or forward acceleration; lean proportional with a ~10–15° cap, spring-smoothed; upright when acceleration ≈ 0. Hard stop: brief backward lean.'),
('移動リーン／ボディバンキング','旋回や加速でカーブや前方へ傾き、急停止では短く後傾。無いと厚紙がターンテーブル上を滑るように見える。','乗り物カメラのバンク（CAMX-13）ではない。キャラ本体の傾き。加速から手続き的に駆動する。','パルクール、三人称移動、カートゥーン足場。','横加速度（速度×旋回率）や前進加速度で骨盤／背骨のロール・ピッチ（2D ならスプライト回転）を駆動。上限約 10〜15°、ばねで平滑。加速度≈0 で直立。急停止は短い後傾。'),
'max lean 10–15° · accel→angle scale · spring · hard-stop back-lean · keep camera level optional (authoring defaults)',
'lean = clamp(k * (velocity × angularVelocity).y or accel, -max, max); critically damp toward lean each tick; apply as additive spine/pelvis or sprite Z rotation. Optionally keep camera unrolled so the lean reads.',
['CAMX-13','ANI-08','ACT-35','ACT-07'],['an_w_proc','mo_juice'])

E('ANI-21','動畫系統技術','Hand IK contact',
['Hand placement IK','Wall brace','Environmental hand contact','Cover hand','Rail hand','手部接觸 IK','手の接触 IK'],'C',
('手部接觸 IK','走近牆、門框或掩體時，角色伸出手觸碰或撐住；離開後放開。','不是腳部貼地（ANI-12，只處理腳／骨盆）；也不是布料（PHY-01）。本條是手臂對環境的接觸。','掩體射擊、寫實過場、窄廊行走。','行進或側向可及範圍內有表面時，追蹤手部目標點，約 0.2 秒混入手臂 IK 並使掌心對齊法線；超出範圍或離開時放開。'),
('Hand IK contact','Walking close to a wall, door frame, or cover, the character reaches out and touches or braces, then releases when past.','Not foot IK (ANI-12, feet/pelvis only) and not cloth (PHY-01). This is arm contact with the environment.','Cover shooters, realistic traversal, tight corridors.','When a surface is within reach in travel or side direction, trace a hand point, blend arm IK in over ~0.2 s with the palm aligned to the surface normal, and release when out of range or moving away.'),
('手の接触 IK','壁・ドア枠・カバーに近づくと手が伸びて触れたり支えたりし、通り過ぎると離す。','フット IK（ANI-12）ではない。布（PHY-01）でもない。腕の環境接触。','カバー射撃、写実移動、狭い廊下。','進行／側面の届く範囲に面があるとき手の目標をトレースし、約 0.2 秒で腕 IK を混ぜ掌を法線に合わせる。範囲外や離脱で解除。'),
'reach radius · blend in ~0.2 s · palm align · release distance · left/right preference (authoring defaults)',
'Sphere/capsule probes beside the torso along velocity and side vectors. On hit, set two-bone IK target + rotation from normal; fade weight 0→1 in 0.2 s. Disable while airborne or during attacks that own the arms.',
['ANI-12','PHY-01'],['mo_w_ik','an_u_ik'])

E('FB-23','瞄準與操控','Weapon pull-back near obstacles',
['Weapon wall collision','Gun tuck','Weapon lowering near wall','Barrel retract','槍枝收槍','壁際の銃退避'],'C',
('近障礙收槍／槍口回縮','貼牆持槍時，角色把武器收回或抬高，避免槍管穿牆。','不是武器慣性擺動（FB-22，轉向延遲）；也不是後座（FB-08）。本條是碰撞驅動的持槍姿勢。','寫實 FPS／TPS、近戰距離槍械。','槍口向前探測距離短於武器長度時，依穿透程度混入收回／上抬姿勢；探測清空後混回。'),
('Weapon pull-back near obstacles','Standing against a wall with a gun, the character tucks or raises the weapon instead of letting the barrel clip through.','Not weapon sway/inertia (FB-22) and not camera recoil kick (FB-08). This is collision-driven pose.','Realistic FPS/TPS, close-quarters gunplay.','When a muzzle-forward trace hits closer than weapon length, blend in a retract/raise pose proportional to penetration; blend back when the trace is clear.'),
('障害物近くの武器退避','壁際で銃を持つと、銃身が壁を貫通しないよう引き込むか上へ向ける。','ウェポンスウェイ（FB-22）ではない。カメラキック（FB-08）でもない。衝突駆動の構え。','写実 FPS／TPS、近距離銃器。','銃口前方トレースが武器長より近いと、貫通量に応じて退避／上げ構えを混ぜ、クリアで戻す。'),
'trace length · retract/raise pose · blend speed · max weight · third-person socket (authoring defaults)',
'Raycast from shoulder/muzzle along aim. weight = saturate(1 - hitDist/weaponLength). Layer an additive or override pose (raise/tuck). Keep gameplay aim ray separate from the visual retract.',
['FB-22','FB-08'],['mo_juice'],nosrc=True)

E('FB-24','命中與受擊','Damage vibration',
['Hitstop shake','Hitlag vibration','Victim shake','Damage shake','受擊顫動','ダメージバイブ'],'C',
('受擊顫動（局部）','打擊瞬間，被擊／出擊角色在原地急速交替微抖，世界與鏡頭可以不動——「力buzz過身體」，與完全靜止的停格不同。','不是鏡頭震動（CAM-30／FB-07）；也不是 hitstop 時鐘暫停本身（ACT-21）；也不是受擊擠壓（FB-13）。顫動是渲染層局部位移，結束時必須剛好歸零。','格鬥、動作、需要「打擊有電流感」的接觸。','確認命中後，在 hitstop 期間對攻擊者／受擊者根骨骼施加快速衰減的局部偏移（受擊者較強；落地版僅水平），hurtbox 保持固定；hitstop 結束時偏移精確為 0。減少動態可關顫動而保留 hitstop。'),
('Damage vibration','On contact, attacker/victim roots buzz with a rapidly alternating, decaying local offset while the world can stay stable — force buzzing through the body, unlike a fully static pause.','Not camera shake (CAM-30 / FB-07), not hitstop clocks alone (ACT-21), and not squash-on-hit (FB-13). Vibration is a render-only local offset that must reach exactly zero when hitstop ends.','Fighters, action games, contacts that need electric weight.','On confirmed contact, during hitstop apply a rapidly alternating decaying local offset to attacker/victim roots (victim stronger; grounded: horizontal only). Hurtboxes stay fixed. Offset is exactly 0 when hitstop ends. Reduced motion may disable vibration while keeping hitstop.'),
('ダメージバイブ（局所）','ヒットの瞬間、攻撃／被弾ルートが素早く減衰する局所オフセットで震え、世界やカメラは安定したままでよい。完全静止のポーズとは違う「力が体を走る」感。','カメラ揺れ（CAM-30／FB-07）ではない。ヒットストップ時計そのもの（ACT-21）でも、つぶれ（FB-13）でもない。終了時オフセットは必ず正確に 0。','格闘、アクション、電撃的な重さが欲しい接触。','確定ヒット後、ヒットストップ中に攻撃／被弾ルートへ減衰する高速オフセット（被弾側を強く。接地は水平のみ）。Hurtbox は固定。終了時 0。低減ではバイブだけ切りヒットストップは残してよい。'),
'freq · victim/attacker amp · decay · grounded horizontal-only · clamp screen px · reduced-motion flag (authoring defaults)',
'While hitstop active: renderRoot = gameplayRoot + alternate(±amp)*exp(-k*t) on chosen axes. Never write the offset into physics/hurtboxes. On hitstop end force offset=0 to avoid a pop. Demo FREEZE vs VIBRATE lanes with a stable background.',
['ACT-21','ANI-05','FB-13','FB-07','UX-20'],['mo_sakurai_hitstop','mo_sakurai_yt'])

E('FB-25','瞄準與操控','Weapon-model recoil and return',
['Viewmodel recoil','Animated recoil','Gun kickback','Recoil recovery','槍模後座','ビューモデル反動'],'C',
('武器模型後座與回正','開火時槍／手在鏡頭前猛地後坐再機械地回正；相機可以不動。彈道是否上抬是另一條明確政策，不由本視覺暗示。','不是鏡頭後座（FB-08）；也不是步行擺動（FB-22）。本條是開火當下的槍模層。','FPS 槍感、需要「槍在手裡踢」的射擊。','實際開火→武器／手視覺層快速俯仰＋後移（平移略延遲），再受控回正並小幅 settling；連發在上限內累加；換彈或切槍中斷。彈道後座政策分開宣告。'),
('Weapon-model recoil and return','The weapon snaps in the hands then mechanically returns to ready, with a stationary camera if desired. Whether aim point climbs is a separately declared ballistic policy — not implied by the visual.','Not camera kick (FB-08) and not locomotion sway (FB-22). This is the firing viewmodel layer.','FPS gunfeel, shots that must kick in the hands.','On an actual shot: fast pitch + backward impulse on the weapon/hand visual layer, slightly delayed translation, then controlled return with a small settle to neutral relative to current aim/locomotion pose. Repeated shots accumulate within a cap; reload or weapon switch interrupts. Keep ballistic recoil policy explicit and separate.'),
('武器モデルの反動と復帰','発砲で銃／手が手前で跳ね、機械的に構へ戻る。カメラは固定してもよい。照準が上るかは別ポリシーで明示し、見た目から暗示しない。','カメラキック（FB-08）ではない。歩行スウェイ（FB-22）でもない。発砲時のビューモデル層。','FPS の銃感、手の中で蹴る発砲。','実弾発射で武器／手の視覚層に速いピッチ＋後退（平行移動は少し遅らせ）、制御された復帰と小さな settling。連射は上限まで累積。リロード／持ち替えで中断。弾道反動は別宣言。'),
'pitch impulse · back translate · return time · settle · stack cap · interrupt on reload/swap (authoring defaults)',
'OnFire: add impulses to viewmodel spring (rot + pos). Integrate damped spring toward pose driven by aim+locomotion. Clamp stacked kick. Camera kick (FB-08) and spread (FB-19) are optional parallel systems — do not entangle their parameters silently.',
['FB-08','FB-22'],['mo_juice','mo_nijman'],nosrc=True)

E('ENV-19','地表與植被','Contact-driven leaf litter',
['Interactive leaf litter','Footstep debris scattering','Ground interaction FX','落葉掀動','落葉のかき分け'],'C',
('接觸驅動落葉','走過落葉堆會掀開一小道空隙，葉子向外翻滾、滑行再停下；靜止站着不應持續噴發。不變的落葉毯讀起來只是貼圖。','不是環境飄浮粒子（ENV-11）；也不是破壞碎片（VFX-18）。本條是遍歷驅動的鬆散地表重排。','寫實森林、秋景關卡、需要「踩過留下痕跡」的地表。','腳／下肢掃過鬆散材質區→附近葉子受方向／速度縮放的衝量、少數上揚、翻滾滑行→落在新位置；之後接觸可再移動。站定不連續發射。'),
('Contact-driven leaf litter','Walking through fallen leaves opens a small moving gap; leaves tumble outward, skid, and settle. Standing still must not keep emitting. An unchanged leaf carpet reads as a texture.','Not ambient motes (ENV-11) and not destruction debris (VFX-18). This is traversal-driven rearrangement of loose ground material.','Realistic forests, autumn stages, ground that should remember footsteps.','When a foot/low-body sweep crosses a loose-material patch, displace nearby leaves with direction/speed-scaled impulse, lift a minority, tumble and skid, then settle. Later contact can move them again. Do not continuously emit while standing still.'),
('接触駆動の落葉','落葉の上を歩くと隙間が開き、葉が外へ転がり滑って止まる。静止中は出し続けない。動かない落葉はテクスチャに見える。','環境パーティクル（ENV-11）ではない。破壊debris（VFX-18）でもない。移動による地表の再配置。','写実の森、秋の面、足跡が残る地面。','足／下肢が疎材パッチを横切ると、近傍の葉へ速度方向のインパルス、少数を浮かせ、転がり滑って新位置へ。再接触でまた動く。静止では連続発生しない。'),
'impulse scale · lift fraction · tumble · skid friction · settle · no idle emit (authoring defaults)',
'Maintain a small pool of leaf instances with positions. On overlap with a moving capsule near ground, apply impulse = k * velocity to nearby leaves; integrate simple rigid/particle motion with friction until speed < epsilon. Disable emission when speed ≈ 0.',
['ENV-11','ENV-09','FX-01','VFX-18'],['mo_gdc_wind','gg_grass'],nosrc=True)

E('ENV-20','天氣','Surface runoff and edge dripping',
['Rain runoff','Roof edge drips','Water rivulets','Foliage water shedding','屋簷滴水','雨垂れ'],'C',
('表面徑流與邊緣滴水','雨停後屋簷仍滴水；濕樹枝被晃一下會甩出短陣水珠。天氣是物件持有的狀態，不是一關就消失的濾鏡。','不是雨幕本身（ENV-04）；也不是濕表面著色（MATX-05）或 flowmap（VFX-03）單獨一項。本條是蓄水→排水→二次接觸。','雨天關卡、寫實過場、需要「雨後世界仍濕」的場景。','雨打濕集水面或衝動搖動濕葉→沿槽／葉尖／下緣流下或間歇滴落並濺圈→雨停後蓄水量衰減；遮蔽乾燥物不滴。'),
('Surface runoff and edge dripping','Rain stops, but eaves keep dripping; a wet branch shakes and sheds a brief shower. Weather is state held by objects, not an overlay that vanishes instantly.','Not the rain overlay alone (ENV-04), wet shading alone (MATX-05), or a flowmap alone (VFX-03). This is storage → drainage → secondary contact.','Rain stages, realistic cinematics, worlds that stay wet after rain.','Rain wets collecting surfaces, or an impulse shakes wet foliage → streams or intermittent drops travel downhill, detach, and splash/rings → stored water drains after rain; sheltered dry objects do not drip.'),
('表面流出と縁の滴り','雨が止んでも軒は滴り、濡れた枝を揺すると短いシャワーが落ちる。天候はオブジェクトが持つ状態であり、すぐ消えるオーバーレイではない。','雨そのもの（ENV-04）だけではない。濡れシェーダ（MATX-05）や flowmap（VFX-03）単体でもない。貯留→排水→二次接触。','雨の面、写実シネマ、雨後も濡れている世界。','雨で集水面が濡れ、または衝撃で濡れ葉が揺れる→溝／葉先／下縁を流れ間欠滴下し飛沫→雨後は貯水量が減衰。遮蔽された乾いた物は滴らない。'),
'wetness capacity · drip rate · rivulet channels · post-rain decay · sheltered flag · shake shed impulse (authoring defaults)',
'Per-object wetness01 filled by rain overlap. Emit drips from authored sockets when wetness > threshold with interval = f(wetness). Gust/shake events dump a burst and reduce wetness. ENV-04 drives fill; MATX-05 can read the same wetness for shading.',
['ENV-04','MATX-05','ENV-13','VFX-03'],['mo_lagarde_rain'])

E('FX-40','Realtime VFX','Material-dependent footfall dust',
['Surface interaction FX','Footstep dust','Ground contact particles','Material-based footstep VFX','材質腳步塵','足音の砂塵'],'C',
('依材質的腳步揚塵','靴子壓過乾土掀起貼地低矮煙塵；潔淨石板則無。玩家常把這歸因於「重量」。這是短命材質反應，不是持久貼花。','不是持久足跡（ENV-10）；也不是泛用粒子（FX-01）而無材質分支。空中或靜置着地腳不發射。','寫實移動、需要地面「回應腳步」的關卡。','着地腳踏或刮擦發生在合格材質→接觸面發射貼地低矮煙塵，量隨衝擊／刮擦速度與材質；細塵上升慢於砂礫；約 0.3–1.2 s 沉降淡出。'),
('Material-dependent footfall dust','A boot compresses dry earth and a low puff rolls away; the same step on clean stone produces none. Players often attribute this to weight. Short-lived material response — not a decal.','Not persistent footprints (ENV-10) and not generic particles (FX-01) without a material branch. No emission in air or from an idle planted foot.','Realistic locomotion, floors that should answer footsteps.','On a grounded foot plant or scrape on an eligible material, emit a low surface-aligned puff whose amount follows impact/scrape speed and material; fine dust rises slower than grit; settle/fade in ~0.3–1.2 s.'),
('材質依存の足音砂塵','乾いた土を踏むと低い砂煙が転がり、きれいな石では出ない。プレイヤーは「重さ」と感じやすい。短命の材質反応でありデカールではない。','永続足跡（ENV-10）ではない。材質分岐のない汎用粒子（FX-01）でもない。空中や静止接地では出さない。','写実移動、床が足音に応える面。','接地の踏み／擦れが対象材質のとき、衝撃速度と材質に応じた低い面沿いの煙を出し、細塵は砂より遅く上昇。約 0.3〜1.2 s で沈降フェード。'),
'material table · speed scale · puff height · lifetime 0.3–1.2 s · plant vs scrape · no idle emit (authoring defaults)',
'OnFootPlant event with materialId + speed. Look up emit count/colour/gravity. Spawn a few billboards with mostly horizontal velocity and short life. Skip if !grounded or speed < eps. Contrast with ENV-10 decals in the same scene (DIRT vs STONE).',
['ENV-10','FX-01','ACT-10'],['u_ps','g_part2d'],nosrc=True)

E('PHY-04','剛體與約束','Damped rigid-prop settling',
['Prop wobble and settle','Damped oscillation','Hinged prop secondary motion','Physical follow-through','道具回擺','剛体の収束'],'C',
('阻尼剛體回擺','被撞的招牌多擺兩下才停；門撞到位後微彈再定。瞬間停死會失去質量感。','不是繩索（PHY-02）；也不是動畫跟隨（ACT-13）。本條針對鉸接／樞軸剛體道具。','互動場景、物理小物件、需要「有質量」的門與牌。','接觸、釋放、撞停或陣風→約束剛體受角衝量（尊重樞軸與行程），遞減振盪／回彈→低於閾值靜止且無可見吸附跳動。第二次撞擊疊加當前運動而非重播罐頭循環。'),
('Damped rigid-prop settling','A bumped sign swings twice before resting; a door reaches its stop, rebounds slightly, then settles. Instant stops remove apparent mass.','Not rope/chain (PHY-02) and not animation follow-through (ACT-13). This is hinged/pivoting rigid props.','Interactive sets, physical props, doors and signs that need mass.','Contact, release, slam, or gust → constrained rigid prop gets an angular impulse respecting pivot and limits, then decreasing oscillation/rebound → rest below a threshold without a visible snap. A second hit adds to current motion rather than restarting a canned loop.'),
('減衰する剛体小物の収束','ぶつかった看板が二度揺れて止まり、ドアは端で少し跳ねてから収まる。瞬時停止は質量感を消す。','ロープ（PHY-02）ではない。アニメのフォロースルー（ACT-13）でもない。ヒンジ／ピボット剛体。','インタラクト小物、質量感のあるドアや看板。','接触・解放・衝突・突風で拘束剛体へ角インパルス（ピボットと可動域を尊重）、減衰振動／リバウンドのあと閾値未満で静止（スナップ無し）。二打目は現在の運動に加算し、缶詰ループを張り直さない。'),
'pivot · angle limits · angular impulse · damping · rest threshold · additive re-hit (authoring defaults)',
'Use a hinge/spring joint or 1-DOF angular spring: ω += impulse; integrate with damping until |ω| and |angle-rest| < eps, then sleep. On new hit add to ω. Avoid replaying a fixed swing clip from t=0.',
['PHY-02','ACT-13','ENV-08'],['phy_jakobsen'],nosrc=True)

E('LGT-14','光源','Moving light pool from a swinging fixture',
['Swinging lamp lighting','Pendulum light','Moving lantern shadows','Animated light footprint','搖燈光斑','揺れる灯りの光だまり'],'C',
('搖晃燈具帶動光斑','吊燈晃動時，照亮的光斑與影子跟着掃過牆／地——不只是燈網格在動。燈動而光斑靜止會讓物件與空間脫節。','不是亮度閃爍（LGT-04）；示範應保持亮度穩定以區分。也不是燈具物理本身（PHY-02），本條聚焦照明足跡的空間移動。','陰森室內、吊燈解謎、需要「光跟着燈走」的場景。','燈具受衝量／支架移動→附屬光源位置／方向與接收面→光斑隨燈移動，合格影子剪影一致移動→燈具靜止後掃動減弱。'),
('Moving light pool from a swinging fixture','A hanging lamp sways and the illuminated patch sweeps the wall/floor with it — not merely the lamp mesh moving. A moving fixture with a stationary light pool quietly disconnects object and room.','Not brightness flicker (LGT-04); keep brightness steady in the demo. Not the hanging fixture physics alone (PHY-02) — this card centres on the spatial movement of illumination.','Eerie interiors, hanging-lamp puzzles, rooms that need light to travel with the fixture.','Fixture receives impulse / support moves → attached light position/direction and receiving surfaces → light pool travels with fixture; eligible shadow silhouettes move consistently → sweep diminishes as the fixture settles.'),
('揺れる照明の光だまり移動','吊り灯が揺れると、照らす光だまりと影が壁／床を掃く。灯メッシュだけ動いて光が固定だと空間が切れる。','明るさのちらつき（LGT-04）ではない。デモでは明るさを一定に。吊り物理そのもの（PHY-02）ではなく、照明フットプリントの空間移動が主題。','薄暗い室内、吊り灯パズル、光が灯に付いて動く部屋。','器具が衝撃／支持移動を受ける→付随ライトの位置／向きと受け面→光だまりが追従し、影のシルエットも一致→収束とともに掃きが弱まる。'),
'light attach socket · shadow casters · brightness held constant · settle coupled to PHY-02 (authoring defaults)',
'Parent the punctual light (and shadow camera if any) to the fixture socket every frame. Do not animate intensity for this effect. Couple motion to the same pendulum/hinge as PHY-02 so mesh, pool, and shadows share one transform.',
['PHY-02','LGT-04','LGT-03'],['lg_g_lights'],nosrc=True)
