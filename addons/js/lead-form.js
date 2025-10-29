(function () {
  const form = document.getElementById('lead-form');
  if (!form) return;

  const feedback = form.querySelector('.form-feedback');
  const tokenField = form.querySelector('[data-token-field]');
  if (tokenField) {
    tokenField.value = btoa(`${Date.now()}-${Math.random()}`).replace(/=/g, '');
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    feedback.textContent = 'Envoi en cours…';

    const endpoint = form.dataset.endpoint;
    const formData = new FormData(form);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      });

      if (!response.ok) {
        throw new Error('Le serveur a retourné une erreur');
      }

      feedback.textContent = 'Merci ! Notre équipe vous recontacte sous 24h.';
      form.reset();
      document.dispatchEvent(new CustomEvent('lead:submitted'));
      if (tokenField) {
        tokenField.value = btoa(`${Date.now()}-${Math.random()}`).replace(/=/g, '');
      }
    } catch (error) {
      feedback.textContent = 'Impossible d\'envoyer votre demande pour le moment. Merci de réessayer ou d\'utiliser contact@fermesurbaines.com.';
    }
  });
})();
