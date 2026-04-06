// Jaace Theme — auto-initializing behaviors
// https://github.com/Jaace/theme

document.addEventListener('DOMContentLoaded', function () {

  // -- Theme toggle (dark/light) --
  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    var root = document.documentElement;
    var sunIcon = toggle.querySelector('.icon-sun');
    var moonIcon = toggle.querySelector('.icon-moon');

    function applyTheme(theme) {
      root.dataset.theme = theme;
      if (sunIcon) sunIcon.style.display = theme === 'dark' ? 'none' : 'block';
      if (moonIcon) moonIcon.style.display = theme === 'dark' ? 'block' : 'none';
    }

    var saved = localStorage.getItem('theme');
    if (saved) {
      applyTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      applyTheme('light');
    }

    toggle.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  // -- Copy-to-clipboard buttons --
  function setupCopyBtn(btn, getText) {
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(getText()).then(function () {
        var copyIcon = btn.querySelector('.icon-copy');
        var checkIcon = btn.querySelector('.icon-check');
        if (copyIcon) copyIcon.style.display = 'none';
        if (checkIcon) checkIcon.style.display = 'block';
        btn.classList.add('copied');
        setTimeout(function () {
          if (copyIcon) copyIcon.style.display = 'block';
          if (checkIcon) checkIcon.style.display = 'none';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  }

  // Hero-style copy button: copies sibling <code> text
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    var codeEl = btn.closest('.install-cta');
    if (codeEl) {
      var code = codeEl.querySelector('code');
      if (code) setupCopyBtn(btn, function () { return code.textContent; });
    }
  });

  // Code-block copy buttons: copies from data-copy attribute
  document.querySelectorAll('.code-copy-btn').forEach(function (btn) {
    if (btn.dataset.copy) {
      setupCopyBtn(btn, function () { return btn.dataset.copy; });
    }
  });

  // -- Effort tags (interactive table) --
  // Tags need a data-effort-text attribute. The nearest <tr> or [data-effort-group]
  // element must contain a .best-for-text element that receives the clicked text.
  document.querySelectorAll('.effort-tags').forEach(function (container) {
    var row = container.closest('tr') || container.closest('[data-effort-group]');
    if (!row) return;
    var textEl = row.querySelector('.best-for-text');
    if (!textEl) return;
    container.querySelectorAll('.tag[data-effort-text]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.classList.contains('accent')) return;
        container.querySelectorAll('.tag').forEach(function (t) { t.classList.remove('accent'); });
        btn.classList.add('accent');
        textEl.textContent = btn.dataset.effortText;
      });
    });
  });

});
