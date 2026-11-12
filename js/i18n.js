(function () {
  const STORAGE_KEY = "portfolio-lang";

  const dict = {
    "skip": { ja: "本文へ進む", en: "Skip to content" },
    "brand-mark-hub": { ja: "ポートフォリオ案内", en: "Portfolio directory" },
    "brand-mark-folio": { ja: "作品集", en: "Portfolio" },
    "lang-group": { ja: "表示言語", en: "Language" },
    "footer-hub": {
      ja: "モックアップ。ハンドブックは未変更。",
      en: "Mockup. The handbook is unchanged."
    },
    "footer-folio": {
      ja: "モックアップ。映像・ビルド・一部プロフィールはプレースホルダ。",
      en: "Mockup. Video, builds, and some profile fields are placeholders."
    },

    "hub-title": { ja: "ツタエンジン", en: "Ivy Engine" },
    "doc-title-hub": { ja: "Terry Yeung — ポートフォリオ案内", en: "Terry Yeung — Portfolio directory" },
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
    "hub-note": {
      ja: "志望はエンジンプログラマー。",
      en: "Target role: engine programmer."
    },

    "doc-title-folio": { ja: "作品集 — Terry Yeung", en: "Portfolio — Terry Yeung" },
    "hero-title": { ja: "ツタエンジン", en: "Ivy Engine" },
    "hero-lede": {
      ja: "一人で書いた C++ / Direct3D 11 エンジン。エディタとランタイムを分離。",
      en: "A solo C++ / Direct3D 11 engine. Editor and runtime are separate."
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
    "vg-meta": { ja: "最新作、個人、2026年10月〜、Ivy / 2D", en: "Latest, solo, Oct 2026–, Ivy / 2D" },
    "vg-body": { ja: "昼は農作業、夜は防衛。俯視の 2D。仮題", en: "Farm by day, defend by night. Top-down 2D. Working title " },
    "vg-aka": { ja: "「農耕與哥布林襲村」", en: "農耕與哥布林襲村" },
    "vg-body-end": { ja: "。", en: "." },
    "vg-shot-k": { ja: "ここに入れる写真", en: "Photograph to place here" },
    "vg-shot-v": { ja: "昼間の村と畑（実機。夜襲もあると良い）。", en: "Village and fields by day (in-engine; a night raid helps)." },
    "gs-title": { ja: "Gravity Swing", en: "Gravity Swing" },
    "gs-meta": { ja: "個人、2026年9月〜10月、Ivy / 3D", en: "Solo, Sep–Oct 2026, Ivy / 3D" },
    "gs-body": { ja: "フックで隙間を渡る 3D スイング。コース 2 本。", en: "Hook across gaps on a 3D swing course. Two stages." },
    "gs-shot-k": { ja: "ここに入れる写真", en: "Photograph to place here" },
    "gs-shot-v": { ja: "スイング中のプレイ画面。", en: "Mid-swing gameplay." },
    "fa-title": { ja: "Frisbee Arena", en: "Frisbee Arena" },
    "fa-meta": { ja: "個人、2026年9月、Ivy", en: "Solo, Sep 2026, Ivy" },
    "fa-body": { ja: "ツタエンジン上のフリスビー。詳細は確認待ち。", en: "A frisbee game on Ivy Engine. Details pending confirmation." },
    "fa-shot-k": { ja: "ここに入れる写真", en: "Photograph to place here" },
    "fa-shot-v": { ja: "代表的なプレイ画面。", en: "A representative gameplay frame." },
    "media-pending": { ja: "映像・ビルド（準備中）", en: "Video and builds (placeholder)" },

    "other-title": { ja: "そのほかの作品", en: "Other work" },
    "mf-title": { ja: "Magnet Field", en: "Magnet Field" },
    "mf-meta": { ja: "グループ、2026年3月〜7月、担当はプレースホルダ", en: "Group, Mar–Jul 2026, role is a placeholder" },
    "mf-body": { ja: "磁気テーマのプロトタイプ。のちのツタエンジンの前身。", en: "Magnet-themed prototype. Predecessor of Ivy Engine." },
    "mf-shot-k": { ja: "ここに入れる写真", en: "Photograph to place here" },
    "mf-shot-v": { ja: "プレイ画面（担当が分かると良い）。", en: "Gameplay (a frame of owned work helps)." },
    "tps-title": { ja: "TPS シューティング", en: "Third-person shooter" },
    "tps-meta": { ja: "2026年1月、体制はプレースホルダ", en: "Jan 2026, team and role are placeholders" },
    "tps-body": { ja: "D3D11 の三人称。99 秒タイムアタック。", en: "A D3D11 third-person shooter. 99-second time attack." },
    "tps-shot-k": { ja: "ここに入れる写真", en: "Photograph to place here" },
    "tps-shot-v": { ja: "照準と敵が見えるプレイ画面。", en: "Gameplay with crosshair and an enemy." },
    "sb-title": { ja: "Scrap Burst", en: "Scrap Burst" },
    "sb-meta": { ja: "グループ、担当は未定（TBD）", en: "Group, role TBD" },
    "sb-body": { ja: "グループ制作。担当と期間は確認待ち。", en: "A group project. Role and dates pending." },
    "sb-shot-k": { ja: "ここに入れる写真", en: "Photograph to place here" },
    "sb-shot-v": { ja: "プレイ画面またはキーアート（提供待ち）。", en: "Gameplay or key art (waiting on assets)." },
    "hb-title": { ja: "ゲーム画面表現ハンドブック", en: "Game Visual Handbook" },
    "hb-meta": { ja: "個人、/handbook/ で公開中", en: "Solo, live at /handbook/" },
    "hb-body": { ja: "画面演出と操作感のカタログ。", en: "A catalogue of screen direction and feel." },
    "hb-link": { ja: "ハンドブックを開く", en: "Open the handbook" },

    "about-title": { ja: "プロフィール", en: "About" },
    "about-name-l": { ja: "名前", en: "Name" },
    "about-name-v": { ja: "Terry Yeung（日本語名はプレースホルダ）", en: "Terry Yeung (Japanese name is a placeholder)" },
    "about-role-l": { ja: "志望職種", en: "Target role" },
    "about-role-v": { ja: "エンジンプログラマー（ゲームも可）", en: "Engine programmer (gameplay also welcome)" },
    "about-lang-l": { ja: "言語", en: "Languages" },
    "about-lang-v": { ja: "JLPT N1、TOEIC 940", en: "JLPT N1, TOEIC 940" },
    "about-loc-l": { ja: "所在地", en: "Location" },
    "about-loc-v": { ja: "プレースホルダ", en: "Placeholder" },
    "about-edu-l": { ja: "経歴", en: "Background" },
    "about-edu-v": { ja: "プレースホルダ", en: "Placeholder" },
    "about-contact-l": { ja: "連絡先", en: "Contact" },
    "about-contact-v": { ja: "メール（準備中）", en: "Email (to be added)" }
  };

  function currentLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "en" || saved === "ja" ? saved : "ja";
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const entry = dict[key];
      if (!entry) return;
      el.textContent = entry[lang];
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      const entry = dict[key];
      if (!entry) return;
      el.setAttribute("aria-label", entry[lang]);
    });

    const titleKey = document.body.getAttribute("data-title-key");
    if (titleKey && dict[titleKey]) {
      document.title = dict[titleKey][lang];
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
