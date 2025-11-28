(function () {
  function activate(el, href) {
    el.dataset.href = href;
    el.removeAttribute('href');
    el.setAttribute('role', 'button');
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    el.style.cursor = 'pointer';
    el.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = href;
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.location.href = href;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href$=".html"]').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href) return;
      activate(a, href);
    });
  });
})();
