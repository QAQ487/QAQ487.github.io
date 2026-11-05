import json,sys,os,importlib
sys.path.insert(0,'data')
from common import ENTRIES
from refs import REFS
mods=[m for m in ['fb','trn','env','vfx','pix','ui','nav','lgt','cin','pp','ani','cam','npr','mat','a11y','diag','phy','batch2'] if os.path.exists(f'data/{m}.py')]
for m in mods: importlib.import_module(m)
CATS=[dict(id='FB',zh='戰鬥回饋與手感',en='Combat feedback & game feel',ja='戦闘フィードバックと手触り'),
dict(id='PIX',zh='2D／像素美術技巧',en='2D & pixel-art techniques',ja='2D・ドット絵技法'),
dict(id='TRN',zh='轉場',en='Transitions',ja='画面転換'),
dict(id='ENV',zh='環境、天氣與時間',en='Environment, weather & time',ja='環境・天候・時間'),
dict(id='VFX',zh='特效與粒子',en='VFX & particles',ja='エフェクトとパーティクル'),
dict(id='UI',zh='UI 動態與 HUD',en='UI motion & HUD',ja='UIモーションとHUD'),
dict(id='NAV',zh='視覺引導與可讀性',en='Visual guidance & readability',ja='視覚誘導と視認性'),
dict(id='LGT',zh='光照與陰影',en='Lighting & shadows',ja='ライティングと影'),
dict(id='CIN',zh='演出與敘事',en='Cinematics & narrative',ja='演出と物語表現'),
dict(id='PP',zh='後處理與畫面濾鏡',en='Post-processing & screen filters',ja='ポストプロセスと画面フィルター'),
dict(id='ANI',zh='角色動畫表現',en='Character animation',ja='キャラクターアニメーション'),
dict(id='CAMX',zh='鏡頭與構圖（補充）',en='Camera & framing (supplement)',ja='カメラと構図（補遺）'),
dict(id='NPR',zh='風格化渲染',en='Stylized rendering (NPR)',ja='ノンフォトリアルレンダリング（NPR）'),
dict(id='MATX',zh='材質與表面',en='Materials & surfaces',ja='マテリアルと表面'),
dict(id='A11Y',zh='可讀性與無障礙',en='Readability & accessibility',ja='可読性とアクセシビリティ'),
dict(id='DIAG',zh='畫面問題診斷',en='Rendering diagnostics',ja='描画トラブル診断'),
dict(id='PHY',zh='物理模擬',en='Physics simulation',ja='物理シミュレーション')]
SUBS={'視覺模式與舒適度':('Visual modes & comfort','表示モードと快適性'),'瞄準與操控':('Aiming & handling','照準と操作感'),'節奏同步':('Rhythm sync','リズム同期'),'路徑引導':('Path guidance','経路誘導'),'文字可讀性':('Text legibility','文字の可読性'),'透明與合成':('Transparency & compositing','透明と合成'),'色彩空間與動態範圍':('Colour space & dynamic range','色空間とダイナミックレンジ'),'貼圖取樣':('Texture sampling','テクスチャサンプリング'),'深度精度':('Depth precision','深度の精度'),'法線與高光':('Normals & specular','法線とスペキュラー'),'反射對位':('Reflection alignment','反射の位置合わせ'),
'動畫原則':('Animation principles','アニメーションの原則'),'角色狀態':('Character states','キャラクターの状態'),'動畫系統技術':('Animation systems','アニメーションシステム'),
'跟隨與構圖規則':('Follow & framing rules','追従と構図のルール'),'投影與鏡頭':('Projection & lens','投影とレンズ'),'運鏡與剪接':('Camera moves & cuts','カメラワークとカット'),
'卡通明暗':('Toon shading','トゥーンシェーディング'),'描邊':('Outlines & lines','輪郭線とライン'),'筆觸與印刷':('Strokes & print','筆致と印刷表現'),'復古與低保真':('Retro & lo-fi','レトロ・ローファイ'),
'著色模型與材質參數':('Shading models & material parameters','シェーディングモデルとマテリアルパラメータ'),'表面細節':('Surface detail','表面ディテール'),'透明與折射':('Transparency & refraction','透明と屈折'),'特殊材質':('Special materials','特殊マテリアル'),
'風格濾鏡':('Stylistic filters','スタイルフィルター'),'模糊與扭曲':('Blur & distortion','ブラーと歪み'),'鏡頭模擬':('Lens simulation','レンズシミュレーション'),'UI 動態':('UI motion','UIモーション'),'HUD 與介面類型':('HUD & interface types','HUD とインターフェースの種類'),'文字與對白':('Text & dialogue','テキストと会話'),
'互動提示':('Interaction cues','インタラクションの手がかり'),'可讀性':('Readability','視認性'),'放置與範圍':('Placement & range','配置と範囲'),
'光源':('Light sources','光源'),'間接光與陰影':('Indirect light & shadows','間接光と影'),'渲染管線':('Rendering pipeline','レンダリングパイプライン'),'大氣與體積':('Atmosphere & volume','大気とボリューム'),
'鏡頭語言':('Cinematic camera','カメラ演出'),'角色與對白':('Characters & dialogue','キャラクターと会話'),'章節與身份':('Chapters & introductions','章立てと登場演出'),'敘事手法':('Narrative techniques','物語の手法'),
'命中與受擊':('Hit & damage reaction','被弾・ヒット反応'),'鏡頭回饋':('Camera feedback','カメラ演出'),'時間操控':('Time manipulation','時間操作'),'物件反應':('Object response','オブジェクトの反応'),'介面回饋':('UI feedback','UIフィードバック'),'戰鬥特效回饋':('Combat effect feedback','戦闘エフェクトの手応え'),
'淡化與溶接':('Fades & dissolves','フェードとディゾルブ'),'形狀遮罩':('Shape & mask wipes','形状・マスクのワイプ'),'像素與風格化':('Pixel & stylised','ドット・様式化'),'剪接與空間':('Cuts & spatial transitions','カットと空間遷移'),
'時間與天空':('Time & sky','時間と空'),'天氣':('Weather','天候'),'地表與植被':('Ground & foliage','地面と植生'),'水':('Water','水'),'世界狀態':('World state','ワールドの状態'),
'載體與技術':('Carriers & techniques','表現手段と技術'),'戰鬥特效':('Combat VFX','戦闘エフェクト'),'元素':('Elements','属性エフェクト'),'狀態與增益':('States & buffs','状態・バフ'),'破壞':('Destruction','破壊'),
'顯示與縮放':('Display & scaling','表示とスケーリング'),'色彩':('Colour','色彩'),'線條與形體':('Line & form','線と形'),'動畫':('Animation','アニメーション'),'場景構成':('Scene construction','シーン構成'),'光照':('Lighting','ライティング'),
'布料與繩索':('Cloth & ropes','布とロープ'),'軟體與變形':('Soft bodies & deformation','ソフトボディと変形')}
import re as _re
from meta2 import POINTERS,SEEALSO,TAGLAB,tags,EXAMPLES
import merge as MG
sys.path.insert(0,'tools')
from check_handbook import check,report
ORIG=json.load(open('data/orig_entries.json'))
from prin_unify import load_enrich,unify_entry
PRIN_ENRICH=load_enrich()
OCATS=[]
for cid in ['CAM','REN','ACT','FX','UX']:
  e0=next(e for e in ORIG['entries'] if e['cat']==cid)
  OCATS.append(dict(id=cid,**{L:e0['catname'][L] for L in ('zh','en','ja')}))
