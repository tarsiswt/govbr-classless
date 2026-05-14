/* =============================================================================
   GovBR Classless Docs — shared utilities
   Transforms <template> elements into rendered examples + syntax-highlighted code.
   No dependencies. No build step.
   ============================================================================= */

(function () {
  'use strict';

  /* ---- HTML escaping ---- */
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ---- Normalize template indentation ---- */
  function normalizeIndent(html) {
    const lines = html.split('\n');
    // drop leading/trailing blank lines
    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
    if (!lines.length) return '';
    // find minimum indentation of non-empty lines
    const minIndent = Math.min(
      ...lines.filter(l => l.trim()).map(l => l.match(/^(\s*)/)[1].length)
    );
    return lines.map(l => l.slice(minIndent)).join('\n');
  }

  /* ---- Render all <template> elements ---- */
  document.querySelectorAll('template').forEach(function (tpl) {
    const rawHtml = tpl.innerHTML;
    const html    = normalizeIndent(rawHtml);
    const bgAttr  = tpl.getAttribute('data-bg') || '';

    // Preview container
    const preview = document.createElement('div');
    preview.className = 'example-preview';
    if (bgAttr) preview.setAttribute('data-bg', bgAttr);
    preview.innerHTML = html;

    // Code block
    const pre = document.createElement('pre');
    pre.innerHTML = '<code>' + escapeHtml(html) + '</code>';

    // Wrap both in .code-wrapper (copy button attaches here)
    const wrapper = document.createElement('div');
    wrapper.className = 'code-wrapper';
    wrapper.appendChild(preview);
    wrapper.appendChild(pre);

    // Copy button
    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copiar';
    copyBtn.setAttribute('aria-label', 'Copiar código');
    copyBtn.addEventListener('click', function () {
      const code = pre.querySelector('code').textContent;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(function () {
          copyBtn.textContent = 'Copiado ✓';
          setTimeout(function () { copyBtn.textContent = 'Copiar'; }, 2000);
        }).catch(function () { fallbackCopy(code, copyBtn); });
      } else {
        fallbackCopy(code, copyBtn);
      }
    });
    pre.style.position = 'relative';
    pre.appendChild(copyBtn);

    tpl.parentNode.insertBefore(wrapper, tpl);
    tpl.remove();
  });

  function fallbackCopy(text, btn) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); btn.textContent = 'Copiado ✓'; }
    catch (e) { btn.textContent = 'Erro'; }
    document.body.removeChild(ta);
    setTimeout(function () { btn.textContent = 'Copiar'; }, 2000);
  }

  /* ---- Mark active nav link ---- */
  const currentFile = location.pathname.split('/').pop();
  document.querySelectorAll('nav a').forEach(function (a) {
    if (a.getAttribute('href') === currentFile) {
      a.setAttribute('aria-current', 'page');
    }
  });
})();
