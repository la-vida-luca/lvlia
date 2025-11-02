// ========================================
// 🚀 LVLIA - EFFETS AVANCÉS CANVAS & INTERACTIONS
// Système de particules, animations premium
// ========================================

// ========================================
// 🌌 SYSTÈME DE PARTICULES CANVAS GLOBAL
// ========================================
class ParticleSystemGlobal {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    
    // Options personnalisables
    this.options = {
      count: options.count || 60,
      speed: options.speed || 0.5,
      size: options.size || 3,
      color: options.color || 'rgba(255,255,255,0.6)',
      connectionDistance: options.connectionDistance || 120,
      connectionColor: options.connectionColor || 'rgba(255,255,255,0.2)',
      mouse: options.mouse !== false
    };
    
    this.mouse = { x: null, y: null };
    this.init();
  }
  
  init() {
    // Redimensionner le canvas
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Créer les particules
    for (let i = 0; i < this.options.count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.options.speed,
        vy: (Math.random() - 0.5) * this.options.speed,
        size: Math.random() * this.options.size + 1
      });
    }
    
    // Suivre la souris
    if (this.options.mouse) {
      this.canvas.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      });
      
      this.canvas.addEventListener('mouseleave', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });
    }
    
    // Démarrer l'animation
    this.animate();
  }
  
  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Mettre à jour et dessiner les particules
    this.particles.forEach((p, i) => {
      // Mouvement
      p.x += p.vx;
      p.y += p.vy;
      
      // Rebonds
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
      
      // Attraction vers la souris
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x += dx * 0.02;
          p.y += dy * 0.02;
        }
      }
      
      // Dessiner la particule
      this.ctx.fillStyle = this.options.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Connexions entre particules
      this.particles.slice(i + 1).forEach(p2 => {
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.options.connectionDistance) {
          const opacity = (1 - dist / this.options.connectionDistance) * 0.3;
          this.ctx.strokeStyle = this.options.connectionColor.replace(/[\d.]+\)/, opacity + ')');
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// ========================================
// ✨ AUTO-INITIALISATION DES PARTICULES
// ========================================
function initAllParticles() {
  // Rechercher tous les canvas avec data-particles
  document.querySelectorAll('canvas[data-particles]').forEach(canvas => {
    const options = {};
    
    // Lire les options depuis les data-attributes
    if (canvas.dataset.particlesCount) options.count = parseInt(canvas.dataset.particlesCount);
    if (canvas.dataset.particlesSpeed) options.speed = parseFloat(canvas.dataset.particlesSpeed);
    if (canvas.dataset.particlesSize) options.size = parseFloat(canvas.dataset.particlesSize);
    if (canvas.dataset.particlesColor) options.color = canvas.dataset.particlesColor;
    
    new ParticleSystemGlobal(canvas, options);
  });
}

// ========================================
// 🌈 EFFET CONFETTI (pour conversions)
// ========================================
function launchConfetti(options = {}) {
  const count = options.count || 150;
  const colors = options.colors || ['#059669', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6'];
  
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-particle';
    confetti.style.cssText = `
      position: fixed;
      width: ${Math.random() * 10 + 5}px;
      height: ${Math.random() * 10 + 5}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      top: -20px;
      left: ${Math.random() * 100}vw;
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      opacity: ${Math.random() * 0.7 + 0.3};
      z-index: 10000;
      pointer-events: none;
      animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
    `;
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 5000);
  }
}