CATS=OCATS+CATS
order={c['id']:i for i,c in enumerate(CATS)}
ents=sorted(ENTRIES,key=lambda e:(order[e['cat']],e['id']))
oids=[e['id'] for e in ORIG['entries']]
ids=set(e['id'] for e in ents)|set(oids);errs=[]
assert not (set(e['id'] for e in ents)&set(oids))
ids|=set(MG.REDIRECTS)
# register original-chapter subcategory names into SUBS so every entry uses the same sub key
for e in ORIG['entries']:
  zh=e['sub']['zh']
  if zh and zh not in SUBS:
    SUBS[zh]=(e['sub']['en'],e['sub']['ja'])
for e in ents:
  if e['sub'] not in SUBS: errs.append(('sub',e['id'],e['sub']))
  for r in e['refs']:
    if r not in REFS: errs.append(('ref',e['id'],r))
  for r in e['related']:
    if r.split(' ')[0] not in ids: errs.append(('rel',e['id'],r))
for a,b in list(POINTERS.items())+SEEALSO:
  if a not in ids or b not in ids: errs.append(('meta',a,b))
see={}
for a,b in SEEALSO: see.setdefault(a,[]).append(b);see.setdefault(b,[]).append(a)
canon={}
for a,b in POINTERS.items(): canon.setdefault(b,[]).append(a)
# drop leftover "original handbook / principles layer / effects layer" wording from effect-entry text
RENAME={'zh':[(r'原手冊的?\s*(?=[A-Z]{2,4}-\d)',''),(r'原則層|效果層|原理層','')],'en':[(r"(?:[Tt]he )?original handbook(?:'s)?\s+(?=[A-Z]{2,4}-\d)",''),(r'Principles layer|Effects layer','')],'ja':[(r'元のハンドブック(?:の)?\s*(?=[A-Z]{2,4}-\d)',''),(r'原理レイヤー|効果レイヤー','')]}
def ren_str(s,L='en'):
  for a,b in RENAME[L]: s=_re.sub(a,b,s)
  return s
