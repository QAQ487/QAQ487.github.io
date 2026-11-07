# Merge metadata: dedup pointers, cross-layer see-also, style tags, optional examples.
# POINTERS: pointer_id -> canonical_id. Both entries keep their full content; the pointer shows a banner.
POINTERS={
 'FX-07':'REN-18',   # distortion/refraction
 'FX-08':'NAV-04',   # telegraph
}
SEEALSO=[('ACT-12','UI-01'),('ACT-10','FB-13'),('ACT-27','FB-03'),('REN-04','NPR-03'),('FX-15','VFX-04'),
 ('CAM-20','FB-09'),('CAM-19','FB-09'),('REN-26','LGT-12'),('REN-23','LGT-07'),('FX-02','VFX-08'),
 ('UX-04','UI-09'),('REN-13','PIX-21'),('ACT-21','FB-11'),('ACT-22','ANI-05'),('ACT-36','ANI-12'),('ACT-37','ANI-16'),
 ('ACT-32','ANI-18'),('A11Y-04','A11Y-01'),('UX-10','A11Y-02'),
 ('FX-03','VFX-08'),('UX-11','UI-10'),('UX-29','NAV-02'),('FX-06','FB-12'),('REN-29','PP-11'),('REN-36','PP-12'),('REN-33','PP-13'),
 ('REN-18','MATX-11'),('FX-09','VFX-21'),('UX-03','FB-19'),('UX-29','NAV-07'),('UX-30','NAV-08'),('UX-20','A11Y-05'),
 ('FX-36','A11Y-06'),('UX-18','A11Y-03'),('ANI-10','PHY-01'),('ANI-09','PHY-03'),('ACT-29','FB-21'),('UX-10','FX-36'),('FX-13','ACT-09'),
 ('UX-01','UI-24'),('UX-11','UI-19'),('UI-11','UI-21'),('NAV-05','UI-22'),('A11Y-02','UI-25'),
 ('UX-06','UI-03'),('UX-07','UX-16'),('UI-04','UI-12'),
 ('ACT-21','FB-24'), ('ACT-10','CAM-34'), ('UX-20','CAM-33'), ('ANI-11','ANI-19'), ('CAM-04','CAM-34'), ('PHY-02','LGT-14'), ('ENV-10','FX-40'), ('ANI-12','ANI-21')]
TAGLAB={'px':dict(zh='#2D像素',en='#2D pixel',ja='#2Dドット'),'real':dict(zh='#3D寫實',en='#3D realistic',ja='#3Dリアル'),
 'npr':dict(zh='#NPR',en='#NPR',ja='#NPR'),'a11y':dict(zh='#無障礙',en='#Accessibility',ja='#アクセシビリティ'),'perf':dict(zh='#效能敏感',en='#Perf-sensitive',ja='#高負荷')}
PX_EXTRA={'PP-05','NPR-10','NPR-13','NPR-14','ANI-07','FX-04','ANI-02','CAMX-05','PP-03'}
NPR_EXTRA={'REN-02','REN-03','REN-04','PP-04','NPR-14','PP-13'}
REAL_EXCL={'REN-02','REN-03','REN-04'}
A11Y_EXTRA={'FX-34','FX-36','UX-06','UX-07','UX-08','UX-10','UX-18','FX-32','UX-20','FB-16'}
PERF={'REN-14','REN-18','REN-19','REN-20','REN-22','REN-24','REN-27','REN-33','REN-34','LGT-13',
 'PP-08','UI-07','NPR-06','ENV-09','ENV-14','FX-16','FX-17','PHY-01','PHY-03','MATX-11','DIAG-09','VFX-21'}
def tags(id,cat):
  t=[]
  if cat=='PIX' or id in PX_EXTRA: t.append('px')
  if cat in('LGT','DIAG','MATX','REN') and id not in REAL_EXCL or id in('PHY-01','PHY-03'): t.append('real')
  if cat=='NPR' or id in NPR_EXTRA: t.append('npr')
  if cat=='A11Y' or id in A11Y_EXTRA: t.append('a11y')
  if id in PERF: t.append('perf')
  return t