// CSS pour les confettis
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
  @keyframes confettiFall {
    from {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    to {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(confettiStyle);

// ========================================
// 💫 EFFET DE TYPING ANIMÉ
// ========================================
class TypingEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.text = element.textContent;
    this.speed = options.speed || 50;
    this.delay = options.delay || 0;
    this.cursor = options.cursor !== false;
    
    element.textContent = '';
    if (this.cursor) element.classList.add('typing-cursor');
    
    setTimeout(() => this.type(), this.delay);
  }
  
  type() {
    let i = 0;
    const interval = setInterval(() => {
      if (i < this.text.length) {
        this.element.textContent += this.text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        if (this.cursor) {
          setTimeout(() => this.element.classList.remove('typing-cursor'), 500);
        }
      }
    }, this.speed);
  }
}

// CSS pour le curseur de typing
const typingStyle = document.createElement('style');
typingStyle.textContent = `
  .typing-cursor::after {
    content: '|';
    animation: blink 0.7s infinite;
    margin-left: 2px;
  }
  
  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
`;
document.head.appendChild(typingStyle);

// ========================================
// 🎯 EFFET SPOTLIGHT SOURIS
// ========================================
class SpotlightEffect {
  constructor(container) {
    this.container = container;
    this.spotlight = document.createElement('div');
    this.spotlight.className = 'spotlight-effect';
    this.spotlight.style.cssText = `
      position: absolute;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(255,255,255,0.15), transparent);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s;
      opacity: 0;
      z-index: 1;
    `;
    
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.appendChild(this.spotlight);
    
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      this.spotlight.style.left = (e.clientX - rect.left) + 'px';
      this.spotlight.style.top = (e.clientY - rect.top) + 'px';
      this.spotlight.style.opacity = '1';
    });
    
    container.addEventListener('mouseleave', () => {
      this.spotlight.style.opacity = '0';
    });
  }
}

// ========================================
// 🌊 EFFET WAVE BUTTON
// ========================================
function addWaveEffect(button) {
  button.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const wave = document.createElement('span');
    wave.className = 'wave-effect';
    wave.style.cssText = `
      position: absolute;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255,255,255,0.6);
      transform: translate(-50%, -50%);
      left: ${x}px;
      top: ${y}px;
      animation: waveExpand 0.6s ease-out;
      pointer-events: none;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(wave);
    
    setTimeout(() => wave.remove(), 600);
  });
}

const waveStyle = document.createElement('style');
waveStyle.textContent = `
  @keyframes waveExpand {
    to {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }
`;
document.head.appendChild(waveStyle);

// ========================================
// 📊 COMPTEURS ANIMÉS AMÉLIORÉS
// ========================================
function animateCounterAdvanced(element, options = {}) {
  const target = parseFloat(element.dataset.target || element.textContent);
  const duration = options.duration || 2000;
  const decimals = options.decimals || 0;
  const suffix = options.suffix || '';
  const prefix = options.prefix || '';
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !element.classList.contains('counted')) {
        element.classList.add('counted');
        
        let current = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            element.textContent = prefix + target.toFixed(decimals) + suffix;
            clearInterval(timer);
          } else {
            element.textContent = prefix + current.toFixed(decimals) + suffix;
          }
        }, 16);
      }
    });
  });
  
  observer.observe(element);
}

// ========================================
// 🎨 PARALLAX AU SCROLL SIMPLE
// ========================================
function addParallaxScroll(elements, speed = 0.5) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    elements.forEach(el => {
      const offset = el.offsetTop;
      const distance = scrolled - offset;
      el.style.transform = `translateY(${distance * speed}px)`;
    });
  });
}

// ========================================
// 💎 AUTO-INIT AU CHARGEMENT
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialiser les particules
  initAllParticles();
  
  // Effet wave sur tous les boutons .btn
  document.querySelectorAll('.btn:not(.no-wave)').forEach(btn => {
    addWaveEffect(btn);
  });
  
  // Typing effect sur éléments avec data-typing
  document.querySelectorAll('[data-typing]').forEach(el => {
    new TypingEffect(el, {
      speed: parseInt(el.dataset.typingSpeed) || 50,
      delay: parseInt(el.dataset.typingDelay) || 0
    });
  });
  
  // Spotlight sur éléments avec data-spotlight
  document.querySelectorAll('[data-spotlight]').forEach(el => {
    new SpotlightEffect(el);
  });
  
  // Compteurs avancés
  document.querySelectorAll('[data-counter]').forEach(el => {
    animateCounterAdvanced(el, {
      duration: parseInt(el.dataset.counterDuration) || 2000,
      decimals: parseInt(el.dataset.counterDecimals) || 0,
      suffix: el.dataset.counterSuffix || '',
      prefix: el.dataset.counterPrefix || ''
    });
  });
});

// ========================================
// 📤 EXPORT GLOBAL
// ========================================
window.LVLIAEffects = {
  ParticleSystemGlobal,
  TypingEffect,
  SpotlightEffect,
  launchConfetti,
  addWaveEffect,
  animateCounterAdvanced,
  addParallaxScroll
};

console.log('🎨 LVLIA Advanced Effects chargés !');
