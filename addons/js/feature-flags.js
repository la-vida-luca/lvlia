(function () {
  const params = new URLSearchParams(window.location.search);
  const isEnabled = params.get('addons') === '1' || document.cookie.includes('addons=1');

  if (isEnabled) {
    document.cookie = 'addons=1; path=/; SameSite=Lax';
    document.dispatchEvent(new CustomEvent('addons:enabled'));
  } else {
    document.dispatchEvent(new CustomEvent('addons:disabled'));
  }
})();
