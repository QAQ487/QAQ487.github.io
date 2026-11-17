// Render portfolio/pdf/print.html to portfolio/YEUNG_TszYau_portfolio_ja.pdf.
// Run from the repository root after build_print.py:  node portfolio/pdf/render.js
// It serves the repository on a local port so the page's absolute paths (/fonts, /portfolio/media) resolve.
const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "../..");
const OUT = path.join(ROOT, "portfolio/YEUNG_TszYau_portfolio_ja.pdf");
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".woff2": "font/woff2", ".jpg": "image/jpeg", ".svg": "image/svg+xml" };

const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = path.normalize(path.join(ROOT, rel));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

server.listen(0, async () => {
  const { port } = server.address();
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/portfolio/pdf/print.html`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: OUT, format: "A4", landscape: true, printBackground: true, preferCSSPageSize: true });
    console.log("wrote", path.relative(ROOT, OUT), fs.statSync(OUT).size, "bytes");
  } finally {
    await browser.close();
    server.close();
  }
});
