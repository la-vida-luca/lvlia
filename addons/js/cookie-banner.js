(function () {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  const STORAGE_KEY = 'fu-cookie-consent';
  const saved = localStorage.getItem(STORAGE_KEY);

  const showBanner = () => {
    banner.hidden = false;
    banner.setAttribute('aria-hidden', 'false');
  };

  const hideBanner = () => {
    banner.hidden = true;
    banner.setAttribute('aria-hidden', 'true');
  };

  const enableAnalytics = () => {
    const plausibleSrc = banner.dataset.plausibleSrc;
    if (plausibleSrc) {
      const script = document.createElement('script');
      script.src = plausibleSrc;
      script.defer = true;
      script.dataset.domain = banner.dataset.domain;
      script.integrity = banner.dataset.sri || '';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
    document.dispatchEvent(new CustomEvent('analytics:enabled'));
  };

  const disableAnalytics = () => {
    document.dispatchEvent(new CustomEvent('analytics:disabled'));
  };

  if (saved) {
    const preferences = JSON.parse(saved);
    if (preferences.analytics) enableAnalytics();
    return;
  }

  showBanner();

  banner.addEventListener('click', (event) => {
    const action = event.target.dataset.cookieAction;
    if (!action) return;

    if (action === 'accept') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics: true }));
      enableAnalytics();
      hideBanner();
    }

    if (action === 'deny') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics: false }));
      disableAnalytics();
      hideBanner();
    }

    if (action === 'customize') {
      banner.querySelector('#cookie-preferences').hidden = false;
    }
  });

  banner.querySelector('#cookie-preferences').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;
    const analytics = form.analytics.checked;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics }));
    if (analytics) {
      enableAnalytics();
    } else {
      disableAnalytics();
    }
    hideBanner();
  });
})();
