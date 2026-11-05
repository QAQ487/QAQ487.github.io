ENTRIES=[]
def E(id,sub,en,aliases,type,zh,en_,ja,params,impl,rel=(),refs=(),nosrc=False):
    keys=('name','observe','notThis','use','prompt')
    for L in (zh,en_,ja): assert len(L)==5,(id,L[0])
    ENTRIES.append(dict(id=id,cat=id.split('-')[0],sub=sub,en=en,aliases=list(aliases),type=type,
      zh=dict(zip(keys,zh)),en_=dict(zip(keys,en_)),ja=dict(zip(keys,ja)),params=params,impl=impl,
      related=list(rel),refs=list(refs),nosrc=nosrc))
