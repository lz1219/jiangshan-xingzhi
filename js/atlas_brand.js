/**
 * 品牌署名 · 江山行止
 *
 * 上游把品牌文案集中在两处：
 *   index.html 的 #txt-seal / #txt-subtitle（静态）
 *   js/app.js 用 uiStr('brand_seal'|'brand_sub') 在语言切换时覆写
 *
 * 我们不改名（主标识仍是「江山时序」——那是这套地图的名字），
 * 只把副标题改成能说明「这一层是什么」的说法，并保证它在语言切换后不被冲掉。
 *
 * 归属说明放在 <a id="act-home"> 的 title 与 README / NOTICE 里。
 */
(function () {
  'use strict';

  var SUB_ZH = '中国历史地图 · 行迹读本';
  var SUB_EN = 'Atlas of China · Annotated Chronicles';

  function apply() {
    var el = document.getElementById('txt-subtitle');
    if (!el) return;
    var isEn = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0;
    var want = isEn ? SUB_EN : SUB_ZH;
    if (el.textContent !== want) el.textContent = want;
  }

  function boot() {
    apply();
    var el = document.getElementById('txt-subtitle');
    if (!el || typeof MutationObserver === 'undefined') return;
    // app.js 在语言切换时会覆写副标题；观察并即时改回
    new MutationObserver(function () {
      apply();
    }).observe(el, { childList: true, characterData: true, subtree: true });
  }

  if (typeof document === 'undefined') return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
