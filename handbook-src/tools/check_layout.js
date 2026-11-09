#!/usr/bin/env node
/* Layout regression: dl label column must not crush entry body text in the entry modal; gallery summary tiles stay equal height. */
const puppeteer = require('puppeteer-core');
const path = require('path');
const html = path.resolve(__dirname, '../../handbook/index.html');

(async () => {
  const b = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto('file://' + html, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForFunction('window.__ready', { timeout: 60000 });

  const fails = [];
  for (const lang of ['zh', 'en', 'ja']) {
    await p.evaluate((l) => document.querySelector('[data-lang=' + l + ']').click(), lang);
    await new Promise((r) => setTimeout(r, 120));
    const m = await p.evaluate(() => {
      // Gallery tiles are summaries; the full body is checked inside the entry modal.
      document.querySelector('[data-cols="3"]').click();
      const a = document.getElementById('NPR-14');
      if (!a) return { err: 'missing NPR-14' };
      a.scrollIntoView();
      a.click();
      if (!a.classList.contains('in-modal')) return { err: 'NPR-14 modal did not open' };
      const body = a.querySelector('.body');
      const dl = body && body.querySelector('dl');
      const dd = body && body.querySelector('dd');
      const cb = body && body.querySelector('.callout .cb');
      const ct = body && body.querySelector('.callout .ct');
      if (!dl || !dd || !cb || !ct) return { err: 'missing body parts' };
      const br = (el) => {
        const r = el.getBoundingClientRect();
        return { w: r.width, h: r.height };
      };
      const cs = getComputedStyle(cb);
      return {
        articleW: a.getBoundingClientRect().width,
        bodyW: body.getBoundingClientRect().width,
        cols: getComputedStyle(dl).gridTemplateColumns,
        dd: br(dd),
        dt0: br(body.querySelector('dt')),
        callout: br(body.querySelector('.callout')),
        cb: br(cb),
        ct: br(ct),
        cbLH: parseFloat(cs.lineHeight),
        cbFS: parseFloat(cs.fontSize),
        transform: getComputedStyle(body).transform,
        bodyTransform: getComputedStyle(document.body).transform,
        measure: parseFloat(getComputedStyle(body).maxWidth),
        fs: parseFloat(getComputedStyle(dd).fontSize),
      };
    });
    await p.evaluate(() => document.getElementById('mclose').click());
    if (m.err) fails.push(lang + ': ' + m.err);
    else {
      // Content column must keep readable width in a 3-col gallery card.
      if (m.dd.w < 140) fails.push(`${lang}: dd too narrow (${m.dd.w.toFixed(1)}px) cols=${m.cols}`);
      // Label column must not dominate the card.
      if (m.dt0.w > m.dd.w) fails.push(`${lang}: dt wider than dd (${m.dt0.w.toFixed(1)}>${m.dd.w.toFixed(1)})`);
      // Callout must use most of the body width (not a crushed strip).
      if (m.cb.w < m.bodyW * 0.7) fails.push(`${lang}: callout body narrow (${m.cb.w.toFixed(1)}/${m.bodyW.toFixed(1)})`);
      // No unexpected scale transform on body text ancestors.
      if (m.transform !== 'none' || m.bodyTransform !== 'none') fails.push(`${lang}: unexpected transform`);
      // Line box must not be vertically crushed vs font-size.
      if (m.cbLH < m.cbFS * 1.25) fails.push(`${lang}: callout line-height too tight (${m.cbLH}/${m.cbFS})`);
      // Modal reading measure: body text 15px, capped line length.
      if (m.fs < 15) fails.push(`${lang}: modal dd font-size ${m.fs}px < 15px`);
      if (!(m.measure > 0) || m.bodyW > m.measure + 1) fails.push(`${lang}: modal body measure not capped (${m.bodyW.toFixed(1)}/${m.measure})`);
    }
  }

  // Gallery summary tiles: equal height in every column mode and language, no row-gap waste,
  // full body hidden on the tile, demo still on the tile, keyboard Enter opens the modal.
  const tiles = {};
  for (const lang of ['zh', 'en', 'ja']) {
    await p.evaluate((l) => document.querySelector('[data-lang=' + l + ']').click(), lang);
    for (const cols of [3, 2, 1]) {
      await p.evaluate((c) => document.querySelector('[data-cols="' + c + '"]').click(), cols);
      await new Promise((r) => setTimeout(r, 150));
      const t = await p.evaluate(() => {
        const arts = [...document.querySelectorAll('#cards > article')].filter((a) => !a.hidden);
        const hs = arts.map((a) => a.getBoundingClientRect().height);
        const rows = {};
        arts.forEach((a, i) => { const k = Math.round(a.getBoundingClientRect().top + scrollY); (rows[k] = rows[k] || []).push(hs[i]); });
        let waste = 0;
        Object.values(rows).forEach((v) => { const mx = Math.max(...v); v.forEach((h) => { waste += mx - h; }); });
        const bodyShown = arts.filter((a) => getComputedStyle(a.querySelector('.body')).display !== 'none').length;
        const noVisual = arts.filter((a) => { const f = a.querySelector('.visual'); return !f || f.getBoundingClientRect().height < 100; }).length;
        const tabbable = arts.filter((a) => a.tabIndex !== 0).length;
        return { n: arts.length, min: Math.min(...hs), max: Math.max(...hs), waste, bodyShown, noVisual, tabbable };
      });
      tiles[lang + cols] = Math.round(t.max);
      if (t.max - t.min > 1) fails.push(`${lang} ${cols}-col: tile heights differ (${t.min.toFixed(1)}–${t.max.toFixed(1)})`);
      if (t.waste > 1) fails.push(`${lang} ${cols}-col: row gap waste ${t.waste.toFixed(1)}px`);
      if (t.bodyShown) fails.push(`${lang} ${cols}-col: ${t.bodyShown} tiles show the full body`);
      if (t.noVisual) fails.push(`${lang} ${cols}-col: ${t.noVisual} tiles without a visible demo`);
      if (t.tabbable) fails.push(`${lang} ${cols}-col: ${t.tabbable} tiles not keyboard-focusable`);
    }
  }
  await p.evaluate(() => document.querySelector('[data-cols="3"]').click());
  await p.focus('#FB-01');
  await p.keyboard.press('Enter');
  await new Promise((r) => setTimeout(r, 150));
  const kb = await p.evaluate(() => document.getElementById('FB-01').classList.contains('in-modal'));
  if (!kb) fails.push('keyboard: Enter on a gallery tile did not open the modal');
  await p.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 100));
  await p.focus('#FB-03');
  await p.keyboard.press('Space');
  await new Promise((r) => setTimeout(r, 150));
  const kb2 = await p.evaluate(() => document.getElementById('FB-03').classList.contains('in-modal'));
  if (!kb2) fails.push('keyboard: Space on a gallery tile did not open the modal');
  await p.keyboard.press('Escape');
  console.log('TILES', JSON.stringify(tiles));

  // Mobile modal: same constraints after opening NPR-14.
  await p.setViewport({ width: 390, height: 844 });
  await p.evaluate(() => document.querySelector('[data-lang=ja]').click());
  await new Promise((r) => setTimeout(r, 120));
  await p.evaluate(() => {
    document.documentElement.dataset.cols = '1';
    document.getElementById('NPR-14').click();
  });
  await new Promise((r) => setTimeout(r, 250));
  const mob = await p.evaluate(() => {
    const a = document.getElementById('NPR-14');
    const dd = a.querySelector('.body dd');
    const dt = a.querySelector('.body dt');
    const cb = a.querySelector('.callout .cb');
    return {
      open: document.body.classList.contains('modal-open'),
      ddW: dd.getBoundingClientRect().width,
      dtW: dt.getBoundingClientRect().width,
      cbW: cb.getBoundingClientRect().width,
      panelW: document.querySelector('.mpanel').getBoundingClientRect().width,
    };
  });
  if (!mob.open) fails.push('mobile: modal did not open');
  if (mob.ddW < 160) fails.push(`mobile: dd too narrow (${mob.ddW.toFixed(1)}px)`);
  if (mob.dtW > mob.ddW) fails.push(`mobile: dt wider than dd (${mob.dtW.toFixed(1)}>${mob.ddW.toFixed(1)})`);
  if (mob.cbW < mob.panelW * 0.7) fails.push(`mobile: callout crushed (${mob.cbW.toFixed(1)}/${mob.panelW.toFixed(1)})`);

  console.log('LAYOUT', JSON.stringify({ fails: fails.length, sample: mob }));
  if (fails.length) {
    console.error('LAYOUT FAIL\n' + fails.join('\n'));
    await b.close();
    process.exit(1);
  }
  console.log('LAYOUT OK');
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
