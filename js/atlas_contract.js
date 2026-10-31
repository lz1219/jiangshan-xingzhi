/**
 * 契约层 · 江山行止
 *
 * 目的：把「我们依赖上游的哪些东西」集中成一份可检查的清单。
 * 上游改名或重构时，只需要改这一个文件，且能被健康检查发现。
 *
 * 提供给其它脚本：
 *   window.ATLAS_SELECTORS  选择器（DOM 契约）
 *   window.__ATLAS_HEALTH   各层是否成功挂载（供测试断言）
 *   window.atlasProbe(name, ok, note)  登记一项能力探测
 */
(function () {
  'use strict';

  var SELECTORS = {
    quote: '.person-ev-quote',          // 行迹卡片里的摘句
    timeline: '#genealogy-timeline',    // 人物行迹列表
    timelineBody: '#genealogy-body',    // 列表滚动容器
    panelTitle: '#genealogy-heading',    // 面板抬头（人物名 + 生卒）
    subtitle: '#txt-subtitle',          // 品牌副标题
  };

  var HEALTH = {
    loaded: true,
    hooks: {},      // 每个依赖点的状态
    warnings: [],
  };

  function probe(name, ok, note) {
    HEALTH.hooks[name] = ok ? 'ok' : 'missing';
    if (!ok && note) HEALTH.warnings.push(name + ': ' + note);
    return ok;
  }

  // 每次探测后把状态刷到 DOM 上，方便测试与人工排查
  function flush() {
    try {
      document.documentElement.setAttribute(
        'data-atlas-health',
        Object.keys(HEALTH.hooks).filter(function (k) { return HEALTH.hooks[k] !== 'ok'; }).join(',') || 'ok'
      );
    } catch (e) { /* 忽略 */ }
  }

  window.ATLAS_SELECTORS = SELECTORS;
  window.__ATLAS_HEALTH = HEALTH;
  window.atlasProbe = function (name, ok, note) {
    var r = probe(name, ok, note);
    flush();
    return r;
  };
  window.atlasFlushHealth = flush;
})();
