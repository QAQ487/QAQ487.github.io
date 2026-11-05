# Clean-up batch: merges, redirects, implementation variants and relation notes.
# Entry IDs never change. A retired ID stays reachable through REDIRECTS (hash links, in-text links, search).
REDIRECTS={'UX-19':'FX-32'}   # old ID -> canonical ID (old card removed, unique content merged into the canonical)
VARIANTS={'FB-07':'CAM-30'}   # implementation variant -> general entry; both cards stay
# English primary-name fixes (old names stay searchable as aliases)
STD={'FX-13':'VFX Anticipation / Attack Charge-up',
     'FX-29':'Adaptive Music: Vertical Layering','FX-30':'Adaptive Music: Horizontal Resequencing',
     'FX-36':'Visualized Sound Cues / Sound Indicators'}
ALIAS_ADD={'FX-13':['Anticipation / Wind-up','Charge-up VFX','Attack wind-up VFX'],
           'FX-36':['Captions (non-speech sounds)','Sound visualization','Directional sound indicator'],
           'FX-32':['Controller vibration','Tactile feedback','手把震動','コントローラー振動']}
ALIAS_DROP={'DIAG-06':['Alpha-To-Coverage'],'MATX-01':['MatCap']}  # case-only duplicates of std
RELATED_ADD={'FB-07':['CAM-30']}
# merged content from UX-19 into FX-32 (inserted before the sources field)
FIELDS_ADD={'FX-32':{
 'zh':('設定與替代','提供強度調整與完全關閉的選項；不是人人開著震動，亦不是所有裝置有馬達，所以關鍵資訊不能只靠震動，要同時有畫面或聲音提示。（舊條目 UX-19「手把震動／觸覺回饋」已併入本條。）'),
 'en':('Settings & alternatives','Offer intensity control and a full off switch. Not everyone enables vibration and not every device has motors, so essential information must never rely on vibration alone — pair it with a visual or audio cue. (Former entry UX-19, “Controller vibration and tactile feedback”, is merged here.)'),
 'ja':('設定と代替手段','強さの調整と完全オフの選択肢を用意します。全員が振動を有効にしているわけでも、すべての機器にモーターがあるわけでもないため、重要な情報を振動だけに頼らず、映像や音の手がかりも併用します。（旧項目 UX-19「コントローラー振動／触覚フィードバック」は本項目に統合済み。）')}}
TAKE_SVG={'FX-32':'UX-19'}   # canonical adopts the retired entry's animated settings diagram
# short notes shown in the banner: what this entry covers vs its counterpart
NOTES={
 'UX-10':dict(zh='本條講「文字」：對白字幕，以及把重要聲音寫成文字的 captions。腳步方向、聲源位置等圖像化提示見 FX-36。',
              en='This entry is about text: dialogue subtitles and captions that write out important sounds. Directional or iconic cues such as footstep direction or source position are in FX-36.',
              ja='この項目は「文字」の話です：会話字幕と、重要な音を文字にする captions。足音の方向や音源の位置などの図像的な手がかりは FX-36 を参照。'),
 'FX-36':dict(zh='本條聚焦圖像化聲音提示：方向、位置與聲源圖示。對白字幕與把聲音寫成文字的 captions 見 UX-10。',
              en='This entry focuses on visualized sound cues: direction, position and sound-source icons. Dialogue subtitles and captions that write sounds out as text are in UX-10.',
              ja='この項目は音の図像的な手がかり（方向・位置・音源アイコン）に絞っています。会話字幕と音を文字にする captions は UX-10 を参照。'),
 'FX-13':dict(zh='本條是特效層面的出招蓄勢（聚光、收縮、預警音）；角色身體的預備動作見 ACT-09。',
              en='This entry is the VFX side of a wind-up (gathering light, contraction, warning sound). The character’s body anticipation is ACT-09.',
              ja='この項目はエフェクト側の溜め（集光・収縮・予告音）です。キャラクターの体の予備動作は ACT-09 を参照。'),
 'ACT-09':dict(zh='本條是角色身體的預備動作；特效的聚光、蓄力見 FX-13。',
              en='This entry is the character’s body anticipation. The VFX charge-up (gathering light, contraction) is FX-13.',
              ja='この項目はキャラクターの体の予備動作です。エフェクトの溜め（集光・収縮）は FX-13 を参照。'),
}
