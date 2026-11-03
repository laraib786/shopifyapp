/*
 * Stock Pulse — variant change par badge update karta hai.
 *
 * Har theme variant change ko alag tareeqe se handle karti hai:
 *   - kuch themes URL mein ?variant=123 badal deti hain
 *   - kuch sirf form ke andar <input name="id"> ki value badalti hain
 *   - kuch (jaise naya Dawn) poora section dobara render kar deti hain
 * Is liye hum teeno cheezein dekhte hain.
 */
(function () {
  'use strict';

  // Agar block page par do baar ho to script bhi do baar load hogi — ek hi baar chalao
  if (window.__stockPulseLoaded) return;
  window.__stockPulseLoaded = true;

  function getVariantId() {
    var fromUrl = new URL(window.location.href).searchParams.get('variant');
    if (fromUrl) return fromUrl;
    var input = document.querySelector('form[action*="/cart/add"] [name="id"]');
    return input ? input.value : null;
  }

  function init(root) {
    if (root.dataset.stockPulseReady) return;
    root.dataset.stockPulseReady = 'true';

    var dataEl = root.querySelector('[data-stock-pulse-variants]');
    var textEl = root.querySelector('[data-stock-pulse-text]');
    if (!dataEl || !textEl) return;

    var variants;
    try {
      variants = JSON.parse(dataEl.textContent);
    } catch (e) {
      return;
    }

    var threshold = parseInt(root.dataset.threshold, 10) || 0;
    var showLow = root.dataset.showLow === 'true';
    var showOut = root.dataset.showOut === 'true';
    var messages = {
      in: root.dataset.msgIn,
      low: root.dataset.msgLow,
      out: root.dataset.msgOut,
    };

    function stateFor(v) {
      if (!v.available) return 'out';
      if (showLow && v.tracked && v.qty > 0 && v.qty <= threshold) return 'low';
      return 'in';
    }

    function render() {
      var id = getVariantId();
      if (!id) return;
      var variant = variants.find(function (v) {
        return String(v.id) === String(id);
      });
      if (!variant) return;

      var state = stateFor(variant);
      root.dataset.state = state;
      textEl.textContent = (messages[state] || '').replace('[count]', variant.qty);
      root.hidden = state === 'out' && !showOut;
    }

    root.stockPulseRender = render;
    render();
  }

  function initAll() {
    document.querySelectorAll('[data-stock-pulse]').forEach(init);
  }

  function renderAll() {
    document.querySelectorAll('[data-stock-pulse]').forEach(function (root) {
      if (root.stockPulseRender) root.stockPulseRender();
    });
  }

  // Theme URL ya input ko thori der baad update karti hai, is liye chhota delay
  function scheduleRender() {
    setTimeout(renderAll, 100);
  }

  document.addEventListener('change', scheduleRender);
  window.addEventListener('popstate', scheduleRender);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Agar theme section dobara render kare to naye badge ko bhi init karo
  new MutationObserver(initAll).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
