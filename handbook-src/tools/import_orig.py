import json,re,sys,html as H
sys.path.insert(0,'/workspace/handbook/tools')
from zhnorm import norm
D=json.load(open('/workspace/orig/orig.json'))
LANGS=('zh','en','ja')
ARCH={'https://gamedesignskills.com/game-design/camera-design-2d-side-scroller-games':'https://web.archive.org/web/20261026201424/https://gamedesignskills.com/game-design/camera-design-2d-side-scroller-games/'}
GEN={'zh':[('D3D11 本身並不替你決定資產約定','圖形 API（例如 D3D11）本身並不替你決定資產約定'),('自製 C++／D3D11 engine 亦可','自製引擎（例如 C++／D3D11）亦可'),('正在用 C++／D3D11 寫自製 engine','正在寫自製引擎（例如 C++／D3D11）'),('給自製 D3D11 engine 的實際辨認方法','給自製引擎（例如 D3D11）的實際辨認方法'),('推廣為 D3D11 或所有 renderer','推廣為任何圖形 API（例如 D3D11）或所有 renderer'),('C++／D3D11 作品','自製引擎（例如 C++／D3D11）作品')],
'en':[('D3D11 itself does not choose','The graphics API (e.g., D3D11) itself does not choose'),('a custom C++/D3D11 engine','a custom engine (e.g., C++/D3D11)'),('building a custom engine in C++/D3D11','building a custom engine (e.g., C++/D3D11)'),('Practical Identification in a Custom D3D11 Engine','Practical Identification in a Custom Engine (e.g., D3D11)'),('limitations of D3D11 or all renderers','limitations of any graphics API (e.g., D3D11) or all renderers'),('C++/D3D11 projects','custom-engine projects (e.g., C++/D3D11)')],
'ja':[('D3D11自体が','グラフィックスAPI（例：D3D11）自体が'),('自作の C++／D3D11 engine','自作エンジン（例：C++／D3D11）'),('C++／D3D11で自作エンジンを開発していて','自作エンジン（例：C++／D3D11）を開発していて'),('自作D3D11エンジンでの','自作エンジン（例：D3D11）での'),('D3D11やすべてのレンダラー','特定のグラフィックスAPI（例：D3D11）やすべてのレンダラー'),('C++／D3D11の作品','自作エンジン（例：C++／D3D11）の作品')]}
def fix(s,L):
  for a,b in ARCH.items(): s=s.replace('href="'+a+'"','href="'+b+'"')
  for a,b in GEN[L]: s=s.replace(a,b)
  # "The graphics API" capital after sentence start only; mid-sentence fine
  if L=='zh':
    s=norm(s)
    for a,b in [('「見到甚麼」','「看到甚麼」'),('見到甚麼','畫面所見'),('見到','看到'),('腳已行出平台少少，按跳仍然跳得起','腳已稍微走出平台，按跳仍然能起跳'),('離牆少少','稍微離開牆面'),('角色動少少','角色稍微移動'),('跟人物只移少少','跟人物只稍微移動'),('行出平台先按跳仍成功','走出平台後才按跳仍成功'),('夠得着','觸及得到'),('少少','稍微'),('行出','走出'),('哪裡度','哪裡'),('停低','停下'),('擺多一下才穩定','多擺動一下才穩定'),('選單行法','選單操作方式'),('哪個方向打中你','從哪個方向被擊中'),('遠處座塔一路帶著你行','遠處的塔一路引導你前進'),('拿到能力先過到舊障礙','取得能力後才通過舊障礙'),('有能力先回到舊路','取得能力後才回到舊路'),('跳出平台仍跳到／早按跳都有用','離開平台仍能起跳／提早按跳也有效'),('命中停低／中招動不到','命中時停頓／被擊中後無法行動'),('隔牆聲變焗','隔牆聲音變悶'),('動得太密／暈','動得太頻密／令人暈眩'),('人人都分到','人人都分辨得到')]: s=s.replace(a,b)
  if L=='en': s=s.replace('; The graphics API','; the graphics API')
  return s
def strip(s): return H.unescape(re.sub(r'<[^>]+>','',s)).strip()
CAMC={'CAM-01','CAM-03','CAM-05','CAM-07','CAM-08'}
def typ(id):
  c,n=id.split('-');n=int(n)
  if c=='CAM': return 'C' if id in CAMC else 'S'
  if c=='REN': return 'S'
  if c=='ACT': return 'C' if (n<=6 or n==8 or 18<=n<=29) else 'S'
  if c=='FX':
    if n in(11,16,34): return 'D'
    if n in(8,9,10,12,14,15,33,35): return 'C'
    return 'S'
  if c=='UX': return 'C' if n in(29,33,35,36) else 'S'
