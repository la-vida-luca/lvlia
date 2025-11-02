/**
 * LVLIA - Google Analytics 4 Configuration & Events Tracking
 * Version: 1.0.0
 * Date: 2025-11-02
 */

// Initialize dataLayer
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Configure GA4 (REMPLACER G-XXXXXXXXXX par votre ID GA4 réel)
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX', {
  'cookie_flags': 'SameSite=None;Secure',
  'anonymize_ip': true,
  'send_page_view': true
});

// Events personnalisés LVLIA
document.addEventListener('DOMContentLoaded', function() {
  
  // === TRACKING CTA CALENDLY ===
  document.querySelectorAll('a[href*="calendar.app.google"]').forEach(function(el) {
    el.addEventListener('click', function() {
      gtag('event', 'rdv_click', {
        'event_category': 'engagement',
        'event_label': 'calendrier_demo',
        'value': 1
      });
      console.log('GA4 Event: rdv_click');
    });
  });
  
  // === TRACKING LIENS PAIEMENT MOLLIE ===
  document.querySelectorAll('a[href*="mollie.com"]').forEach(function(el) {
    el.addEventListener('click', function() {
      var pack = el.href.includes('cb2k9hjwLNhFPEgmVbEyw') ? '1m2' : '2m2';
      var prix = pack === '1m2' ? 2990 : 5990;
      
      gtag('event', 'paiement_click', {
        'event_category': 'conversion',
        'event_label': 'pack_' + pack,
        'value': prix,
        'currency': 'EUR'
      });
      console.log('GA4 Event: paiement_click - Pack ' + pack);
    });
  });
  
  // === TRACKING SOUMISSIONS FORMULAIRES ===
  document.querySelectorAll('form[netlify]').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      var formName = form.getAttribute('name') || 'contact';
      
      gtag('event', 'lead_submit', {
        'event_category': 'conversion',
        'event_label': formName,
        'value': 1
      });
      console.log('GA4 Event: lead_submit - Form ' + formName);
    });
  });
  
  // === TRACKING CLICS LIENS PRODUITS ===
  document.querySelectorAll('a[href*="kit-particuliers"], a[href*="tarifs"], a[href*="pros"]').forEach(function(el) {
    el.addEventListener('click', function() {
      var destination = this.href.split('/').pop().replace('.html', '');
      
      gtag('event', 'navigation_produit', {
        'event_category': 'engagement',
        'event_label': destination,
        'value': 1
      });
    });
  });
  
  // === TRACKING SCROLL PROFONDEUR ===
  var scrollTracked = {
    '25': false,
    '50': false,
    '75': false,
    '100': false
  };
  
  window.addEventListener('scroll', function() {
    var scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    
    ['25', '50', '75', '100'].forEach(function(threshold) {
      if (scrollPercent >= parseInt(threshold) && !scrollTracked[threshold]) {
        scrollTracked[threshold] = true;
        
        gtag('event', 'scroll_depth', {
          'event_category': 'engagement',
          'event_label': threshold + '%',
          'value': parseInt(threshold)
        });
      }
    });
  });
  
  // === TRACKING TEMPS PASSÉ SUR PAGE ===
  var startTime = Date.now();
  var engagementTracked = false;
  
  setInterval(function() {
    var timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    // Utilisateur engagé si > 30 secondes
    if (timeSpent >= 30 && !engagementTracked) {
      engagementTracked = true;
      
      gtag('event', 'engaged_user', {
        'event_category': 'engagement',
        'event_label': window.location.pathname,
        'value': timeSpent
      });
      console.log('GA4 Event: engaged_user - ' + timeSpent + 's');
    }
  }, 10000); // Check toutes les 10 secondes
  
  // === TRACKING CLICS TÉLÉPHONE/EMAIL ===
  document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(function(el) {
    el.addEventListener('click', function() {
      var type = this.href.startsWith('tel:') ? 'telephone' : 'email';
      
      gtag('event', 'contact_click', {
        'event_category': 'conversion',
        'event_label': type,
        'value': 1
      });
      console.log('GA4 Event: contact_click - ' + type);
    });
  });
  
  console.log('✅ LVLIA GA4 Tracking initialized');
});

// === FONCTION PUBLIQUE POUR TRACKING CUSTOM ===
window.trackLVLIAEvent = function(eventName, category, label, value) {
  gtag('event', eventName, {
    'event_category': category || 'custom',
    'event_label': label || '',
    'value': value || 1
  });
  console.log('GA4 Custom Event: ' + eventName);
};