def ren(d,L):
  return {k:ren_str(v,L) if isinstance(v,str) else v for k,v in d.items()}
varsOf={}
for a,b in MG.VARIANTS.items(): varsOf.setdefault(b,[]).append(a)
oldsOf={}
for a,b in MG.REDIRECTS.items(): oldsOf.setdefault(b,[]).append(a)
def fixnames(d,id):
  if id in MG.STD:
    d['aliases']=[d['std']]+list(d['aliases']) if d['std'] not in d['aliases'] else list(d['aliases']);d['std']=MG.STD[id]
  drop=set(a.lower() for a in MG.ALIAS_DROP.get(id,[]))
  al=[];seen=set()
  for a in list(d['aliases'])+MG.ALIAS_ADD.get(id,[]):
    k=a.strip().lower()
    if k in seen or k in drop or k==d['std'].strip().lower() and id not in MG.STD: continue
    seen.add(k);al.append(a)
  d['aliases']=al
def meta(d,id,cat):
  fixnames(d,id)
  d.update(tags=tags(id,cat),ptr=POINTERS.get(id),canon=sorted(canon.get(id,[])),see=sorted(set(see.get(id,[]))),varOf=MG.VARIANTS.get(id),vars=sorted(varsOf.get(id,[])),olds=sorted(oldsOf.get(id,[])))
  if id in MG.NOTES: d['note']=MG.NOTES[id]
  if id in EXAMPLES: d['ex']=EXAMPLES[id]
  return d
