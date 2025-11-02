/**
 * LVLIA - FAQ avec Recherche Live et Accordéon
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
  // Éléments DOM
  const searchInput = document.getElementById('faqSearch');
  const faqItems = document.querySelectorAll('.faq-item');
  const tabs = document.querySelectorAll('.faq-tabs .tab');
  const faqAccordion = document.querySelector('.faq-accordion');
  
  // Vérifier éléments existent
  if (!searchInput || faqItems.length === 0) {
    console.warn('FAQ: Éléments DOM manquants');
    return;
  }
  
  // Message "Aucun résultat"
  let noResultsMessage = document.querySelector('.faq-no-results');
  if (!noResultsMessage && faqAccordion) {
    noResultsMessage = document.createElement('div');
    noResultsMessage.className = 'faq-no-results';
    noResultsMessage.innerHTML = '<strong>Aucun résultat trouvé</strong><p>Essayez d\'autres mots-clés ou contactez-nous directement.</p>';
    faqAccordion.appendChild(noResultsMessage);
  }
  
  // === ACCORDÉON ===
  function setupAccordion() {
    document.querySelectorAll('.faq-question').forEach(function(question) {
      question.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        const answer = this.nextElementSibling;
        const icon = this.querySelector('.icon');
        
        // Fermer tous les autres
        document.querySelectorAll('.faq-question').forEach(function(q) {
          q.setAttribute('aria-expanded', 'false');
          if (q.nextElementSibling) {
            q.nextElementSibling.hidden = true;
          }
          const qIcon = q.querySelector('.icon');
          if (qIcon) {
            qIcon.textContent = '+';
          }
        });
        
        // Toggle actuel
        if (!isExpanded) {
          this.setAttribute('aria-expanded', 'true');
          if (answer) {
            answer.hidden = false;
          }
          if (icon) {
            icon.textContent = '−';
          }
          
          // Tracking GA4
          if (typeof gtag !== 'undefined') {
            const questionText = this.querySelector('span').textContent.trim();
            gtag('event', 'faq_question_open', {
              'event_category': 'engagement',
              'event_label': questionText.substring(0, 100)
            });
          }
        } else {
          // Si on clique à nouveau, fermer
          this.setAttribute('aria-expanded', 'false');
          if (answer) {
            answer.hidden = true;
          }
          if (icon) {
            icon.textContent = '+';
          }
        }
      });
    });
  }
  
  setupAccordion();
  
  // === RECHERCHE LIVE ===
  let searchTimeout;
  
  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(function() {
      const query = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;
      
      faqItems.forEach(function(item) {
        const questionElement = item.querySelector('.faq-question span');
        const answerElement = item.querySelector('.faq-answer');
        
        if (!questionElement || !answerElement) return;
        
        const question = questionElement.textContent.toLowerCase();
        const answer = answerElement.textContent.toLowerCase();
        
        // Recherche dans question ET réponse
        if (query === '' || question.includes(query) || answer.includes(query)) {
          item.style.display = 'block';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });
      
      // Afficher message "Aucun résultat" si besoin
      if (noResultsMessage) {
        if (visibleCount === 0 && query !== '') {
          noResultsMessage.classList.add('show');
        } else {
          noResultsMessage.classList.remove('show');
        }
      }
      
      // Tracking GA4 si recherche
      if (query !== '' && typeof gtag !== 'undefined') {
        gtag('event', 'faq_search', {
          'event_category': 'engagement',
          'event_label': query,
          'value': visibleCount
        });
      }
      
      console.log('FAQ Search: "' + query + '" → ' + visibleCount + ' résultat(s)');
    }, 300); // Debounce 300ms
  });
  
  // === FILTRES THÉMATIQUES ===
  if (tabs.length > 0) {
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        // Retirer active de tous
        tabs.forEach(function(t) {
          t.classList.remove('active');
        });
        
        // Ajouter active au cliqué
        this.classList.add('active');
        
        const theme = this.getAttribute('data-theme');
        let visibleCount = 0;
        
        // Filtrer items
        faqItems.forEach(function(item) {
          const itemTheme = item.getAttribute('data-theme');
          
          if (theme === 'all' || itemTheme === theme) {
            item.style.display = 'block';
            visibleCount++;
          } else {
            item.style.display = 'none';
          }
        });
        
        // Réinitialiser recherche
        searchInput.value = '';
        if (noResultsMessage) {
          noResultsMessage.classList.remove('show');
        }
        
        // Tracking GA4
        if (typeof gtag !== 'undefined') {
          gtag('event', 'faq_filter', {
            'event_category': 'engagement',
            'event_label': theme,
            'value': visibleCount
          });
        }
        
        console.log('FAQ Filter: ' + theme + ' → ' + visibleCount + ' question(s)');
      });
    });
  }
  
  // === DEEP LINKING (ancre vers question spécifique) ===
  function openQuestionFromHash() {
    const hash = window.location.hash;
    if (hash) {
      const targetQuestion = document.querySelector(hash + ' .faq-question');
      if (targetQuestion) {
        // Attendre un peu que la page charge
        setTimeout(function() {
          targetQuestion.click();
          targetQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
      }
    }
  }
  
  openQuestionFromHash();
  
  // Écouter changements hash
  window.addEventListener('hashchange', openQuestionFromHash);
  
  // === AJOUTER ID À CHAQUE QUESTION (pour deep linking) ===
  faqItems.forEach(function(item, index) {
    if (!item.id) {
      const questionText = item.querySelector('.faq-question span');
      if (questionText) {
        const slug = questionText.textContent
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Retirer accents
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        
        item.id = 'q-' + (slug.substring(0, 50) || index);
      }
    }
  });
  
  console.log('✅ FAQ initialized with ' + faqItems.length + ' questions');
});