# subs from notes
subs={};submap={};cats={};extras={L:{} for L in LANGS}
for L in LANGS:
  n=D['extra'][L]['notes']
  for p in n.split('<details')[1:]:
    summ=re.search(r'<summary>(.*?)</summary>',p,re.S).group(1)
    body=p[p.find('</summary>')+10:]
    body=re.sub(r'</details>\s*$','',body.strip())
    toks=re.split(r'(<h[23][^>]*>.*?</h[23]>)',body,flags=re.S)
    cur=None;keep=[];cat=None;skipping=False;chap_sub_idx=0
    for t in toks:
      m2=re.match(r'<h2[^>]*>(.*?)</h2>',t,re.S);m3=re.match(r'<h3[^>]*>(.*?)</h3>',t,re.S)
      if m2:
        h=strip(m2.group(1));mm=re.match(r'^([A-E])[\.．]\s*(.*)$',h)
        if mm:
          cur=mm.group(1);name=re.split(r'[：:]',mm.group(2))[0].strip();skipping=True
          cur_name=name
        else:
          cur=None;skipping=False;keep.append(t)
        continue
      if m3 and cur:
        mm=re.match(r'^(\d+)[\.．]',strip(m3.group(1)))
        if mm: submap.setdefault(('?',cur,int(mm.group(1))),{})[L]=cur_name; submap[('?',cur,int(mm.group(1)))]['_chap']=summ
        continue
      if not skipping: keep.append(t)
    extras[L][summ]=''.join(keep)
# chapter -> cat by order
chap_order={L:list(extras[L].keys()) for L in LANGS}
CATORDER=['CAM','REN','ACT','FX','UX']
ext={L:{CATORDER[i]:fix(extras[L][k],L) for i,k in enumerate(chap_order[L])} for L in LANGS}
# rebuild submap keyed by cat
sm={}
for (q,letter,num),v in submap.items():
  for L in LANGS: pass
# redo submap properly: need chapter per language; recompute
sm={}
for L in LANGS:
  n=D['extra'][L]['notes']
  for ci,p in enumerate(n.split('<details')[1:]):
    cat=CATORDER[ci];cur=None
    for t in re.findall(r'<h[23][^>]*>.*?</h[23]>',p,re.S):
      h=strip(t)
      if t.startswith('<h2'):
        mm=re.match(r'^([A-E])[\.．]\s*(.*)$',h);cur=None
        if mm: cur=(mm.group(1),re.split(r'[：:]',mm.group(2))[0].strip())
      elif cur:
        mm=re.match(r'^(\d+)[\.．]',h)
        if mm: sm.setdefault(f'{cat}-{int(mm.group(1)):02d}',{})[L]=cur
entries=[]
byL={L:{e['id']:e for e in D['data'][L]} for L in LANGS}
ids=[e['id'] for e in D['data']['zh']]
for id in ids:
  cat=id.split('-')[0]
  z=byL['zh'][id]
  svg=re.search(r'<svg.*?</svg>',z['html'],re.S).group(0)
  # source bug fix: animateTransform on a <g transform=...> replaced the translate; compose it instead
  svg=re.sub(r'(<g transform="[^"]*">(?:(?!<g[ >]|</g>).)*?<animateTransform)(?![^>]*additive)',r'\1 additive="sum"',svg,flags=re.S)
  durs=[float(x) for x in re.findall(r'dur="([\d.]+)s"',svg)]
  ent=dict(id=id,cat=cat,layer='p',type=typ(id),svg=svg,dur=max(durs) if durs else 0,refs=[])
  s=sm.get(id,{})
  ent['sub']={L:(fix(s[L][1],L) if L in s else '') for L in LANGS}
  ent['subkey']=cat+'·'+(s['zh'][0] if 'zh' in s else '?')
  for L in LANGS:
    e=byL[L][id];t=fix(e['title'],L)
    if cat in('ACT','FX') and L!='en':
      # localized name; std from en title
      name=t.split('｜')[-1].strip() if '｜' in t else t
    else:
      parts=re.split(r'｜| — ',t);name=parts[-1].strip()
    if L=='en':
      pp=[x.strip() for x in re.split(r'｜| — ',e['title'])];ent['std']=pp[0];ent['aliases']=pp[1:-1] if cat not in('ACT','FX') else []
    h=fix(e['html'],L)
    cap=re.search(r'<figcaption>(.*?)</figcaption>',h,re.S).group(1)
    caph=strip(cap.split('<p>')[0]);capt=strip(re.search(r'<p>(.*?)</p>',cap,re.S).group(1)) if '<p>' in cap else ''
    rest=h[h.find('</figure>')+9:]
    intro=[];fields=[]
    for blk in re.findall(r'<p>.*?</p>|<ul>.*?</ul>',rest,re.S):
      if blk.startswith('<ul>'):
        for li in re.findall(r'<li>(.*?)</li>',blk,re.S):
          m=re.match(r'\s*<strong>(.*?)</strong>\s*[：:]?\s*(.*)$',li,re.S)
          if m: fields.append([m.group(1).strip().rstrip('：:'),m.group(2).strip()])
          else: fields.append(['',li.strip()])
      else:
        inner=blk[3:-4];parts=re.split(r'\n- ',inner)
        if parts[0].strip(): intro.append(parts[0].strip())
        for it in parts[1:]:
          m=re.match(r'\s*<strong>(.*?)</strong>\s*[：:]?\s*(.*)$',it,re.S)
          if m: fields.append([m.group(1).strip().rstrip('：:'),m.group(2).strip()])
          else: fields.append(['',it.strip()])
    full=e['title']
    ent[L]=dict(name=name,title=t,intro='\n'.join(intro),fields=fields,caph=caph,cap=capt)
    for u in re.findall(r'href="([^"]+)"',h):
      u=H.unescape(u)
      if u not in ent['refs']: ent['refs'].append(u)
  ent['catname']={L:fix(byL[L][id]['label'],L) for L in LANGS}
  entries.append(ent)