OBY={e['id']:e for e in ORIG['entries']}
# unified display taxonomy: entry IDs and source cats stay unchanged; `grp` drives navigation only.
# members: source cat id, or (source cat id, original zh subcategory) to split the broad original chapters by topic
GROUPS=[
dict(id='CAM',zh='鏡頭與構圖',en='Camera & composition',ja='カメラと構図',m=['CAM','CAMX']),
dict(id='REN',zh='畫質與渲染問題診斷',en='Image quality & render diagnostics',ja='画質と描画トラブル診断',m=[('REN','清晰度、閃爍與殘影'),'DIAG']),
dict(id='LGT',zh='光照與陰影',en='Lighting & shadows',ja='ライティングと影',m=['LGT',('REN','光照、遮蔽、倒影與空氣')]),
dict(id='MAT',zh='材質與表面',en='Materials & surfaces',ja='マテリアルと表面',m=['MATX',('REN','材質的顏色、表面與透光')]),
dict(id='PP',zh='後處理與畫面濾鏡',en='Post-processing & screen filters',ja='ポストプロセスと画面フィルター',m=['PP',('REN','相機、色彩與後製')]),
dict(id='NPR',zh='風格化渲染',en='Stylized rendering (NPR)',ja='ノンフォトリアルレンダリング（NPR）',m=['NPR',('REN','整體風格與邊線')]),
dict(id='PIX',zh='2D／像素美術技巧',en='2D & pixel-art techniques',ja='2D・ドット絵技法',m=['PIX']),
dict(id='ANI',zh='動畫、移動與物理',en='Animation, movement & physics',ja='アニメーション・移動・物理',m=['ANI',('ACT','動畫原則與動作可讀性'),('ACT','骨骼動畫、移動與姿勢組合'),('ACT','移動、跳躍與容錯'),'PHY']),
dict(id='FB',zh='戰鬥回饋與手感',en='Combat feedback & game feel',ja='戦闘フィードバックと手触り',m=['FB',('ACT','戰鬥時間、命中反應與防護')]),
dict(id='VFX',zh='特效與粒子',en='VFX & particles',ja='エフェクトとパーティクル',m=['VFX',('FX','Realtime VFX')]),
dict(id='SND',zh='音效與觸覺',en='Audio & haptics',ja='音響と触覚',m=[('FX','Audio'),('FX','Haptics、Accessibility 與跨感官資訊')]),
dict(id='ENV',zh='環境、天氣與時間',en='Environment, weather & time',ja='環境・天候・時間',m=['ENV']),
dict(id='TRN',zh='轉場',en='Transitions',ja='画面転換',m=['TRN']),
dict(id='UI',zh='介面與 HUD',en='UI & HUD',ja='UI と HUD',m=['UI',('UX','介面在哪裡'),('UX','動態與操作回饋'),('UX','畫面資訊與選單')]),
dict(id='NAV',zh='視覺引導與關卡導航',en='Visual guidance & wayfinding',ja='視覚誘導とレベル内の道案内',m=['NAV',('UX','空間辨認與帶路'),('UX','通行規則、重返與學習')]),
dict(id='A11Y',zh='可讀性與無障礙',en='Readability & accessibility',ja='可読性とアクセシビリティ',m=['A11Y']),
dict(id='CIN',zh='演出與敘事',en='Cinematics & narrative',ja='演出と物語表現',m=['CIN'])]
GMAP={}
for g in GROUPS:
  for m in g.pop('m'): GMAP[m]=g['id']
def grp_of(cat,subzh=None):
  return GMAP.get((cat,subzh)) or GMAP[cat]
gorder={g['id']:i for i,g in enumerate(GROUPS)}
out=[]
missing_enrich=[]
for e in ORIG['entries']:
  if e['id'] in MG.REDIRECTS: continue
  if e['id'] not in PRIN_ENRICH:
    missing_enrich.append(e['id']);continue
  d=unify_entry(e,PRIN_ENRICH,MG.FIELDS_ADD.get(e['id']))
  if e['id'] in MG.TAKE_SVG:
    s0=OBY[MG.TAKE_SVG[e['id']]];d['svg']=s0['svg'].replace(s0['id'],e['id']);d['dur']=s0['dur']
    for L in ('zh','en','ja'): d[L]['caph'],d[L]['cap']=s0[L]['caph'],s0[L]['cap']
  subzh=d.pop('subL')['zh']
  d['grp']=grp_of(e['cat'],subzh)
  d['related']=list(d.get('related') or [])+[r for r in MG.RELATED_ADD.get(e['id'],[]) if r not in (d.get('related') or [])]
  out.append(meta(d,e['id'],e['cat']))
if missing_enrich: errs.append(('missing-enrich',len(missing_enrich),missing_enrich[:10]))
for e in ents:
  d=dict(id=e['id'],cat=e['cat'],sub=e['sub'],std=e['en'],aliases=e['aliases'],type=e['type'],zh=ren(e['zh'],'zh'),en=ren(e['en_'],'en'),ja=ren(e['ja'],'ja'),params=ren_str(e['params'],'en'),impl=ren_str(e['impl'],'en'),related=list(e['related'])+[r for r in MG.RELATED_ADD.get(e['id'],[]) if r not in e['related']],refs=[dict(t=REFS[r][0],u=REFS[r][1]) for r in e['refs'] if r in REFS],nosrc=e['nosrc'],grp=grp_of(e['cat']))
  out.append(meta(d,e['id'],e['cat']))
