#!/usr/bin/env node
/* Human handbook: top agent banner shows the full llms.txt URL in zh / en / ja and wraps. */
const puppeteer = require('puppeteer-core');
const path = require('path');

const URL = 'https://qaq487.github.io/handbook/llms.txt';
const html = path.resolve(__dirname, '../../handbook/index.html');
const PHRASE = {
  zh: ['如果要貼俾 AI agent，請用'],
  en: ['To paste this handbook into an AI agent, use'],
  ja: ['AIエージェントに貼り付ける場合は', 'を使ってください'],
};

function norm(s) {
  return String(s || '').replace(/\s+/g, ' ').trim();
}

(async () => {
  const b = await puppeteer.launch({
    executablePath: process.env.CHROME || '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const p = await b.newPage();
  const fails = [];
  await p.goto('file://' + html, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForFunction('window.__ready', { timeout: 60000 });

  async function check(label) {
    const m = await p.evaluate(() => {
      const banner = document.getElementById('agentBanner');
      const head = document.querySelector('.sitehead');
      const topbar = document.querySelector('.topbar');
      const a = banner && banner.querySelector('a');
      const q = document.getElementById('q');
      const side = document.querySelector('.side');
      window.scrollTo(0, 0);
      const br = banner ? banner.getBoundingClientRect() : null;
      const tr = topbar ? topbar.getBoundingClientRect() : null;
      const ar = a ? a.getBoundingClientRect() : null;
      const headH = head ? head.getBoundingClientRect().height : 0;
      window.scrollTo(0, 700);
      const stuck = banner ? banner.getBoundingClientRect().top : null;
      const sideStuck = side ? side.getBoundingClientRect().top : null;
      window.scrollTo(0, 0);
      return {
        missing: !banner || !a,
        text: banner ? banner.textContent : '',
        linkText: a ? a.textContent : '',
        href: a ? a.getAttribute('href') : '',
        display: banner ? getComputedStyle(banner).display : '',
        whiteSpace: a ? getComputedStyle(a).whiteSpace : '',
        bannerTop: br && br.top,
        bannerH: br && br.height,
        bannerBottom: br && br.bottom,
        headH,
        sideStuck,
        topbarTop: tr && tr.top,
        linkRight: ar && ar.right,
        linkW: ar && ar.width,
        bannerClient: banner ? banner.clientWidth : 0,
        bannerScroll: banner ? banner.scrollWidth : 0,
        headClient: head ? head.clientWidth : 0,
        headScroll: head ? head.scrollWidth : 0,
        headRight: head ? head.getBoundingClientRect().right : 0,
        qW: q ? q.getBoundingClientRect().width : 0,
        inner: window.innerWidth,
        stuck,
        dismiss: !!(banner && banner.querySelector('button')),
      };
    });
    if (m.missing) {
      fails.push(label + ': banner or link missing');
      return;
    }
    if (m.display === 'none') fails.push(label + ': banner hidden');
    if (m.dismiss) fails.push(label + ': unexpected dismiss control');
    if (m.linkText !== URL) fails.push(label + ': link text ' + JSON.stringify(m.linkText));
    if (m.href !== URL) fails.push(label + ': href ' + JSON.stringify(m.href));
    const shown = norm(m.text);
    if (!shown.includes(URL)) fails.push(label + ': URL not in banner text');
    for (const bit of PHRASE[label.split('@')[0]] || []) {
      if (!shown.includes(bit)) fails.push(label + ': missing phrase ' + bit);
    }
    if (m.whiteSpace === 'nowrap') fails.push(label + ': link is nowrap');
    if (m.bannerTop > 2) fails.push(label + ': banner not at top (' + m.bannerTop + ')');
    if (m.bannerBottom > m.topbarTop + 1) fails.push(label + ': banner overlaps toolbar');
    if (m.stuck > 2) fails.push(label + ': banner not sticky (' + m.stuck + ')');
    if (m.linkW < 40) fails.push(label + ': link not visible');
    if (m.linkRight > m.inner + 1) fails.push(label + ': link overflows viewport');
    if (m.bannerScroll > m.bannerClient + 1) fails.push(label + ': banner scrollWidth ' + m.bannerScroll + '>' + m.bannerClient);
    if (m.headScroll > m.headClient + 1) fails.push(label + ': chrome scrollWidth ' + m.headScroll + '>' + m.headClient);
    if (m.headRight > m.inner + 1) fails.push(label + ': chrome wider than viewport');
    if (m.qW < 60) fails.push(label + ': search crushed (' + m.qW.toFixed(1) + 'px)');
    if (label.includes('@390') && m.bannerH < 36) fails.push(label + ': URL did not wrap (' + m.bannerH + 'px)');
    if (label.includes('@1280') && Math.abs(m.sideStuck - m.headH) > 2) {
      fails.push(label + ': sidebar sticky top ' + m.sideStuck + ' != chrome ' + m.headH);
    }
  }

  for (const lang of ['zh', 'en', 'ja']) {
    await p.setViewport({ width: 1280, height: 900 });
    await p.evaluate((l) => document.querySelector('[data-lang="' + l + '"]').click(), lang);
    await new Promise((r) => setTimeout(r, 80));
    for (const cols of [1, 2, 3]) {
      await p.evaluate((n) => document.querySelector('[data-cols="' + n + '"]').click(), cols);
      await new Promise((r) => setTimeout(r, 40));
      await check(lang + '@1280/cols' + cols);
    }
    await p.setViewport({ width: 390, height: 844 });
    await new Promise((r) => setTimeout(r, 80));
    await check(lang + '@390');
  }

  console.log('AGENT BANNER', JSON.stringify({ fails: fails.length }));
  if (fails.length) {
    console.error('AGENT BANNER FAIL\n' + fails.join('\n'));
    await b.close();
    process.exit(1);
  }
  console.log('AGENT BANNER OK');
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
