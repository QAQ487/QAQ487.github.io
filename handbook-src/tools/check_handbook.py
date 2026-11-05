"""Baseline validation for the handbook data.

Usage:
  python3 tools/check_handbook.py [batch1.html]   # standalone, reads the embedded book-data JSON
  build.py imports check() and aborts the build on errors.

Errors (fail): duplicate IDs, redirect keys that collide with live IDs, related/see/ptr/canon/variant
targets that are unknown or point at a retired (redirected) ID, cyclic ptr/variant/redirect chains,
duplicate aliases inside one entry.
Warnings (non-fatal): identical English primary name (`std`) across entries unless allowlisted,
in-text ID mentions that resolve to nothing.
"""
import json,re,sys,collections
IDRE=re.compile(r'\b(?:CAMX|CAM|REN|ACT|FX|UX|FB|PIX|TRN|ENV|VFX|UI|NAV|LGT|CIN|PP|ANI|NPR|MATX|A11Y|DIAG|PHY)-\d{2}\b')
# English names deliberately shared by several entries (reviewed; each entry differs by scope and links to the others)
SHARED_STD={}
norm=lambda s:re.sub(r'\s+',' ',str(s)).strip().lower()
def check(data):
  E=data['entries'];R=data.get('redirects',{});errs=[];warns=[]
  cnt=collections.Counter(e['id'] for e in E)
  errs+=[('dup-id',k,n) for k,n in cnt.items() if n>1]
  ids=set(cnt)
  errs+=[('redirect-collides',k,v) for k,v in R.items() if k in ids]
  errs+=[('redirect-target',k,v) for k,v in R.items() if v not in ids and v not in R]
  def tgt(kind,src,t):
    if t in R: errs.append((kind+'-retired',src,t+'→'+R[t]))
    elif t not in ids: errs.append((kind+'-unknown',src,t))
  for e in E:
    for r in e.get('related') or []: tgt('related',e['id'],r.split(' ')[0])
    for r in e.get('see') or []: tgt('see',e['id'],r)
    for r in e.get('canon') or []: tgt('canon',e['id'],r)
    for r in e.get('vars') or []: tgt('vars',e['id'],r)
    for k in ('ptr','varOf'):
      if e.get(k): tgt(k,e['id'],e[k])
    al=[norm(a) for a in e.get('aliases') or []]
    d=[a for a,n in collections.Counter(al).items() if n>1]
    if d: errs.append(('dup-alias',e['id'],d))
    txt=json.dumps([e.get(L) for L in ('zh','en','ja')],ensure_ascii=False)+' '+str(e.get('impl',''))
    bad=sorted(set(m for m in IDRE.findall(txt) if m not in ids and m not in R))
    if bad: warns.append(('text-id-unknown',e['id'],bad))
  # cycles across ptr / varOf / redirects
  nxt={k:v for k,v in R.items()}
  for e in E:
    for k in ('ptr','varOf'):
      if e.get(k): nxt.setdefault(e['id'],e[k])
  for s in list(nxt):
    seen=[s];c=s
    while c in nxt:
      c=nxt[c]
      if c in seen: errs.append(('cycle',s,'→'.join(seen+[c])));break
      seen.append(c)
  byStd=collections.defaultdict(list)
  for e in E: byStd[norm(e['std'])].append(e['id'])
  for s,l in sorted(byStd.items()):
    if len(l)>1 and not set(l)<=set(SHARED_STD.get(s,())): warns.append(('same-std',s,l))
  stats=dict(entries=len(E),unique_ids=len(ids),redirects=len(R),pointers=sum(1 for e in E if e.get('ptr')),variants=sum(1 for e in E if e.get('varOf')),
             see_pairs=sum(len(e.get('see') or []) for e in E)//2,related_links=sum(len(e.get('related') or []) for e in E))
  return errs,warns,stats
def report(errs,warns,stats,out=sys.stdout):
  print('CHECK stats',json.dumps(stats),file=out)
  for w in warns: print('CHECK warn',*w,file=out)
  for x in errs: print('CHECK ERROR',*x,file=out)
  print(f'CHECK {len(errs)} errors, {len(warns)} warnings',file=out)
if __name__=='__main__':
  f=sys.argv[1] if len(sys.argv)>1 else 'batch1.html'
  h=open(f,encoding='utf-8').read()
  m=re.search(r'<script id="book-data" type="application/json">(.*?)</script>',h,re.S)
  data=json.loads(m.group(1).replace('<\\/','</'))
  errs,warns,stats=check(data);report(errs,warns,stats);sys.exit(1 if errs else 0)
