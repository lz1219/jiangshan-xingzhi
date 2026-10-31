/**
 * 诗歌层 · 江山行止（改造新增模块）
 *
 * 作用：把人物行迹卡片里那句摘句（.person-ev-quote）变成可点链接，
 *      点开是一首完整的诗 —— 竖排、分阕、注释、写作背景、系年确定性。
 *
 * 做法：不改 app.js 一行。用他的 mixin 注册机制挂载，再用 MutationObserver
 *      监听行迹列表重绘，把带《书名》且能在 ATLAS_WORKS 里命中的引文包成链接。
 */
(function () {
  'use strict';

  var STYLE_ID = 'atlas-poetry-style';

  var CSS = [
    '.person-ev-quote.is-poem-link{cursor:pointer;border-left-color:rgba(168,56,36,.95);',
    'text-decoration:underline;text-decoration-style:dotted;text-underline-offset:3px;}',
    '.person-ev-quote.is-poem-link:hover{color:#a83824;text-decoration-style:solid;}',
    '.person-ev-quote.is-poem-link:focus-visible{outline:2px solid #a83824;outline-offset:2px;}',
    '.poetry-backdrop{position:fixed;inset:0;background:rgba(30,24,16,.42);z-index:9998;',
    'opacity:0;transition:opacity .18s ease;}',
    '.poetry-backdrop.is-open{opacity:1;}',
    '.poetry-reader{position:fixed;z-index:9999;left:50%;top:50%;transform:translate(-50%,-50%) scale(.97);',
    'width:min(760px,92vw);max-height:86vh;overflow:auto;background:#f7f2e6;color:#2b241a;',
    'border:1px solid rgba(43,36,26,.18);border-radius:4px;box-shadow:0 18px 60px rgba(30,24,16,.34);',
    'padding:26px 28px 30px;opacity:0;transition:opacity .18s ease,transform .18s ease;',
    'font-family:var(--serif-stack,"Songti SC","SimSun",serif);}',
    '.poetry-reader.is-open{opacity:1;transform:translate(-50%,-50%) scale(1);}',
    '.poetry-close{position:absolute;right:12px;top:10px;border:0;background:none;font-size:22px;',
    'line-height:1;color:#9c8d74;cursor:pointer;padding:4px 8px;}',
    '.poetry-close:hover{color:#a83824;}',
    '.poetry-kicker{font-size:10.5px;letter-spacing:.32em;color:#a83824;margin-bottom:8px;}',
    '.poetry-title{margin:0 0 4px;font-size:23px;font-weight:600;letter-spacing:.05em;line-height:1.4;}',
    '.poetry-subtitle{margin:0 0 6px;font-size:12px;color:#9c8d74;letter-spacing:.04em;}',
    '.poetry-meta{font-size:11px;color:#6a5c47;letter-spacing:.05em;display:flex;gap:8px;flex-wrap:wrap;}',
    '.poetry-meta .dot{opacity:.5;}',
    '.poetry-body{margin:20px 0;padding:20px 8px;border-top:1px solid rgba(43,36,26,.14);',
    'border-bottom:1px solid rgba(43,36,26,.14);text-align:center;}',
    '.poetry-line{margin:0;font-size:19px;line-height:2.15;letter-spacing:.1em;color:#2b241a;}',
    '.poetry-stanza-gap{height:16px;}',
    '.poetry-block{margin-top:20px;}',
    '.poetry-block h3{margin:0 0 7px;font-size:10.5px;font-weight:500;letter-spacing:.28em;color:#a83824;}',
    '.poetry-block p{margin:0;font-size:12.5px;line-height:2;color:#6a5c47;text-align:justify;}',
    '.poetry-by{margin-top:8px;font-size:11px;color:#9c8d74;text-align:right;}',
    '.poetry-lic{margin-left:8px;padding:1px 5px;border:1px solid rgba(43,36,26,.18);border-radius:2px;font-size:9.5px;}',
    '.poetry-block .poetry-inference{margin-top:10px;padding:9px 11px;border-left:2px dashed rgba(168,56,36,.55);',
    'background:rgba(168,56,36,.045);color:#6a5c47;}',
    '.poetry-tag{display:inline-block;margin-right:6px;padding:0 5px;border:1px dashed rgba(168,56,36,.6);',
    'border-radius:2px;color:#a83824;font-size:9.5px;letter-spacing:.12em;}',
    '.poetry-basis{display:block;margin-top:5px;font-size:11px;color:#9c8d74;letter-spacing:.02em;}',
    '.poetry-notes{display:grid;grid-template-columns:76px minmax(0,1fr);gap:8px 10px;margin:0;}',
    '.poetry-notes dt{font-size:12.5px;color:#2b241a;margin:0;}',
    '.poetry-notes dd{margin:0;font-size:12px;line-height:1.9;color:#6a5c47;}',
    '.poetry-source{margin-top:22px;padding-top:12px;border-top:1px solid rgba(43,36,26,.14);',
    'font-size:10.5px;color:#9c8d74;letter-spacing:.04em;}',
    '.poetry-cert{display:inline-block;padding:0 5px;border:1px solid rgba(43,36,26,.18);border-radius:2px;}',
    '.poetry-prose{margin:18px 0;padding:16px 2px;border-top:1px solid rgba(43,36,26,.14);',
    'border-bottom:1px solid rgba(43,36,26,.14);}',
    '.poetry-prose p{margin:0 0 12px;font-size:14px;line-height:2.05;letter-spacing:.04em;',
    'color:#2b241a;text-align:justify;}',
    '.poetry-prose p:last-child{margin-bottom:0;}',
    '.poetry-prose .prose-mark{color:#a83824;}',
  ].join('');

  var esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  /** 横排折行：先按句末标点断句（词的句读即行），过长再退到逗号处 */
  function wrapLines(line, max) {
    max = max || 24;
    var text = String(line);
    var sentences = text.match(/[^。！？]*[。！？]/g) || [text];
    var out = [];
    sentences.forEach(function (s) {
      if (!s) return;
      if (s.length <= max) {
        out.push(s);
        return;
      }
      var rest = s;
      while (rest.length > max) {
        var cut = max;
        for (var i = max; i >= Math.floor(max * 0.6); i--) {
          if ('，、；：'.indexOf(rest.charAt(i - 1)) >= 0) {
            cut = i;
            break;
          }
        }
        out.push(rest.slice(0, cut));
        rest = rest.slice(cut);
      }
      if (rest) out.push(rest);
    });
    return out;
  }

  function findPoem(quoteText) {
    var poems = window.ATLAS_WORKS;
    if (!poems) return null;
    var m = /《([^》]+)》/.exec(quoteText);
    var title = m ? m[1] : '';
    var keys = Object.keys(poems);
    var i;
    if (title) {
      if (poems[title]) return poems[title];
      for (i = 0; i < keys.length; i++) {
        var p = poems[keys[i]];
        var aliases = p.alias || [];
        for (var j = 0; j < aliases.length; j++) {
          if (aliases[j] === title) return p;
        }
      }
      for (i = 0; i < keys.length; i++) {
        if (title.indexOf(keys[i]) >= 0 || keys[i].indexOf(title) >= 0) return poems[keys[i]];
      }
    }
    // 兜底：整句里出现某首诗的全名
    for (i = 0; i < keys.length; i++) {
      var q = poems[keys[i]];
      if (q.titleZh && quoteText.indexOf(q.titleZh) >= 0) return q;
    }
    return null;
  }

  var openReader = null; // 由 install 注入

  /** 把作品条目追加进主搜索索引（幂等，同一数组只追加一次） */
  function appendWorkEntries(index, ctx) {
    if (!Array.isArray(index) || index.__poemsAppended) return;
    var poems = window.ATLAS_WORKS || {};
    var dynasties = ctx && Array.isArray(ctx.dynasties) ? ctx.dynasties : [];
    Object.keys(poems).forEach(function (key) {
      var p = poems[key];
      // 主搜索的评分函数会读 keywords / aliases，缺一个就抛错
      var hit = null;
      if (typeof p.year === 'number' && dynasties.length) {
        hit = dynasties.find(function (d) {
          return p.year >= d.fromYear && p.year <= d.toYear;
        });
      }
      index.push({
        kind: 'work',
        titleZh: p.titleZh || key,
        titleEn: p.titleEn || p.titleZh || key,
        modernZh: p.authorZh || '',
        modernEn: p.authorEn || '',
        subZh: [p.authorZh, p.year, p.placeZh].filter(Boolean).join(' · '),
        subEn: [p.authorEn, p.year, p.placeEn].filter(Boolean).join(' · '),
        aliases: (p.alias || []).slice(),
        keywords: [],
        dynasty: hit || '',
        poem: p,
      });
    });
    index.__poemsAppended = true;
  }

  function decorateQuote(el) {
    if (!el || el.dataset.poetryLink === '1') return;
    var text = el.textContent || '';
    if (text.indexOf('《') < 0) return;
    var poem = findPoem(text);
    if (!poem) return;

    el.dataset.poetryLink = '1';
    el.classList.add('is-poem-link');
    el.setAttribute('role', 'link');
    el.setAttribute('tabindex', '0');
    el.setAttribute(
      'title',
      (document.documentElement.lang || '').indexOf('en') === 0
        ? 'Read the full poem'
        : '点击读全诗',
    );
    var activate = function (e) {
      e.preventDefault();
      e.stopPropagation();
      openReader(poem);
    };
    el.addEventListener('click', activate);
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') activate(e);
    });
  }

  var QUOTE_SEL = '.person-ev-quote';

  function scan(root) {
    if (!root || root.nodeType !== 1) return;
    if (root.classList && root.classList.contains('person-ev-quote')) decorateQuote(root);
    var list = root.querySelectorAll ? root.querySelectorAll(QUOTE_SEL) : [];
    for (var i = 0; i < list.length; i++) decorateQuote(list[i]);

    // ── 兜底：上游若改了类名，按文本特征认摘句 ──
    // 判据：叶子节点、文本含《书名》且含「…」，且长度合理
    if (!list.length) {
      var candidates = root.querySelectorAll ? root.querySelectorAll('span,div,p') : [];
      for (var j = 0; j < candidates.length; j++) {
        var el = candidates[j];
        if (el.children && el.children.length) continue;
        if (el.getAttribute && el.getAttribute('data-atlas-quote')) continue;
        var t = (el.textContent || '').trim();
        if (t.length < 8 || t.length > 120) continue;
        if (!/《[^》]+》/.test(t)) continue;
        if (!/「|“/.test(t)) continue;
        el.setAttribute('data-atlas-quote', '1');
        decorateQuote(el);
      }
    }
  }

  function install(Ctrl) {
    if (window.__ATLAS_READER__) return;
    window.__ATLAS_READER__ = true;

    // ---------- 作品检索：把 ATLAS_WORKS 注入主搜索索引 ----------
    // 不改搜索算法，只加一个 kind === 'work' 的条目类型；
    // 标签在 app.js 的 kindLabel 里登记为「作品」。
    var proto = Ctrl.prototype;
    var origEnsureIndex = proto._ensureSearchIndex;
    var origSelectResult = proto._selectSearchResult;

    if (typeof origEnsureIndex === 'function') {
      proto._ensureSearchIndex = function () {
        var index = origEnsureIndex.apply(this, arguments);
        try {
          appendWorkEntries(index, this);
        } catch (err) {
          /* 检索是增强项，失败不影响主功能 */
        }
        return index;
      };
    }

    if (typeof origSelectResult === 'function') {
      proto._selectSearchResult = function (item) {
        if (item && item.kind === 'work' && item.poem) {
          this._clearQuickSearchInput && this._clearQuickSearchInput();
          openReader(item.poem);
          return;
        }
        return origSelectResult.apply(this, arguments);
      };
    }

    // 能力探测：上游若改名，健康检查会标出来（检索降级，但摘句成链不受影响）
    if (window.atlasProbe) {
      window.atlasProbe('reader.searchIndex', typeof origEnsureIndex === 'function',
        '上游无 _ensureSearchIndex，作品检索将不可用');
      window.atlasProbe('reader.selectResult', typeof origSelectResult === 'function',
        '上游无 _selectSearchResult，点选作品将回落到默认行为');
    }

    if (!document.getElementById(STYLE_ID)) {
      var style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    openReader = function (poem) {
      var prev = document.getElementById('atlas-poetry-reader');
      if (prev) prev.parentNode.removeChild(prev);

      // 文体 → 渲染器注册表。
      // 新增文体（人物志、碑刻、书画题跋…）只需往 ATLAS_READER_RENDERERS 里注册一个函数，
      // 再在 GENRE_KIND 里登记映射，不必改动本文件的主流程。
      var RENDERERS =
        window.ATLAS_READER_RENDERERS || (window.ATLAS_READER_RENDERERS = {});
      if (!RENDERERS.verse) {
        RENDERERS.verse = function (p) {
          return (
            '<div class="poetry-body">' +
            (p.text || [])
              .map(function (stanza) {
                return (
                  wrapLines(stanza)
                    .map(function (l) {
                      return '<p class="poetry-line">' + esc(l) + '</p>';
                    })
                    .join('') + '<div class="poetry-stanza-gap"></div>'
                );
              })
              .join('') +
            '</div>'
          );
        };
      }
      if (!RENDERERS.prose) {
        RENDERERS.prose = function (p) {
          return (
            '<div class="poetry-prose">' +
            (p.text || [])
              .map(function (t) {
                return '<p>' + esc(t) + '</p>';
              })
              .join('') +
            '</div>'
          );
        };
      }
      var GENRE_KIND = { shi: 'verse', ci: 'verse', fu: 'verse', wen: 'prose', history: 'prose' };
      var bodyKind = GENRE_KIND[poem.genre] || 'prose';
      var bodyHtml = (RENDERERS[bodyKind] || RENDERERS.prose)(poem);

      var notesHtml =
        poem.notes && poem.notes.length
          ? '<section class="poetry-block"><h3>注释</h3><dl class="poetry-notes">' +
            poem.notes
              .map(function (n) {
                return '<dt>' + esc(n.term) + '</dt><dd>' + esc(n.explain) + '</dd>';
              })
              .join('') +
            '</dl></section>'
          : '';

      var metaBits = [poem.authorZh, String(poem.year), poem.placeZh].filter(Boolean);
      var metaHtml = metaBits
        .map(function (b) {
          return '<span>' + esc(b) + '</span>';
        })
        .join('<span class="dot">·</span>');

      var kickerLabel =
        poem.genre === 'history' ? '史传' : poem.genre === 'wen' ? '文' : '诗词';

      var wrap = document.createElement('div');
      wrap.id = 'atlas-poetry-reader';
      wrap.innerHTML =
        '<div class="poetry-backdrop"></div>' +
        '<div class="poetry-reader" role="dialog" aria-modal="true" aria-label="' +
        kickerLabel +
        '">' +
        '<button type="button" class="poetry-close" aria-label="关闭">×</button>' +
        '<div class="poetry-kicker">笺 · 江山行止</div>' +
        '<h2 class="poetry-title">' +
        esc(poem.titleZh) +
        '</h2>' +
        (poem.titleEn ? '<p class="poetry-subtitle">' + esc(poem.titleEn) + '</p>' : '') +
        '<div class="poetry-meta">' +
        metaHtml +
        '<span class="dot">·</span><span class="poetry-cert">' +
        kickerLabel +
        '</span>' +
        (poem.certainty
          ? '<span class="dot">·</span><span class="poetry-cert">系年 ' + esc(poem.certainty) + '</span>'
          : '') +
        (bodyKind === 'prose' ? '<span class="dot">·</span><span class="poetry-cert">摘录</span>' : '') +
        '</div>' +
        bodyHtml +
        (poem.meaning
          ? '<section class="poetry-block"><h3>大意</h3><p>' + esc(poem.meaning) + '</p></section>'
          : '') +
        (poem.appreciation
          ? '<section class="poetry-block"><h3>赏析</h3><p>' +
            esc(poem.appreciation.text) +
            '</p>' +
            (poem.appreciation.inference
              ? '<p class="poetry-inference"><span class="poetry-tag">推测</span>' +
                esc(poem.appreciation.inference.text) +
                (poem.appreciation.inference.basis
                  ? '<span class="poetry-basis">依据：' + esc(poem.appreciation.inference.basis) + '</span>'
                  : '') +
                '</p>'
              : '') +
            '<p class="poetry-by">—— ' +
            esc(poem.appreciation.by || '本站自撰') +
            '<span class="poetry-lic">' +
            esc(poem.appreciation.license || 'CC BY-SA 4.0') +
            '</span></p></section>'
          : '') +
        (poem.background
          ? '<section class="poetry-block"><h3>写作背景</h3><p>' + esc(poem.background) + '</p></section>'
          : '') +
        notesHtml +
        (poem.source ? '<p class="poetry-source">' + esc(poem.source) + '</p>' : '') +
        '</div>';
      document.body.appendChild(wrap);

      var backdrop = wrap.querySelector('.poetry-backdrop');
      var panel = wrap.querySelector('.poetry-reader');
      var closeBtn = wrap.querySelector('.poetry-close');

      var close = function () {
        document.removeEventListener('keydown', onKey);
        if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
      };
      var onKey = function (e) {
        if (e.key === 'Escape') close();
      };
      backdrop.addEventListener('click', close);
      closeBtn.addEventListener('click', close);
      document.addEventListener('keydown', onKey);

      requestAnimationFrame(function () {
        backdrop.classList.add('is-open');
        panel.classList.add('is-open');
        closeBtn.focus();
      });
    };

    scan(document.body);

    var observer = new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var added = records[i].addedNodes;
        for (var j = 0; j < added.length; j++) scan(added[j]);
      }
      // 兜底：若本片区域内一个标准类名的摘句都没找到，扫一遍整个面板
      // （上游若改了类名，只能靠文本特征认）
      if (!document.querySelector(QUOTE_SEL)) {
        var panel = document.getElementById('genealogy-body');
        if (panel) scan(panel);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (typeof window === 'undefined') return;
  var ready = window.HistoricalAtlasController;
  if (ready && typeof ready._extendPrototype === 'function') {
    install(ready);
  } else {
    (window.__ATLAS_MIXINS = window.__ATLAS_MIXINS || []).push(install);
  }
})();
