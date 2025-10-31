// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      const isExpanded = mainNav.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
      menuToggle.innerHTML = isExpanded ? '✕' : '☰';
    });
    
    // Close menu when clicking a link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '☰';
      });
    });
  }
  
  // Smooth scroll to anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
  
  // Netlify Forms spam honeypot
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
  
  // Image loading error handling and lazy loading
  document.querySelectorAll('img').forEach(img => {
    // Add loading attribute for better performance
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Error handling for failed image loads
    img.addEventListener('error', function() {
      console.error('Failed to load image:', this.src);
      // Add a visual indicator for missing images
      this.style.backgroundColor = '#f1f5f9';
      this.style.border = '2px dashed #cbd5e1';
      this.style.minHeight = '200px';
      this.alt = this.alt || 'Image non disponible';
    });
    
    // Log successful image loads for debugging
    img.addEventListener('load', function() {
      console.log('Successfully loaded image:', this.src);
    });
  });
});