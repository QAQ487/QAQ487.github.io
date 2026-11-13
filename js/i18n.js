(function () {
  const STORAGE_KEY = "portfolio-lang";

  const dict = {
    "skip": { ja: "本文へ進む", en: "Skip to content" },
    "brand-mark-hub": { ja: "ポートフォリオ案内", en: "Portfolio directory" },
    "brand-mark-folio": { ja: "作品集", en: "Portfolio" },
    "lang-group": { ja: "表示言語", en: "Language" },
    "footer-hub": {
      ja: "一部の項目はプレースホルダ。",
      en: "Some fields are placeholders."
    },
    "footer-folio": {
      ja: "映像・ビルド・一部の項目はプレースホルダ。",
      en: "Video, builds, and some fields are placeholders."
    },

    "hub-title": { ja: "ツタエンジン", en: "Ivy Engine" },
    "doc-title-hub": { ja: "楊 子悠（ヨウ シユ） — ポートフォリオ案内", en: "YEUNG Tsz Yau (Terry) — Portfolio directory" },
    "hub-sentence": {
      ja: "自作エンジンと、それで作ったゲーム。",
      en: "A custom engine, and the games built with it."
    },
    "hub-folio-title": { ja: "作品集", en: "Portfolio" },
    "hub-folio-desc": { ja: "エンジンとゲーム", en: "The engine and its games" },
    "hub-handbook-title": { ja: "ゲーム画面表現ハンドブック", en: "Game Visual Handbook" },
    "hub-handbook-desc": {
      ja: "画面演出のカタログ（/handbook/）",
      en: "A catalogue of screen direction (/handbook/)"
    },
    "hub-ivy-title": { ja: "ツタエンジン", en: "Ivy Engine" },
    "hub-ivy-desc": { ja: "エンジンの詳細", en: "The engine, in detail" },
    "hub-note": {
      ja: "志望はエンジンプログラマー／ゲームプログラマー。",
      en: "Target roles: engine programmer / game programmer."
    },
    "back-portfolio": { ja: "作品集へ戻る", en: "Back to the portfolio" },
    "doc-title-ivy": { ja: "ツタエンジン — 楊 子悠（ヨウ シユ）", en: "Ivy Engine — YEUNG Tsz Yau (Terry)" },

    "doc-title-folio": { ja: "作品集 — 楊 子悠（ヨウ シユ）", en: "Portfolio — YEUNG Tsz Yau (Terry)" },
    "hero-title": { ja: "ツタエンジン", en: "Ivy Engine" },
    "hero-lede": {
      ja: "Scrap Burst の枠組みを 2026/4 に改称。一人で継続。C++ / Direct3D 11。",
      en: "Scrap Burst's framework, rebranded in Apr 2026. Solo and ongoing. C++ / Direct3D 11."
    },
    "ghost-title": { ja: "Ivy Engine エディタ", en: "Ivy Engine Editor" },
    "ghost-hierarchy": { ja: "ヒエラルキー", en: "Hierarchy" },
    "ghost-inspector": { ja: "インスペクタ", en: "Inspector" },
    "ghost-assets": { ja: "アセットブラウザ", en: "Asset browser" },
    "shot-editor-k": { ja: "ライブデモ", en: "Live sketch" },
    "shot-editor-v": {
      ja: "WebGL による見本。実機のエディタ画面は下の枠へ。",
      en: "A WebGL sketch. Real editor shots go in the frames below."
    },
    "hier-mesh": { ja: "Icosahedron", en: "Icosahedron" },
    "hier-light": { ja: "DirectionalLight", en: "DirectionalLight" },
    "hier-grid": { ja: "Grid", en: "Grid" },
    "insp-rot-l": { ja: "Rotation", en: "Rotation" },
    "insp-rough-l": { ja: "Roughness", en: "Roughness" },
    "insp-metal-l": { ja: "Metallic", en: "Metallic" },
    "asset-mesh": { ja: "Icosahedron", en: "Icosahedron" },
    "asset-grid": { ja: "Grid", en: "Grid" },
    "asset-mat": { ja: "DefaultPBR", en: "DefaultPBR" },
    "shot-2d-k": { ja: "ここに入れる写真", en: "Photograph to place here" },
    "shot-2d-v": { ja: "2D ビュー。スプライトと Box2D 表示（F11）。", en: "2D view: sprites and Box2D debug (F11)." },
    "shot-play-k": { ja: "ここに入れる写真", en: "Photograph to place here" },
    "shot-play-v": { ja: "Play モード（F3）。配布と同じ動作。", en: "Play mode (F3): same as a shipped build." },
    "shot-boot-k": { ja: "ここに入れる写真", en: "Photograph to place here" },
    "shot-boot-v": { ja: "ランタイム起動画面（ロゴと読み込み）。", en: "Runtime boot screen (logo and loading)." },

    "systems-title": { ja: "エンジンの構成", en: "Engine systems" },
    "sys-arch-t": { ja: "アーキテクチャ", en: "Architecture" },
    "sys-arch-d": {
      ja: "エディタとランタイムが本体を共有。ゲームは独立コンテンツ（JSON、ECS、C++ DLL）。",
      en: "Editor and runtime share the engine. Games are separate content (JSON, ECS, C++ DLL)."
    },
    "sys-ren-t": { ja: "レンダリング", en: "Rendering" },
    "sys-ren-d": {
      ja: "D3D11 フォワード。IBL PBR、トゥーン、ポストFX。",
      en: "D3D11 forward renderer. IBL PBR, toon, post FX."
    },
    "sys-phy-t": { ja: "物理", en: "Physics" },
    "sys-phy-d": {
      ja: "3D は自前の衝突。2D は公式 Box2D 3.1.1。",
      en: "Custom 3D collision. Official Box2D 3.1.1 in 2D."
    },
    "sys-2d-t": { ja: "2D モード", en: "2D mode" },
    "sys-2d-d": {
      ja: "同じエンジンで純 2D（直交カメラ、スプライト、2D ビュー）。",
      en: "Pure 2D in the same engine (ortho camera, sprites, 2D view)."
    },
    "sys-script-t": { ja: "スクリプト", en: "Scripting" },
    "sys-script-d": {
      ja: "C++ DLL。編集中にホットリロード。",
      en: "C++ DLL, with hot reload in the editor."
    },
    "sys-ed-t": { ja: "エディタと配布", en: "Editor and packaging" },
    "sys-ed-d": {
      ja: "ImGui エディタ、Play モード、ワンクリック /MT パッケージ。",
      en: "ImGui editor, Play mode, one-click /MT packaging."
    },
    "sys-credit": {
      ja: "自作。利用ライブラリ: ImGui、ImGuizmo、Box2D 3.1.1、Effekseer、FBX SDK、DirectXTex、nlohmann/json。基盤: D3D11、XAudio2、XInput。リポジトリは非公開。",
      en: "Custom engine. Libraries: ImGui, ImGuizmo, Box2D 3.1.1, Effekseer, FBX SDK, DirectXTex, nlohmann/json. Platform: D3D11, XAudio2, XInput. Repo is private."
    },

    "games-title": { ja: "ツタエンジンで作ったゲーム", en: "Games on Ivy Engine" },
    "vg-title": { ja: "Village & Goblin", en: "Village & Goblin" },
    "vg-meta": { ja: "2026/10–、個人・1人、個人制作。2D を進行", en: "Oct 2026–, solo, 1 person, personal. 2D development" },
    "vg-body": { ja: "昼は農作業、夜は防衛。俯視の 2D。仮題", en: "Farm by day, defend by night. Top-down 2D. Working title " },
    "vg-aka": { ja: "「農耕與哥布林襲村」", en: "農耕與哥布林襲村" },
    "vg-body-end": { ja: "。", en: "." },
    "vg-shot-k": { ja: "ここに入れる写真", en: "Photograph to place here" },
    "vg-shot-v": { ja: "昼間の村と畑（実機。夜襲もあると良い）。", en: "Village and fields by day (in-engine; a night raid helps)." },
    "gs-title": { ja: "Gravity Swing", en: "Gravity Swing" },
    "gs-meta": { ja: "2026/10、個人・1人、個人制作", en: "Oct 2026, solo, 1 person, personal" },
    "gs-body": { ja: "フックで隙間を渡る 3D スイング。コース 2 本。物理の試験台。", en: "Hook across gaps on a 3D swing. Two stages. A physics testbed." },
    "gs-shot-k": { ja: "ここに入れる写真", en: "Photograph to place here" },
    "gs-shot-v": { ja: "スイング中のプレイ画面。", en: "Mid-swing gameplay." },
    "fa-title": { ja: "Frisbee Arena", en: "Frisbee Arena" },
    "fa-meta": { ja: "2026/8–9、個人・1人、授業制作", en: "Aug–Sep 2026, solo, 1 person, school work" },
    "fa-body": { ja: "ツタエンジン上のフリスビー。授業制作。校内コンテスト意欲賞。", en: "A frisbee game on Ivy Engine. School work. Motivation Award at the in-school contest." },
    "fa-shot-k": { ja: "ここに入れる写真", en: "Photograph to place here" },
    "fa-shot-v": { ja: "代表的なプレイ画面。", en: "A representative gameplay frame." },
    "media-pending": { ja: "映像・ビルド（準備中）", en: "Video and builds (placeholder)" },

    "other-title": { ja: "そのほかの作品", en: "Other work" },
    "mf-title": { ja: "Magnet Field", en: "Magnet Field" },
    "mf-meta": { ja: "2026/4–7、10人、授業制作", en: "Apr–Jul 2026, 10 people, school work" },
    "mf-body": { ja: "授業の10人チーム。プログラミングは全て本人。この制作中に枠組みを改称。", en: "School team of 10. All programming by Terry. The framework was rebranded during this project." },
    "mf-shot-k": { ja: "ここに入れる写真", en: "Photograph to place here" },
    "mf-shot-v": { ja: "プレイ画面（担当が分かると良い）。", en: "Gameplay (a frame of owned work helps)." },
    "tps-title": { ja: "Block Shooter", en: "Block Shooter" },
    "tps-meta": { ja: "2026/1、個人・1人、授業制作", en: "Jan 2026, solo, 1 person, school work" },
    "tps-body": { ja: "D3D11 の三人称。99 秒。Scrap Burst と同じ枠組み。校内コンテスト構成力賞。", en: "D3D11 third-person shooter, 99 seconds. Same framework as Scrap Burst. Composition Award at the in-school contest." },
    "tps-shot-k": { ja: "ここに入れる写真", en: "Photograph to place here" },
    "tps-shot-v": { ja: "照準と敵が見えるプレイ画面。", en: "Gameplay with crosshair and an enemy." },
    "sb-title": { ja: "Scrap Burst", en: "Scrap Burst" },
    "sb-meta": { ja: "2025/10–2026/3、10人、授業制作", en: "Oct 2025–Mar 2026, 10 people, school work" },
    "sb-body": { ja: "授業の10人チーム。枠組みとゲームオブジェクトの算法。", en: "School team of 10. Framework and game-object algorithms." },
    "sb-shot-k": { ja: "ここに入れる写真", en: "Photograph to place here" },
    "sb-shot-v": { ja: "プレイ画面またはキーアート（提供待ち）。", en: "Gameplay or key art (waiting on assets)." },
    "hb-title": { ja: "ゲーム画面表現ハンドブック", en: "Game Visual Handbook" },
    "hb-meta": { ja: "個人、/handbook/ で公開中", en: "Solo, live at /handbook/" },
    "hb-body": { ja: "画面演出と操作感のカタログ。", en: "A catalogue of screen direction and feel." },
    "hb-link": { ja: "ハンドブックを開く", en: "Open the handbook" },

    "about-title": { ja: "プロフィール", en: "About" },
    "about-name-l": { ja: "名前", en: "Name" },
    "about-name-v": { ja: "楊 子悠（ヨウ シユ）", en: "YEUNG Tsz Yau (Terry)" },
    "about-role-l": { ja: "志望職種", en: "Target role" },
    "about-role-v": { ja: "エンジンプログラマー／ゲームプログラマー", en: "Engine programmer / game programmer" },
    "about-lang-l": { ja: "言語", en: "Languages" },
    "about-lang-v": { ja: "JLPT N1、TOEIC 940", en: "JLPT N1, TOEIC 940" },
    "about-loc-l": { ja: "所在地", en: "Location" },
    "about-loc-v": { ja: "プレースホルダ", en: "Placeholder" },
    "about-edu-l": { ja: "経歴", en: "Background" },
    "about-edu-v": { ja: "プレースホルダ", en: "Placeholder" },
    "about-contact-l": { ja: "連絡先", en: "Contact" },
    "about-contact-v": { ja: "terryyeung234@gmail.com", en: "terryyeung234@gmail.com" }
  };

  const zh = {
    "skip": "跳至正文",
    "brand-mark-hub": "作品集目錄",
    "brand-mark-folio": "作品集",
    "lang-group": "顯示語言",
    "footer-hub": "部分項目為佔位。",
    "footer-folio": "影片、建置與部分項目為佔位。",
    "hub-title": "常春藤引擎",
    "doc-title-hub": "楊子悠 — 作品集目錄",
    "hub-sentence": "自製引擎，以及用它做出的遊戲。",
    "hub-folio-title": "作品集",
    "hub-folio-desc": "引擎與遊戲",
    "hub-handbook-title": "遊戲畫面表現手冊",
    "hub-handbook-desc": "畫面演出目錄（/handbook/）",
    "hub-ivy-title": "常春藤引擎",
    "hub-ivy-desc": "引擎詳情",
    "hub-note": "目標職位是引擎程式設計師／遊戲程式設計師。",
    "back-portfolio": "返回作品集",
    "doc-title-ivy": "常春藤引擎 — 楊子悠",
    "doc-title-folio": "作品集 — 楊子悠",
    "hero-title": "常春藤引擎",
    "hero-lede": "2026/4 把 Scrap Burst 的框架改稱此名。個人持續。C++ / Direct3D 11。",
    "ghost-title": "Ivy Engine 編輯器",
    "ghost-hierarchy": "階層",
    "ghost-inspector": "檢視器",
    "ghost-assets": "資源瀏覽器",
    "shot-editor-k": "即時示範",
    "shot-editor-v": "WebGL 示意。實機編輯器畫面放在下方框內。",
    "hier-mesh": "Icosahedron",
    "hier-light": "DirectionalLight",
    "hier-grid": "Grid",
    "insp-rot-l": "Rotation",
    "insp-rough-l": "Roughness",
    "insp-metal-l": "Metallic",
    "asset-mesh": "Icosahedron",
    "asset-grid": "Grid",
    "asset-mat": "DefaultPBR",
    "shot-2d-k": "此處放置圖片",
    "shot-2d-v": "2D 視圖。精靈與 Box2D 顯示（F11）。",
    "shot-play-k": "此處放置圖片",
    "shot-play-v": "Play 模式（F3）。與發行版本相同。",
    "shot-boot-k": "此處放置圖片",
    "shot-boot-v": "運行時啟動畫面（標誌與載入）。",
    "systems-title": "引擎構成",
    "sys-arch-t": "架構",
    "sys-arch-d": "編輯器與運行時共用引擎本體。遊戲是獨立內容（JSON、ECS、C++ DLL）。",
    "sys-ren-t": "渲染",
    "sys-ren-d": "D3D11 前向渲染。IBL PBR、卡通、後製。",
    "sys-phy-t": "物理",
    "sys-phy-d": "3D 為自製碰撞。2D 使用官方 Box2D 3.1.1。",
    "sys-2d-t": "2D 模式",
    "sys-2d-d": "同一引擎的純 2D（正交相機、精靈、2D 視圖）。",
    "sys-script-t": "腳本",
    "sys-script-d": "C++ DLL。編輯時可熱重載。",
    "sys-ed-t": "編輯器與封裝",
    "sys-ed-d": "ImGui 編輯器、Play 模式、一鍵 /MT 封裝。",
    "sys-credit": "自製。使用的函式庫：ImGui、ImGuizmo、Box2D 3.1.1、Effekseer、FBX SDK、DirectXTex、nlohmann/json。平台：D3D11、XAudio2、XInput。儲存庫為私人。",
    "games-title": "用常春藤引擎做的遊戲",
    "vg-title": "Village & Goblin",
    "vg-meta": "2026/10–、個人・1 人、個人製作。推進 2D",
    "vg-body": "日間耕作，夜間防守。俯視 2D。暫名",
    "vg-aka": "「農耕與哥布林襲村」",
    "vg-body-end": "。",
    "vg-shot-k": "此處放置圖片",
    "vg-shot-v": "日間的村莊與田地（實機畫面。如有夜襲更佳）。",
    "gs-title": "Gravity Swing",
    "gs-meta": "2026/10、個人・1 人、個人製作",
    "gs-body": "用鉤索跨越空隙的 3D 擺盪。共兩關。物理試驗台。",
    "gs-shot-k": "此處放置圖片",
    "gs-shot-v": "擺盪中的遊戲畫面。",
    "fa-title": "Frisbee Arena",
    "fa-meta": "2026/8–9、個人・1 人、課堂製作",
    "fa-body": "常春藤引擎上的飛盤。課堂製作。校內比賽意欲獎。",
    "fa-shot-k": "此處放置圖片",
    "fa-shot-v": "具代表性的遊戲畫面。",
    "media-pending": "影片與建置（佔位）",
    "other-title": "其他作品",
    "mf-title": "Magnet Field",
    "mf-meta": "2026/4–7、10 人、課堂製作",
    "mf-body": "課堂 10 人團隊。程式全部由本人完成。此製作期間把框架改稱。",
    "mf-shot-k": "此處放置圖片",
    "mf-shot-v": "遊戲畫面（如能顯示負責部分則更佳）。",
    "tps-title": "Block Shooter",
    "tps-meta": "2026/1、個人・1 人、課堂製作",
    "tps-body": "D3D11 第三人稱，99 秒。與 Scrap Burst 同一框架。校內比賽構成力獎。",
    "tps-shot-k": "此處放置圖片",
    "tps-shot-v": "能看到準星與敵人的遊戲畫面。",
    "sb-title": "Scrap Burst",
    "sb-meta": "2025/10–2026/3、10 人、課堂製作",
    "sb-body": "課堂 10 人團隊。框架與遊戲物件演算法。",
    "sb-shot-k": "此處放置圖片",
    "sb-shot-v": "遊戲畫面或主視覺（尚待提供）。",
    "hb-title": "遊戲畫面表現手冊",
    "hb-meta": "個人，已於 /handbook/ 公開",
    "hb-body": "畫面演出與操作感的目錄。",
    "hb-link": "開啟手冊",
    "about-title": "簡介",
    "about-name-l": "姓名",
    "about-name-v": "楊子悠",
    "about-role-l": "目標職位",
    "about-role-v": "引擎程式設計師／遊戲程式設計師",
    "about-lang-l": "語言",
    "about-lang-v": "廣東話（母語）、普通話（母語水平）、英語（TOEIC 940）、日語（JLPT N1）",
    "about-loc-l": "所在地",
    "about-loc-v": "佔位",
    "about-edu-l": "經歷",
    "about-edu-v": "佔位",
    "about-contact-l": "聯絡方式",
    "about-contact-v": "terryyeung234@gmail.com",
  };

  function currentLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "en" || saved === "ja" || saved === "zh" ? saved : "ja";
  }

  function htmlLang(lang) {
    return lang === "zh" ? "zh-Hant" : lang;
  }

  function fromDict(entry, key, lang) {
    if (lang === "zh") return zh[key] || entry.ja;
    return entry[lang] || entry.ja;
  }

  function attrFor(el, base, lang) {
    return el.getAttribute(base + "-" + lang) || el.getAttribute(base + "-ja");
  }

  function apply(lang) {
    document.documentElement.lang = htmlLang(lang);
    localStorage.setItem(STORAGE_KEY, lang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const entry = dict[key];
      if (!entry) return;
      el.textContent = fromDict(entry, key, lang);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      const entry = dict[key];
      if (!entry) return;
      el.setAttribute("aria-label", fromDict(entry, key, lang));
    });

    document.querySelectorAll("[data-ja]").forEach((el) => {
      const value = attrFor(el, "data", lang);
      if (value == null) return;
      el.textContent = value;
    });

    document.querySelectorAll("[data-aria-ja]").forEach((el) => {
      const value = attrFor(el, "data-aria", lang);
      if (value == null) return;
      el.setAttribute("aria-label", value);
    });

    if (document.body.hasAttribute("data-title-ja")) {
      document.title = attrFor(document.body, "data-title", lang);
    } else {
      const titleKey = document.body.getAttribute("data-title-key");
      if (titleKey && dict[titleKey]) document.title = fromDict(dict[titleKey], titleKey, lang);
    }

    const desc = document.querySelector('meta[name="description"]');
    if (desc && document.body.hasAttribute("data-desc-ja")) {
      desc.setAttribute("content", attrFor(document.body, "data-desc", lang));
    }

    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      const isActive = btn.getAttribute("data-lang-btn") === lang;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  window.PortfolioI18n = { apply, currentLang };

  document.addEventListener("DOMContentLoaded", () => {
    apply(currentLang());
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      btn.addEventListener("click", () => apply(btn.getAttribute("data-lang-btn")));
    });
  });
})();