out.sort(key=lambda d:(order[d['cat']],d['id']))
subk=lambda d:d['sub']
sorder={}
for d in out: sorder.setdefault((d['grp'],subk(d)),len(sorder))
out.sort(key=lambda d:(gorder[d['grp']],sorder[(d['grp'],subk(d))]))  # stable: keeps previous order inside a subcategory
for L in ('zh','en','ja'):
  left=[d['id'] for d in out if _re.search('原手冊|original handbook|元のハンドブック|原理層|效果層|Principles layer|Effects layer|原理レイヤー|効果レイヤー',json.dumps(d[L],ensure_ascii=False)+' '+str(d.get('impl',''))+' '+str(d.get('params','')))]
  if left: errs.append(('layer-wording',L,left))
# every entry must expose the unified body fields
for d in out:
  for L in ('zh','en','ja'):
    for k in ('observe','notThis','use','prompt'):
      if not str(d[L].get(k) or '').strip(): errs.append(('empty-field',d['id'],L+'.'+k))
  if not str(d.get('params') or '').strip(): errs.append(('empty-field',d['id'],'params'))
  if not str(d.get('impl') or '').strip(): errs.append(('empty-field',d['id'],'impl'))
PRIN_FILES=['demos_prin.js','demos_prin_cam.js','demos_prin_act.js','demos_prin_ren.js','demos_prin_fx.js','demos_prin_ux.js']
PRIN_IDS=set()
for f in PRIN_FILES:
  if os.path.exists('src/'+f): PRIN_IDS|=set(_re.findall(r"DEMOS\['([A-Z]+-\d+)'\]=",open('src/'+f).read()))
for d in out:
  if d['id'] in PRIN_IDS: d['svg']=''  # canvas remake replaces the SVG
print('PRIN canvas',len(PRIN_IDS),'unified former-p',sum(1 for d in out if d['id'] in PRIN_ENRICH))
data=dict(redirects=MG.REDIRECTS,groups=GROUPS,cats=CATS,subs={k:dict(zh=k,en=v[0],ja=v[1]) for k,v in SUBS.items()},tags=TAGLAB,entries=out,intro=ORIG['intro'],notes=ORIG['extras'])
cerrs,cwarns,cstats=check(data);report(cerrs,cwarns,cstats)
if cerrs or errs: print('ERRS',errs+cerrs);sys.exit('handbook check failed')
js=''.join(open('src/'+f).read()+'\n' for f in ['core.js']+[f'demos_{m}.js' for m in mods if os.path.exists(f'src/demos_{m}.js')]+[f for f in PRIN_FILES if os.path.exists('src/'+f)])
app=open('src/app.js').read()
css=open('src/style.css').read()
html=f'''<!doctype html><html lang="zh-HK"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>遊戲畫面表現手冊 / Visual Presentation Handbook</title><style>{css}</style></head><body>
<header class="topbar"><button id="menu" class="menu" aria-controls="side" aria-expanded="false"></button><h1 id="title"></h1><input id="q" type="search" autocomplete="off"><div class="seg views"><button data-view="gallery"></button><button data-view="list"></button></div><div class="seg cols" id="cols"><button type="button" data-cols="1">1</button><button type="button" data-cols="2">2</button><button type="button" data-cols="3">3</button></div><div class="seg langs"><button data-lang="zh">繁中</button><button data-lang="en">EN</button><button data-lang="ja">日本語</button></div><button id="motion"></button><span id="count"></span></header>
<div class="layout"><aside id="side" class="side"><div id="tagbar" class="tagbar"></div><nav id="toc" class="toc"></nav><a id="guideLink" class="guidelink" href="#guide"></a></aside><div id="scrim" class="scrim"></div>
<main class="main"><p id="subtitle" class="subtitle"></p><section id="guide" class="guide"></section><div id="fstat" class="fstat" hidden></div><p id="empty"></p>
<div id="cards"></div><footer><p id="foot"></p></footer></main></div>
<div id="modal" class="modal" hidden><div class="msrim" id="msrim"></div><div class="mpanel" role="dialog" aria-modal="true"><button type="button" class="mclose" id="mclose">✕</button><div class="mbody" id="mbody"></div></div></div>
<script id="book-data" type="application/json">{json.dumps(data,ensure_ascii=False).replace("</","<\\/")}</script>
<script>{js}
{app}</script></body></html>'''
open('batch1.html','w').write(html)
print('entries',len(out),{g['id']:sum(1 for e in out if e['grp']==g['id']) for g in GROUPS},'bytes',len(html.encode()))
print('ERRS',errs)