# Optional examples: game titles only as examples (English titles in every language), never as entry names.
EXAMPLES={
 'NAV-07':dict(zh='Ghost of Tsushima：以風向與飄動的葉片指示目的地。',en='Ghost of Tsushima: wind direction and drifting leaves point to the destination.',ja='Ghost of Tsushima：風向きと舞う葉で目的地を示す。'),
 'NAV-08':dict(zh='Batman: Arkham Asylum 的 Detective Mode：切換後以單色濾鏡突顯可互動物件與線索。',en='Batman: Arkham Asylum’s Detective Mode: a monochrome view that highlights interactables and clues.',ja='Batman: Arkham Asylum の Detective Mode：単色の表示に切り替え、操作できる物や手がかりを強調する。'),
 'UX-11':dict(zh='Dead Space：血量顯示在角色背後的裝備上，而非畫面角落。',en='Dead Space: health is shown on the character’s suit spine instead of a screen-corner bar.',ja='Dead Space：体力を画面隅ではなくキャラクターのスーツの背中に表示する。'),
 'NPR-14':dict(zh='Octopath Traveler：像素角色配 3D 場景、景深與光照。',en='Octopath Traveler: pixel-art characters in 3D scenes with depth of field and lighting.',ja='Octopath Traveler：ドット絵のキャラクターを、被写界深度とライティングのある3D背景に置く。'),
 'CAM-33':dict(zh='The Last of Us／Uncharted／Resident Evil 2 remake：待機時鏡頭極慢漂移。',en='The Last of Us / Uncharted / Resident Evil 2 remake: tiny handheld drift while idle.',ja='The Last of Us／Uncharted／Resident Evil 2 remake：待機中のごく遅い手持ちドリフト。'),
 'CAM-34':dict(zh="Mirror's Edge／Titanfall 2／Half-Life 2：落地時鏡頭下沉再彈回。",en="Mirror's Edge / Titanfall 2 / Half-Life 2: camera dips on landing then springs back.",ja="Mirror's Edge／Titanfall 2／Half-Life 2：着地でカメラが沈んで戻る。"),
 'CAM-35':dict(zh='Diablo IV／Divinity: Original Sin 2／Super Mario Odyssey：遮擋牆抖色淡出或剪影洞。',en='Diablo IV / Divinity: Original Sin 2 / Super Mario Odyssey: occluders dither-fade or cut a silhouette hole.',ja='Diablo IV／Divinity: Original Sin 2／Super Mario Odyssey：遮蔽がディザフェードや切り抜き穴になる。'),
 'ANI-19':dict(zh='The Last of Us Part II／Red Dead Redemption 2／Zelda: Breath of the Wild：小轉扭上半身，大轉踏步。',en='The Last of Us Part II / Red Dead Redemption 2 / Zelda: Breath of the Wild: small turns twist the torso; large turns take a step.',ja='The Last of Us Part II／Red Dead Redemption 2／Zelda: Breath of the Wild：小さな向きは上半身ねじり、大きな向きは一歩。'),
 'FB-24':dict(zh='Super Smash Bros.／Street Fighter II：命中瞬間身體局部顫動而鏡頭可不動。',en='Super Smash Bros. / Street Fighter II: local body buzz on hit while the camera can stay still.',ja='Super Smash Bros.／Street Fighter II：ヒット瞬間の局所バイブ。カメラは動かさなくてよい。'),
 'ENV-19':dict(zh='The Last of Us Part II／Ghost of Tsushima：走過落葉掀開空隙。',en='The Last of Us Part II / Ghost of Tsushima: walking opens a wake through leaf litter.',ja='The Last of Us Part II／Ghost of Tsushima：落葉をかき分けて跡が残る。'),
 'LGT-14':dict(zh='Half-Life 2／Red Dead Redemption 2：吊燈晃動時光斑跟着掃過。',en='Half-Life 2 / Red Dead Redemption 2: swinging lamps sweep their light pools.',ja='Half-Life 2／Red Dead Redemption 2：揺れる灯りの光だまりが掃く。'),
}
