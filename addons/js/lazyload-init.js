(function () {
  if (!('IntersectionObserver' in window)) {
    return;
  }

  const candidates = document.querySelectorAll('img:not([loading]), iframe:not([loading])');
  candidates.forEach((el) => {
    el.setAttribute('loading', 'lazy');
  });

  const preloadLinks = document.querySelectorAll('link[data-preload-on-interaction]');
  const activatePreload = (link) => {
    if (link.dataset.preloadActivated) return;
    link.rel = link.dataset.preloadTarget || 'preload';
    link.dataset.preloadActivated = 'true';
  };

  document.addEventListener('pointerover', (event) => {
    const link = event.target.closest('link[data-preload-on-interaction]');
    if (link) activatePreload(link);
  });
  document.addEventListener('focusin', (event) => {
    const link = event.target.closest('link[data-preload-on-interaction]');
    if (link) activatePreload(link);
  });
})();
