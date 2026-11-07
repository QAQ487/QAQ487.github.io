#!/usr/bin/env node
/* Promotion-detector regression.
   A demo whose source only calls maskComp(c, …) must be classified buf,
   not hi + scale(2,2). Also checks integer CSS-box choices. */
const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src');
const app = fs.readFileSync(path.join(srcDir, 'app.js'), 'utf8');

function readRegex(name) {
  const marker = 'const ' + name + '=';
  const i = app.indexOf(marker);
  if (i < 0) throw new Error('missing ' + marker);
  const j = i + marker.length;
  if (app[j] !== '/') throw new Error(name + ' is not a regex literal');
  let k = j + 1;
  while (k < app.length) {
    if (app[k] === '\\') { k += 2; continue; }
    if (app[k] === '/') break;
    k++;
  }
  return Function('return ' + app.slice(j, k + 1))();
}

const bad = readRegex('bad');
const OLD = /c\.(?:put|get|create)ImageData\s*\(|outData\s*\(\s*c\s*\)/;
const fails = [];

function sliceFn(src, at) {
  let i = at;
  while (i < src.length && /\s/.test(src[i])) i++;
  if (src.startsWith('function', i) || src[i] === '(') {
    const brace = src.indexOf('{', i);
    if (brace < 0) return src.slice(i, i + 80);
    let depth = 0;
    for (let k = brace; k < src.length; k++) {
      const ch = src[k];
      if (ch === "'" || ch === '"') {
        const q = ch; k++;
        while (k < src.length && src[k] !== q) { if (src[k] === '\\') k++; k++; }
      } else if (ch === '`') {
        k++;
        while (k < src.length && src[k] !== '`') { if (src[k] === '\\') k++; k++; }
      } else if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) return src.slice(i, k + 1);
      }
    }
  }
  return src.slice(i, i + 120);
}