intro={L:fix(D['extra'][L]['intro'],L) for L in LANGS}
# refs that do not answer 200 to curl (bot wall / JS challenge) -> verified 200 equivalents
_AK='https://www.audiokinetic.com/en/public-library/2025.1.7_9143?source=Help&'
for _e in entries:
  if _e['id']=='FX-29':
    _j=json.dumps(_e,ensure_ascii=False).replace(_AK+'amp;id=interactive_music_project_structure','https://docs.godotengine.org/en/stable/classes/class_audiostreamsynchronized.html').replace(_AK+'id=interactive_music_project_structure','https://docs.godotengine.org/en/stable/classes/class_audiostreamsynchronized.html')
    _e.clear();_e.update(json.loads(_j))
_OUT=json.dumps(dict(entries=entries,extras=ext,intro=intro),ensure_ascii=False,indent=0)
for a,b in [('Adobe — 12 Principles of Animation','Wikipedia — Twelve basic principles of animation'),
 ('Adobe: How to use, and break, the rule of thirds','Wikipedia — Rule of thirds'),('Adobe：How to use, and break, the rule of thirds','Wikipedia — Rule of thirds'),
 ('>Adobe: ','>Wikipedia — Shot (filmmaking): '),('>Adobe：','>Wikipedia — Shot (filmmaking)：'),
 ('https://www.adobe.com/creativecloud/animation/discover/principles-of-animation.html','https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation'),
 ('https://www.adobe.com/creativecloud/photography/discover/rule-of-thirds.html','https://en.wikipedia.org/wiki/Rule_of_thirds'),
 ('https://www.adobe.com/creativecloud/video/production/cinematography/camera-shots-and-angles.html','https://en.wikipedia.org/wiki/Shot_(filmmaking)'),
 ('https://www.audiokinetic.com/library/edge?source=SDK&amp;id=soundengine_obsocc.html','https://valvesoftware.github.io/steam-audio/doc/unity/guide.html'),
 ('https://www.audiokinetic.com/library/edge?source=SDK&id=soundengine_obsocc.html','https://valvesoftware.github.io/steam-audio/doc/unity/guide.html'),
 ('https://www.audiokinetic.com/en/public-library/2025.1.7_9143?source=Help&amp;id=interactive_music_project_structure','https://docs.godotengine.org/en/stable/classes/class_audiostreaminteractive.html'),
 ('https://www.audiokinetic.com/en/public-library/2025.1.7_9143?source=Help&id=interactive_music_project_structure','https://docs.godotengine.org/en/stable/classes/class_audiostreaminteractive.html')]:
  _OUT=_OUT.replace(a,b)
_OUT=_OUT.replace('>https://valvesoftware.github.io/steam-audio/doc/unity/guide.html</a>','>Steam Audio Unity guide — occlusion (alt link: the Audiokinetic page is behind a browser check)</a>').replace('>https://docs.godotengine.org/en/stable/classes/class_audiostreaminteractive.html</a>','>Godot AudioStreamInteractive / AudioStreamSynchronized (alt link: the Audiokinetic page is behind a browser check)</a>')
open('/workspace/handbook/data/orig_entries.json','w').write(_OUT)
import collections
print(len(entries),collections.Counter(e['cat'] for e in entries))
print(collections.Counter(e['subkey'] for e in entries))
print([e['id'] for e in entries if not all(e['sub'].values())])
print([ (e['id'],L) for e in entries for L in LANGS if not e[L]['fields']])
print(collections.Counter(e['type'] for e in entries))
