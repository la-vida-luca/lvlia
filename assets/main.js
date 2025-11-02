// ========================================
// 🎨 LVLIA - INTERACTIONS PREMIUM V2.0
// Design révolutionnaire avec animations
// ========================================

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // 🌙 THEME TOGGLE (DARK/LIGHT MODE)
  // ========================================
  const themeToggle = createThemeToggle();
  
  function createThemeToggle() {
    // Créer le bouton
    const button = document.createElement('button');
    button.className = 'theme-toggle magnetic';
    button.setAttribute('aria-label', 'Changer de thème');
    
    // Récupérer la préférence sauvegardée
    const savedTheme = localStorage.getItem('lvlia-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    // Appliquer le thème
    document.documentElement.setAttribute('data-theme', currentTheme);
    button.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    
    // Toggle au clic
    button.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('lvlia-theme', newTheme);
      button.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      
      // Animation subtile
      button.style.transform = 'scale(0.8) rotate(360deg)';
      setTimeout(() => {
        button.style.transform = '';
      }, 300);
    });
    
    // Ajouter au body
    document.body.appendChild(button);
    
    return button;
  }
  
  // ========================================
  // 📱 MENU MOBILE PREMIUM
  // ========================================
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      const isExpanded = mainNav.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
      menuToggle.innerHTML = isExpanded ? '✕' : '☰';
      
      // Empêcher le scroll du body quand le menu est ouvert
      if (isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Fermer le menu lors du clic sur un lien
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '☰';
        document.body.style.overflow = '';
      });
    });
    
    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.innerHTML = '☰';
          document.body.style.overflow = '';
        }
      }
    });
  }
  
  // ========================================
  // 🌊 SMOOTH SCROLL PREMIUM
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // ========================================
  // 🎬 SCROLL REVEAL ANIMATIONS
  // ========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Animation personnalisée selon le type d'élément
        animateElement(entry.target);
      }
    });
  }, observerOptions);
  
  // Observer tous les éléments avec animation
  const animatedElements = document.querySelectorAll(
    '.card, .product-card, .feature-card, .stat, .testimonial-card, .pricing-card, .gallery-grid img'
  );
  
  animatedElements.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(el);
  });
  
  function animateElement(element) {
    // Ajouter une classe pour l'animation spécifique
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 50);
  }
  
  // ========================================
  // 🎯 HEADER SCROLL EFFECT
  // ========================================
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Ajouter classe "scrolled" au header
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Cacher le header en scrollant vers le bas, afficher en scrollant vers le haut
    if (currentScroll > lastScroll && currentScroll > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });
  
  // ========================================
  // 🎨 PARALLAX HERO EFFECT
  // ========================================
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      
      if (scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        hero.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.5;
      }
    });
  }
  
  // ========================================
  // 🔢 COUNTER ANIMATION
  // ========================================
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = Math.floor(target);
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start);
      }
    }, 16);
  }
  
  // Observer pour les compteurs
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        const target = parseInt(entry.target.getAttribute('data-target'));
        if (!isNaN(target)) {
          animateCounter(entry.target, target);
        }
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('[data-target]').forEach(el => {
    counterObserver.observe(el);
  });
  
  // ========================================
  // 🖼️ LAZY LOADING OPTIMISÉ
  // ========================================
  document.querySelectorAll('img').forEach(img => {
    // Ajouter loading attribute pour les images
    if (!img.hasAttribute('loading')) {
      const isHeroImage = img.closest('.hero') !== null || 
                          img.closest('.page-head') !== null;
      if (!isHeroImage) {
        img.setAttribute('loading', 'lazy');
      }
    }
    
    // Gestion d'erreur pour images manquantes
    img.addEventListener('error', function() {
      console.error('Failed to load image:', this.src);
      this.style.backgroundColor = '#f1f5f9';
      this.style.border = '2px dashed #cbd5e1';
      this.style.minHeight = '200px';
      this.alt = this.alt || 'Image non disponible';
      
      // Ajouter un placeholder SVG
      const placeholder = document.createElement('div');
      placeholder.innerHTML = `
        <svg width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f1f5f9"/>
          <text x="50%" y="50%" font-family="Inter" font-size="14" fill="#94a3b8" text-anchor="middle" dy=".3em">
            Image non disponible
          </text>
        </svg>
      `;
      this.parentNode.appendChild(placeholder);
      this.style.display = 'none';
    });
  });
  
  // ========================================
  // 🌟 EFFET DE BRILLANCE SUR LES CARDS
  // ========================================
  document.querySelectorAll('.card, .product-card, .feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
  
  // ========================================
  // 🎯 STICKY CTA MOBILE
  // ========================================
  const stickyCTA = document.querySelector('.sticky-cta-mobile');
  let stickyVisible = false;
  
  if (stickyCTA) {
    window.addEventListener('scroll', function() {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      // Afficher après 30% de scroll
      if (scrollPercent > 30 && !stickyVisible) {
        stickyCTA.style.display = 'block';
        setTimeout(() => {
          stickyCTA.style.opacity = '1';
        }, 10);
        stickyVisible = true;
      } else if (scrollPercent <= 30 && stickyVisible) {
        stickyCTA.style.opacity = '0';
        setTimeout(() => {
          stickyCTA.style.display = 'none';
        }, 300);
        stickyVisible = false;
      }
    });
  }
  
  // ========================================
  // 🎨 CURSOR CUSTOM EFFECT (optionnel)
  // ========================================
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--brand-primary);
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    transform: translate(-50%, -50%) scale(0.8);
    mix-blend-mode: difference;
  `;
  
  // Activer le curseur custom uniquement sur desktop
  if (window.innerWidth > 768) {
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.style.opacity = '0.5';
    });
    
    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.6)';
    });
    
    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    // Effet sur les éléments interactifs
    document.querySelectorAll('a, button, .btn, .card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.opacity = '0.7';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursor.style.opacity = '0.5';
      });
    });
  }
  
  // ========================================
  // 📊 PROGRESS BAR AU SCROLL
  // ========================================
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: var(--brand-gradient);
    z-index: 9999;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px rgba(5, 150, 105, 0.5);
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
  
  // ========================================
  // 🎯 BOUTONS AVEC EFFET RIPPLE
  // ========================================
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // Ajouter l'animation ripple au CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // ========================================
  // 🎨 GALERIE LIGHTBOX
  // ========================================
  const galleryImages = document.querySelectorAll('.gallery-grid img');
  
  if (galleryImages.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      cursor: zoom-out;
      backdrop-filter: blur(10px);
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      animation: zoomIn 0.3s ease-out;
    `;
    
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);
    
    // Ajouter animation zoom
    const zoomStyle = document.createElement('style');
    zoomStyle.textContent = `
      @keyframes zoomIn {
        from {
          transform: scale(0.8);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(zoomStyle);
    
    galleryImages.forEach(img => {
      img.style.cursor = 'zoom-in';
      
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });
    
    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    });
  }
  
  // ========================================
  // 🔔 NOTIFICATION TOAST (optionnel)
  // ========================================
  window.showToast = function(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: ${type === 'success' ? 'var(--brand-gradient)' : '#ef4444'};
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
      font-weight: 600;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };
  
  // Ajouter animations toast
  const toastStyle = document.createElement('style');
  toastStyle.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(toastStyle);
  
  // ========================================
  // 🛡️ HONEYPOT ANTI-SPAM POUR NETLIFY FORMS
  // ========================================
  document.querySelectorAll('form[netlify]').forEach(form => {
    if (!form.querySelector('input[name="bot-field"]')) {
      const honeypot = document.createElement('input');
      honeypot.type = 'text';
      honeypot.name = 'bot-field';
      honeypot.style.display = 'none';
      honeypot.setAttribute('aria-hidden', 'true');
      honeypot.tabIndex = -1;
      form.prepend(honeypot);
    }
  });
  
  // ========================================
  // 🎊 CONFETTI EFFECT (pour les conversions)
  // ========================================
  window.celebrateConversion = function() {
    const colors = ['#059669', '#0F766E', '#10b981', '#f59e0b'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}%;
        top: -10px;
        opacity: ${Math.random()};
        transform: rotate(${Math.random() * 360}deg);
        animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
        z-index: 10000;
        pointer-events: none;
      `;
      
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 5000);
    }
  };
  
  // Animation confetti
  const confettiStyle = document.createElement('style');
  confettiStyle.textContent = `
    @keyframes confettiFall {
      to {
        transform: translateY(100vh) rotate(${Math.random() * 720}deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(confettiStyle);
  
  // ========================================
  // ⚡ PERFORMANCE: Preload des liens importants
  // ========================================
  const importantLinks = document.querySelectorAll('a[href*="tarifs"], a[href*="contact"], a[href*="livraison"]');
  
  importantLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('http')) {
        const prefetch = document.createElement('link');
        prefetch.rel = 'prefetch';
        prefetch.href = href;
        document.head.appendChild(prefetch);
      }
    });
  });
  
  // ========================================
  // 📊 ANALYTICS EVENTS (si Google Analytics présent)
  // ========================================
  if (typeof gtag !== 'undefined') {
    // Tracker les clics sur les boutons CTA
    document.querySelectorAll('.btn, a[href*="calendar"]').forEach(btn => {
      btn.addEventListener('click', function() {
        const text = this.textContent.trim();
        gtag('event', 'cta_click', {
          'event_category': 'engagement',
          'event_label': text
        });
      });
    });
    
    // Tracker la profondeur de scroll
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        gtag('event', 'scroll_depth', {
          'event_category': 'engagement',
          'value': scrollPercent
        });
      }
    });
  }
  
  // ========================================
  // ✨ INITIALISATION TERMINÉE
  // ========================================
  console.log('🎨 LVLIA Premium Design System loaded');
  
  // Afficher un message de bienvenue (dev only)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%c✨ LVLIA Design System V2.0', 'color: #059669; font-size: 20px; font-weight: bold;');
    console.log('%cDesign révolutionnaire activé', 'color: #0F766E; font-size: 14px;');
  }
});

// ========================================
// 🎯 FONCTIONS UTILITAIRES GLOBALES
// ========================================

// Fonction pour animer un élément au scroll
window.animateOnScroll = function(selector, animationClass = 'fadeInUp') {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => observer.observe(el));
};

// Fonction pour créer un élément avec confettis
window.addConfetti = function(element) {
  element.addEventListener('click', function() {
    window.celebrateConversion();
  });
};

// Exporter pour utilisation globale
window.LVLIA = {
  showToast: window.showToast,
  celebrateConversion: window.celebrateConversion,
  animateOnScroll: window.animateOnScroll,
  addConfetti: window.addConfetti
};