const changed = [];
const files = fs.readdirSync(srcDir).filter(f => /^demos_.*\.js$/.test(f));
for (const file of files) {
  const src = fs.readFileSync(path.join(srcDir, file), 'utf8');
  const re = /DEMOS\['([A-Z0-9-]+)'\]\s*=\s*\{/g;
  let m;
  while ((m = re.exec(src))) {
    const id = m[1];
    const headEnd = src.indexOf('f:', m.index);
    if (headEnd < 0) continue;
    const head = src.slice(m.index, headEnd);
    if (/hi\s*:\s*true/.test(head) || /buf\s*:\s*true/.test(head)) continue;
    const fn = sliceFn(src, headEnd + 2);
    const now = bad.test(fn);
    const before = OLD.test(fn);
    if (now !== before) changed.push({ id, now, before, file });
  }
}

const trn = fs.readFileSync(path.join(srcDir, 'demos_trn.js'), 'utf8');
const i9 = trn.indexOf("DEMOS['TRN-09']");
const fn9 = sliceFn(trn, trn.indexOf('f:', i9) + 2);
if (!bad.test(fn9)) fails.push('TRN-09 source does not match the buf detector');
if (OLD.test(fn9)) fails.push('TRN-09 unexpectedly matches the old detector');
if (/c\.scale\(\s*2\s*,\s*2\s*\)/.test(fn9)) fails.push('TRN-09 source itself scales; the check would be meaningless');
if (!/maskComp\s*\(\s*c\s*,/.test(fn9)) fails.push('TRN-09 no longer calls maskComp(c, …)');

const i3 = trn.indexOf("DEMOS['TRN-03']");
const fn3 = sliceFn(trn, trn.indexOf('f:', i3) + 2);
if (bad.test(fn3)) fails.push('TRN-03 (drawImage only) was marked buf');

const i6 = trn.indexOf("DEMOS['TRN-06']");
const fn6 = sliceFn(trn, trn.indexOf('f:', i6) + 2);
if (!bad.test(fn6) || !OLD.test(fn6)) fails.push('TRN-06 should stay on the direct ImageData buf path');

const ids = changed.map(c => c.id).sort();
if (ids.length !== 1 || ids[0] !== 'TRN-09') {
  fails.push('promotion path changes expected only TRN-09, got ' + (ids.join(', ') || '(none)'));
}

/* Integer CSS box: even nearest-neighbour scale, 16:9, fits the slot. */
const boxSrcStart = app.indexOf('function canvasCssBox');
if (boxSrcStart < 0) fails.push('canvasCssBox missing');
else {
  const boxSrc = sliceFn(app, boxSrcStart);
  const nearStart = app.indexOf('const _nearN=');
  const nearSrc = app.slice(nearStart, app.indexOf('\n', nearStart));
  const canvasCssBox = Function(nearSrc + '\n' + boxSrc + '\nreturn canvasCssBox;')();
  const ratioOk = (w, bw, raw) => {
    const ratio = (w * raw) / bw;
    const near = (x, min) => Math.abs(x - Math.round(x)) < 1e-3 && Math.round(x) >= min;
    return near(ratio, 1) || near(1 / ratio, 2);
  };
  const cases = [
    [900, 900 * 9 / 16, 480, 270, 1, 1],
    [900, 900 * 9 / 16, 240, 135, 1, 1],
    [320, 320 * 9 / 16, 480, 270, 1, 1],
    [320, 320 * 9 / 16, 240, 135, 1, 1],
    [800, 450, 480, 270, 1.5, 2],
    [800, 450, 240, 135, 1.5, 2],
    [880, 224, 480, 270, 1, 1],
    [500, 500 * 135 / 240, 240, 135, 2, 2],
  ];
  for (const [aw, ah, lw, lh, raw, sd] of cases) {
    const box = canvasCssBox(aw, ah, lw, lh, raw, sd);
    const tag = JSON.stringify({ aw, lw, raw, sd, box });
    if (!(box.w <= aw + 0.51 && box.h <= ah + 0.51)) fails.push('box overflows ' + tag);
    if (Math.abs(box.w / box.h - 16 / 9) > 0.02) fails.push('box not 16:9 ' + tag);
    if (!ratioOk(box.w, 480 * sd, raw)) fails.push('bitmap scale not integer ' + tag);
    const devPer = (box.w * raw) / lw;
    const logPer = lw / box.w;
    const near = (x, min) => Math.abs(x - Math.round(x)) < 1e-3 && Math.round(x) >= min;
    if (!(near(devPer, 1) || near(logPer, 2))) fails.push('logical scale not integer ' + tag);
  }
  /* Odd upscales of a 240 buffer (3×) must not win on integer DPR: 2/3 bitmap pixels per CSS px. */
  const wide = canvasCssBox(800, 450, 240, 135, 1, 1);
  if (Math.abs(wide.w - 720) < 1) fails.push('buf 3× CSS scale is not crisp, got ' + wide.w);
  if (Math.abs(wide.w - 480) > 1) fails.push('expected 480 CSS px for buf in an 800px slot at 1× DPR, got ' + wide.w);
}

const trnSrc = fs.readFileSync(path.join(srcDir, 'demos_trn.js'), 'utf8');
const maskAt = trnSrc.indexOf('function maskComp');
const maskFn = trnSrc.slice(maskAt, trnSrc.indexOf('\nDEMOS', maskAt));
if (!/blitData\(c,\s*o\)/.test(maskFn)) fails.push('maskComp no longer blits via drawImage');
if (/c\.putImageData\(/.test(maskFn)) fails.push('maskComp still putImageData onto the live context');
const lgt = fs.readFileSync(path.join(srcDir, 'demos_lgt.js'), 'utf8');
const lgFn = lgt.slice(lgt.indexOf('function lgPut'), lgt.indexOf('\nconst lgFloor'));
if (!/blitData\(c,\s*o\)/.test(lgFn) || /c\.putImageData\(/.test(lgFn)) fails.push('lgPut still writes ImageData onto the live context');

console.log('PROMOTE changed', ids.join(', ') || '(none)');
if (fails.length) {
  console.error('PROMOTE FAIL\n' + fails.join('\n'));
  process.exit(1);
}
console.log('PROMOTE OK');
