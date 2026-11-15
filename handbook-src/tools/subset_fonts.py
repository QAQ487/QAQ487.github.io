"""Subset the handbook display/body fonts to the characters the handbook actually uses.

Usage (after `python3 build.py`):
  python3 tools/subset_fonts.py <full-font-dir>

<full-font-dir> must hold the full OFL fonts from github.com/google/fonts:
  DelaGothicOne-Regular.ttf, IBMPlexSansJP-Regular.ttf, IBMPlexSansJP-SemiBold.ttf,
  NotoSansTC[wght].ttf (variable; instanced at 400 and 700 here)
Writes WOFF2 files to ../handbook/fonts/. Requires: pip install fonttools brotli
"""
import os, sys
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', '..', 'handbook', 'fonts')
SRC_HTML = os.path.join(HERE, '..', '..', 'handbook', 'index.html')
EXTRA = ' ·—–…「」『』（）、。，：；！？“”‘’→←↑↓✕⚠'


def main(full):
    text = ''.join(sorted(set(open(SRC_HTML, encoding='utf-8').read()) | set(EXTRA)))
    os.makedirs(OUT, exist_ok=True)
    jobs = {
        'DelaGothicOne-Regular': (os.path.join(full, 'DelaGothicOne-Regular.ttf'), None),
        'IBMPlexSansJP-Regular': (os.path.join(full, 'IBMPlexSansJP-Regular.ttf'), None),
        'IBMPlexSansJP-SemiBold': (os.path.join(full, 'IBMPlexSansJP-SemiBold.ttf'), None),
        'NotoSansTC-Regular': (os.path.join(full, 'NotoSansTC[wght].ttf'), 400),
        'NotoSansTC-Bold': (os.path.join(full, 'NotoSansTC[wght].ttf'), 700),
    }
    for name, (path, wght) in jobs.items():
        font = TTFont(path)
        if wght is not None:
            font = instancer.instantiateVariableFont(font, {'wght': wght})
        opts = subset.Options()
        opts.flavor = 'woff2'
        opts.layout_features = ['*']
        sub = subset.Subsetter(opts)
        sub.populate(text=text)
        sub.subset(font)
        font.flavor = 'woff2'
        dst = os.path.join(OUT, name + '.woff2')
        font.save(dst)
        print(name, os.path.getsize(dst) // 1024, 'KB')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
