/** 学术资料入口与不系年站点：不把未知年份交给上游排序/跳年。 */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function install(Ctrl) {
    var proto = Ctrl.prototype;
    if (proto.__researchInstalled) return;
    proto.__researchInstalled = true;
    var original = proto._renderPersonChronicleCard;
    if (typeof original !== 'function') return;
    proto._renderPersonChronicleCard = function () {
      var result = original.apply(this, arguments);
      var list = document.querySelector('#genealogy-timeline');
      if (!list) return result;
      var old = list.querySelector('.research-supplement');
      if (old) old.remove();
      var profiles = this.activePerson && this.activePerson.profiles || [];
      var profile = profiles[0];
      if (!profile) return result;
      var key = profile.journeyKey || profile.key;
      var data = (window.ATLAS_JOURNEYS || {})[key];
      if (!data) return result;
      var base = window.ATLAS_LINKS && window.ATLAS_LINKS.base || '';
      var url = base.replace(/\/+$/, '') + '/research.html?type=journey&key=' + encodeURIComponent(key);
      var li = document.createElement('li');
      li.className = 'research-supplement';
      li.style.cssText = 'display:block;padding:14px;border-top:1px solid #cbbda5;font-size:12px;line-height:1.9';
      li.innerHTML = '<a class="atlas-action-link" href="' + esc(url) + '" target="_blank" rel="noopener" title="在新窗口打开"><span>考据笺 · 出处、版本与待核事项</span><span class="atlas-action-link__arrow" aria-hidden="true">↗</span></a>' +
        (profile.spanNote ? '<p>生卒异说：' + esc(profile.spanNote) + '</p>' : '') +
        (data.undatedStops || []).map(function (s) {
          return '<section class="research-undated"><h4>不系年 · ' + esc(s.place.ancient) + ' · ' + esc(s.titleZh) + '</h4><p>' + esc(s.descZh) + '</p><p>据 ' + esc(s.source) + '</p><small>年份未详，不纳入编年排序与地图跳年。</small></section>';
        }).join('');
      list.appendChild(li);
      return result;
    };
  }
  var ready = window.HistoricalAtlasController;
  if (ready && typeof ready._extendPrototype === 'function') install(ready);
  else (window.__ATLAS_MIXINS = window.__ATLAS_MIXINS || []).push(install);
})();
