/**
 * 行迹读本 · 渲染层
 *
 * 把 ATLAS_JOURNEYS 里的「导语」与「站间承接语」织进上游的人物行迹面板，
 * 让一条行迹读起来是一篇编年，而不是一串孤立卡片。
 *
 * 只加不改：通过 __ATLAS_MIXINS 包装 _renderPersonChronicleCard，
 * 每次重渲染后重新插入（幂等，先清后插）。
 *
 * 出处必须显示：每条叙述下方带一行「据……」，这是 AGENTS.md §3.6 的要求。
 */
(function () {
  'use strict';

  var STYLE_ID = 'atlas-chronicle-style';
  var CSS = [
    /* 上游的列表项是 flex 行（左年号 / 右正文），我们的节点必须改回块级，否则出处会被挤成竖条 */
    '#genealogy-timeline > .cr-intro,#genealogy-timeline > .cr-link{display:block !important;',
    'flex:none !important;width:auto !important;list-style:none;}',
    '.cr-intro{margin:2px 0 14px;padding:12px 14px;background:rgba(168,56,36,.045);',
    'border-left:2px solid rgba(168,56,36,.45);border-radius:2px;}',
    '.cr-kicker{display:block;font-size:10px;letter-spacing:.28em;color:#a83824;margin-bottom:7px;}',
    '.cr-intro .cr-text{margin:0;font-family:var(--serif-stack,"Songti SC","SimSun",serif);',
    'font-size:12.6px;line-height:2;color:#3a3126;text-align:justify;}',
    '.cr-src{display:block;margin-top:7px;font-size:10px;letter-spacing:.02em;color:#9c8d74;}',
    '#genealogy-timeline > .cr-link{position:relative;margin:2px 0 6px;padding-left:26px;}',
    '.cr-link .cr-dot{position:absolute;left:11px;top:6px;width:5px;height:5px;border-radius:50%;',
    'border:1px solid rgba(168,56,36,.55);background:#f7f2e6;}',
    '.cr-link .cr-text{display:block;font-size:11.4px;line-height:1.75;color:#6a5c47;',
    'letter-spacing:.02em;}',
    '.cr-link .cr-src{margin-top:2px;}',
  ].join('');

  var esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  /** 当前人物的行迹 key：取 profiles[0].key（上游以 journey key 作为 profile.key） */
  function currentJourneyKey(ctx) {
    var person = ctx && ctx.activePerson;
    var profiles = person && Array.isArray(person.profiles) ? person.profiles : [];
    for (var i = 0; i < profiles.length; i++) {
      if (profiles[i] && profiles[i].key) return String(profiles[i].key);
    }
    return '';
  }

  function decorate(ctx) {
    var S = window.ATLAS_SELECTORS || {};
    var list = document.querySelector(S.timeline || '#genealogy-timeline');
    if (!list) return;

    // 先清掉上一轮插入的节点，保证幂等
    var stale = list.querySelectorAll('.cr-intro,.cr-link');
    for (var i = 0; i < stale.length; i++) stale[i].parentNode.removeChild(stale[i]);

    var data = (window.ATLAS_JOURNEYS || {})[resolveJourneyKey(ctx)];
    if (!data) return;

    var stops = [];
    for (var j = 0; j < list.children.length; j++) {
      var child = list.children[j];
      if (!child.classList.contains('cr-intro') && !child.classList.contains('cr-link')) {
        stops.push(child);
      }
    }
    if (!stops.length) return;

    var jkey = resolveJourneyKey(ctx);

    // 文献站入口（放在导语之后、首站之前）
    if (window.ATLAS_LINKS && jkey) {
      var more = document.createElement('li');
      more.className = 'cr-link cr-more';
      more.innerHTML =
        '<a href="' + window.ATLAS_LINKS.corpusPerson(resolvePersonKey(ctx)) +
        '" target="_blank" rel="noopener">在文献站查此人 ↗</a>';
      list.appendChild(more); // 先渲染，随后插到导语/首站正确位置
    }

    // 导语置顶
    if (data.intro && data.intro.text) {
      var intro = document.createElement('li');
      intro.className = 'cr-intro';
      intro.innerHTML =
        '<span class="cr-kicker">行迹读本</span>' +
        '<p class="cr-text">' + esc(data.intro.text) + '</p>' +
        (data.intro.source ? '<span class="cr-src">据 ' + esc(data.intro.source) + '</span>' : '');
      list.insertBefore(intro, stops[0]);
      var mv = list.querySelector('.cr-more');
      if (mv) list.insertBefore(mv, stops[0]);

    }

    // 站间承接语
    if (data.links) {
      Object.keys(data.links)
        .map(Number)
        .sort(function (a, b) {
          return a - b;
        })
        .forEach(function (n) {
          var item = data.links[n];
          var target = stops[n - 1];
          if (!item || !item.text || !target) return;
          var li = document.createElement('li');
          li.className = 'cr-link';
          li.innerHTML =
            '<span class="cr-dot"></span>' +
            '<span class="cr-text">' + esc(item.text) + '</span>' +
            (item.source ? '<span class="cr-src">据 ' + esc(item.source) + '</span>' : '');
          list.insertBefore(li, target);
        });
    }
  }

  /**
   * 从 DOM 反推当前人物的行迹 key（不依赖 ctx.activePerson）。
   * 顺序：列表项上的 data 属性 → 面板抬头的人名 → PERSON_PROFILES 查表。
   */
  // 文献站的人物页用「人物 key」（如 p21194），与行迹 key（dumu）可能不同
  function resolvePersonKey(ctx) {
    try {
      var app = ctx || window.atlasApp;
      var ap = app && app.activePerson;
      var profs = ap && Array.isArray(ap.profiles) ? ap.profiles : [];
      for (var i = 0; i < profs.length; i++) {
        if (profs[i] && profs[i].key) return String(profs[i].key);
      }
    } catch (e) { /* 忽略 */ }
    return resolveJourneyKey(ctx);
  }
  if (typeof window !== "undefined") window.__atlasFixSpan = fixSpanText;
  // 上游把「生年不明」的 null 当 0 渲染成「前0」；此处兜底改成「?」
  function fixSpanText(root) {
    if (!root) return;
    var scope = root.querySelector ? root : document;
    var nodes = scope.querySelectorAll("#genealogy-heading, .person-span, .act-person-head h2");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el && el.textContent && el.textContent.indexOf("前0") >= 0) {
        el.textContent = el.textContent.replace(/前0/g, "?");
      }
    }
  }
  function resolveJourneyKey(ctx) {
    var S = window.ATLAS_SELECTORS || {};
    var list = document.querySelector(S.timeline || '#genealogy-timeline');
    if (list) {
      var k = list.getAttribute('data-person-key');
      if (k) return k;
    }
    // 快路径：上游把控制器实例挂在 window.atlasApp
    try {
      var app = ctx || window.atlasApp;
      var ap = app && app.activePerson;
      var profs = ap && Array.isArray(ap.profiles) ? ap.profiles : [];
      for (var a = 0; a < profs.length; a++) {
        // 人物 key 与行迹 key 可能不同（如杜牧：p21194 / dumu），优先取 journeyKey
        if (profs[a] && profs[a].journeyKey) return String(profs[a].journeyKey);
        if (profs[a] && profs[a].key) return String(profs[a].key);
      }
    } catch (e) { /* 忽略 */ }
    // 次选：ctx 直传
    var person = ctx && ctx.activePerson;
    var profiles = person && Array.isArray(person.profiles) ? person.profiles : [];
    for (var i = 0; i < profiles.length; i++) {
      if (profiles[i] && profiles[i].key) return String(profiles[i].key);
    }
    // 退路：按面板抬头的人名去人物表里找
    var titleEl = document.querySelector(S.panelTitle || '.person-name');
    var zh = titleEl && titleEl.textContent ? titleEl.textContent.trim().split(/[（(\s]/)[0] : '';
    if (zh) {
      var all = (window.ATLAS_LORE_DATA && window.ATLAS_LORE_DATA.PERSON_PROFILES) || [];
      for (var j = 0; j < all.length; j++) {
        if (all[j].zh === zh && all[j].journeyKey) return all[j].journeyKey;
      }
    }
    return '';
  }

  function install(Ctrl) {
    if (window.__ATLAS_CHRONICLE__) return;
    if (!document.getElementById(STYLE_ID)) {
      var style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    var proto = Ctrl.prototype;
    var orig = proto._renderPersonChronicleCard;
    window.__ATLAS_CHRONICLE__ = true;

    // ── 快路径：包装渲染方法（上游若改名，此路失效但下面还有观察器兜底）──
    if (typeof orig === 'function') {
      proto._renderPersonChronicleCard = function () {
        var result = orig.apply(this, arguments);
        try {
          decorate(this);
        } catch (err) {
          /* 读本是增强项，失败不影响主面板 */
        }
        return result;
      };
      if (window.atlasProbe) window.atlasProbe('chronicle.wrapRender', true);
    } else {
      if (window.atlasProbe) {
        window.atlasProbe('chronicle.wrapRender', false, '上游无 _renderPersonChronicleCard，改用 DOM 观察');
      }
    }

    // ── 兜底路径：观察行迹列表的 DOM 变化 ──
    // 即使上游改了方法名，只要列表还在渲染，读本就仍能挂上
    var S = window.ATLAS_SELECTORS || {};
    var host = document.querySelector(S.timelineBody || '#genealogy-body') ||
      document.querySelector(S.timeline || '#genealogy-timeline');
    if (host && typeof MutationObserver !== 'undefined') {
      var lastKey = '';
      var pending = null;
      var observer = new MutationObserver(function () {
        if (pending) return;
        pending = setTimeout(function () {
          pending = null;
          var list = document.querySelector(S.timeline || '#genealogy-timeline');
          if (!list || !list.children.length) return;
          var key = resolveJourneyKey(null);
          if (!key) return;
          // 只在人物切换或列表重建时重挂，避免每次微变更都重排
          var stamp = key + ':' + list.children.length;
          if (stamp === lastKey) return;
          lastKey = stamp;
          try { decorate(null); } catch (e) { /* 同上 */ }
        }, 60);
      });
      observer.observe(host, { childList: true, subtree: true });
      if (window.atlasProbe) window.atlasProbe('chronicle.observer', true);
    } else if (window.atlasProbe) {
      window.atlasProbe('chronicle.observer', false, '未找到行迹列表容器');
    }
  }

  if (typeof window === 'undefined') return;
  var ready = window.HistoricalAtlasController;
  if (ready && typeof ready._extendPrototype === 'function') install(ready);
  else (window.__ATLAS_MIXINS = window.__ATLAS_MIXINS || []).push(install);
})();

/* 兜底：人物标题里的「前0」在渲染后修正（上游未区分 null 与 0） */
(function () {
  if (typeof window === "undefined") return;
  var runs = 0;
  var timer = setInterval(function () {
    runs++;
    try { window.__atlasFixSpan && window.__atlasFixSpan(document); } catch (e) { /* 忽略 */ }
    if (runs > 40) clearInterval(timer);
  }, 250);
  document.addEventListener("click", function () {
    setTimeout(function () { try { window.__atlasFixSpan && window.__atlasFixSpan(document); } catch (e) {} }, 300);
  }, true);
})();