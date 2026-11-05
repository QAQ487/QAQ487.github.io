"""Map former principle-layer orig_entries into the unified effects-style schema."""
import html as H, json, re
from pathlib import Path

OBS = re.compile(
  r'畫面所見|可見現象|辨認現象|^現象$|What you see|Visible|Recognition|'
  r'見た目|見える現象|見られる現象|見分けるポイント|現象／用途|What you see / purpose'
)
CONF = re.compile(r'混淆|誤解|confus|misconcep|混同|Do not confuse|Common confusions|Confusions')
USE = re.compile(r'^(用途|Purpose|Uses?|目的)$', re.I)
COMB = re.compile(r'現象／用途|What you see / purpose')
SRC = re.compile(r'來源|參考|核對|Source|References|出典|参考|確認用資料')
TERM = re.compile(r'名稱性質|Terminology|名称の区分')

def plain(s):
  s = re.sub(r'<code>(.*?)</code>', r'`\1`', s or '', flags=re.S)
  s = re.sub(r'<a[^>]*>(.*?)</a>', r'\1', s, flags=re.S)
  return H.unescape(re.sub(r'<[^>]+>', '', s)).strip()

def pick(fields, *res):
  for rx in res:
    for k, v in fields:
      if rx.search(k):
        return plain(v), k
  return '', ''

def parse_refs(src_html, urls):
  refs, seen = [], set()
  for m in re.finditer(r'<a href="([^"]+)"[^>]*>(.*?)</a>', src_html or '', re.S):
    u, t = H.unescape(m.group(1)), plain(m.group(2))
    if u in seen:
      continue
    seen.add(u)
    refs.append(dict(t=t or u, u=u))
  for u in urls or []:
    if u in seen:
      continue
    seen.add(u)
    refs.append(dict(t=u, u=u))
  return refs

def load_enrich(path='data/prin_enrich.json'):
  return json.loads(Path(path).read_text(encoding='utf-8'))

def unify_entry(e, enrich, fields_add=None):
  """Return a unified entry dict (no layer / fields / intro / subL)."""
  eid = e['id']
  enr = enrich.get(eid)
  if not enr:
    raise KeyError(f'missing enrichment for {eid}')
  langs = {}
  for L in ('zh', 'en', 'ja'):
    fields = e[L]['fields']
    obs, ok = pick(fields, COMB, OBS)
    use, _ = pick(fields, USE)
    if not use and ok and COMB.search(ok):
      use = obs
    conf, _ = pick(fields, CONF)
    term, _ = pick(fields, TERM)
    intro = plain(e[L].get('intro') or '')
    if intro:
      obs = (intro + ' ' + obs).strip() if obs else intro
    if term:
      obs = (obs + ('（' + term + '）' if L != 'en' else ' (' + term + ')')).strip() if obs else term
    if fields_add and L in fields_add:
      # append freeform additions (e.g. FX-32 settings note) onto use
      extra = plain(fields_add[L][1]) if isinstance(fields_add[L], (list, tuple)) else plain(fields_add[L])
      if extra:
        use = (use + ' ' + extra).strip() if use else extra
    langs[L] = dict(
      name=e[L]['name'],
      observe=obs,
      notThis=conf,
      use=use,
      prompt=enr['prompt'][L],
      caph=e[L].get('caph', ''),
      cap=e[L].get('cap', ''),
    )
  src_html = ''
  for L in ('zh', 'en', 'ja'):
    for k, v in e[L]['fields']:
      if SRC.search(k):
        src_html = v
        break
    if src_html:
      break
  refs = parse_refs(src_html, e.get('refs') or [])
  # prefer structured titles from HTML; keep URL-only as fallback
  return dict(
    id=eid,
    cat=e['cat'],
    type=e['type'],
    std=e['std'],
    aliases=list(e.get('aliases') or []),
    sub=e['sub']['zh'],
    subL=dict(e['sub']),  # kept only for registering SUBS during build; stripped later
    svg=e.get('svg') or '',
    dur=e.get('dur') or 0,
    params=enr['params'],
    impl=enr['impl'],
    related=[],
    refs=refs,
    nosrc=not refs,
    zh=langs['zh'],
    en=langs['en'],
    ja=langs['ja'],
  )
