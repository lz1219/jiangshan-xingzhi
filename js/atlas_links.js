/**
 * 跨站链接 · 江山行止 ↔ 文献站（poem-data）
 *
 * 为什么单独一个文件：
 *   两个站点将来可能部署到不同域名，链接不能写死在阅读器里。
 *   改这一处即可，或在外层页面预设 window.ATLAS_CORPUS_BASE。
 *
 * 用法：
 *   ATLAS_LINKS.corpusWork('琵琶行')      → 文献站某作品
 *   ATLAS_LINKS.corpusPerson('baijuyi')  → 文献站某人物
 */
(function () {
  'use strict';

  var isLocal = /^(127\.0\.0\.1|localhost)$/.test(location.hostname);

  var BASE =
    window.ATLAS_CORPUS_BASE ||
    (isLocal ? 'http://127.0.0.1:5322/' : 'http://47.94.110.181:8081/');

  function join(path) {
    return BASE.replace(/\/+$/, '') + '/' + String(path).replace(/^\/+/, '');
  }

  window.ATLAS_LINKS = {
    base: BASE,
    /** 文献站的作品页（hash 路由） */
    corpusWork: function (key) {
      return key ? join('#/work/' + encodeURIComponent(key)) : '';
    },
    /** 文献站的人物页 */
    corpusPerson: function (key) {
      return key ? join('#/person/' + encodeURIComponent(key)) : '';
    },
    /** 文献站的行迹页 */
    corpusJourney: function (key, stopSeq) {
      if (!key) return '';
      return join('#/journey/' + encodeURIComponent(key) + (stopSeq ? '?stop=' + encodeURIComponent(stopSeq) : ''));
    },
    /** 文献站的检索页 */
    corpusSearch: function (q) {
      return q ? join('#/search/' + encodeURIComponent(q)) : '';
    },
  };
})();
