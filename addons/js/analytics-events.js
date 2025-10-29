(function () {
  const sendEvent = (name, props = {}) => {
    if (window.plausible) {
      window.plausible(name, { props });
    }
    document.dispatchEvent(new CustomEvent('analytics:event', { detail: { name, props } }));
    const endpoint = document.body?.dataset?.analyticsEndpoint;
    if (endpoint) {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, props })
      }).catch(() => {});
    }
  };

  document.addEventListener('lead:submitted', () => sendEvent('lead-submitted'));
  document.addEventListener('roi:calculated', (event) => sendEvent('roi-calculated', event.detail));
  document.addEventListener('roi:exported', (event) => sendEvent('roi-exported', event.detail));
  document.addEventListener('analytics:enabled', () => sendEvent('consent-given'));

  document.querySelectorAll('[data-analytics]').forEach((element) => {
    element.addEventListener('click', () => {
      sendEvent(element.dataset.analytics);
    });
  });

  const calendar = document.querySelector('.cro-calendar iframe');
  if (calendar) {
    calendar.addEventListener('load', () => sendEvent('calendar-opened'));
  }

  let scrollTracked = false;
  const onScroll = () => {
    if (scrollTracked) return;
    const scrollPosition = window.scrollY + window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;
    if (scrollPosition / totalHeight > 0.75) {
      scrollTracked = true;
      sendEvent('scroll-75');
      window.removeEventListener('scroll', onScroll);
    }
  };
  window.addEventListener('scroll', onScroll);
})();
