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
    var list = document.getElementById('genealogy-timeline');
    if (!list) return;

    // 先清掉上一轮插入的节点，保证幂等
    var stale = list.querySelectorAll('.cr-intro,.cr-link');
    for (var i = 0; i < stale.length; i++) stale[i].parentNode.removeChild(stale[i]);

    var data = (window.ATLAS_JOURNEYS || {})[currentJourneyKey(ctx)];
    if (!data) return;

    var stops = [];
    for (var j = 0; j < list.children.length; j++) {
      var child = list.children[j];
      if (!child.classList.contains('cr-intro') && !child.classList.contains('cr-link')) {
        stops.push(child);
      }
    }
    if (!stops.length) return;

    // 导语置顶
    if (data.intro && data.intro.text) {
      var intro = document.createElement('li');
      intro.className = 'cr-intro';
      intro.innerHTML =
        '<span class="cr-kicker">行迹读本</span>' +
        '<p class="cr-text">' + esc(data.intro.text) + '</p>' +
        (data.intro.source ? '<span class="cr-src">据 ' + esc(data.intro.source) + '</span>' : '');
      list.insertBefore(intro, stops[0]);
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
    if (typeof orig !== 'function') return;
    window.__ATLAS_CHRONICLE__ = true;
    proto._renderPersonChronicleCard = function () {
      var result = orig.apply(this, arguments);
      try {
        decorate(this);
      } catch (err) {
        /* 读本是增强项，失败不影响主面板 */
      }
      return result;
    };
  }

  if (typeof window === 'undefined') return;
  var ready = window.HistoricalAtlasController;
  if (ready && typeof ready._extendPrototype === 'function') install(ready);
  else (window.__ATLAS_MIXINS = window.__ATLAS_MIXINS || []).push(install);
})();
